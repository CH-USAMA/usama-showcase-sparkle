import type { FlowStage } from "@/components/system/ArchitectureFlow";

/**
 * The capability list, shared by the landing page's ServiceExplorer and the
 * /services page. It used to live inside ServiceExplorer, which meant the
 * services page either duplicated the copy or drifted from it — the two
 * surfaces now read from one source.
 *
 * `runtime` records which language actually owns the domain. That is the
 * distinction the site is arguing: Laravel and PHP carry the application core,
 * Node.js and TypeScript take the event-driven edge, Python takes AI and data.
 * Without it a reader sees three languages of equal weight.
 */
export type Runtime = "laravel" | "node" | "python" | "automation" | "asterisk" | "infra";

/** What actually runs the domain — not an aspirational language list. */
export const RUNTIME_LABEL: Record<Runtime, string> = {
  laravel: "Laravel · PHP",
  node: "Node.js · TypeScript",
  python: "Python",
  automation: "n8n · webhooks",
  asterisk: "Asterisk · SIP",
  infra: "Docker · Linux · CI/CD",
};

export interface Capability {
  id: string;
  n: string;
  title: string;
  summary: string;
  stack: string[];
  /** Domain hue — the same one this domain carries in the stack matrix and
      the case studies, so a reader can follow a colour across the page. */
  hue: string;
  /** The runtime that owns this domain. See RUNTIME_LABEL. */
  runtime: Runtime;
  flow: FlowStage[];
  /** Only set where a dedicated service page actually exists. */
  href?: string;
}

/**
 * Content is lifted from the existing services and About copy — restructured,
 * not rewritten. `href` is present only for the four services that have real
 * detail pages; the rest expand in place rather than linking to a 404.
 */
export const CAPABILITIES: Capability[] = [
  {
    id: "laravel",
    runtime: "laravel",
    hue: "var(--hue-backend)",
    n: "01",
    title: "Laravel & Backend Systems",
    summary:
      "Production-grade Laravel applications: thin controllers, business rules in tested action classes, idempotent write paths, and queue architecture that survives retries.",
    stack: ["Laravel", "PHP 8.3", "MySQL", "Redis", "Horizon", "Octane"],
    flow: [
      { label: "Request", note: "HTTP / API" },
      { label: "Auth", note: "Policies · RBAC" },
      { label: "Action", note: "Domain logic" },
      { label: "Queue", note: "Horizon" },
      { label: "Database", note: "MySQL" },
    ],
    href: "/services/laravel-development",
  },
  {
    id: "saas",
    runtime: "laravel",
    hue: "var(--hue-backend)",
    n: "02",
    title: "SaaS & API Engineering",
    summary:
      "Multi-tenant platforms with subscription billing, roles, permissions, and audit trails. Versioned REST and GraphQL APIs designed for third parties to actually depend on.",
    stack: ["Multi-tenant", "Stripe", "OAuth2", "OpenAPI", "GraphQL", "Rate limiting"],
    flow: [
      { label: "Client", note: "Versioned API" },
      { label: "Gateway", note: "Rate limits" },
      { label: "Tenant scope", note: "Isolation" },
      { label: "Billing", note: "Stripe / Paddle" },
      { label: "Audit log", note: "Append-only" },
    ],
  },
  {
    id: "ai",
    runtime: "python",
    hue: "var(--hue-ai)",
    n: "03",
    title: "AI & Agent Integration",
    summary:
      "RAG pipelines, autonomous agents, and LLM features wired into existing backends with retrieval you can inspect, evaluation harnesses, and guardrails around every write.",
    stack: ["RAG", "LangChain", "pgvector", "Pinecone", "Claude", "GPT-4"],
    flow: [
      { label: "Query", note: "User intent" },
      { label: "Retrieve", note: "Hybrid search" },
      { label: "Rerank", note: "Cross-encoder" },
      { label: "Generate", note: "Cited output" },
      { label: "Validate", note: "Guardrails" },
    ],
    href: "/services/ai-integration",
  },
  {
    id: "automation",
    runtime: "automation",
    hue: "var(--hue-automation)",
    n: "04",
    title: "Automation Infrastructure",
    summary:
      "n8n workflows, MCP agents, and orchestration that replace manual back-office work, built with retries, dead-letter queues, and observability rather than a happy path.",
    stack: ["n8n", "MCP", "Webhooks", "Cron", "ETL", "Sentry"],
    flow: [
      { label: "Trigger", note: "Webhook · cron" },
      { label: "Enrich", note: "Third-party data" },
      { label: "Decide", note: "Rules · LLM" },
      { label: "Act", note: "CRM · email" },
      { label: "Observe", note: "Logs · alerts" },
    ],
    href: "/services/automation-n8n",
  },
  {
    id: "voip",
    runtime: "asterisk",
    hue: "var(--hue-realtime)",
    n: "05",
    title: "VoIP & Asterisk",
    summary:
      "Self-hosted call centres on Asterisk and FreePBX: IVR trees, predictive dialers, SIP trunk failover, call recording, and dispatch wired straight into the CRM.",
    stack: ["Asterisk", "FreePBX", "SIP", "AGI / AMI", "Call recording"],
    flow: [
      { label: "SIP trunk", note: "Carrier" },
      { label: "Asterisk", note: "Dialplan" },
      { label: "IVR", note: "Routing" },
      { label: "Agent queue", note: "Live state" },
      { label: "CRM", note: "Laravel" },
    ],
    href: "/services/voip-asterisk",
  },
  {
    id: "realtime",
    runtime: "node",
    hue: "var(--hue-realtime)",
    n: "06",
    title: "Real-Time Systems",
    summary:
      "Presence, live dashboards, and chat infrastructure on Laravel Reverb, Pusher, or Socket.IO, with reconnection, backpressure, and per-channel authorisation handled.",
    stack: ["WebSockets", "Reverb", "Pusher", "Socket.IO", "Presence"],
    flow: [
      { label: "Event", note: "Domain change" },
      { label: "Broadcast", note: "Reverb" },
      { label: "Channel auth", note: "Per-user" },
      { label: "Socket", note: "Persistent" },
      { label: "Client", note: "Live UI" },
    ],
  },
  {
    id: "cloud",
    runtime: "infra",
    hue: "var(--hue-cloud)",
    n: "07",
    title: "Cloud & DevOps",
    summary:
      "Load-balanced deployments on AWS or DigitalOcean with CI/CD, zero-downtime releases, backups, monitoring, and runbooks written before the first incident, not after.",
    stack: ["AWS", "Docker", "CI/CD", "Nginx", "Monitoring", "Backups"],
    flow: [
      { label: "Commit", note: "Git" },
      { label: "Pipeline", note: "Tests · analysis" },
      { label: "Build", note: "Docker image" },
      { label: "Release", note: "Zero-downtime" },
      { label: "Monitor", note: "Alerts · logs" },
    ],
  },
];
