import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/data/types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabasePublic";
import snapshot from "@/data/snapshot.trending.json";

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

const fix = (v: string) => v.replace(/\s—\s/g, ", ").replace(/—/g, ", ");

/**
 * Remote content is normalised before it renders. The site's own copy carries
 * no em dashes, and text arriving from the edge function (or from a cache
 * written before the function was redeployed) must not reintroduce them.
 */
function normalise(posts: BlogPost[]): BlogPost[] {
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

/*
 * A plain fetch to the public edge function. It used to go through
 * supabase.functions.invoke, which made the whole supabase-js client (~60 kB
 * gzipped) a static dependency of both blog routes for one GET.
 */
async function invokeFetchBlogs(): Promise<{ success?: boolean; posts?: BlogPost[] } | null> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-blogs`, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: SUPABASE_ANON_KEY, authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    body: "{}",
  });
  if (!res.ok) return null;
  return res.json();
}

/** This browser's cached copy, else the edge function; null when neither has posts. */
async function loadTrending(): Promise<BlogPost[] | null> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const data = await invokeFetchBlogs();
    if (!data?.success || !data.posts?.length) return null;
    const posts = normalise(data.posts);
    setCache(posts);
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

/** What the /blog reading list shows of each curated link. */
export type TrendingLink = Pick<BlogPost, "id" | "slug" | "title" | "source_url" | "published_at" | "tags">;

const toLink = ({ id, slug, title, source_url, published_at, tags }: BlogPost): TrendingLink => ({
  id,
  slug,
  title,
  source_url,
  published_at,
  tags: Array.isArray(tags) ? tags : [],
});

// Typed here so an empty copy (links: []) still type-checks.
const built: { generatedAt: string; links: TrendingLink[] } = snapshot;

/**
 * The /blog reading list. It starts from the copy taken at build time
 * (scripts/sync-content.ts), so it renders with the page instead of arriving
 * seconds later and pushing the newsletter block down. Once that copy is an
 * hour old the browser refreshes it; a failed or empty refresh keeps the list.
 */
export const useTrendingLinks = () => {
  return useQuery<TrendingLink[]>({
    queryKey: ["trending-links"],
    queryFn: async () => {
      const posts = await loadTrending();
      if (!posts) throw new Error("reading list unavailable");
      return posts.map(toLink);
    },
    initialData: () => built.links.map((l) => ({ ...l, title: fix(l.title) })),
    initialDataUpdatedAt: Date.parse(built.generatedAt) || 0,
    staleTime: CACHE_TTL,
    retry: 1,
  });
};
