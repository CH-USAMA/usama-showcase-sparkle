/**
 * npm run content:seed [-- --force]
 *
 * Creates the tables and copies the original blog posts and projects into the
 * Turso database. Rows that already exist are left alone, so it is safe to run
 * again and never overwrites edits made in /admin. `--force` overwrites them.
 */
import { loadEnv } from "./lib/env";
import { seedPosts, seedProjects } from "./lib/seed-entries";
import { db, ensureSchema } from "../api/_lib/db";

loadEnv();
const force = process.argv.includes("--force");
const verb = force ? "INSERT OR REPLACE" : "INSERT OR IGNORE";

const c = db();
await ensureSchema(c);

const posts = seedPosts();
const projects = seedProjects();

const statements = [
  ...posts.map((p) => ({
    sql: `${verb} INTO posts (id, slug, title, seo_title, excerpt, content, featured_image, author, tags, status, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [p.id, p.slug, p.title, p.seo_title ?? null, p.excerpt, p.content, p.featured_image, p.author, JSON.stringify(p.tags), p.status, p.published_at],
  })),
  ...projects.map((e) => ({
    sql: `${verb} INTO projects (id, slug, status, featured, sort_order, project, case_study)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      e.id,
      e.slug,
      e.status,
      e.featured,
      e.sortOrder,
      e.project ? JSON.stringify(e.project) : null,
      e.caseStudy ? JSON.stringify(e.caseStudy) : null,
    ],
  })),
];

const results = await c.batch(statements, "write");
const written = results.reduce((n, r) => n + r.rowsAffected, 0);
const [pc, jc] = await Promise.all([
  c.execute("SELECT COUNT(*) AS n FROM posts"),
  c.execute("SELECT COUNT(*) AS n FROM projects"),
]);
console.log(
  `seed: ${written} rows written (${force ? "overwrite" : "insert-if-missing"}); ` +
    `database now has ${pc.rows[0].n} posts and ${jc.rows[0].n} projects`
);
