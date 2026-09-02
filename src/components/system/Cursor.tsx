import { useEffect, useRef, useState } from "react";

type Mode = "default" | "interactive" | "view";

/**
 * Custom cursor — a small dot with a trailing ring.
 *
 * Deliberately restrained: it grows on interactive elements and reads "VIEW"
 * over project media. It never replaces the pointer's meaning, and it is fully
 * disabled on coarse pointers and under prefers-reduced-motion, where the
 * native cursor is restored by removing the `has-custom-cursor` class.
 */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = fine && !still;
    setOn(enabled);
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!on) return;

    let raf = 0;
    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement | null;
      const hit = el?.closest?.("[data-cursor], a, button, [role='button'], input, select, textarea");
      const declared = hit?.getAttribute?.("data-cursor");
      setMode(declared === "view" ? "view" : hit ? "interactive" : "default");
    };

    const leave = () => setVisible(false);

    const tick = () => {
      // dot tracks exactly; ring eases behind it — the lag is what reads as weight
      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [on, visible]);

  if (!on) return null;

  const ringSize = mode === "view" ? 56 : mode === "interactive" ? 40 : 26;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-standard ease-out-expo"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor:
            mode === "default"
              ? "hsl(var(--hairline) / 0.28)"
              : "hsl(var(--primary) / 0.75)",
          backgroundColor:
            mode === "view" ? "hsl(var(--primary) / 0.14)" : "transparent",
        }}
      >
        {mode === "view" && (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
            View
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 rounded-full bg-primary transition-opacity duration-standard"
        style={{
          width: 4,
          height: 4,
          opacity: mode === "view" ? 0 : 1,
        }}
      />
    </div>
  );
};

export default Cursor;
