/**
 * Scrolls to the element with `id`, waiting for it to exist first.
 *
 * Home sections are lazy chunks, so a link like /#process can arrive before
 * the target is in the DOM; a fixed timeout either fired too early (no
 * element, no scroll) or scrolled while sections above were still mounting
 * (wrong place). This polls each frame for up to `timeout`, scrolls, and once
 * the scroll has finished checks the target is really at the top, correcting
 * once if late layout (images, fonts) moved it. The element's own
 * scroll-margin-top (scroll-mt-*) clears the fixed navbar.
 *
 * Returns a cancel function, so effects can clean up.
 */
export function scrollToId(id: string, { smooth = true, timeout = 4000 } = {}): () => void {
  const started = performance.now();
  let raf = 0;
  let settle = 0;
  let cancelled = false;

  const scroll = (el: HTMLElement, instant: boolean) =>
    el.scrollIntoView({ behavior: instant ? ("instant" as ScrollBehavior) : "smooth", block: "start" });

  const aligned = (el: HTMLElement) => {
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return Math.abs(el.getBoundingClientRect().top - margin) < 8;
  };

  let ro: ResizeObserver | null = null;
  let watchEnd = 0;
  const stopWatching = () => {
    ro?.disconnect();
    ro = null;
    window.clearTimeout(watchEnd);
    window.removeEventListener("wheel", stopWatching);
    window.removeEventListener("touchstart", stopWatching);
    window.removeEventListener("keydown", stopWatching);
  };

  const afterScroll = (el: HTMLElement) => {
    const check = () => {
      window.removeEventListener("scrollend", check);
      window.clearTimeout(settle);
      if (cancelled) return;
      if (!aligned(el)) scroll(el, true);
      // Content above can still be arriving (lazy sections, images). For a
      // short while, re-align whenever the page changes size, unless the
      // reader takes over the scroll themselves.
      ro = new ResizeObserver(() => {
        if (!cancelled && !aligned(el)) scroll(el, true);
      });
      ro.observe(document.body);
      window.addEventListener("wheel", stopWatching, { passive: true });
      window.addEventListener("touchstart", stopWatching, { passive: true });
      window.addEventListener("keydown", stopWatching);
      watchEnd = window.setTimeout(stopWatching, 1500);
    };
    // scrollend where supported; otherwise a generous fallback.
    window.addEventListener("scrollend", check, { once: true });
    settle = window.setTimeout(check, smooth ? 1400 : 400);
  };

  const wait = () => {
    if (cancelled) return;
    const el = document.getElementById(id);
    if (!el) {
      if (performance.now() - started < timeout) raf = requestAnimationFrame(wait);
      return;
    }
    scroll(el, !smooth);
    afterScroll(el);
  };
  wait();

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
    window.clearTimeout(settle);
    stopWatching();
  };
}
