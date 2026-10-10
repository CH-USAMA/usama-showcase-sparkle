import { db } from "../_lib/db.js";
import { toProject } from "../_lib/rows.js";
import { error, guard, json } from "../_lib/http.js";
import { requireAdmin, triggerRebuild } from "../_lib/auth.js";
import { ProjectInput, parse } from "../_lib/validate.js";

/**
 * Admin CRUD for projects. Every method requires an allowlisted admin session.
 *
 * GET    /api/admin/projects        → all projects incl. drafts
 * POST   /api/admin/projects        → create (id optional: next free id)
 * PUT    /api/admin/projects        → replace (body.id required; send every field)
 * DELETE /api/admin/projects?id=:id → delete
 *
 * The detail page's own `project.id` and the card's `detailPath` are kept in
 * step with the row id here, so the editor cannot point a card at the wrong
 * page.
 */

function normalise(p: ProjectInput, id: number) {
  const project = p.project ? { ...p.project, id } : null;
  const caseStudy = p.caseStudy
    ? { ...p.caseStudy, detailPath: project ? `/project/${id}` : undefined }
    : null;
  return {
    project: project ? JSON.stringify(project) : null,
    caseStudy: caseStudy ? JSON.stringify(caseStudy) : null,
  };
}

export function GET(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const r = await db().execute("SELECT * FROM projects ORDER BY sort_order, id");
    return json(r.rows.map(toProject));
  });
}

export function POST(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const p = await parse(request, ProjectInput);
    const id =
      p.id ??
      Number((await db().execute("SELECT COALESCE(MAX(id), 0) + 1 AS next FROM projects")).rows[0].next);
    const { project, caseStudy } = normalise(p, id);
    try {
      await db().execute({
        sql: `INSERT INTO projects (id, slug, status, featured, sort_order, project, case_study)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [id, p.slug, p.status, p.featured, p.sortOrder, project, caseStudy],
      });
    } catch (e) {
      if (String(e).includes("UNIQUE")) return error(409, "A project with that slug or id already exists");
      throw e;
    }
    await triggerRebuild();
    const r = await db().execute({ sql: "SELECT * FROM projects WHERE id = ?", args: [id] });
    return json(toProject(r.rows[0]), { status: 201 });
  });
}

export function PUT(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const p = await parse(request, ProjectInput);
    if (!p.id) return error(400, "id is required");
    const { project, caseStudy } = normalise(p, p.id);
    let changed: number;
    try {
      const r = await db().execute({
        sql: `UPDATE projects SET slug = ?, status = ?, featured = ?, sort_order = ?, project = ?, case_study = ?,
                updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
              WHERE id = ?`,
        args: [p.slug, p.status, p.featured, p.sortOrder, project, caseStudy, p.id],
      });
      changed = r.rowsAffected;
    } catch (e) {
      if (String(e).includes("UNIQUE")) return error(409, "Another project already uses that slug");
      throw e;
    }
    if (!changed) return error(404, "Not found");
    await triggerRebuild();
    const r = await db().execute({ sql: "SELECT * FROM projects WHERE id = ?", args: [p.id] });
    return json(toProject(r.rows[0]));
  });
}

export function DELETE(request: Request) {
  return guard(async () => {
    await requireAdmin(request);
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) return error(400, "id is required");
    const r = await db().execute({ sql: "DELETE FROM projects WHERE id = ?", args: [id] });
    if (!r.rowsAffected) return error(404, "Not found");
    await triggerRebuild();
    return json({ ok: true });
  });
}
