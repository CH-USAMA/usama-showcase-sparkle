import { thumbOf } from "@/lib/thumbs";
import BLOG_COVERS from "@/data/blogCovers.json";

/** Local blog covers that have -640/-960 WebP variants, with the original's width. */
const COVER_WIDTH = BLOG_COVERS as Record<string, number>;

/**
 * Responsive sources for content images.
 *
 * - Unsplash (imgix) resizes and re-encodes on request: each srcset entry asks
 *   for its own width, cropped to the slot's aspect, with `auto=format` so
 *   browsers that take AVIF or WebP get it.
 * - Project screenshots in /public/projects have a 720px WebP thumbnail
 *   (see lib/thumbs), which is all a phone needs.
 * - Blog covers in /public/blog have 640px and 960px WebP variants
 *   (src/data/blogCovers.json lists them with the original's width).
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

/** A GitHub avatar at `size` pixels (GitHub resizes on request; unsized ones run to hundreds of kB). */
export function githubAvatar(url: string, size: number): string {
  if (!/^https:\/\/avatars\.githubusercontent\.com\//.test(url)) return url;
  const u = new URL(url);
  u.searchParams.set("s", String(size));
  return u.toString();
}

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
  const coverWidth = COVER_WIDTH[src];
  if (coverWidth) {
    const stem = src.replace(/\.\w+$/, "");
    return { src, srcSet: `${stem}-640.webp 640w, ${stem}-960.webp 960w, ${src} ${coverWidth}w` };
  }
  const thumb = thumbOf(src);
  if (thumb !== src) return { src, srcSet: `${thumb} 720w, ${src} 1440w` };
  return { src };
}
