import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/system/Reveal";
import { transition } from "@/lib/motion";

interface Tech {
  name: string;
  /** Where it is actually used in this body of work — not a proficiency score. */
  uses: string[];
}

interface Group {
  id: string;
  label: string;
  /** Domain hue from the family in index.css. Colour identifies the domain,
      so the same hue follows these tools into the services and case studies. */
  hue: string;
  items: Tech[];
}

const GROUPS: Group[] = [
  {
    id: "backend",
    hue: "var(--hue-backend)",
    label: "Backend",
    items: [
      { name: "Laravel", uses: ["Multi-tenant SaaS", "Queue architecture", "Domain actions"] },
      { name: "PHP 8.3", uses: ["Typed services", "Enums · readonly", "Pest / PHPUnit"] },
      { name: "MySQL", uses: ["Index tuning", "Slow query analysis", "Schema design"] },
      { name: "PostgreSQL", uses: ["pgvector search", "JSONB payloads", "Row-level rules"] },
      { name: "Redis", uses: ["Queues", "Caching", "Real-time state", "Rate limiting"] },
      { name: "Node.js", uses: ["Socket services", "Edge functions", "Tooling"] },
    ],
  },
  {
    id: "ai",
    hue: "var(--hue-ai)",
    label: "AI & agents",
    items: [
      { name: "RAG", uses: ["Hybrid retrieval", "Semantic chunking", "Citation grounding"] },
      { name: "LangChain", uses: ["Agent graphs", "Tool calling", "Reviewer chains"] },
      { name: "Claude / GPT-4", uses: ["Structured output", "Scoring rubrics", "Drafting"] },
      { name: "Pinecone", uses: ["Vector index", "Hybrid search", "Knowledge bases"] },
      { name: "pgvector", uses: ["In-database vectors", "Cheaper retrieval"] },
      { name: "MCP", uses: ["Agent tooling", "Workflow bridges"] },
    ],
  },
  {
    id: "automation",
    hue: "var(--hue-automation)",
    label: "Automation",
    items: [
      { name: "n8n", uses: ["Lead pipelines", "Approval gates", "Self-hosted workflows"] },
      { name: "Webhooks", uses: ["Multi-source ingest", "CRM sync", "Idempotent handlers"] },
      { name: "Cron / queues", uses: ["Scheduled jobs", "Batching", "Retry policy"] },
      { name: "ETL", uses: ["Data normalisation", "Enrichment", "Dead-letter queues"] },
    ],
  },
  {
    id: "realtime",
    hue: "var(--hue-realtime)",
    label: "Real-time & VoIP",
    items: [
      { name: "Asterisk", uses: ["Dialplan", "AGI scripting", "Predictive dialer"] },
      { name: "FreePBX", uses: ["Call centre setup", "Extensions", "Recording"] },
      { name: "SIP", uses: ["Trunking", "Failover", "Carrier integration"] },
      { name: "Laravel Reverb", uses: ["Broadcasting", "Presence channels"] },
      { name: "WebSockets", uses: ["Live dashboards", "Agent state", "Chat"] },
    ],
  },
  {
    id: "cloud",
    hue: "var(--hue-cloud)",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", uses: ["Load balancing", "S3 · SES", "Deployment"] },
      { name: "Docker", uses: ["Reproducible envs", "Build pipeline"] },
      { name: "CI/CD", uses: ["Tests + analysis", "Zero-downtime release"] },
      { name: "Nginx", uses: ["Reverse proxy", "TLS", "Caching"] },
      { name: "Monitoring", uses: ["Error tracking", "Health checks", "Alerting"] },
    ],
  },
  {
    id: "frontend",
    hue: "var(--hue-interface)",
    label: "Interface",
    items: [
      { name: "React", uses: ["Dashboards", "Case-study tooling"] },
      { name: "Next.js", uses: ["SaaS front ends", "SEO surfaces"] },
      { name: "TypeScript", uses: ["Typed API clients", "Shared contracts"] },
      { name: "Livewire", uses: ["Laravel-native UI", "Fast internal tools"] },
      { name: "Tailwind", uses: ["Design systems", "Consistent spacing"] },
    ],
  },
];

/**
 * Technology matrix.
 *
 * A logo wall says "I have heard of these". This says where each tool actually
 * sits in the work — which is the question a technical buyer is really asking.
 */
const TechMatrix = () => {
  const [group, setGroup] = useState(GROUPS[0].id);
  const [tech, setTech] = useState<Tech | null>(null);
  const activeGroup = GROUPS.find((g) => g.id === group) ?? GROUPS[0];

  return (
    <section
      className="wash band band-edge relative py-24 lg:py-32"
      style={{ "--hue": activeGroup.hue } as CSSProperties}
    >
      <div className="container mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mono-label text-hue">Stack</span>
              <h2 className="type-h3 mt-4 max-w-lg text-foreground">
                The tools, and where they actually sit.
              </h2>
            </div>

            {/* group switcher */}
            <div
              role="tablist"
              aria-label="Technology categories"
              className="scroll-x no-scrollbar -mx-1 flex max-w-full gap-1 px-1"
            >
              {GROUPS.map((g) => {
                const on = g.id === group;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setGroup(g.id);
                      setTech(null);
                    }}
                    style={{ "--hue": g.hue } as CSSProperties}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-inter text-[13px] transition-colors duration-standard ${
                      on
                        ? "border-hue bg-hue-soft text-foreground"
                        : "border-hairline/[0.09] text-muted-foreground hover:border-hairline/[0.18] hover:text-foreground"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-hue transition-opacity duration-standard"
                      style={{ opacity: on ? 1 : 0.5 }}
                    />
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* matrix */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeGroup.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transition.standard}
                className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] sm:grid-cols-3"
              >
                {activeGroup.items.map((t) => {
                  const on = tech?.name === t.name;
                  return (
                    <li key={t.name}>
                      <button
                        type="button"
                        onMouseEnter={() => setTech(t)}
                        onFocus={() => setTech(t)}
                        onClick={() => setTech(on ? null : t)}
                        className={`flex h-full w-full flex-col items-start gap-1.5 px-4 py-4 text-left transition-colors duration-standard ${
                          on ? "bg-hue-soft" : "bg-surface-1 hover:bg-surface-2"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className={`h-1 w-1 rounded-full transition-colors duration-standard ${
                              on ? "bg-hue" : "bg-subtle"
                            }`}
                          />
                          <span className="font-inter text-[13.5px] font-medium tracking-tight text-foreground">
                            {t.name}
                          </span>
                        </span>
                        <span className="mono-tiny text-subtle">
                          {t.uses.length} contexts
                        </span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* detail panel */}
          <div className="lg:col-span-5">
            <div className="panel h-full min-h-[11rem] rounded-lg p-6" aria-live="polite">
              <AnimatePresence mode="wait">
                {tech ? (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={transition.standard}
                  >
                    <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-hue">
                      {tech.name}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {tech.uses.map((u) => (
                        <li
                          key={u}
                          className="flex items-start gap-3 font-inter text-[13.5px] leading-snug text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-px w-3 shrink-0 bg-hue opacity-70"
                          />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition.micro}
                    className="font-inter text-[13.5px] leading-relaxed text-subtle"
                  >
                    Select a technology to see where it appears in the work.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMatrix;
