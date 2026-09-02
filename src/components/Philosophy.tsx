import type { CSSProperties } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/system/SectionHeader";
import ArchitectureFlow from "@/components/system/ArchitectureFlow";
import Reveal from "@/components/system/Reveal";
import { transition } from "@/lib/motion";

const PRINCIPLES = [
  {
    n: "01",
    name: "Reliability",
    line: "Assume every external call fails.",
    body: "Write paths that touch money or third parties are idempotent, retried, and dead-lettered when they finally give up. A system that only works when the network behaves is a demo.",
  },
  {
    n: "02",
    name: "Scalability",
    line: "Measure before you rewrite.",
    body: "Most applications that feel slow are three indexes and two queued jobs away from being fast. I profile, read the slow query log, and fix in order of cost — rewriting is the last resort, not the first instinct.",
  },
  {
    n: "03",
    name: "Maintainability",
    line: "The next engineer is the user.",
    body: "Thin controllers, business rules in tested action classes, and a README that explains how to run, deploy, and debug. You should own the knowledge, not just a running server.",
  },
  {
    n: "04",
    name: "Automation",
    line: "If a person repeats it, it belongs in a queue.",
    body: "Manual handoffs are where operations quietly lose hours and data quality. Scheduled jobs, webhooks, and workflow orchestration remove the handoff rather than documenting it.",
  },
  {
    n: "05",
    name: "Observability",
    line: "You cannot fix what you cannot see.",
    body: "Structured logs, error tracking, and health checks go in before launch. Runbooks get written while the system is calm, not during the first incident.",
  },
];

/** The canonical request path — the diagram this site keeps returning to. */
const CANONICAL_FLOW = [
  { label: "API", note: "Versioned" },
  { label: "Auth", note: "Policies" },
  { label: "Queue", note: "Dispatch" },
  { label: "Redis", note: "State · cache" },
  { label: "Workers", note: "Horizon" },
  { label: "Database", note: "Indexed" },
  { label: "Event", note: "Domain" },
  { label: "WebSocket", note: "Broadcast" },
  { label: "Client", note: "Live UI" },
];

/**
 * HOW I THINK.
 *
 * Deliberately not a biography. A founder deciding whether to hand over their
 * backend cares about judgement, and judgement is easier to show through
 * principles and a request path than through a career history.
 */
const Philosophy = () => {
  const [active, setActive] = useState(0);
  const current = PRINCIPLES[active];

  return (
    <section
      id="about"
      className="wash relative scroll-mt-24 py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-automation)",
        "--hue-2": "var(--hue-interface)",
        "--wash-x": "24%",
        "--wash-y": "12%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="04"
          eyebrow="How I think"
          title={
            <>
              I build systems,
              <br /> not just features.
            </>
          }
          lead="A feature is done when it works on your machine. A system is done when it survives traffic, failure, a bad deploy, and the engineer who inherits it."
        />

        {/* Motto + short bio — carried over from the previous About section so the
            page keeps a human anchor and the E-E-A-T signal that goes with it. */}
        <Reveal variant="fade">
          <figure className="mt-14 border-y border-hairline/[0.08] py-10 lg:mt-16 lg:py-12">
            <blockquote>
              <p className="font-display text-2xl italic leading-[1.3] text-foreground sm:text-3xl lg:text-[2.25rem]">
                “Don't just build software —{" "}
                <span className="text-gradient not-italic">digitize, automate, and scale</span>{" "}
                your entire business.”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="mono-tiny text-subtle">Usama Munawar</span>
              <span className="h-px w-6 bg-hairline/[0.18]" aria-hidden="true" />
              <span className="font-inter text-[13px] text-muted-foreground">
                Backend Systems Engineer, Lahore — 5+ years shipping production systems
                for startups and SaaS teams, with verified profiles on Upwork and Fiverr.
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* ---- principles selector ---- */}
          <div className="lg:col-span-7">
            <ul className="border-t border-hairline/[0.08]">
              {PRINCIPLES.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.n} className="border-b border-hairline/[0.08]">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={on}
                      className="group flex w-full items-baseline gap-5 py-5 text-left focus-visible:outline-none"
                    >
                      <span
                        className={`mono-tiny shrink-0 tabular-nums transition-colors duration-standard ${
                          on ? "text-primary" : "text-subtle"
                        }`}
                      >
                        {p.n}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-inter text-lg font-medium tracking-tight transition-colors duration-standard sm:text-xl ${
                            on ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {p.name}
                        </span>
                        <span
                          className={`mt-1.5 block font-inter text-[13px] transition-colors duration-standard ${
                            on ? "text-primary/90" : "text-subtle"
                          }`}
                        >
                          {p.line}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-px shrink-0 self-center bg-primary transition-all duration-standard ease-out-expo ${
                          on ? "w-8 opacity-80" : "w-3 opacity-25"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="min-h-[7rem] pt-7" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.n}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={transition.standard}
                  className="type-body max-w-xl text-muted-foreground"
                >
                  {current.body}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* ---- the canonical diagram ---- */}
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <div className="panel rounded-xl p-6 lg:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-inter text-base font-medium tracking-tight text-foreground">
                    What "production" means here
                  </h3>
                </div>
                <p className="mt-3 font-inter text-[13px] leading-relaxed text-muted-foreground">
                  Every backend I ship resolves to some version of this path. The
                  interesting work is deciding where each stage lives, what happens when
                  one of them fails, and which of them you can afford to skip.
                </p>

                <ArchitectureFlow
                  stages={CANONICAL_FLOW}
                  caption="Request lifecycle"
                  orientation="column"
                  className="mt-7"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
