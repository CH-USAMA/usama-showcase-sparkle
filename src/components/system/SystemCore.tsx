import { usePrefersReducedMotion } from "@/hooks/usePointerField";

/* ---------------------------------------------------------------------------
   The core at the centre of the system diagram.

   This is where a request is actually handled, so it shows a request being
   handled: six stages of the canonical Laravel request lifecycle advancing in
   sequence around the ring, with the active stage named in the middle.

   Deliberately not a spinner, not particles and not an orbit. The ring does not
   rotate; six fixed segments light in order, which reads as a state machine
   moving rather than decoration moving. A visitor who knows the stack
   recognises the path; a visitor who does not still reads "something is being
   processed here".

   Driven entirely by CSS keyframes with staggered delays, so it holds no React
   state and never re-renders. Under prefers-reduced-motion every segment sits
   at its resting opacity and the label shows the first stage, statically.
--------------------------------------------------------------------------- */

/** The Laravel request path this site's backend work actually follows. */
const STAGES = ["Request", "Auth", "Action", "Queue", "Write", "Event"];

const VB = 200;
const C = VB / 2;
/** Radius of the segmented track. */
const R = 74;
/** Degrees per segment, with a gap so the six read as discrete steps. */
const SPAN = 52;
const STEP = 360 / STAGES.length;

/** One arc of the segmented track, in SVG path form. */
function arc(startDeg: number, sweepDeg: number, r: number) {
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  const a = rad(startDeg);
  const b = rad(startDeg + sweepDeg);
  const large = sweepDeg > 180 ? 1 : 0;
  return [
    `M ${(C + Math.cos(a) * r).toFixed(2)} ${(C + Math.sin(a) * r).toFixed(2)}`,
    `A ${r} ${r} 0 ${large} 1 ${(C + Math.cos(b) * r).toFixed(2)} ${(C + Math.sin(b) * r).toFixed(2)}`,
  ].join(" ");
}

/** Total loop length. Each stage owns one slice of it. */
const CYCLE = STAGES.length * 1.6;

const SystemCore = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg viewBox={`0 0 ${VB} ${VB}`} className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="core-fill" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="hsl(var(--hue, var(--primary)))" stopOpacity="0.20" />
            <stop offset="70%" stopColor="hsl(var(--hue, var(--primary)))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--hue, var(--primary)))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* body of the core */}
        <circle cx={C} cy={C} r={56} fill="url(#core-fill)" />
        <circle
          cx={C}
          cy={C}
          r={56}
          fill="none"
          stroke="hsl(var(--hairline))"
          strokeOpacity={0.16}
          strokeWidth={1}
        />

        {/* Expanding pulse, one per full cycle: the request leaving the core. */}
        {!reduced && (
          <circle
            cx={C}
            cy={C}
            r={56}
            fill="none"
            stroke="hsl(var(--hue, var(--primary)))"
            strokeWidth={1}
            className="anim-core-pulse"
            style={{ animationDuration: `${CYCLE / STAGES.length}s` }}
          />
        )}

        {/* the six stages, as a segmented track */}
        <g>
          {STAGES.map((stage, i) => (
            <g key={stage}>
              {/* resting track */}
              <path
                d={arc(i * STEP, SPAN, R)}
                fill="none"
                stroke="hsl(var(--hairline))"
                strokeOpacity={0.12}
                strokeWidth={3}
                strokeLinecap="round"
              />
              {/* the segment that lights when this stage is active */}
              <path
                d={arc(i * STEP, SPAN, R)}
                fill="none"
                stroke="hsl(var(--hue, var(--primary)))"
                strokeWidth={3}
                strokeLinecap="round"
                className={reduced ? undefined : "anim-core-step"}
                style={
                  reduced
                    ? { opacity: i === 0 ? 0.9 : 0.14 }
                    : {
                        opacity: 0,
                        animationDuration: `${CYCLE}s`,
                        animationDelay: `${(i * CYCLE) / STAGES.length}s`,
                      }
                }
              />
            </g>
          ))}
        </g>

        {/* stage name, cycling in step with the track */}
        <g>
          {STAGES.map((stage, i) => (
            <text
              key={stage}
              x={C}
              y={C + 4}
              textAnchor="middle"
              className={`font-mono ${reduced ? "" : "anim-core-step"}`}
              fontSize={13}
              letterSpacing="0.18em"
              fill="hsl(var(--foreground))"
              style={
                reduced
                  ? { opacity: i === 0 ? 1 : 0 }
                  : {
                      opacity: 0,
                      animationDuration: `${CYCLE}s`,
                      animationDelay: `${(i * CYCLE) / STAGES.length}s`,
                    }
              }
            >
              {stage.toUpperCase()}
            </text>
          ))}
        </g>

        <text
          x={C}
          y={C + 26}
          textAnchor="middle"
          className="font-mono"
          fontSize={8}
          letterSpacing="0.22em"
          fill="hsl(var(--muted-foreground))"
        >
          REQUEST LIFECYCLE
        </text>
      </svg>
    </div>
  );
};

export default SystemCore;
