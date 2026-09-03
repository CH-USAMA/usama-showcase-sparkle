import type { FlowStage } from "@/components/system/ArchitectureFlow";
import imgCallPortal from "@/assets/project-callportal.webp";
import imgClinic from "@/assets/project-clinic.webp";
import imgLeadEngine from "@/assets/project-leadengine.webp";
import imgRag from "@/assets/project-rag.webp";
import imgInteriors from "@/assets/project-interiors.webp";
import imgContentOps from "@/assets/project-contentops.webp";

export interface CaseStudy {
  id: string;
  n: string;
  category: string;
  /** Domain hue from the family in index.css — the same hue this domain
      carries in the stack matrix and the service list. */
  hue: string;
  title: string;
  /**
   * Headline outcome, quoted verbatim from this project's canonical entry in
   * projects.ts. Optional on purpose: a dossier with no verifiable figure runs
   * without one rather than borrowing a number from a different claim.
   */
  metric?: { value: string; label: string };
  image: string;
  client?: string;
  year?: string;
  role: string;
  problem: string;
  approach: string;
  result: string;
  /** Restatement of the stack as a request path — no new claims, just structure. */
  flow: FlowStage[];
  stack: string[];
  liveUrl?: string;
  /** Route into the existing detail page where one exists. */
  detailPath?: string;
}

