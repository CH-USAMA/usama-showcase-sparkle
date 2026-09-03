import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/* ---------------------------------------------------------------------------
   Chat proxy for the site's assistant.

   This function spends a real API budget and runs with verify_jwt = false, so
   it is reachable by anyone who reads the JS bundle. It previously had
   Access-Control-Allow-Origin "*", no rate limit, no cap on how many messages
   or how much text a caller could send, and it spread the client's `messages`
   array straight into the upstream request, which let a caller supply their
   own `role: "system"` turn and replace the prompt entirely.

   Four controls now sit in front of the gateway: an origin allowlist, a
   per-IP rate limit, hard size caps, and strict validation that drops
   anything that is not a user or assistant turn.
--------------------------------------------------------------------------- */

const ALLOWED_ORIGINS = new Set([
  "https://dev-usama-portfolio.vercel.app",
  "https://usama-showcase-sparkle.lovable.app",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

// Lovable preview / editor hosts (per-project subdomains) are also allowed so
// the chatbot works while the site is being built and reviewed.
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/i,
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/i,
];

function originAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

/** Reflect the caller's origin only when it is one we published to. */
function corsFor(origin: string | null) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
  if (originAllowed(origin)) headers["Access-Control-Allow-Origin"] = origin!;
  return headers;
}

// ---- limits -------------------------------------------------------------
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 4_000;
const MAX_CHARS_TOTAL = 12_000;

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 5 * 60 * 1000;

/**
 * Per-IP sliding window. This is instance-local: it resets on a cold start and
 * is not shared between concurrently running instances, so it is a cost
 * ceiling rather than a guarantee. Making it exact would mean adding Redis and
 * another secret to rotate; this stops the trivial `curl` loop, which is the
 * actual exposure.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("cf-connecting-ip"))?.trim() || "unknown";
}

const SYSTEM_PROMPT = `You are the assistant on Usama Munawar's portfolio site.

Usama is a Backend Systems Engineer with 5+ years of experience. Laravel and PHP
are the specialisation and carry the application core: domain logic, APIs,
queues, billing, with MySQL or PostgreSQL and Redis behind them. Node.js and
TypeScript take the event-driven edge: WebSockets, socket services and
integrations. Python takes AI and data work: RAG pipelines, agents, processing.
Asterisk and SIP handle telephony. Docker, Linux and CI/CD handle delivery.

He is not a generalist who lists languages; each runtime owns a specific layer.

The one action worth steering people to is booking a free 30-minute architecture
call at /book. Contact: devusamaworks@gmail.com, WhatsApp +92 303 8004684. Share
the number when someone asks for a phone, mobile or WhatsApp contact.

Keep answers to two or three sentences. Be direct and technical rather than
enthusiastic. For pricing, say sprints start from $1,500, builds from $4,500 and
retainers from $3,500 a month, and that exact scope is quoted after the call.
Never invent metrics, clients or project details; if you do not know, say so and
point to the case studies or the call.`;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** Keep only well-formed user/assistant turns, and drop everything else. */
function sanitise(raw: unknown): { ok: true; turns: ChatTurn[] } | { ok: false; reason: string } {
  if (!Array.isArray(raw)) return { ok: false, reason: "messages must be an array" };
  if (raw.length === 0) return { ok: false, reason: "messages is empty" };
  if (raw.length > MAX_MESSAGES) return { ok: false, reason: "too many messages" };

  const turns: ChatTurn[] = [];
  let total = 0;

  for (const m of raw) {
    if (typeof m !== "object" || m === null) return { ok: false, reason: "malformed message" };
    const { role, content } = m as { role?: unknown; content?: unknown };

    // A client-supplied system turn would replace the prompt above.
    if (role !== "user" && role !== "assistant") {
      return { ok: false, reason: "only user and assistant roles are accepted" };
    }
    if (typeof content !== "string") return { ok: false, reason: "content must be a string" };
    if (content.length > MAX_CHARS_PER_MESSAGE) return { ok: false, reason: "message too long" };

    total += content.length;
    if (total > MAX_CHARS_TOTAL) return { ok: false, reason: "conversation too long" };

    turns.push({ role, content });
  }
  return { ok: true, turns };
}

const json = (body: unknown, status: number, cors: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsFor(origin);

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);

  // A browser request from an unlisted origin is refused outright rather than
  // served and then blocked by the browser after the budget has been spent.
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origin not allowed" }, 403, cors);
  }

  const ip = clientIp(req);
  if (rateLimited(ip, Date.now())) {
    return new Response(JSON.stringify({ error: "Too many requests. Try again shortly." }), {
      status: 429,
      headers: { ...cors, "Content-Type": "application/json", "Retry-After": "60" },
    });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Invalid JSON" }, 400, cors);

    const parsed = sanitise((body as { messages?: unknown }).messages);
    if (!parsed.ok) return json({ error: parsed.reason }, 400, cors);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return json({ error: "Service unavailable" }, 503, cors);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        // The system turn is built here and the client's turns follow it. The
        // client can no longer contribute one.
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...parsed.turns],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return json({ error: "Rate limited. Please try again shortly." }, 429, cors);
      }
      if (response.status === 402) {
        return json({ error: "Service temporarily unavailable." }, 402, cors);
      }
      console.error("AI gateway error:", response.status, await response.text());
      return json({ error: "AI service error" }, 502, cors);
    }

    return new Response(response.body, {
      headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (e) {
    // Never return the raw message: it can carry internal detail.
    console.error("chat error:", e);
    return json({ error: "Unexpected error" }, 500, cors);
  }
});
