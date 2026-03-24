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
    if (Date.now() - cached.timestamp < CACHE_TTL) return cached.posts;
  } catch {}
  return null;
}

function setCache(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, timestamp: Date.now() }));
  } catch {}
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
        const posts = data.posts as BlogPost[];
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
