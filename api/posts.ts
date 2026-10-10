import { db } from "./_lib/db.js";
import { POST_LIST_COLUMNS, toPost } from "./_lib/rows.js";
import { PUBLIC_CACHE, error, guard, json } from "./_lib/http.js";

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
      if (!r.rows[0]) return error(404, "Not found");
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
