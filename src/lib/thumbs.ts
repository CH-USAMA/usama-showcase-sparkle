import THUMBS from "@/data/thumbs.json";

/**
 * Card-sized WebP versions of the screenshots in /public/projects live in
 * /public/projects/thumbs (720px wide, ~15 kB each against ~70-170 kB for the
 * originals). thumbs.json lists the originals that have one; any other image,
 * including ones added later through /admin, is used as is.
 */
const HAS_THUMB = new Set(THUMBS as string[]);

export const thumbOf = (src: string) =>
  HAS_THUMB.has(src) ? src.replace(/^\/projects\/(.+)\.\w+$/, "/projects/thumbs/$1.webp") : src;
