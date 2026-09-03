import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/data/blogs";

const CACHE_KEY = "trending-blogs-cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  posts: BlogPost[];
  timestamp: number;
}

function getCached(): BlogPost[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (Date.now() - cached.timestamp < CACHE_TTL) return normalise(cached.posts);
  } catch {
    /* Corrupt or unreadable cache: fall through and refetch. */
  }
  return null;
}

/**
 * Remote content is normalised before it renders. The site's own copy carries
 * no em dashes, and text arriving from the edge function (or from a cache
 * written before the function was redeployed) must not reintroduce them.
 */
function normalise(posts: BlogPost[]): BlogPost[] {
  const fix = (v: string) =>
    v.replace(/\s—\s/g, ", ").replace(/—/g, ", ");
  return posts.map((p) => ({
    ...p,
    title: typeof p.title === "string" ? fix(p.title) : p.title,
    excerpt: typeof p.excerpt === "string" ? fix(p.excerpt) : p.excerpt,
    content: typeof p.content === "string" ? fix(p.content) : p.content,
  }));
}

function setCache(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, timestamp: Date.now() }));
  } catch {
    /* Caching is an optimisation; failing to write it must not break the page. */
  }
}

export const useTrendingBlogs = () => {
  return useQuery<BlogPost[]>({
    queryKey: ["trending-blogs"],
    queryFn: async () => {
      const cached = getCached();
      if (cached) return cached;

      try {
        const { data, error } = await supabase.functions.invoke("fetch-blogs");
        if (error || !data?.success) return cached || [];
        const posts = normalise(data.posts as BlogPost[]);
        setCache(posts);
        return posts;
      } catch {
        return cached || [];
      }
    },
    staleTime: CACHE_TTL,
    retry: 1,
  });
};
