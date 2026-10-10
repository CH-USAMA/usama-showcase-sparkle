import { safeHref } from "./url";

/**
 * The /blog reading list ("Worth reading elsewhere"): links curated from the
 * fetch-blogs feed. Shared by the page (src/hooks/useTrendingLinks.ts) and the
 * build-time copy (scripts/sync-content.ts), so it has no React or alias imports.
 */
export interface ReadingLink {
  id: string;
  slug: string;
  title: string;
  source_url?: string;
  published_at: string;
  tags: string[];
}

/** Rows the list shows. */
export const READING_LIST_SIZE = 8;

/**
 * Links the list can show: an absolute http(s) URL, each link once. The feed
 * can repeat an item: the same post in both of its sources, or two posts with
 * the same title (which the feed also gives the same id).
 */
export function usableLinks<T extends ReadingLink>(links: T[]): T[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    const url = safeHref(l.source_url);
    if (!url || !/^https?:\/\//i.test(url) || typeof l.title !== "string" || !l.title.trim()) return false;
    const keys = [`id:${l.id}`, `url:${url}`, `title:${l.title.trim().toLowerCase()}`];
    if (keys.some((k) => seen.has(k))) return false;
    keys.forEach((k) => seen.add(k));
    return true;
  });
}
