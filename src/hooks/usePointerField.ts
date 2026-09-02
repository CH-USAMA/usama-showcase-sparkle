import { useEffect, useRef, useState } from "react";

/**
 * Tracks the pointer relative to an element and exposes it as normalised
 * (-1..1) offsets, rAF-throttled so we never touch layout on every mousemove.
 *
 * Returns nulls (and never attaches a listener) on coarse pointers or when the
 * user prefers reduced motion — the caller renders the static composition.
 */
export function usePointerField<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !still);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (pending) setOffset(pending);
    };

    const onMove = (e: PointerEvent) => {
      // getBoundingClientRect in the event is fine: it is read-only and the
      // write is deferred to the rAF callback, so no read/write thrash.
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pending = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onEnter = () => setActive(true);
    const onLeave = () => {
      setActive(false);
      pending = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { ref, offset, active, enabled };
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
