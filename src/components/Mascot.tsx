import { useEffect, useRef, useState } from "react";

interface MascotProps {
  /** What it says when poked, in turn. */
  lines: string[];
  className?: string;
  /** Accessible name of the poke button. */
  label?: string;
}

const MAX_LOOK = 4.5; // how far the pupils travel, in viewBox units

/**
 * A small line-art robot for the friendlier pages (/learn-ai, /tools).
 * Its eyes follow the pointer, it blinks now and then, and a poke makes it
 * blink, squish and say a line. Plain SVG, no library. On the server and
 * before the first effect it renders at rest, eyes centred, so it adds
 * nothing to the boot. Pointer tracking only runs where hovering exists and
 * motion is allowed; the global reduced-motion rule stops the float and the
 * squish.
 */
const Mascot = ({ lines, className = "", label = "Poke the robot" }: MascotProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [poked, setPoked] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const turn = useRef(0);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  // Eyes follow the pointer (mouse and pen; touch has no hover to follow).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        const dx = e.clientX - (box.left + box.width / 2);
        const dy = e.clientY - (box.top + box.height * 0.45);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(MAX_LOOK, dist / 40);
        setLook({ x: (dx / dist) * reach, y: (dy / dist) * reach });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A blink every few seconds.
  useEffect(() => {
    let id = 0;
    const schedule = () => {
      id = window.setTimeout(() => {
        setBlink(true);
        later(() => setBlink(false), 140);
        schedule();
      }, 2800 + Math.random() * 3200);
    };
    schedule();
    const pending = timers.current;
    return () => {
      window.clearTimeout(id);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const poke = () => {
    setBlink(true);
    setPoked(true);
    setLine(lines[turn.current % lines.length]);
    turn.current += 1;
    later(() => setBlink(false), 160);
    later(() => setPoked(false), 260);
    later(() => setLine(null), 2600);
  };

  const pupil = { transform: `translate(${look.x}px, ${look.y}px)` };
  const eye = { transform: blink ? "scaleY(0.12)" : "scaleY(1)" };

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute -top-9 end-0 whitespace-nowrap rounded-full border border-primary/40 bg-surface-1 px-3 py-1 font-inter text-xs text-foreground shadow-sm transition-opacity duration-standard ${
          line ? "opacity-100" : "opacity-0"
        }`}
      >
        {line}
      </span>
      <button
        ref={ref}
        type="button"
        onClick={poke}
        aria-label={label}
        className="mascot-float rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <svg
          viewBox="0 0 120 120"
          className={`h-20 w-20 transition-transform duration-200 ease-out lg:h-24 lg:w-24 ${poked ? "scale-90" : "scale-100"}`}
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.45))" }}
        >
          <g fill="none" stroke="hsl(var(--primary))" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <line x1="60" y1="22" x2="60" y2="11" />
            <rect x="18" y="22" width="84" height="68" rx="22" fill="hsl(var(--surface-1))" />
            <rect x="9" y="45" width="9" height="22" rx="4" />
            <rect x="102" y="45" width="9" height="22" rx="4" />
            <path d="M47 73 Q60 82 73 73" />
          </g>
          <circle cx="60" cy="8" r="4.5" fill="hsl(var(--primary))" />
          {[44, 76].map((cx) => (
            <g key={cx} style={{ ...eye, transformOrigin: `${cx}px 53px`, transition: "transform 90ms ease-out" }}>
              <circle cx={cx} cy="53" r="11" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={2.5} />
              <circle cx={cx} cy="53" r="5" fill="hsl(var(--primary))" style={{ ...pupil, transition: "transform 120ms ease-out" }} />
            </g>
          ))}
          <circle cx="34" cy="71" r="3" fill="hsl(var(--primary))" opacity="0.25" />
          <circle cx="86" cy="71" r="3" fill="hsl(var(--primary))" opacity="0.25" />
        </svg>
      </button>
    </div>
  );
};

export default Mascot;
