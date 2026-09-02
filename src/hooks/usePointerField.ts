import { useEffect, useRef, useState } from "react";

/**
 * Writes the pointer position over an element as normalised (-1..1) `--px` /
 * `--py` custom properties, rAF-throttled.
 *
 * Deliberately holds no React state. The previous version returned the offset
 * from useState, so every frame of pointer movement re-rendered the whole
 * consuming tree; for the system diagram that meant ten nodes of six SVG
 * elements each, sixty times a second. Layers now read the same values
 * straight from CSS, and React does not run at all while the pointer moves.
 *
 * Attaches nothing on coarse pointers or under prefers-reduced-motion, where
 * the properties stay unset and `var(--px, 0)` resolves to the static resting
 * composition.
 */
export function usePointerVars<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let next = { x: 0, y: 0 };

    const flush = () => {
      frame = 0;
      el.style.setProperty("--px", next.x.toFixed(3));
      el.style.setProperty("--py", next.y.toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      // Read-only in the handler; the write is deferred to rAF, so there is no
      // read/write layout thrash.
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      next = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      next = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/** True when the visitor has asked for less motion. Re-evaluates on change. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/** True on devices with a precise pointer — gates cursor + hover-only affordances. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return fine;
}

/**
 * Writes the pointer position onto the element as `--mx` / `--my` CSS custom
 * properties. Deliberately bypasses React state: a spotlight that re-rendered
 * the hero on every mousemove would be a frame-budget disaster.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let next: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!next) return;
      el.style.setProperty("--mx", `${next.x}px`);
      el.style.setProperty("--my", `${next.y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      next = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
