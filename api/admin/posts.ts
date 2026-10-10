import { db } from "../_lib/db.js";
import { toPost } from "../_lib/rows.js";
import { error, guard, json } from "../_lib/http.js";
import { requireAdmin, triggerRebuild } from "../_lib/auth.js";
import { PostInput, parse } from "../_lib/validate.js";

/**
 * Admin CRUD for posts. Every method requires an allowlisted admin session.
 *
 * GET    /api/admin/posts          → all posts incl. drafts, with bodies
 * POST   /api/admin/posts          → create
 * PUT    /api/admin/posts          → replace (body.id required; send every field,
 *                                    omitted ones reset to their defaults)
 * DELETE /api/admin/posts?id=:id   → delete
 */

export function GET(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const r = await db().execute("SELECT * FROM posts ORDER BY published_at DESC");
    return json(r.rows.map((row) => toPost(row)));
  });
}

export function POST(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const p = await parse(request, PostInput);
    const id = p.id ?? crypto.randomUUID();
    const publishedAt = p.published_at ?? new Date().toISOString();
    try {
      await db().execute({
        sql: `INSERT INTO posts (id, slug, title, excerpt, content, featured_image, author, tags, status, published_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, p.slug, p.title, p.excerpt, p.content, p.featured_image, p.author, JSON.stringify(p.tags), p.status, publishedAt],
      });
    } catch (e) {
      if (String(e).includes("UNIQUE")) return error(409, "A post with that slug or id already exists");
      throw e;
    }
    await triggerRebuild();
    const r = await db().execute({ sql: "SELECT * FROM posts WHERE id = ?", args: [id] });
    return json(toPost(r.rows[0]), { status: 201 });
  });
}

export function PUT(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const p = await parse(request, PostInput);
    if (!p.id) return error(400, "id is required");
    let changed: number;
    try {
      const r = await db().execute({
        sql: `UPDATE posts SET slug = ?, title = ?, excerpt = ?, content = ?, featured_image = ?, author = ?,
                tags = ?, status = ?, published_at = COALESCE(?, published_at),
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
              WHERE id = ?`,
        args: [p.slug, p.title, p.excerpt, p.content, p.featured_image, p.author, JSON.stringify(p.tags), p.status, p.published_at ?? null, p.id],
      });
      changed = r.rowsAffected;
    } catch (e) {
      if (String(e).includes("UNIQUE")) return error(409, "Another post already uses that slug");
      throw e;
    }
    if (!changed) return error(404, "Not found");
    await triggerRebuild();
    const r = await db().execute({ sql: "SELECT * FROM posts WHERE id = ?", args: [p.id] });
    return json(toPost(r.rows[0]));
  });
}

export function DELETE(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return error(400, "id is required");
    const r = await db().execute({ sql: "DELETE FROM posts WHERE id = ?", args: [id] });
    if (!r.rowsAffected) return error(404, "Not found");
    await triggerRebuild();
    return json({ ok: true });
  });
}
