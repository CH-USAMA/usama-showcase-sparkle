import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/data/types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabasePublic";

const CACHE_KEY = "trending-blogs-cache";
export const CACHE_TTL = 1000 * 60 * 60; // 1 hour
/**
 * Only complete answers are cached; a partial one (one of the function's two
 * feeds failed) is used but not cached, so the next view asks again. The
 * function says so with `partial`; the deployed version may predate that
 * flag, and a complete answer from it had 10 posts.
 */
const FULL_ANSWER = 10;

interface CachedData {
  posts: BlogPost[];
  timestamp: number;
  /** Set on complete answers; older caches have no flag. */
  complete?: boolean;
}

function getCached(): BlogPost[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    const complete = cached.complete ?? cached.posts?.length >= FULL_ANSWER;
    if (Date.now() - cached.timestamp < CACHE_TTL && complete) return normalise(cached.posts);
  } catch {
    /* Corrupt or unreadable cache: fall through and refetch. */
  }
  return null;
}

/** The site's copy carries no em dashes; text from the feed is cleaned to match. */
export const cleanText = (v: string) => v.replace(/\s—\s/g, ", ").replace(/—/g, ", ");

/**
 * Remote content is normalised before it renders. The site's own copy carries
 * no em dashes, and text arriving from the edge function (or from a cache
 * written before the function was redeployed) must not reintroduce them.
 */
function normalise(posts: BlogPost[]): BlogPost[] {
  return posts.map((p) => ({
    ...p,
    title: typeof p.title === "string" ? cleanText(p.title) : p.title,
    excerpt: typeof p.excerpt === "string" ? cleanText(p.excerpt) : p.excerpt,
    content: typeof p.content === "string" ? cleanText(p.content) : p.content,
  }));
}

function setCache(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, timestamp: Date.now(), complete: true }));
  } catch {
    /* Caching is an optimisation; failing to write it must not break the page. */
  }
}

/*
 * A plain fetch to the public edge function. It used to go through
 * supabase.functions.invoke, which made the whole supabase-js client (~60 kB
 * gzipped) a static dependency of both blog routes for one GET.
 */
async function invokeFetchBlogs(): Promise<{ success?: boolean; partial?: boolean; posts?: BlogPost[] } | null> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-blogs`, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: SUPABASE_ANON_KEY, authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    body: "{}",
  });
  if (!res.ok) return null;
  return res.json();
}

/** This browser's cached copy, else the edge function; null when neither has posts. */
export async function loadTrending(): Promise<BlogPost[] | null> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const data = await invokeFetchBlogs();
    if (!data?.success || !data.posts?.length) return null;
    const posts = normalise(data.posts);
    const complete = data.partial === false || (data.partial === undefined && posts.length >= FULL_ANSWER);
    if (complete) setCache(posts);
    return posts;
  } catch {
    return null;
  }
}

/** Full curated posts, for /blog/:slug of a curated link. */
export const useTrendingBlogs = () => {
  return useQuery<BlogPost[]>({
    queryKey: ["trending-blogs"],
    queryFn: async () => (await loadTrending()) ?? [],
    staleTime: CACHE_TTL,
    retry: 1,
  });
};

