import { db } from "./_lib/db.js";
import { POST_LIST_COLUMNS, toPost } from "./_lib/rows.js";
import { MISSING_CACHE, PUBLIC_CACHE, guard, head, json } from "./_lib/http.js";

/**
 * GET /api/posts            → published posts, newest first, without bodies
 * GET /api/posts?slug=:slug → one published post, with its markdown body
 */
export function GET(request: Request) {
  return guard(async () => {
    const slug = new URL(request.url).searchParams.get("slug");

    if (slug) {
      const r = await db().execute({
        sql: "SELECT * FROM posts WHERE slug = ? AND status = 'published' LIMIT 1",
        args: [slug],
      });
      // Cached briefly like the list, so repeat visits to a wrong /blog/
      // URL do not each cost a function run and a database query.
      if (!r.rows[0]) return json({ error: "Not found" }, { status: 404, cache: MISSING_CACHE });
      const { status: _s, ...post } = toPost(r.rows[0]);
      return json(post, { cache: PUBLIC_CACHE });
    }

    const r = await db().execute(
      `SELECT ${POST_LIST_COLUMNS} FROM posts WHERE status = 'published' ORDER BY published_at DESC`
    );
    const posts = r.rows.map((row) => {
      const { status: _s, ...post } = toPost(row, false);
      return post;
    });
    return json(posts, { cache: PUBLIC_CACHE });
  });
}

/** HEAD: the GET response's status and headers (uptime monitors use it). */
export const HEAD = head(GET);
