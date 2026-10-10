import { thumbOf } from "@/lib/thumbs";

/**
 * Responsive sources for content images.
 *
 * - Unsplash (imgix) resizes and re-encodes on request: each srcset entry asks
 *   for its own width, cropped to the slot's aspect, with `auto=format` so
 *   browsers that take AVIF or WebP get it.
 * - Project screenshots in /public/projects have a 720px WebP thumbnail
 *   (see lib/thumbs), which is all a phone needs.
 * - Anything else is used as is.
 *
 * Spread the result onto the <img> with a `sizes` that matches its slot.
 */
const UNSPLASH = /^https:\/\/images\.unsplash\.com\//;

/**
 * Element Timing marker for a page's largest above-the-fold image: main.tsx
 * waits until the prerendered copy has been presented before React replaces
 * it. (Not in React's attribute types, hence the spread.)
 */
export const PRIORITY_TIMING = { elementtiming: "priority" } as Record<string, string>;

export function responsiveImage(src: string, opts: { widths: number[]; aspect: number }): { src: string; srcSet?: string } {
  if (UNSPLASH.test(src)) {
    const at = (w: number) => {
      const u = new URL(src);
      u.searchParams.set("w", String(w));
      u.searchParams.set("h", String(Math.round(w / opts.aspect)));
      u.searchParams.set("fit", "crop");
      u.searchParams.set("auto", "format");
      u.searchParams.set("q", "70");
      return u.toString();
    };
    const widths = [...opts.widths].sort((a, b) => a - b);
    return { src: at(widths[widths.length - 1]), srcSet: widths.map((w) => `${at(w)} ${w}w`).join(", ") };
  }
  const thumb = thumbOf(src);
  if (thumb !== src) return { src, srcSet: `${thumb} 720w, ${src} 1440w` };
  return { src };
}
