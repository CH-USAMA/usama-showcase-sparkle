/**
 * Fetch helper for the content API.
 *
 * Where /api does not exist (vite preview, the Lovable editor preview) the SPA
 * fallback answers with index.html and a 200, so the content type is checked
 * rather than trusting the status. Any failure throws, and React Query keeps
 * showing the build snapshot.
 */
export class NotFoundError extends Error {}

export async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  const json = res.headers.get("content-type")?.includes("application/json");
  // Only the API's own JSON 404 means "this item does not exist". A plain 404
  // means there is no API here at all (vite preview, static hosting), and the
  // build snapshot must keep being shown.
  if (res.status === 404 && json) throw new NotFoundError(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  if (!json) throw new Error(`${url} did not return JSON`);
  return res.json() as Promise<T>;
}

/** Shared freshness: content is re-checked at most once a minute per tab. */
export const CONTENT_STALE_MS = 60_000;
