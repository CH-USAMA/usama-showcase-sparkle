import { useQuery } from "@tanstack/react-query";
import snapshot from "@/data/snapshot.posts.json";
import type { BlogPost } from "@/data/types";
import { CONTENT_STALE_MS, NotFoundError, getJSON } from "./fetch";

/**
 * Blog posts: the build snapshot first, then the live database.
 *
 * The snapshot (written from Turso by scripts/sync-content.ts at build time)
 * renders instantly and is what crawlers see. React Query then asks /api/posts
 * for anything published since the build. The snapshot is dated 0 (always
 * stale), so that check happens on first use whatever the visitor's clock
 * says; comparing against the build time skipped it for clocks running behind.
 */
const SNAP = snapshot as { generatedAt: string; posts: BlogPost[] };

export const snapshotPosts: BlogPost[] = SNAP.posts;

export function usePosts(): BlogPost[] {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const list = await getJSON<BlogPost[]>("/api/posts");
      // The list endpoint omits bodies; keep the ones the snapshot already has.
      const bodies = new Map(SNAP.posts.map((p) => [p.slug, p.content]));
      return list.map((p) => ({ ...p, content: p.content || bodies.get(p.slug) || "" }));
    },
    initialData: SNAP.posts,
    initialDataUpdatedAt: 0,
    staleTime: CONTENT_STALE_MS,
    retry: 1,
  });
  return data;
}

/**
 * One post with its body. `post` is undefined while a post that is newer
 * than the snapshot is still loading, and null once it is known not to exist.
 */
export function usePost(slug: string | undefined): { post: BlogPost | null | undefined; loading: boolean } {
  const fromSnapshot = SNAP.posts.find((p) => p.slug === slug);
  const q = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      try {
        return await getJSON<BlogPost>(`/api/posts?slug=${encodeURIComponent(slug ?? "")}`);
      } catch (e) {
        if (e instanceof NotFoundError) return null;
        throw e;
      }
    },
    enabled: Boolean(slug),
    initialData: fromSnapshot,
    initialDataUpdatedAt: 0,
    staleTime: CONTENT_STALE_MS,
    retry: false,
  });

  if (q.data !== undefined) return { post: q.data, loading: false };
  // Not in the snapshot: loading until the API answers. If the API is not
  // there at all, the post does not exist as far as this build knows.
  return { post: q.isError ? null : undefined, loading: q.isFetching || q.isPending };
}
