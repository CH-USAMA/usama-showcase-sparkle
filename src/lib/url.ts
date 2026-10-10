/**
 * Returns the URL if it is safe to put in an href or src: http(s), mailto, or
 * a site-relative path. Anything else (javascript:, data:, vbscript:,
 * protocol-relative //host, and "/\host", which browsers treat as //host)
 * returns undefined, so the caller renders no link at all.
 *
 * Content now comes from the database through /admin, so every user-supplied
 * URL passes through here before it reaches the DOM.
 */
export function safeHref(url?: string | null): string | undefined {
  if (!url) return undefined;
  const v = url.trim();
  if (!v || v === "#") return undefined;
  if (/^https?:\/\/[^\s]+$/i.test(v) || /^mailto:[^\s]+$/i.test(v)) return v;
  if (/^\/(?![/\\])[^\s\\]*$/.test(v)) return v;
  return undefined;
}
