import type { CSSProperties } from "react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";

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
      "Solutions Zilla Call Portal: Asterisk dispatch for a 40+ agent floor",
      "RAG-powered legal assistant: hybrid retrieval with citation validation",
      "Smart lead qualification engine: n8n orchestration with scoring and DLQ",
      "AI content operations pipeline: LangChain agent graph with approval gates",
      "Jabulani hardware store: Stripe checkout and catalogue search",
    ],
  },
  {
    year: "2024",
    focus: "Commerce · booking platforms",
    entries: [
      "Focus Interiors: headless commerce migration with AI-assisted search",
      "Five Stars Galway: booking and dispatch with route optimisation",
    ],
  },
  {
    year: "2023",
    focus: "Foundations",
    entries: ["Solutions Zilla Digital: service platform and lead infrastructure"],
  },
];

const CREDENTIALS = [
  "Top Rated Plus on Upwork",
  "Level 2 Seller on Fiverr with 89+ reviews",
  "Enterprise SaaS products serving 10K+ users",
  "Production Asterisk deployments for 40+ agent call centres",
  "Zero-downtime Laravel deploys with CI/CD on AWS and Vercel",
  "AI agents, RAG pipelines, and n8n automation in production",
];

const TrackRecord = () => (
  <section
    id="experience"
    className="wash band-edge relative scroll-mt-24 py-24 lg:py-32"
    style={{
      "--hue": "var(--hue-cloud)",
      "--hue-2": "var(--hue-interface)",
      "--wash-x": "20%",
      "--wash-y": "8%",
    } as CSSProperties}
  >
    <div className="container mx-auto">
      <SectionHeader
        index="01"
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
                    <div className="font-mono text-[15px] tabular-nums text-hue">
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
          {/* The Upwork and Fiverr rows used to render here as well as in
              ProofStrip. Stating the same proof twice reads as insecurity, so
              the platform links live in ProofStrip only and this column keeps
              the credentials, which appear nowhere else. */}
          <Reveal variant="fade">
            <div>
              <h3 className="mono-tiny text-subtle">Credentials</h3>
              <ul className="mt-5 space-y-3">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 font-inter text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-hue"
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
