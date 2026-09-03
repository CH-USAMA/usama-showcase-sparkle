import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";

const STAGES = [
  {
    n: "01",
    name: "Discovery",
    when: "Day 1",
    what: "A 30-minute call on goals, constraints, and what is already breaking.",
    deliver: "An honest read on whether this is worth building, including when it isn't.",
    decide: "Scope boundaries. What is in v1 and what is deliberately deferred.",
  },
  {
    n: "02",
    name: "Architecture",
    when: "Day 2–3",
    what: "A written technical proposal: stack, data model, integration points, milestones.",
    deliver: "The proposal, a fixed quote, and a timeline you can hold me to.",
    decide: "Monolith or services. Where state lives. Which failures must be survivable.",
  },
  {
    n: "03",
    name: "Implementation",
    when: "Week 1+",
    what: "Weekly demos against a visible board. Code lands in your repository from day one.",
    deliver: "Working software each week, not a status report about working software.",
    decide: "Trade-offs as they surface, in writing, before they become expensive.",
  },
  {
    n: "04",
    name: "Hardening",
    when: "Pre-launch",
    what: "Tests on the paths that matter, load behaviour, idempotency, and failure handling.",
    deliver: "A test suite, a slow-query pass, and a list of known limits.",
    decide: "What gets fixed now versus what is documented and scheduled.",
  },
  {
    n: "05",
    name: "Deployment",
    when: "Launch",
    what: "CI/CD, environment config, migrations that run forward cleanly, zero-downtime release.",
    deliver: "A pipeline, a rollback path, and handover documentation.",
    decide: "Release strategy and what triggers a rollback.",
  },
  {
    n: "06",
    name: "Observability",
    when: "Post-launch",
    what: "Structured logs, error tracking, health checks, and runbooks written while it's calm.",
    deliver: "Dashboards you can read, and an optional retainer for what comes next.",
    decide: "What to alert on, and more importantly what not to.",
  },
];

/**
 * PROCESS as a pipeline.
 *
 * The rail fills with scroll position, so reading the section physically moves
 * through the engagement. Under reduced motion the rail is simply drawn full —
 * the information is in the text either way.
 */
const ProcessPipeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section
      id="process"
      className="wash band band-edge relative scroll-mt-24 py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-realtime)",
        "--hue-2": "var(--hue-backend)",
        "--wash-x": "82%",
        "--wash-y": "10%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="06"
          eyebrow="Process"
          title="A predictable path from problem to production."
          lead="Six stages, each with a stated deliverable. No scope creep, no surprise invoices, and no phase where you have to ask what's happening."
        />

        <div ref={ref} className="relative mt-14 lg:mt-20">
          {/* rail, vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-0 h-full w-px bg-hairline/[0.09] lg:left-0 lg:top-[15px] lg:h-px lg:w-full"
          >
            {/* stacked layout fills downward, row layout fills rightward —
                separate elements so one transform axis can't collapse the other */}
            <motion.span
              className="block h-full w-full origin-top bg-hue lg:hidden"
              style={reduced ? { transform: "scaleY(1)" } : { scaleY: progress }}
            />
            <motion.span
              className="hidden h-full w-full origin-left bg-hue lg:block"
              style={reduced ? { transform: "scaleX(1)" } : { scaleX: progress }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-6 lg:gap-5">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.n} index={i} className="relative pl-11 lg:pl-0 lg:pt-11">
                {/* node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-hairline/[0.12] bg-background lg:left-0 lg:top-0"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-hue" />
                </span>

                <div className="flex items-baseline gap-2.5">
                  <span className="mono-tiny tabular-nums text-hue">{s.n}</span>
                  <span className="mono-tiny text-subtle">{s.when}</span>
                </div>

                <h3 className="mt-3 font-inter text-lg font-medium tracking-tight text-foreground">
                  {s.name}
                </h3>

                <p className="mt-3 font-inter text-[13px] leading-relaxed text-muted-foreground">
                  {s.what}
                </p>

                <dl className="mt-5 space-y-3 border-t border-hairline/[0.07] pt-4">
                  <div>
                    <dt className="mono-tiny text-hue">You get</dt>
                    <dd className="mt-1.5 font-inter text-[12.5px] leading-relaxed text-muted-foreground">
                      {s.deliver}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-tiny text-subtle">Decided here</dt>
                    <dd className="mt-1.5 font-inter text-[12.5px] leading-relaxed text-subtle">
                      {s.decide}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessPipeline;
