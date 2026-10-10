/**
 * Reads a space-separated HSL token ("210 100% 58%") from the document, as the
 * canvas effects need real numbers rather than a CSS variable. Follows
 * var() indirection one level, since --primary is itself var(--accent-d).
 */
export function readToken(name: string, el: Element = document.documentElement): { h: number; s: number; l: number } {
  const style = getComputedStyle(el);
  let raw = style.getPropertyValue(name).trim();
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  if (ref) raw = style.getPropertyValue(ref[1]).trim();
  const m = raw.match(/(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  return m ? { h: +m[1], s: +m[2], l: +m[3] } : { h: 210, s: 100, l: 58 };
}

export const readAccent = () => readToken("--primary");
