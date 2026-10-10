import { Fragment } from "react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import ProcessVisual from "@/components/ProcessVisual";

/**
 * The lede of each stage. `**…**` marks the phrase set in full white, the way
 * a reader skims: the highlighted words alone summarise the stage.
 */
const STAGES = [
  {
    n: "01",
    name: "Discovery",
    when: "Day 1",
    lede: "A 30-minute call on **goals, constraints, and what is already breaking.** You leave with an honest read on whether it is worth building, including when it isn't.",
  },
  {
    n: "02",
    name: "Architecture",
    when: "Day 2–3",
    lede: "A **written technical proposal**: stack, data model, integration points and milestones, with **a fixed quote and a timeline** you can hold me to.",
  },
  {
    n: "03",
    name: "Implementation",
    when: "Week 1+",
    lede: "**Weekly demos** against a visible board, and code that lands **in your repository from day one.** Working software each week, not a status report about it.",
  },
  {
    n: "04",
    name: "Hardening",
    when: "Pre-launch",
    lede: "Tests on **the paths that matter**, load behaviour, idempotency and failure handling, then a slow-query pass and **a written list of known limits.**",
  },
  {
    n: "05",
    name: "Deployment",
    when: "Launch",
    lede: "CI/CD, migrations that run forward cleanly and a **zero-downtime release**, with **a rollback path** and handover documentation.",
  },
  {
    n: "06",
    name: "Observability",
    when: "Post-launch",
    lede: "Structured logs, error tracking and health checks, with **dashboards you can read** and runbooks written while things are calm.",
  },
];

const Lede = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, i) =>
      i % 2 ? (
        <strong key={i} className="font-medium text-foreground">
          {part}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    )}
  </>
);

/**
 * PROCESS: six stages as a bento of large cards, alternating wide and narrow
 * so the grid reads as a sequence rather than a table. Each card carries the
 * artefact that stage produces, sitting on a lit horizon.
 */
const ProcessPipeline = () => (
  <section id="process" className="fx-glow-bottom relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <SectionHeader
        eyebrow="Process"
        title={
          <>
            A predictable path from problem to <em>production.</em>
          </>
        }
        lead="Six stages, each with a stated deliverable. No scope creep, no surprise invoices, and no phase where you have to ask what's happening."
      />

      <ol className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-5 lg:gap-5">
        {STAGES.map((s, i) => {
          // Rows alternate wide|narrow, narrow|wide, wide|narrow.
          const wide = (Math.floor(i / 2) % 2 === 0) === (i % 2 === 0);
          return (
            <Reveal as="li" key={s.n} index={i % 2} className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
              <article className="fx-border relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline/[0.1] bg-surface-1">
                <div className="p-7 sm:p-9 lg:p-10">
                  <div className="flex items-center gap-3 font-inter text-sm">
                    <span className="tabular-nums text-primary">{s.n}</span>
                    <span className="h-px w-6 bg-hairline/[0.2]" aria-hidden="true" />
                    <span className="text-subtle">{s.when}</span>
                  </div>
                  <h3 className="mt-4 font-inter text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-foreground lg:text-[2.125rem]">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-xl font-inter text-base leading-relaxed text-muted-foreground lg:text-[17px]">
                    <Lede text={s.lede} />
                  </p>
                </div>
                <div className="mt-auto">
                  <ProcessVisual n={s.n} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </div>
  </section>
);

export default ProcessPipeline;
