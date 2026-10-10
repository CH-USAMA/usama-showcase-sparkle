import type { ProjectEntry } from "../../data/types";

/**
 * Which image a project shares as og:image / twitter:image. Used by the
 * runtime page and by the build-time prerender, so the two always agree:
 * the card's real screenshot, else the page image, never stock photography
 * (which shows nothing of the real product). Undefined means "site default".
 *
 * Relative imports only: scripts/prerender.ts loads this outside Vite.
 */
export const isStock = (src?: string | null) => Boolean(src && src.includes("images.unsplash.com"));

export function projectShareImage(e: Pick<ProjectEntry, "caseStudy" | "project">): string | undefined {
  const own = e.caseStudy && e.caseStudy.cover !== "diagram" ? e.caseStudy.image : e.project?.image;
  return own && !isStock(own) ? own : undefined;
}
