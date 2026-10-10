import { useEffect, useRef } from "react";

/**
 * Marks an element with `data-paused` while it is off screen. A global rule in
 * index.css pauses every CSS animation inside a paused element, so decorative
 * infinite animations (the hero diagram's signals, card diagrams, process
 * visuals) stop costing main-thread time once the reader has scrolled past.
 * The 200px margin starts them again just before they come back into view.
 *
 * With `idleAfter` (ms), the element also pauses after that long on screen
 * with nobody interacting with it, and wakes on the next pointer or focus
 * inside it, or when it scrolls back into view. SVG signal animations repaint
 * on the main thread every frame; on a phone that is a steady cost for a
 * reader who has long since stopped looking at them.
 */
export function usePauseOffscreen<T extends Element>(idleAfter?: number) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    let timer = 0;
    let woke = 0;

    const pause = () => el.setAttribute("data-paused", "");
    const resume = () => {
      el.removeAttribute("data-paused");
      window.clearTimeout(timer);
      if (idleAfter) timer = window.setTimeout(pause, idleAfter);
      woke = performance.now();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else {
          window.clearTimeout(timer);
          pause();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    // Pointer movement restarts the countdown, at most once a second.
    const wake = () => {
      if (visible && (el.hasAttribute("data-paused") || performance.now() - woke > 1000)) resume();
    };
    const events = ["pointerenter", "pointermove", "pointerdown", "focusin"] as const;
    if (idleAfter) for (const e of events) el.addEventListener(e, wake, { passive: true });

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      if (idleAfter) for (const e of events) el.removeEventListener(e, wake);
    };
  }, [idleAfter]);
  return ref;
}
