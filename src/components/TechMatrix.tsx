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

/**
 * Five groups, ordered as layers of one system rather than as six unrelated
 * skill buckets. The previous set opened with "Backend" and filed Node.js
 * inside it, then closed with an "Interface" group of React and Tailwind,
 * which read as a full-stack CV. Node.js and TypeScript now own the real-time
 * layer they actually serve, and the front-end tools sit there too because
 * that is what they are: the delivery surface of those services.
 *
 * Every entry says what it is used for. Nothing here is a proficiency score.
 */
const GROUPS: Group[] = [
  {
    id: "backend",
    hue: "var(--hue-backend)",
    label: "Backend systems",
    items: [
      { name: "Laravel", uses: ["Multi-tenant SaaS", "Queue architecture", "Domain actions"] },
      { name: "PHP 8.3", uses: ["Typed services", "Enums · readonly", "Pest / PHPUnit"] },
      { name: "APIs", uses: ["Versioned REST", "GraphQL", "Third-party contracts"] },
      { name: "MySQL", uses: ["Index tuning", "Slow query analysis", "Schema design"] },
      { name: "PostgreSQL", uses: ["pgvector search", "JSONB payloads", "Row-level rules"] },
      { name: "Redis", uses: ["Queues", "Caching", "Real-time state", "Rate limiting"] },
    ],
  },
  {
    id: "realtime",
    hue: "var(--hue-realtime)",
    label: "Real-time & services",
    items: [
      { name: "Node.js", uses: ["Socket services", "Event-driven work", "Integrations"] },
      { name: "TypeScript", uses: ["Typed API clients", "Shared contracts"] },
      { name: "WebSockets", uses: ["Live dashboards", "Agent state", "Chat"] },
      { name: "Laravel Reverb", uses: ["Broadcasting", "Presence channels"] },
      { name: "Next.js", uses: ["Service front ends", "SEO surfaces"] },
    ],
  },
  {
    id: "ai",
    hue: "var(--hue-ai)",
    label: "AI & intelligence",
    items: [
      { name: "Python", uses: ["Retrieval pipelines", "Data processing", "Evaluation"] },
      { name: "RAG", uses: ["Hybrid retrieval", "Semantic chunking", "Citation grounding"] },
      { name: "LangChain", uses: ["Agent graphs", "Tool calling", "Reviewer chains"] },
      { name: "Claude / GPT-4", uses: ["Structured output", "Scoring rubrics", "Drafting"] },
      { name: "pgvector", uses: ["In-database vectors", "Cheaper retrieval"] },
      { name: "MCP", uses: ["Agent tooling", "Workflow bridges"] },
    ],
  },
  {
    id: "comms",
    hue: "var(--hue-interface)",
    label: "Communication",
    items: [
      { name: "Asterisk", uses: ["Dialplan", "AGI scripting", "Predictive dialer"] },
      { name: "SIP", uses: ["Trunking", "Failover", "Carrier integration"] },
      { name: "FreePBX", uses: ["Call centre setup", "Extensions", "Recording"] },
      { name: "WebRTC", uses: ["Browser calling", "Media negotiation"] },
    ],
  },
  {
    id: "infra",
    hue: "var(--hue-cloud)",
    label: "Automation & infrastructure",
    items: [
      { name: "n8n", uses: ["Lead pipelines", "Approval gates", "Self-hosted workflows"] },
      { name: "Webhooks", uses: ["Multi-source ingest", "CRM sync", "Idempotent handlers"] },
      { name: "Docker", uses: ["Reproducible envs", "Build pipeline"] },
      { name: "CI/CD", uses: ["Tests + analysis", "Zero-downtime release"] },
      { name: "AWS", uses: ["Load balancing", "S3 · SES", "Deployment"] },
      { name: "Monitoring", uses: ["Error tracking", "Health checks", "Alerting"] },
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
              {/* Chip, matching SectionHeader everywhere else on the page. */}
              <span className="chip-hue">
                <span className="mono-tiny tabular-nums opacity-70">05</span>
                <span className="mono-label">Stack</span>
              </span>
              <h2 className="type-h3 mt-5 max-w-lg text-foreground">
                Five layers, and what runs each one.
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
