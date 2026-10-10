/*
 * The prerendered home page carries every section, but the app mounts its
 * own copies a few at a time (see Index), so no single task is long. Rendering
 * over the prerendered HTML used to swap the lower sections for empty space
 * until they mounted, and a reader scrolling on in the meantime ran into it.
 *
 * Instead, before React renders, main.tsx moves the prerendered lower sections
 * and footer out of #root into a box placed straight after it. React's copy of
 * the page then ends at the proof strip and the box carries on underneath, so
 * the page looks and measures exactly as before. As the app mounts its copy of
 * each section, Index drops the prerendered one in the same commit, before
 * paint. The box keeps working as plain HTML until then: links, anchors, the
 * contact form's no-JavaScript submit and anything typed into it.
 */
let stash: { box: HTMLElement; sections: (Element | null)[]; footer: Element | null } | null = null;

/** main.tsx, just before the first render over the prerendered home page. */
export function stashHomeSections(root: HTMLElement) {
  const main = root.querySelector("main");
  const page = main?.parentElement;
  if (!main || !page) return;
  // Everything after the hero and the proof strip, which the first render draws.
  const sections = [...main.children].slice(2);
  if (!sections.length) return;
  const footer = page.querySelector(":scope > footer");
  const active = document.activeElement;
  // Sections below the first screen skip layout until scrolled near (the
  // prerender-defer rule in index.css, which the box repeats). Pin each to
  // the height it has now, so moving it cannot change the page's length.
  for (const el of sections) {
    (el as HTMLElement).style.containIntrinsicSize = `auto ${Math.round(el.getBoundingClientRect().height)}px`;
  }

  const box = document.createElement("div");
  // Same class as <main>: its light-theme banding counts sections in pairs,
  // and two sections stay behind, so the banding is unchanged.
  box.className = "home-rhythm";
  box.setAttribute("data-prerendered-sections", "");
  box.append(...sections);
  if (footer) box.append(footer);
  root.after(box);

  // Moving a node takes focus from it; give it back.
  if (active instanceof HTMLElement && box.contains(active)) active.focus({ preventScroll: true });
  stash = { box, sections, footer };
}

/** True while some prerendered sections are still standing in for the app's own. */
export const hasHomeStash = () => stash !== null;

/** The box, for Index to notice the reader scrolling into it. */
export const homeStashBox = () => stash?.box ?? null;

/** Index: the app's copy of section `i` (or the footer) has rendered; remove the prerendered one. */
export function dropStashed(i: number | "footer") {
  if (!stash) return;
  if (i === "footer") {
    stash.footer?.remove();
    stash.footer = null;
  } else {
    stash.sections[i]?.remove();
    stash.sections[i] = null;
  }
  if (!stash.footer && stash.sections.every((s) => s === null)) {
    stash.box.remove();
    stash = null;
  }
}
