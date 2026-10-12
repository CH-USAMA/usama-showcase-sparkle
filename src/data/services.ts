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
  /** Where the page lives when it is not under /services (side offers). */
  path?: string;
  name: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  outcomes: { value: string; label: string }[];
  /** Domain hue from the family in index.css. */
  hue: string;
  stack: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  /** Side card and closing section copy, where the engineering defaults do not fit the reader. */
  pitch?: { title: string; text: string; heading: string; accent: string; lead: string };
}

export const servicesData: Service[] = [
  {
    slug: "laravel-development",
    hue: "var(--hue-backend)",
    name: "Laravel Development",
    eyebrow: "Laravel & PHP",
    title: "Laravel Development for Production SaaS Backends",
    metaTitle: "Laravel Development Services | Usama Munawar",
    metaDescription:
      "Senior Laravel development for multi-tenant SaaS, APIs, queues, and billing. Production-grade PHP and MySQL architecture with tests, CI/CD, and handover.",
    intro:
      "I build and rescue Laravel applications that carry real traffic, real money, and real teams. Multi-tenant SaaS, billing, RBAC, queue-heavy pipelines, and APIs that other companies depend on.",
    outcomes: [
      { value: "Typed", label: "Action classes and tests" },
      { value: "Queued", label: "Idempotent write paths" },
      { value: "Indexed", label: "Slow-query pass" },
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
    hue: "var(--hue-realtime)",
    name: "VoIP & Asterisk",
    eyebrow: "Real-time communication",
    title: "VoIP, Asterisk & Call Platform Engineering",
    metaTitle: "Asterisk & VoIP Call Center Development | Usama Munawar",
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
    hue: "var(--hue-automation)",
    name: "Automation Infrastructure",
    eyebrow: "Workflow automation",
    title: "n8n Automation & Back-Office Infrastructure",
    metaTitle: "n8n Automation & Workflow Services | Usama Munawar",
    metaDescription:
      "n8n workflows and custom pipelines that replace manual back-office work, with reliable integrations, retries, monitoring and Laravel-backed business logic.",
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
    hue: "var(--hue-ai)",
    name: "AI Integration",
    eyebrow: "AI & LLM systems",
    title: "AI & LLM Integration for Real Products",
    metaTitle: "AI, LLM & RAG Integration Services | Usama Munawar",
    metaDescription:
      "Practical AI integration: RAG over your data, LLM support and agent workflows, streaming APIs, cost control and evaluation, wired into Laravel backends.",
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
  {
    slug: "mvp-development",
    hue: "var(--hue-interface)",
    name: "Idea to Launch (MVP)",
    eyebrow: "MVP development",
    title: "Idea to Launch: MVP Development, Shipped Fast",
    metaTitle: "MVP Development: From Idea to Launch | Usama Munawar",
    metaDescription:
      "Turn an idea into a working web or mobile app in weeks. AI-assisted MVP development with real auth, payments and deployment, reviewed by a senior engineer.",
    intro:
      "You have an idea and want to see it working, with real users, before spending months on it. I use AI tools to move fast and senior engineering to make sure what ships is secure, maintainable and yours.",
    outcomes: [
      { value: "Weeks", label: "To a first version real users can try" },
      { value: "AI-fast", label: "Built with Claude and Cursor, every line reviewed" },
      { value: "Yours", label: "Code, accounts and data in your name" },
    ],
    stack: ["React", "Next.js", "React Native", "Expo", "Laravel", "Node.js", "Supabase", "Stripe", "Vercel", "Claude / Cursor"],
    pitch: {
      title: "Have an idea to test?",
      text: "Bring it to a free 30-minute call and leave with a one-page scope and a realistic timeline, whether or not we work together.",
      heading: "Have an idea worth",
      accent: "testing?",
      lead: "Bring it however rough it is. We will cut it down to the first version worth building, and you will know what it takes before anything starts.",
    },
    sections: [
      {
        heading: "Who this is for",
        body: "Most people who come with an idea are in one of these places. All of them can have something real in front of users quickly.",
        bullets: [
          "Founders with an idea and no technical co-founder or team yet",
          "Businesses testing a new product or internal tool before committing a budget to it",
          "Teams running a process on spreadsheets and email that should be an app",
          "Anyone who started in Lovable, Bolt or v0 and now needs it to work in production",
        ],
      },
      {
        heading: "How it works",
        body: "The fastest projects are the ones with the smallest honest scope. We agree on the one workflow that proves the idea, ship that properly, and grow from there.",
        bullets: [
          "Free call: we turn the idea into a one-page scope, with what is in the first version and what waits",
          "A clickable prototype within days, so you can show it to users and change direction cheaply",
          "The real build: sign-in, database, payments, emails and an admin view, deployed on your accounts",
          "Launch and handover, then improvements based on what real users actually do",
        ],
      },
      {
        heading: "Fast, and still built to last",
        body: "AI tools now write much of the repetitive code, which is why a first version takes weeks rather than months. Speed is no longer the hard part; judgement is. I review everything the tools produce, set up sign-in, data access rules and payments the way a mature product would have them, and add tests on the paths that handle money or user data. The result is an MVP you can keep building on instead of one you have to rewrite.",
      },
      {
        heading: "Already have a prototype?",
        body: "AI app builders are good at a convincing first screen and weak at the parts that matter once real people sign up: security rules, secrets exposed in the browser, payments, emails, SEO and deployment. I take prototypes from Lovable, Bolt, v0 and similar tools and make them production ready, keeping what works and fixing what would break. This portfolio started in Lovable and runs in production today.",
      },
    ],
    faqs: [
      {
        q: "How fast can you build my MVP?",
        a: "It depends on scope. A focused first version with one core workflow is usually a matter of weeks. After the first call you get a written scope with a timeline, so you know before any work starts.",
      },
      {
        q: "How much does it cost?",
        a: "Each project is quoted as a fixed price for an agreed scope, so you are not paying for open-ended hours. The first call and the scope are free.",
      },
      {
        q: "Web app or mobile app?",
        a: "Either, or both. Web apps are built with React or Next.js, and iOS and Android apps with React Native and Expo from one codebase. For most ideas a web app is the quickest way to learn whether people want it.",
      },
      {
        q: "Do I own the code?",
        a: "Yes. The code lives in your repository and the app runs on accounts in your name, from hosting to payments, so you can continue with me, with another developer, or with your own team.",
      },
      {
        q: "What happens after launch?",
        a: "Most products keep improving in short cycles based on user feedback. If you would rather take it in-house, you get documentation and a handover call.",
      },
    ],
  },
];

/**
 * A side offer with its own page at /virtual-assistant. It stays out of
 * servicesData on purpose, so it is not listed among the engineering services
 * (their "Other services" rail, the /services ItemList), while the page
 * itself reuses the service layout.
 */
export const assistantService: Service = {
  slug: "virtual-assistant",
  path: "/virtual-assistant",
  hue: "var(--hue-automation)",
  name: "Virtual Assistant & Peer Developer",
  eyebrow: "Remote support",
  title: "Virtual Assistant and Peer Developer for Busy Founders",
  metaTitle: "Virtual Assistant & Peer Developer | Usama Munawar",
  metaDescription:
    "Remote help for founders and small teams: customer support, content and social media, website updates, and a fellow developer to pair with, sped up by AI.",
  intro:
    "An extra pair of hands that understands both the business and the code. I answer your customers, keep your content and website moving, and work alongside your developers as a peer, using AI tools to get more done in each hour.",
  outcomes: [
    { value: "Support", label: "Customer replies handled in your tone" },
    { value: "Content", label: "Posts, pages and updates published on time" },
    { value: "Peer dev", label: "A second developer for fixes, reviews and pairing" },
  ],
  stack: ["Email & live chat", "Social media", "WordPress", "WooCommerce", "Shopify", "GitHub", "n8n", "Claude / ChatGPT"],
  pitch: {
    title: "Want a hand with this?",
    text: "Tell me what keeps taking up your week on a free 30-minute call, and leave knowing what you could hand over.",
    heading: "Need an extra pair of",
    accent: "hands?",
    lead: "Tell me what keeps pulling you away from the work only you can do. We will work out what I can take over and how we would start.",
  },
  sections: [
    {
      heading: "What I can take off your plate",
      body: "Pick the work that keeps pulling you away from the parts of the business only you can do.",
      bullets: [
        "Customer support: replying to emails, chats and messages in your voice, and passing on what needs you",
        "Content and social media: drafting and scheduling posts, writing product descriptions, keeping pages current",
        "Website updates: new pages, product changes and fixes on WordPress, WooCommerce or Shopify",
        "Peer programming: bug fixes, small features, code reviews and pairing sessions with your developers",
      ],
    },
    {
      heading: "An assistant who can also read the code",
      body: "When a support message is really a bug, I can find it, reproduce it and often fix it, instead of forwarding it and waiting. When the same task comes up every week, I can automate it with n8n or a small script, so your hours go further each month. It is the difference between delegating tasks and delegating problems.",
    },
    {
      heading: "Working as your fellow developer",
      body: "For teams that need another developer rather than an assistant, I join your repository, follow your conventions and review process, and take tickets like any other team member. It also works for solo founders who code: a second pair of eyes on pull requests, someone to pair with on a tricky feature, and a person to ask before an architecture decision becomes expensive.",
    },
    {
      heading: "How we work together",
      body: "We start with a short call and a list of what you want handled. You give me my own logins with only the access the work needs, never your personal password. Early on, anything that goes out in your name gets your approval first; once the tone is right, you decide what I can send on my own. You get regular written updates at whatever rhythm suits you.",
    },
    {
      heading: "AI that speeds things up, with a human check",
      body: "AI tools draft replies, summarise long threads and write first versions, which is how more fits into each hour. I read and edit everything before it reaches a customer or goes live, and your customers' personal data is not pasted into tools that train on it.",
    },
  ],
  faqs: [
    {
      q: "What time zone do you work in?",
      a: "I am based in Lahore, Pakistan (UTC+5). Working hours are agreed up front so they overlap with yours, whether you are in Europe, the US or elsewhere.",
    },
    {
      q: "Hourly or monthly?",
      a: "Either: a set number of hours per week, or a monthly arrangement for ongoing work. We agree on it after the first call, once the tasks are clear.",
    },
    {
      q: "Can you mix assistant work and development?",
      a: "Yes, that is where this works best. A week might be customer replies and social posts on most days, plus a bug fix or a pull request review when your team needs one.",
    },
    {
      q: "Can I start small?",
      a: "Yes. Start with one area, such as your support inbox or your social media, and add more once you are comfortable with how I work.",
    },
  ],
};

export const servicePath = (s: Service) => s.path ?? `/services/${s.slug}`;

export const getService = (slug?: string) => servicesData.find((s) => s.slug === slug);

/** Side offers, each on its own route rather than /services/:slug. */
export const getSideService = (slug: string) => [assistantService].find((s) => s.slug === slug);
