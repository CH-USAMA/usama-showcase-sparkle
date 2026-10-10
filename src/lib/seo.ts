/*
 * Result-snippet fitting shared by SEOHead and the build-time fallback pages.
 * Search engines cut titles at roughly 60 characters and descriptions at
 * roughly 155-160, mid-word; these keep them whole.
 */

/** A meta description of at most `max` characters: whole sentences if they fit, else whole words and an ellipsis. */
export function fitDescription(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  // Whole sentences first. A sentence ends at . ! or ? followed by a space,
  // so "Node.js" and "8.3" are not sentence ends.
  let end = -1;
  for (const m of t.matchAll(/[.!?](?= )/g)) {
    if (m.index + 1 > max) break;
    end = m.index + 1;
  }
  // A short opening sentence alone says too little; fall back to whole words.
  if (end >= 90) return t.slice(0, end);
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:(-]+$/, "")}…`;
}

/** "<page> | Case Study | Usama Munawar", dropping the middle, then the brand, when that is too long. */
export function caseStudyTitle(title: string, max = 60): string {
  const full = `${title} | Case Study | Usama Munawar`;
  if (full.length <= max) return full;
  const branded = `${title} | Usama Munawar`;
  return branded.length <= max ? branded : title;
}
