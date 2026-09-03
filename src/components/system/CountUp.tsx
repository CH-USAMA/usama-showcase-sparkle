import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";

interface CountUpProps {
  /** Full display value, e.g. "5+" or "17". Non-digits are preserved. */
  value: string;
  className?: string;
  duration?: number;
}

/** Splits "$1.5K+" into ["$", 1, ".5K+"]. */
function parse(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: parseFloat(match[2]), suffix: match[3] };
}

/**
 * Counts a metric up once, when it first scrolls into view.
 *
 * The final value is what renders by default. Zeroing only happens in a layout
 * effect, and only when the element is confirmed to be below the fold — so a
 * metric is never left reading "0+" because an observer didn't fire, JS was
 * slow, or the value had an unexpected format.
 */
const CountUp = ({ value, className = "", duration = 1200 }: CountUpProps) => {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);
  const done = useRef(false);

  // Decide *before paint* whether this metric is off-screen and worth animating.
  useLayoutEffect(() => {
    if (!parsed || reduced || done.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const below = rect.top > window.innerHeight * 0.9;
    if (below) {
      armed.current = true;
      setDisplay(`${parsed.prefix}0${parsed.suffix}`);
    } else {
      done.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);

  useEffect(() => {
    if (!parsed || reduced || !armed.current || done.current) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const start = performance.now();
        const decimals = String(parsed.target).includes(".") ? 1 : 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast, then settles. Matches the rest of the motion system.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(`${parsed.prefix}${(parsed.target * eased).toFixed(decimals)}${parsed.suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    // Safety net: if the observer never fires (odd scroll containers, bfcache
    // restores), show the real number rather than a zero.
    const failsafe = window.setTimeout(() => {
      if (!done.current) {
        done.current = true;
        io.disconnect();
        setDisplay(value);
      }
    }, 8000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
};

export default CountUp;
