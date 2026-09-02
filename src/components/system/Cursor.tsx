import { useEffect, useRef, useState } from "react";

type Mode = "default" | "interactive" | "view";

/** Ring is rendered once at its largest and scaled down — see below. */
const RING = 56;
const SCALE: Record<Mode, number> = {
  default: 26 / RING,
  interactive: 40 / RING,
  view: 1,
};

const HIT = "[data-cursor], a, button, [role='button'], input, select, textarea";

/**
 * Custom cursor — a small dot with a trailing ring.
 *
 * Deliberately restrained: it grows on interactive elements and reads "VIEW"
 * over project media. It never replaces the pointer's meaning, and it is fully
 * disabled on coarse pointers and under prefers-reduced-motion, where the
 * native cursor is restored by removing the `has-custom-cursor` class.
 *
 * Four things keep it off the main thread's critical path, all of which it
 * previously got wrong and all of which showed up as pointer lag:
 *
 * 1. No React state per pointermove. Mode lives in a ref and only reaches
 *    useState on an actual change, so moving the mouse across a paragraph
 *    renders nothing.
 * 2. `closest()` runs only when the element under the pointer changes, not on
 *    every event — at 120 Hz that tree walk was being paid ~120×/second.
 * 3. The ring is scaled with a transform instead of transitioning `width` and
 *    `height`, so resizing it never triggers layout. Border width is
 *    pre-divided by the scale so the stroke still reads as 1px at every size.
 * 4. The rAF loop sleeps once the trail catches up, and is woken by movement
 *    or a mode change. It used to run forever on a completely idle page.
 */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [on, setOn] = useState(false);

  const modeRef = useRef<Mode>("default");
  const wake = useRef<() => void>(() => {});

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
    let running = false;
    // Starts off-screen, so nothing is visible until the pointer first moves.
    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };

    // Hidden and parked off-screen before the first frame. Opacity is not part
    // of the rendered style object, so it has to be seeded here or the cursor
    // would paint at the top-left corner until the pointer first moves.
    const park = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;
    if (root.current) root.current.style.opacity = "0";
    if (dot.current) dot.current.style.transform = park;
    if (ring.current) ring.current.style.transform = `${park} scale(${SCALE.default})`;

    let scale = SCALE.default;
    let lastHit: Element | null = null;
    let shown = false;

    const tick = () => {
      // dot tracks exactly; ring eases behind it — the lag is what reads as weight
      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;
      const want = SCALE[modeRef.current];
      scale += (want - scale) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(4)})`;
      }

      const settled =
        Math.abs(target.x - trail.x) < 0.1 &&
        Math.abs(target.y - trail.y) < 0.1 &&
        Math.abs(want - scale) < 0.002;

      if (settled) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    wake.current = start;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!shown) {
        shown = true;
        if (root.current) root.current.style.opacity = "1";
      }

      const el = e.target as Element | null;
      if (el !== lastHit) {
        lastHit = el;
        const hit = el?.closest?.(HIT) ?? null;
        const declared = hit?.getAttribute?.("data-cursor");
        const next: Mode = declared === "view" ? "view" : hit ? "interactive" : "default";
        if (next !== modeRef.current) {
          modeRef.current = next;
          setMode(next);
        }
      }

      start();
    };

    const leave = () => {
      shown = false;
      if (root.current) root.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
      wake.current = () => {};
    };
  }, [on]);

  // A mode change retargets the ring scale, so the loop has to be awake to
  // ease towards it.
  useEffect(() => {
    modeRef.current = mode;
    wake.current();
  }, [mode]);

  if (!on) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      /* opacity is written directly to the DOM and deliberately kept out of
         this object, or React would reset it on every mode change. */
      style={{ transition: "opacity 200ms ease" }}
    >
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[border-color,background-color] duration-standard ease-out-expo"
        style={{
          width: RING,
          height: RING,
          // counter-scaled so the visible stroke stays 1px at every size
          borderWidth: `${(1 / SCALE[mode]).toFixed(2)}px`,
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
