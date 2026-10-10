/**
 * Runs before `dev` and `build`. Writes src/data/snapshot.posts.json and
 * src/data/snapshot.projects.json from the Turso database (published rows only).
 *
 * The snapshot is what the site renders on first paint and what the sitemap,
 * RSS and prerendered <head> tags are built from, so pages stay instant and
 * crawlable. The browser then asks /api for anything newer.
 *
 * Without database credentials (a fresh clone, or a Lovable build) it falls
 * back to the original TypeScript content files, so the build never breaks.
 * If the database is configured but unreachable, the build fails rather than
 * silently shipping stale content; set CONTENT_ALLOW_STALE=1 to override.
 *
 * It also writes src/data/snapshot.trending.json, the /blog reading list
 * ("Worth reading elsewhere"), from the fetch-blogs edge function.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { loadEnv } from "./lib/env";
import { seedPosts, seedProjects } from "./lib/seed-entries";
import { db } from "../api/_lib/db";
import { toPost, toProject } from "../api/_lib/rows";
import type { BlogPost, ProjectEntry } from "../src/data/types";
import { DEFAULT_SUPABASE_ANON_KEY, DEFAULT_SUPABASE_URL } from "../src/lib/supabaseDefaults";
import { READING_LIST_SIZE, usableLinks } from "../src/lib/readingList";

loadEnv();

const TRENDING_FILE = "src/data/snapshot.trending.json";

/**
 * The reading list comes from the fetch-blogs edge function, which takes 3 to
 * 20 seconds to answer. A copy taken here renders with the page, and browsers
 * refresh it once it is an hour old. Vercel builds and `npm run
 * content:trending` take a fresh copy; other runs keep the committed one, so
 * starting the dev server does not change the working tree. A slow or failed
 * fetch keeps the previous copy too.
 */
/** Links in the current copy (0 when there is none). */
function previousLinkCount(): number {
  try {
    const prev = JSON.parse(readFileSync(TRENDING_FILE, "utf8")) as { links?: unknown[] };
    return Array.isArray(prev.links) ? prev.links.length : 0;
  } catch {
    return 0;
  }
}

async function syncTrending(): Promise<string> {
  const refresh = Boolean(process.env.VERCEL) || process.argv.includes("--trending") || !existsSync(TRENDING_FILE);
  if (!refresh) return "kept the committed copy";
  // Vercel has no VITE_SUPABASE_* variables; the app uses these same defaults.
  const base = process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_ANON_KEY;
  try {
    const res = await fetch(`${base}/functions/v1/fetch-blogs`, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: key, authorization: `Bearer ${key}` },
      body: "{}",
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { success?: boolean; partial?: boolean; posts?: BlogPost[] };
    const links = usableLinks(
      (data.posts ?? []).map(({ id, slug, title, source_url, published_at, tags }) => ({
        id,
        slug,
        title,
        source_url,
        published_at,
        tags: Array.isArray(tags) ? tags : [],
      }))
    );
    if (!data.success || links.length === 0) throw new Error("the feed returned no links");
    // An answer that would show fewer rows than the current copy (one of the
    // function's two feeds failed) does not replace it: /blog would ship short
    // and grow under readers once browsers refresh it. The same rule as
    // useTrendingLinks; the kept copy's old stamp makes browsers refresh soon.
    const rows = (n: number) => Math.min(READING_LIST_SIZE, n);
    if (rows(links.length) < rows(previousLinkCount())) {
      throw new Error(`${data.partial ? "a partial answer" : "an answer"} with ${links.length} links`);
    }
    // Always the fetch time (not write()'s "unchanged keeps the old stamp"):
    // browsers refresh the list once this copy is an hour old.
    writeFileSync(TRENDING_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), links }, null, 1));
    return `${links.length} links from the feed`;
  } catch (e) {
    if (!existsSync(TRENDING_FILE)) write(TRENDING_FILE, { generatedAt: new Date(0).toISOString(), links: [] });
    return `kept the previous copy (${(e as Error).message})`;
  }
}
// Runs alongside the database queries.
const trending = syncTrending();

/** Exits once the reading list is settled, so an early exit cannot cut it short. */
async function exit(code: number): Promise<never> {
  console.log(`content: reading list: ${await trending}`);
  process.exit(code);
}

const strip = <T extends { status?: unknown }>({ status: _s, ...rest }: T) => rest;

let posts: BlogPost[];
let projects: ProjectEntry[];
let source: "database" | "seed";

if (process.env.TURSO_DATABASE_URL) {
  try {
    const c = db();
    const [p, j] = await Promise.all([
      c.execute("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC"),
      c.execute("SELECT * FROM projects WHERE status = 'published' ORDER BY sort_order, id"),
    ]);
    posts = p.rows.map((r) => strip(toPost(r)));
    projects = j.rows.map(toProject);
    source = "database";
    if (posts.length === 0 && projects.length === 0) {
      console.warn("content: database is empty, run `npm run content:seed`; using seed files");
      posts = seedPosts().map(strip);
      projects = seedProjects();
      source = "seed";
    }
  } catch (e) {
    if (!process.env.CONTENT_ALLOW_STALE) {
      console.error("content: could not read the database:", (e as Error).message);
      await exit(1);
    }
    // Keep the last good snapshot rather than regressing to the seed files.
    console.warn("content: database unreachable, CONTENT_ALLOW_STALE set; keeping the existing snapshot");
    if (existsSync("src/data/snapshot.posts.json") && existsSync("src/data/snapshot.projects.json")) await exit(0);
    posts = seedPosts().map(strip);
    projects = seedProjects();
    source = "seed";
  }
} else {
  console.warn("content: TURSO_DATABASE_URL not set; using seed files");
  posts = seedPosts().map(strip);
  projects = seedProjects();
  source = "seed";
}

const generatedAt = new Date().toISOString();

/**
 * Writes a snapshot file, keeping it byte-identical (old timestamp included)
 * when the content has not changed, so a dev start or a build does not leave
 * a modified file in the working tree.
 */
function write(file: string, body: { generatedAt: string } & Record<string, unknown>) {
  let prev: Record<string, unknown> | null = null;
  try {
    prev = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
  } catch {
    prev = null;
  }
  const same = prev !== null && JSON.stringify({ ...prev, generatedAt: "" }) === JSON.stringify({ ...body, generatedAt: "" });
  writeFileSync(file, JSON.stringify(same ? { ...body, generatedAt: prev!.generatedAt } : body, null, 1));
}

write("src/data/snapshot.posts.json", { generatedAt, source, posts });
write("src/data/snapshot.projects.json", { generatedAt, source, projects });
// The home page only needs counts; keeping them in their own file keeps both
// snapshots out of the entry bundle.
// Everything /projects lists: projects with a card, a page, or both.
const listed = projects.length;
write("src/data/snapshot.meta.json", { generatedAt, source, postCount: posts.length, projectCount: listed });
console.log(`content: snapshot from ${source} (${posts.length} posts, ${projects.length} projects)`);
console.log(`content: reading list: ${await trending}`);
