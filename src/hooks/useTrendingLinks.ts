import { useQuery, useQueryClient } from "@tanstack/react-query";
import snapshot from "@/data/snapshot.trending.json";
import type { BlogPost } from "@/data/types";
import { CACHE_TTL, cleanText, loadTrending } from "@/hooks/useTrendingBlogs";
import { READING_LIST_SIZE, usableLinks, type ReadingLink } from "@/lib/readingList";

const KEY = ["trending-links"];

const toLink = ({ id, slug, title, source_url, published_at, tags }: BlogPost): ReadingLink => ({
  id,
  slug,
  title,
  source_url,
  published_at,
  tags: Array.isArray(tags) ? tags : [],
});

// Typed here so an empty copy (links: []) still type-checks.
const built: { generatedAt: string; links: ReadingLink[] } = snapshot;

/**
 * The /blog reading list. It starts from the copy taken at build time
 * (scripts/sync-content.ts), so it renders with the page instead of arriving
 * seconds later and pushing the newsletter block down. Once that copy is an
 * hour old the browser refreshes it, but a refresh never leaves fewer rows
 * than are on screen: the feed answers with half its links when one of its
 * sources fails, and a shorter list would pull everything below it up. Such a
 * refresh, or a failed or empty one, keeps the list as it is.
 *
 * Only /blog imports this module, so post pages do not download the copy.
 */
export const useTrendingLinks = () => {
  const client = useQueryClient();
  return useQuery<ReadingLink[]>({
    queryKey: KEY,
    queryFn: async () => {
      const posts = await loadTrending();
      if (!posts) throw new Error("reading list unavailable");
      const fresh = usableLinks(posts.map(toLink));
      const shown = Math.min(READING_LIST_SIZE, client.getQueryData<ReadingLink[]>(KEY)?.length ?? 0);
      if (fresh.length < shown) throw new Error("partial reading list");
      return fresh;
    },
    initialData: () => usableLinks(built.links.map((l) => ({ ...l, title: cleanText(l.title) }))),
    initialDataUpdatedAt: Date.parse(built.generatedAt) || 0,
    staleTime: CACHE_TTL,
    retry: 1,
  });
};
