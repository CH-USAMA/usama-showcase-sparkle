/** Display helpers shared by post cards, the blog index and post pages. */

// In UTC, so the build-time HTML and every visitor's browser print the same
// day: a date-only value ("2026-02-10") is UTC midnight, which is the
// previous evening west of Greenwich.
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Minutes at ~220 words a minute, never less than one. */
export const readingTime = (content: string) => Math.max(1, Math.round(content.trim().split(/\s+/).length / 220));
