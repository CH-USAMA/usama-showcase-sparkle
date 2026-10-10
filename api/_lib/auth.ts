import { error } from "./http.js";

/**
 * Admin gate for /api/admin/*.
 *
 * The site already signs people in with Supabase Auth, so the browser sends
 * its Supabase access token as a Bearer header. The token is verified by
 * asking Supabase who it belongs to (GET /auth/v1/user), and the email must be
 * on the ADMIN_EMAILS allowlist. Being signed in is not enough: the /auth page
 * still lets anyone create an account, and those accounts get nothing here.
 *
 * An empty or missing ADMIN_EMAILS denies everyone.
 */
export async function requireAdmin(request: Request): Promise<{ email: string }> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) throw error(401, "Sign in required");

  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anon = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) throw error(500, "Auth is not configured");

  const res = await fetch(`${url}/auth/v1/user`, {
    headers: { authorization: `Bearer ${token}`, apikey: anon },
  });
  if (!res.ok) throw error(401, "Session expired, sign in again");
  const user = (await res.json()) as { email?: string; email_confirmed_at?: string | null };

  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = (user.email ?? "").toLowerCase();
  if (!email || !allow.includes(email)) throw error(403, "This account is not an admin");
  if (!user.email_confirmed_at) throw error(403, "Confirm your email address first");

  return { email };
}

/**
 * Optional: rebuild the site after a write so the prerendered pages, sitemap
 * and RSS pick up the change. The API already serves new content within a
 * minute; this only refreshes what crawlers see. Set VERCEL_DEPLOY_HOOK_URL
 * (Vercel → Settings → Git → Deploy Hooks) to enable it.
 */
export async function triggerRebuild() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return;
  try {
    await fetch(hook, { method: "POST" });
  } catch (e) {
    console.error("[api] deploy hook failed", e);
  }
}
