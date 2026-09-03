import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";

export interface FlowStage {
  label: string;
  /** Optional sub-label, e.g. the concrete technology at that stage. */
  note?: string;
}

interface ArchitectureFlowProps {
  stages: FlowStage[];
  /** Small caption above the diagram, e.g. "REQUEST PATH". */
  caption?: string;
  /** `row` goes horizontal from lg up; `column` always stacks. */
  orientation?: "row" | "column";
  className?: string;
}

/**
 * The recurring architecture diagram.
 *
 * The stages assemble in order the first time the diagram is seen, connectors
 * drawing behind them, so the system reads as being built rather than as
 * already existing. After that a charge sweeps through in sequence, so it
 * reads as a request travelling through a system rather than a list of boxes.
 *
 * Both are opacity and transform only, so neither costs layout. The sweep runs
 * only while the diagram is on screen, since an always-on animation in a long
 * page is battery drain, and under reduced motion the finished diagram is
 * shown immediately with nothing moving at all.
 */
const ArchitectureFlow = ({
  stages,
  caption,
  orientation = "row",
  className = "",
}: ArchitectureFlowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  /**
   * Set once, the first time the diagram is seen, and never unset. The stages
   * assemble in order on that first pass so the system reads as being built
   * rather than as already existing; scrolling back up does not replay it,
   * because a diagram that rebuilds every time you pass it is a distraction.
   */
  const [built, setBuilt] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) {
      // Reduced motion gets the finished diagram immediately.
      if (reduced) setBuilt(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setLive(entry.isIntersecting);
        if (entry.isIntersecting) setBuilt(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const cycle = Math.max(3.6, stages.length * 0.6);
  const row = orientation === "row";

  return (
    <div ref={ref} className={className}>
      {caption && (
        <div className="mb-4 flex items-center gap-3">
          <span className="mono-tiny text-subtle">{caption}</span>
          <span className="h-px flex-1 bg-hairline/[0.08]" aria-hidden="true" />
          <span
            className={`h-1.5 w-1.5 rounded-full bg-primary ${live ? "anim-status" : "opacity-40"}`}
            aria-hidden="true"
          />
        </div>
      )}

      <ol className={`flex flex-col ${row ? "lg:flex-row lg:items-center" : ""}`}>
        {stages.map((stage, i) => {
          const delay = `${(i / stages.length) * cycle}s`;
          const last = i === stages.length - 1;
          return (
            <li
              key={`${stage.label}-${i}`}
              className={`flex flex-col ${row ? "lg:flex-1 lg:flex-row lg:items-center" : ""}`}
            >
              <div
                className="relative w-full overflow-hidden rounded-md border border-hairline/[0.09] bg-surface-1/70 px-3 py-2.5"
                style={
                  reduced
                    ? undefined
                    : {
                        opacity: built ? 1 : 0,
                        transform: built ? "none" : "translateY(6px)",
                        transition: `opacity 420ms var(--ease-out) ${i * 90}ms, transform 420ms var(--ease-out) ${i * 90}ms`,
                      }
                }
              >
                {live && built && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-md opacity-0"
                    style={{
                      background:
                        "linear-gradient(120deg, hsl(var(--primary)/0.18), hsl(var(--primary)/0.03))",
                      boxShadow: "inset 0 0 0 1px hsl(var(--primary)/0.45)",
                      animation: `node-charge ${cycle}s linear infinite`,
                      animationDelay: delay,
                    }}
                  />
                )}
                <div className="relative">
                  <div className="mono-tiny whitespace-nowrap text-foreground/90">
                    {stage.label}
                  </div>
                  {stage.note && (
                    <div className="mt-1.5 truncate font-inter text-[11px] leading-none text-subtle">
                      {stage.note}
                    </div>
                  )}
                </div>
              </div>

              {!last && (
                <div
                  aria-hidden="true"
                  className={`relative mx-auto my-1.5 h-5 w-px shrink-0 bg-hairline/[0.11] ${
                    row ? "lg:mx-2.5 lg:my-0 lg:h-px lg:w-5" : ""
                  }`}
                  style={
                    reduced
                      ? undefined
                      : {
                          // Scales along its own axis, so the line draws from
                          // the stage it leaves rather than fading in whole.
                          transformOrigin: row ? "left center" : "top center",
                          transform: built ? "none" : row ? "scaleX(0)" : "scaleY(0)",
                          opacity: built ? 1 : 0,
                          transition: `transform 320ms var(--ease-out) ${i * 90 + 180}ms, opacity 200ms linear ${i * 90 + 180}ms`,
                        }
                  }
                >
                  {live && built && (
                    <span
                      className={`absolute inset-0 bg-primary/70 trace ${row ? "trace-row" : ""}`}
                      style={{
                        animationDuration: `${cycle}s`,
                        animationDelay: delay,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "linear",
                      }}
                    />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ArchitectureFlow;
