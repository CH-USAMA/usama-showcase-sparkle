export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Service {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
}

export const servicesData: Service[] = [
  {
    slug: "laravel-development",
    name: "Laravel Development",
    eyebrow: "Laravel & PHP",
    title: "Laravel Development for Production SaaS Backends",
    metaTitle: "Laravel Development Services — Senior Laravel Engineer | Usama Munawar",
    metaDescription:
      "Senior Laravel development for multi-tenant SaaS, APIs, queues, and billing. Production-grade PHP and MySQL architecture with tests, CI/CD, and handover.",
    intro:
      "I build and rescue Laravel applications that carry real traffic, real money, and real teams. Multi-tenant SaaS, billing, RBAC, queue-heavy pipelines, and APIs that other companies depend on.",
    outcomes: [
      { value: "180+", label: "Projects shipped" },
      { value: "5+ yrs", label: "Laravel in production" },
    ],
    stack: ["Laravel", "PHP 8.3", "MySQL", "PostgreSQL", "Redis", "Horizon", "Livewire", "Filament", "Pest / PHPUnit"],
    sections: [
      {
        heading: "What I build",
        body: "Most engagements fall into one of four shapes, and each one ships with tests, deployment scripts, and documentation you can hand to another engineer.",
        bullets: [
          "Multi-tenant SaaS platforms with subscription billing, roles, permissions, and audit trails",
          "REST and GraphQL APIs designed for third-party consumption, versioning, and rate limits",
          "Queue and job architecture using Horizon, batching, retries, and idempotent handlers",
          "Rescue work on inherited codebases: N+1 elimination, index tuning, and refactoring toward services",
        ],
      },
      {
        heading: "How the architecture is set up",
        body: "Controllers stay thin. Business rules live in dedicated action or service classes so they can be tested without booting HTTP. Database access goes through query objects or repositories where the query is non-trivial, and every write path that touches money or external systems is idempotent. Caching is layered: Redis for hot reads, tagged invalidation on write, and database indexes designed from the actual slow query log rather than guesses.",
      },
      {
        heading: "Performance work",
        body: "The first pass on any slow Laravel app is measurement, not rewriting. I profile with Telescope or Clockwork, read the MySQL slow query log, and fix in order of cost: missing indexes, N+1 queries, unbounded eager loads, synchronous work that belongs in a queue, and only then application-level caching. Most Laravel apps that feel slow are three indexes and two queued jobs away from being fast.",
      },
      {
        heading: "Delivery and handover",
        body: "Every project ships with a CI pipeline running tests and static analysis, environment-based configuration, database migrations that run forward cleanly, and a README that explains how to run, deploy, and debug the system. You own the code and the knowledge, not just a running server.",
      },
    ],
    faqs: [
      {
        q: "Can you take over an existing Laravel codebase?",
        a: "Yes. Inherited codebases are a large share of my work. The first week is an audit: dependency and version state, test coverage, slow queries, security gaps, and deployment risk. You get a written report and a prioritized plan before any refactor starts.",
      },
      {
        q: "Do you write tests?",
        a: "Yes. Feature tests cover the paths that matter, such as billing, auth, and any integration with an external service. I aim for confident deploys rather than a coverage percentage.",
      },
      {
        q: "What Laravel versions do you work with?",
        a: "Current LTS and latest stable versions for new builds. For legacy applications I have upgraded projects from Laravel 5.x forward, step by step, keeping the app deployable at each stage.",
      },
    ],
  },
  {
    slug: "voip-asterisk",
    name: "VoIP & Asterisk",
    eyebrow: "Real-time communication",
    title: "VoIP, Asterisk & Call Platform Engineering",
    metaTitle: "Asterisk & VoIP Development — Call Center Platform Engineer | Usama Munawar",
    metaDescription:
      "Asterisk and FreePBX call platforms: predictive dialers, IVR trees, SIP trunk failover, call recording, and CRM integration built on Laravel backends.",
    intro:
      "Call platforms fail loudly. I build Asterisk and FreePBX systems where the dialer keeps dialing, the IVR routes correctly under load, and a dead SIP trunk fails over before the operations team notices.",
    outcomes: [
      { value: "Predictive", label: "Dialer architecture" },
      { value: "Multi-trunk", label: "SIP failover" },
      { value: "Laravel", label: "CRM integration layer" },
    ],
    stack: ["Asterisk", "FreePBX", "SIP", "AMI / ARI", "AGI", "Laravel", "Redis", "WebRTC"],
    sections: [
      {
        heading: "What I build",
        body: "Voice infrastructure that a call center actually runs its day on, wired into the business systems that need the data.",
        bullets: [
          "Predictive and progressive dialers with pacing, abandonment control, and agent state tracking",
          "IVR trees with database-driven menus, time conditions, and queue overflow rules",
          "SIP trunk provisioning with health checks and automatic failover between carriers",
          "Call recording, storage lifecycle, and searchable CDR reporting inside a Laravel dashboard",
        ],
      },
      {
        heading: "Why the control layer matters",
        body: "Asterisk is excellent at moving audio and poor at being a business system. I keep dialplan logic minimal and push decisions into a Laravel service that talks to Asterisk over AMI or ARI. Campaign rules, lead ordering, compliance windows, and agent assignment all live in code that is testable and versioned, which means changing a routing rule does not mean editing a dialplan on a production box at midnight.",
      },
      {
        heading: "Reliability under load",
        body: "Real-time systems fail differently from web apps. I monitor channel counts, registration state, and trunk latency, and design for the specific failure modes that matter: a carrier that starts returning 503s, a queue that grows faster than agents can drain it, and recording storage that fills up. Alerts fire on trend, not just on outage.",
      },
      {
        heading: "Integration with the rest of the business",
        body: "Calls are only useful when the data lands somewhere. CDRs, recordings, dispositions, and agent metrics sync into the CRM or reporting warehouse through queued jobs with retries, so a temporary API outage never loses a call record.",
      },
    ],
    faqs: [
      {
        q: "Asterisk or a hosted provider like Twilio?",
        a: "Volume decides it. Below roughly 20,000 minutes a month, a hosted provider is usually cheaper once engineering time is counted. Above that, and especially with a predictive dialer, self-hosted Asterisk on your own SIP trunks becomes dramatically cheaper. I have written a full cost breakdown of this on the blog.",
      },
      {
        q: "Can you integrate a dialer with my existing CRM?",
        a: "Yes. If the CRM has an API or a database I can reach, leads flow out and dispositions flow back through a queued sync layer with retries and conflict handling.",
      },
      {
        q: "Do you handle compliance requirements?",
        a: "I implement the technical controls: calling-window enforcement by timezone, do-not-call list checks before dialing, abandonment rate limits, and recording consent prompts. Legal interpretation stays with your compliance team.",
      },
    ],
  },
  {
    slug: "automation-n8n",
    name: "Automation Infrastructure",
    eyebrow: "Workflow automation",
    title: "n8n Automation & Back-Office Infrastructure",
    metaTitle: "n8n Automation Services — Workflow & Back-Office Automation | Usama Munawar",
    metaDescription:
      "n8n workflow automation and custom pipelines that replace manual back-office work. Reliable integrations, retries, monitoring, and Laravel-backed business logic.",
    intro:
      "Manual back-office work is expensive and quietly error-prone. I build automation that survives contact with reality: retries, idempotency, alerting, and an audit trail of every run.",
    outcomes: [
      { value: "n8n", label: "Self-hosted pipelines" },
      { value: "Queued", label: "Retry & idempotency" },
      { value: "Audited", label: "Every run logged" },
    ],
    stack: ["n8n", "Laravel Queues", "Webhooks", "REST APIs", "Redis", "PostgreSQL", "Docker"],
    sections: [
      {
        heading: "What gets automated",
        body: "The work worth automating is repetitive, rule-based, and currently done by a person copying data between systems.",
        bullets: [
          "Lead and order routing between CRM, billing, and fulfilment systems",
          "Invoice generation, reconciliation, and payment status syncing",
          "Document and report generation on a schedule, delivered to email or storage",
          "Internal alerting pipelines that route the right event to the right channel",
        ],
      },
      {
        heading: "n8n or custom code",
        body: "n8n wins when the workflow is integration-shaped: move data between five APIs, transform it lightly, and let a non-engineer see what ran. Custom code wins when the logic is genuinely complex, needs transactional guarantees, or runs at high volume where per-execution overhead matters. Most real systems are a hybrid, with n8n orchestrating and a Laravel endpoint owning the hard business rules.",
      },
      {
        heading: "Making automation trustworthy",
        body: "Automation that silently fails is worse than no automation. Every workflow I build is idempotent on its write operations, retries transient failures with backoff, dead-letters what it cannot process, and reports failures to a channel a human actually reads. Execution history is retained so any disputed record can be traced back to the run that created it.",
      },
      {
        heading: "Hosting and ownership",
        body: "I deploy self-hosted n8n in Docker with backups and version-controlled workflow exports, so your automation is not locked to a vendor account and can be restored or moved.",
      },
    ],
    faqs: [
      {
        q: "How long does a typical automation project take?",
        a: "A single well-defined workflow is usually a few days. A back-office automation program covering several processes with monitoring and handover is typically two to four weeks.",
      },
      {
        q: "Can you host n8n for us?",
        a: "I set up self-hosted n8n on your infrastructure with Docker, backups, and access control. You own the server and the data.",
      },
      {
        q: "What if an API we depend on changes?",
        a: "Workflows are built with explicit error branches and alerting, so a breaking API change surfaces as a notification rather than a silent gap in your data.",
      },
    ],
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    eyebrow: "AI & LLM systems",
    title: "AI & LLM Integration for Real Products",
    metaTitle: "AI Integration Services — LLM, RAG & Agent Systems | Usama Munawar",
    metaDescription:
      "Practical AI integration: RAG over your own data, LLM-backed support and agent workflows, streaming APIs, cost control, and evaluation, wired into Laravel backends.",
    intro:
      "AI features are only useful when they are grounded, fast, and cheap enough to run at your volume. I build LLM systems that answer from your data, degrade gracefully, and have a bill you can predict.",
    outcomes: [
      { value: "RAG", label: "Grounded in your data" },
      { value: "Streaming", label: "Sub-second first token" },
      { value: "Budgeted", label: "Per-tenant cost control" },
    ],
    stack: ["OpenAI / Gemini", "Vector search", "pgvector", "Laravel", "Edge Functions", "Redis", "Streaming APIs"],
    sections: [
      {
        heading: "What I build",
        body: "AI that is a feature of a product, not a demo. Everything ships behind an API with auth, rate limits, and logging.",
        bullets: [
          "Retrieval-augmented answers over documentation, tickets, catalogues, or internal knowledge",
          "Support and lead-qualification assistants that hand off to a human with full context",
          "Agent workflows that call your own tools and APIs with validated inputs and outputs",
          "Classification, extraction, and summarisation pipelines running as queued batch jobs",
        ],
      },
      {
        heading: "Retrieval before generation",
        body: "Hallucination is usually a retrieval problem, not a model problem. I invest in chunking strategy, embedding choice, hybrid keyword plus vector search, and reranking before touching prompt wording. When the right context reaches the model, a smaller and cheaper model often outperforms a larger one on a bad retrieval pipeline.",
      },
      {
        heading: "Cost, latency, and failure",
        body: "Prompts are cached where they repeat, responses stream so the interface feels instant, and model choice is routed by task so cheap requests never hit an expensive model. Every call has a timeout, a fallback model, and a per-tenant budget cap, so one runaway loop cannot produce a surprise invoice.",
      },
      {
        heading: "Evaluation",
        body: "Before an AI feature goes live, it is scored against a fixed set of real questions with expected answers. That suite runs again on every prompt or model change, so improvements are measured rather than assumed.",
      },
    ],
    faqs: [
      {
        q: "Which models do you work with?",
        a: "Whichever fits the task and budget, typically the OpenAI and Google Gemini families, routed per task. Systems are built behind an abstraction so swapping a model is a configuration change rather than a rewrite.",
      },
      {
        q: "Will our data be used to train a model?",
        a: "No. Integrations use API tiers that exclude training on submitted data, and sensitive fields are redacted before they leave your infrastructure where the use case allows it.",
      },
      {
        q: "Can AI features run inside our existing Laravel app?",
        a: "Yes. The usual shape is a Laravel service or an edge function exposing a streaming endpoint, with retrieval backed by pgvector or a managed vector store.",
      },
    ],
  },
];

export const getService = (slug?: string) => servicesData.find((s) => s.slug === slug);
