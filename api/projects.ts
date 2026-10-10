import { db } from "./_lib/db.js";
import { toProject } from "./_lib/rows.js";
import { PUBLIC_CACHE, guard, head, json } from "./_lib/http.js";

/** GET /api/projects → every published project entry, in display order. */
export function GET() {
  return guard(async () => {
    const r = await db().execute(
      "SELECT * FROM projects WHERE status = 'published' ORDER BY sort_order, id"
    );
    return json(r.rows.map(toProject), { cache: PUBLIC_CACHE });
  });
}

/** HEAD: the GET response's status and headers (uptime monitors use it). */
export const HEAD = head(GET);
