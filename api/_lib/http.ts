/** Small Response helpers shared by the functions in /api. */

/**
 * Public reads are cached at Vercel's edge: one minute fresh, then served
 * stale for up to a day while a background request refreshes it. A new post
 * is live within about a minute without the database being hit per visitor.
 */
export const PUBLIC_CACHE = "public, max-age=0, s-maxage=60, stale-while-revalidate=86400";

export function json(data: unknown, init: { status?: number; cache?: string } = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": init.cache ?? "no-store",
    },
  });
}

export const error = (status: number, message: string) => json({ error: message }, { status });

/** A public "not found": cached at the edge for a minute, like the content it stands in for. */
export const MISSING_CACHE = "public, max-age=0, s-maxage=60";

/** A HEAD handler from a GET handler: same status and headers, no body. */
export const head =
  (get: (request: Request) => Promise<Response>) =>
  async (request: Request): Promise<Response> => {
    const res = await get(request);
    return new Response(null, { status: res.status, headers: res.headers });
  };

/** Turns a thrown error into a JSON 500 without leaking internals. */
export async function guard(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Response) return e;
    console.error("[api]", e);
    return error(500, "Internal error");
  }
}
