import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/system/SectionHeader";
import ArchitectureFlow from "@/components/system/ArchitectureFlow";
import { useFinePointer } from "@/hooks/usePointerField";
import { transition } from "@/lib/motion";

import { CAPABILITIES } from "@/data/capabilities";

/**
 * WHAT I BUILD.
 *
 * Numbered rows that expand in place. It behaves as an accordion for keyboard
 * and touch (click / Enter toggles, aria-expanded reflects state) and *also*
 * opens on hover for fine pointers, so a mouse user never has to click to
 * browse. One row open at a time keeps the section scannable.
 */
const ServiceExplorer = () => {
  const [open, setOpen] = useState<string | null>(CAPABILITIES[0].id);
  const fine = useFinePointer();

  const hover = useCallback(
    (id: string) => {
      if (fine) setOpen(id);
    },
    [fine]
  );

  return (
    <section
      id="services"
      className="wash relative scroll-mt-24 py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-backend)",
        "--hue-2": "var(--hue-realtime)",
        "--wash-x": "18%",
        "--wash-y": "6%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="02"
          eyebrow="What I build"
          title={
            <>
              Seven systems I take
              <br className="hidden sm:block" /> end to end.
            </>
          }
          lead="Each one ships with tests, deployment, and documentation another engineer can pick up. Hover or select a row to see how it's assembled."
        />

        <ul className="mt-14 border-t border-hairline/[0.08] lg:mt-20">
          {CAPABILITIES.map((c) => {
            const isOpen = open === c.id;
            return (
              <li
                key={c.id}
                className="group relative border-b border-hairline/[0.08]"
                onMouseEnter={() => hover(c.id)}
                /* each row overrides the section hue with its own domain's */
                style={{ "--hue": c.hue } as CSSProperties}
              >
                {/* accent rail on the active row */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-px bg-hue transition-opacity duration-standard ${
                    isOpen ? "opacity-70" : "opacity-0"
                  }`}
                />

                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`cap-${c.id}`}
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    onFocus={() => setOpen(c.id)}
                    className="flex w-full items-baseline gap-4 py-6 text-left transition-[padding] duration-standard ease-out-expo focus-visible:outline-none sm:gap-7 lg:py-8 lg:group-hover:pl-5"
                  >
                    <span
                      className={`mono-tiny shrink-0 tabular-nums transition-colors duration-standard ${
                        isOpen ? "text-hue" : "text-subtle"
                      }`}
                    >
                      {c.n}
                    </span>
                    <span
                      className={`type-h3 flex-1 transition-colors duration-standard ${
                        isOpen ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {c.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 hidden shrink-0 font-mono text-xs text-subtle transition-transform duration-standard sm:block ${
                        isOpen ? "rotate-45 text-hue" : ""
                      }`}
                    >
                      ＋
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`cap-${c.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition.standard}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pl-[3.4rem]">
                        <div>
                          <p className="type-body max-w-md text-muted-foreground">
                            {c.summary}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {c.stack.map((s) => (
                              <span
                                key={s}
                                className="rounded border border-hairline/[0.09] bg-surface-2/60 px-2 py-1 font-mono text-[10.5px] tracking-tight text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          {c.href && (
                            <Link
                              to={c.href}
                              className="group/link mt-6 inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm font-medium text-hue"
                            >
                              <span className="hover-underline">Service detail</span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-standard group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </Link>
                          )}
                        </div>

                        <ArchitectureFlow
                          stages={c.flow}
                          caption="Typical path"
                          orientation="column"
                          className="lg:pt-1"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServiceExplorer;
