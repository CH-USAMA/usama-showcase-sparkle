import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import { PLATFORM_PROOF } from "@/data/site";

/**
 * Entries are derived from the completion dates already recorded against each
 * project, grouped by year. Nothing is dated speculatively.
 */
const LOG = [
  {
    year: "2026",
    focus: "AI systems · agent tooling",
    entries: [
      "Writing on backend architecture, VoIP economics, and where automation platforms stop paying off",
      "RAG and agent integrations wired into existing Laravel and Node backends",
    ],
  },
  {
    year: "2025",
    focus: "VoIP · automation · retrieval",
    entries: [
      "Solutions Zilla Call Portal — Asterisk dispatch for a 40+ agent floor",
      "RAG-powered legal assistant — hybrid retrieval with citation validation",
      "Smart lead qualification engine — n8n orchestration with scoring and DLQ",
      "AI content operations pipeline — LangChain agent graph with approval gates",
      "Jabulani hardware store — Stripe checkout and catalogue search",
    ],
  },
  {
    year: "2024",
    focus: "Commerce · booking platforms",
    entries: [
      "Focus Interiors — headless commerce migration with AI-assisted search",
      "Five Stars Galway — booking and dispatch with route optimisation",
    ],
  },
  {
    year: "2023",
    focus: "Foundations",
    entries: ["Solutions Zilla Digital — service platform and lead infrastructure"],
  },
];

const CREDENTIALS = [
  "Top Rated Plus on Upwork — top 3% of freelancers",
  "Level 2 Seller on Fiverr with 89+ reviews",
  "Enterprise SaaS products serving 10K+ users",
  "Production Asterisk deployments for 40+ agent call centres",
  "Zero-downtime Laravel deploys with CI/CD on AWS and Vercel",
  "AI agents, RAG pipelines, and n8n automation in production",
];

const TrackRecord = () => (
  <section id="experience" className="relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <SectionHeader
        index="06"
        eyebrow="Track record"
        title="Five years, logged."
        lead="Grouped by year, from the delivery dates on the work itself."
      />

      <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        {/* ---- the log ---- */}
        <div className="lg:col-span-7">
          <ol className="space-y-0">
            {LOG.map((block, i) => (
              <Reveal as="li" key={block.year} index={i}>
                <div className="grid grid-cols-[3.75rem_1fr] gap-x-4 border-t border-hairline/[0.08] py-7 sm:grid-cols-[5rem_1fr] sm:gap-x-6">
                  <div className="pt-0.5">
                    <div className="font-mono text-[15px] tabular-nums text-primary">
                      {block.year}
                    </div>
                    <div className="mono-tiny mt-2 leading-[1.6] text-subtle">
                      {block.focus}
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {block.entries.map((e) => (
                      <li
                        key={e}
                        className="flex gap-3 font-inter text-[13.5px] leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-px w-3 shrink-0 bg-hairline/[0.22]"
                        />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---- platforms + credentials ---- */}
        <div className="lg:col-span-5">
          <Reveal variant="fade">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {PLATFORM_PROOF.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-hover group flex items-center justify-between gap-4 rounded-lg px-5 py-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-inter text-[15px] font-medium tracking-tight text-foreground">
                        {p.name}
                      </span>
                      <span className="mono-tiny rounded border border-primary/25 bg-primary/[0.08] px-1.5 py-1 text-primary">
                        {p.status}
                      </span>
                    </div>
                    <div className="mono-tiny mt-2.5 text-subtle">
                      {p.rating} · {p.reviews} · {p.earned}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-subtle transition-all duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal variant="fade" index={1}>
            <div className="mt-8">
              <h3 className="mono-tiny text-subtle">Credentials</h3>
              <ul className="mt-5 space-y-3">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 font-inter text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary/70"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default TrackRecord;
