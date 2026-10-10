import { useEffect, useLayoutEffect, useState } from "react";
import type { CSSProperties } from "react";

/*
 * The first client render over prerendered HTML.
 *
 * Public routes are rendered to HTML at build time (src/entry-server.tsx,
 * scripts/prerender.ts), so the browser paints the real page before any
 * JavaScript runs, and the CSS entrance animations (.enter, .enter-lift,
 * .enter-soft) start on that first frame. React then replaces the markup with
 * its own, and a freshly mounted element would play its entrance again from
 * the start: the hero would blink. Elements mounted by that first render
 * instead join their animation where the prerendered copy has got to, through
 * a negative offset on their delay (`--enter-skip`).
 */
const boot = { prerendered: false, booting: true, entranceStart: null as number | null };

/** useLayoutEffect, without React's warning when rendering at build time. */
export const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** main.tsx, just before the first render. */
export function startBoot(prerendered: boolean) {
  boot.prerendered = prerendered;
  if (!prerendered || typeof document.getAnimations !== "function") return;
  // The prerendered page's entrances all started on its first frame; note
  // when. An animation that has not started yet has no start time: nothing of
  // it has been shown, so there is nothing to skip.
  for (const a of document.getAnimations()) {
    const name = (a as Animation & { animationName?: string }).animationName;
    if (!name?.startsWith("enter-") || a.startTime === null) continue;
    const t = Number(a.startTime);
    boot.entranceStart = boot.entranceStart === null ? t : Math.min(boot.entranceStart, t);
  }
}

/**
 * Where the reader is on the prerendered page, as "this child of <main>, this
 * far from the top of the screen". Pixel offsets do not survive the swap: on
 * the home page, sections the reader jumped past (End key, find in page) were
 * still placeholders of a guessed height.
 */
let anchor: { index: number; top: number } | null = null;

/**
 * What the reader did on the prerendered page that replacing it would undo:
 * text typed into a field, the focused control, <details> opened.
 */
let carried: { fields: { index: number; value: string }[]; focus: number; open: number[] } | null = null;

// Both copies of the page come from the same markup, so a control is the
// same one before and after if it sits at the same position in this list.
const CONTROLS = "a, button, input, select, textarea, summary";
const controls = (root: ParentNode) => [...root.querySelectorAll<HTMLElement>(CONTROLS)];

/** main.tsx, just before the first render. */
export function captureReaderState(root: HTMLElement) {
  const all = controls(root);
  const fields = all.flatMap((el, index) =>
    (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
    !/^(hidden|checkbox|radio|submit|button)$/.test(el.type) &&
    el.value !== el.defaultValue
      ? [{ index, value: el.value }]
      : []
  );
  const focus = all.indexOf(document.activeElement as HTMLElement);
  const open = [...root.querySelectorAll("details")].flatMap((d, i) => (d.open ? [i] : []));
  if (fields.length || focus >= 0 || open.length) carried = { fields, focus, open };

  if (window.scrollY === 0) return;
  const blocks = [...(root.querySelector("main")?.children ?? [])];
  const index = blocks.findIndex((el) => el.getBoundingClientRect().bottom > 0);
  if (index >= 0) anchor = { index, top: blocks[index].getBoundingClientRect().top };
}

function restoreReaderState() {
  if (!carried) return;
  const { fields, focus, open } = carried;
  carried = null;
  const root = document.getElementById("root");
  if (!root) return;
  const all = controls(root);
  const details = root.querySelectorAll("details");
  for (const i of open) if (details[i]) details[i].open = true;
  for (const f of fields) {
    const el = all[f.index];
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) continue;
    // React tracks a field's value through its own setter: write it the
    // native way, then announce it once React is done committing, so a
    // controlled field's state catches up.
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, f.value);
    setTimeout(() => el.dispatchEvent(new Event("input", { bubbles: true })), 0);
  }
  if (focus >= 0) all[focus]?.focus({ preventScroll: true });
}

/**
 * The reader's place, text and focus back on the new copy of the page. Runs in
 * the first commit's layout phase, before anything that measures the screen
 * (Reveal, CountUp), so those see the page where the reader left it.
 */
export function restoreBoot() {
  restoreReaderState();
  if (!anchor) return;
  const el = document.querySelector("#root main")?.children[anchor.index];
  if (el) window.scrollBy({ top: el.getBoundingClientRect().top - anchor.top, behavior: "instant" as ScrollBehavior });
  anchor = null;
}

/** App, after its first commit and before paint: anything mounted later animates normally. */
export function endBoot() {
  boot.booting = false;
  // The app handles clicks from here on (see the pre-boot handler in index.html).
  document.documentElement.setAttribute("data-app", "");
}

/** Header actions tapped before the app took over (index.html queues them); read once. */
export function takeBootActions(): string[] {
  const w = window as Window & { __bootActions?: string[] };
  const actions = w.__bootActions ?? [];
  w.__bootActions = [];
  return actions;
}

/** True while the first client render replaces prerendered markup. */
export function isBootRender() {
  return boot.prerendered && boot.booting;
}

/** How far the prerendered entrances have run, in ms (0 if they never started). */
function entranceElapsed() {
  const now = document.timeline?.currentTime;
  if (boot.entranceStart === null || now === null || now === undefined) return 0;
  return Math.max(0, Math.round(Number(now) - boot.entranceStart));
}

/**
 * Props for an element with an entrance class: its stagger delay, and on the
 * first render over prerendered HTML a marker that is swapped, at commit and
 * before paint, for how much of the entrance the prerendered copy had already
 * shown. Spread them: `<p className="enter-lift" {...enter(140)}>`.
 */
export function useEnter() {
  const [marked] = useState(isBootRender);
  useBeforePaint(() => {
    if (!marked) return;
    const skip = entranceElapsed();
    document.querySelectorAll<HTMLElement>("[data-boot-enter]").forEach((el) => {
      if (skip) el.style.setProperty("--enter-skip", `${skip}ms`);
      el.removeAttribute("data-boot-enter");
    });
  }, [marked]);
  return (delayMs = 0) => ({
    style: { "--enter-delay": `${delayMs}ms` } as CSSProperties,
    // Only while the boot render is in progress: a keyed element remounted
    // later (a new testimonial, the next principle) plays its entrance.
    ...(isBootRender() ? { "data-boot-enter": "" } : null),
  });
}
