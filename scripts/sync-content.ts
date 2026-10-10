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
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { loadEnv } from "./lib/env";
import { seedPosts, seedProjects } from "./lib/seed-entries";
import { db } from "../api/_lib/db";
import { toPost, toProject } from "../api/_lib/rows";
import type { BlogPost, ProjectEntry } from "../src/data/types";

loadEnv();

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
      process.exit(1);
    }
    // Keep the last good snapshot rather than regressing to the seed files.
    console.warn("content: database unreachable, CONTENT_ALLOW_STALE set; keeping the existing snapshot");
    if (existsSync("src/data/snapshot.posts.json") && existsSync("src/data/snapshot.projects.json")) process.exit(0);
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
