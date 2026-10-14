/**
 * Cursor spotlight for `.fx-border` cards: one delegated listener writes the
 * pointer position into --mx/--my on the card under it, and the CSS paints a
 * soft glow there on hover. Nothing per card, so it works for cards that
 * mount later and costs nothing on touch screens.
 */
export function initSpotlight() {
  if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;
  document.addEventListener(
    "pointermove",
    (e) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".fx-border");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}