/**
 * Six systems, restructured from the existing portfolio entries into
 * problem → architecture → result.
 *
 * Every `metric` below is quoted verbatim from the same project's `results`
 * array in projects.ts. Three were corrected after an audit found they were not:
 *
 * - Call Portal read "70% / Faster call routing". No 70% figure exists anywhere
 *   in the repository, and projects.ts records no routing measurement. Replaced
 *   with "30% improvement in lead conversion", which is canonical for project 4
 *   and answers the dropped-leads problem this dossier actually describes.
 * - iSmart Clinic read "40% / More patient retention". iSmart has no entry in
 *   projects.ts at all, so there was no source to check it against and no
 *   substitute to fall back on. The metric is removed; the architecture carries
 *   the dossier.
 * - Focus Interiors read "35% / Conversion lift". The number is right but the
 *   claim was not: projects.ts records "35% increase in client inquiries".
 *   Inquiries are not conversions, so the label now matches the source.
 *
 * The other three were verified and left alone: 94% accuracy is corroborated in
 * projects.ts and in blogs.ts, 85% and 10x match their canonical wording.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "call-portal",
    n: "01",
    category: "VoIP infrastructure",
    hue: "var(--hue-realtime)",
    title: "Solutions Zilla Call Portal",
    metric: { value: "30%", label: "Improvement in lead conversion" },
    image: imgCallPortal,
    client: "Solutions Zilla",
    year: "2025",
    role: "Architecture · Backend · Telephony",
    problem:
      "Manual call routing across 40+ agents caused dropped leads and inconsistent SLAs. Nobody could see queue state in real time, so supervisors were reacting to problems after the customer had already hung up.",
    approach:
      "A Laravel dispatch engine sitting on top of Asterisk: AGI scripts drive the dialplan, Redis holds live queue and agent state, and WebSockets push that state to a supervisor dashboard. CRM webhooks close the loop so every call lands against a record.",
    result:
      "Routing decisions that used to wait on a human now happen in the dialplan, and supervisors see queue state as it changes rather than in a next-day report.",
    flow: [
      { label: "SIP trunk", note: "Inbound" },
      { label: "Asterisk", note: "AGI dialplan" },
      { label: "Laravel", note: "Dispatch rules" },
      { label: "Redis", note: "Queue state" },
      { label: "WebSocket", note: "Live board" },
      { label: "CRM", note: "Webhooks" },
    ],
    stack: ["Laravel", "Asterisk", "MySQL", "Redis", "WebSockets"],
    liveUrl: "https://call.solutionszilla.com",
    detailPath: "/project/4",
  },
  {
    id: "clinic",
    n: "02",
    category: "Healthcare SaaS",
    hue: "var(--hue-backend)",
    title: "iSmart Clinic",
    image: imgClinic,
    role: "Multi-tenant architecture · Automation",
    problem:
      "Clinics were losing patients to no-shows and burning staff hours on manual billing reconciliation, with no reliable trail of who changed what.",
    approach:
      "A multi-tenant Laravel backend with strict per-clinic isolation, WhatsApp appointment automation for reminders and confirmations, role-based access, and event-sourced audit logs behind a Next.js front end.",
    result:
      "Reminders and confirmations run without staff involvement, and every billing change is attributable through the audit log.",
    flow: [
      { label: "Booking", note: "Web · WhatsApp" },
      { label: "Tenant scope", note: "Per clinic" },
      { label: "Scheduler", note: "Queued jobs" },
      { label: "WhatsApp API", note: "Reminders" },
      { label: "Audit log", note: "Event-sourced" },
    ],
    stack: ["Next.js", "Laravel", "PostgreSQL", "WhatsApp API", "Multi-tenant"],
    liveUrl: "https://solutionzilla.ismart.link",
  },
  {
    id: "rag-legal",
    n: "03",
    category: "AI retrieval",
    hue: "var(--hue-ai)",
    title: "RAG-Powered Legal Assistant",
    metric: { value: "94%", label: "Query accuracy" },
    image: imgRag,
    client: "Legal tech startup",
    year: "2025",
    role: "Retrieval architecture · Evaluation",
    problem:
      "Generic LLM answers invented case law and misread precedent. The firm could not adopt the tool until every answer was traceable back to a source document.",
    approach:
      "Semantic chunking that respects section boundaries, hybrid retrieval over vector and BM25 indexes, cross-encoder reranking, then generation under a prompt that requires citations. A separate validation pass flags any claim the retrieved context does not support.",
    result:
      "Measured accuracy rose from 67% with naive vector-only retrieval to 94% on a held-out question set, with citations becoming the most-used feature of the interface.",
    flow: [
      { label: "Question", note: "Legal query" },
      { label: "Hybrid search", note: "Vector + BM25" },
      { label: "Rerank", note: "Cross-encoder" },
      { label: "Generate", note: "Cited answer" },
      { label: "Validate", note: "Claim check" },
    ],
    stack: ["Python", "FastAPI", "Pinecone", "LangChain", "React"],
    detailPath: "/project/3",
  },
  {
    id: "lead-engine",
    n: "04",
    category: "Automation infrastructure",
    hue: "var(--hue-automation)",
    title: "Smart Lead Qualification Engine",
    metric: { value: "85%", label: "Less qualification time" },
    image: imgLeadEngine,
    client: "B2B SaaS company",
    year: "2025",
    role: "Workflow architecture · Integrations",
    problem:
      "A sales team spent six hours a day triaging inbound leads by hand. Leads arrived from forms, email, paid campaigns, and partners with no shared scoring model, so high-fit prospects queued behind noise.",
    approach:
      "An n8n pipeline ingests every source through webhooks, enriches each lead with company data, and scores it against an ideal-customer profile with a written rationale. High scores route to CRM and Slack with a briefing; the rest enter nurture. Idempotent throughout, with retries and a dead-letter queue.",
    result:
      "Triage stopped being a person's job. Leads are scored and briefed within minutes of submission, and the pipeline runs unattended.",
    flow: [
      { label: "Ingest", note: "Multi-source" },
      { label: "Enrich", note: "Company data" },
      { label: "Score", note: "LLM + ICP" },
      { label: "Route", note: "CRM · Slack" },
      { label: "Retry / DLQ", note: "Failure path" },
    ],
    stack: ["n8n", "OpenAI", "PostgreSQL", "HubSpot API", "Sentry"],
    detailPath: "/project/2",
  },
  {
    id: "contentops",
    n: "05",
    category: "AI agents",
    hue: "var(--hue-ai)",
    title: "AI Content Operations Pipeline",
    metric: { value: "10x", label: "Content throughput" },
    image: imgContentOps,
    client: "SaaS startup (NDA)",
    year: "2025",
    role: "Agent orchestration · Observability",
    problem:
      "A content team spent 20+ hours a week on articles and landing copy that still had to clear brand, legal, and SEO review, a bottleneck that delayed campaigns by days.",
    approach:
      "A LangChain agent graph splits the work into verifiable stages: research grounded in a Pinecone knowledge base, drafting against a structured output schema, then a reviewer agent scoring brand voice, accuracy, and SEO. n8n owns scheduling and human approval gates; low-scoring drafts route to an editor instead of publishing.",
    result:
      "Routine content moved from a multi-day cycle to under an hour, with every run logged from brief to reviewer score to final action.",
    flow: [
      { label: "Brief", note: "Orchestrator" },
      { label: "Research", note: "RAG · Pinecone" },
      { label: "Draft", note: "Structured output" },
      { label: "Review", note: "Scored rubric" },
      { label: "Gate", note: "Human approval" },
      { label: "Publish", note: "CMS API" },
    ],
    stack: ["LangChain", "GPT-4", "n8n", "Pinecone", "Supabase"],
    detailPath: "/project/1",
  },
  {
    id: "interiors",
    n: "06",
    category: "Commerce",
    hue: "var(--hue-interface)",
    title: "Focus Interiors",
    metric: { value: "35%", label: "Increase in client inquiries" },
    image: imgInteriors,
    client: "Focus Interiors",
    year: "2024",
    role: "Headless architecture · Performance",
    problem:
      "A luxury catalogue with poor product discoverability and low conversion. High-intent visitors could not find the piece they came for.",
    approach:
      "Migration to a headless stack with AI-assisted search and recommendations, automated metadata generation for the catalogue, and a Core Web Vitals pass on image delivery and rendering.",
    result:
      "Discovery improved without sacrificing the visual quality the brand depends on, and the storefront got measurably faster.",
    flow: [
      { label: "Catalogue", note: "Source of truth" },
      { label: "Index", note: "AI search" },
      { label: "Storefront", note: "Headless" },
      { label: "Edge", note: "Cached render" },
      { label: "Checkout", note: "Conversion" },
    ],
    stack: ["Shopify", "React", "OpenAI", "Edge Functions"],
    liveUrl: "https://focusinteriors.com.pk",
    detailPath: "/project/5",
  },
];
