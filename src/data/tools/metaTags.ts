/**
 * Builds the <head> tags for /tools/meta-tag-generator and checks them
 * against the limits search results and link previews show. No words: the
 * labels and advice live in src/i18n/tools/<locale>.ts under `meta`.
 */

/** About what Google shows before it cuts a title or description. */
export const TITLE_MAX = 60;
export const DESC_MIN = 70;
export const DESC_MAX = 160;

export type OgType = "website" | "article";

export interface MetaInput {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  imageAlt: string;
  type: OgType;
  /** X handle, with or without the @. */
  twitter: string;
  noindex: boolean;
}

/** For values inside double-quoted HTML attributes. */
const attr = (s: string) => s.trim().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (s: string) => s.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const handleOf = (s: string) => {
  const h = s.trim().replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, "").replace(/^@/, "").replace(/[/?#].*$/, "");
  return h ? `@${h}` : "";
};

/** Only absolute http(s) URLs are usable in og:image and canonical. */
export const httpUrl = (s: string): URL | null => {
  try {
    const u = new URL(s.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u : null;
  } catch {
    return null;
  }
};

export function buildTags(i: MetaInput): string {
  const lines: string[] = [];
  const add = (cond: unknown, line: string) => {
    if (cond) lines.push(line);
  };
  const twitter = handleOf(i.twitter);
  const image = httpUrl(i.image) ? i.image : "";
  const url = httpUrl(i.url) ? i.url : "";

  add(i.title.trim(), `<title>${text(i.title)}</title>`);
  add(i.description.trim(), `<meta name="description" content="${attr(i.description)}" />`);
  add(url, `<link rel="canonical" href="${attr(url)}" />`);
  add(i.noindex, `<meta name="robots" content="noindex, follow" />`);
  lines.push("");
  lines.push(`<meta property="og:type" content="${i.type}" />`);
  add(i.title.trim(), `<meta property="og:title" content="${attr(i.title)}" />`);
  add(i.description.trim(), `<meta property="og:description" content="${attr(i.description)}" />`);
  add(url, `<meta property="og:url" content="${attr(url)}" />`);
  add(i.siteName.trim(), `<meta property="og:site_name" content="${attr(i.siteName)}" />`);
  add(image, `<meta property="og:image" content="${attr(image)}" />`);
  add(image && i.imageAlt.trim(), `<meta property="og:image:alt" content="${attr(i.imageAlt)}" />`);
  lines.push("");
  lines.push(`<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`);
  add(twitter, `<meta name="twitter:site" content="${attr(twitter)}" />`);
  // X reads og:title, og:description and og:image when its own tags are missing.
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export type CheckId = "title" | "description" | "url" | "image" | "imageAlt" | "noindex";
export type CheckLevel = "ok" | "warn" | "bad";

export interface MetaCheck {
  id: CheckId;
  level: CheckLevel;
  /** The key of the message under meta.checks[id]. */
  message: string;
}

export function checksOf(i: MetaInput): MetaCheck[] {
  const t = i.title.trim().length;
  const d = i.description.trim().length;
  const url = httpUrl(i.url);
  const image = httpUrl(i.image);
  return [
    { id: "title", level: t === 0 ? "bad" : t > TITLE_MAX ? "warn" : t < 20 ? "warn" : "ok", message: t === 0 ? "missing" : t > TITLE_MAX ? "long" : t < 20 ? "short" : "ok" },
    { id: "description", level: d === 0 ? "bad" : d > DESC_MAX || d < DESC_MIN ? "warn" : "ok", message: d === 0 ? "missing" : d > DESC_MAX ? "long" : d < DESC_MIN ? "short" : "ok" },
    { id: "url", level: !i.url.trim() ? "warn" : !url ? "bad" : url.protocol === "https:" ? "ok" : "warn", message: !i.url.trim() ? "missing" : !url ? "invalid" : url.protocol === "https:" ? "ok" : "http" },
    { id: "image", level: !i.image.trim() ? "warn" : image ? "ok" : "bad", message: !i.image.trim() ? "missing" : image ? "ok" : "invalid" },
    { id: "imageAlt", level: !image ? "ok" : i.imageAlt.trim() ? "ok" : "warn", message: !image ? "na" : i.imageAlt.trim() ? "ok" : "missing" },
    { id: "noindex", level: i.noindex ? "warn" : "ok", message: i.noindex ? "on" : "off" },
  ].filter((c) => c.message !== "na") as MetaCheck[];
}

/** Cuts at a word boundary and adds an ellipsis, the way result pages do. */
export const clip = (s: string, max: number) => {
  const v = s.trim().replace(/\s+/g, " ");
  if (v.length <= max) return v;
  const cut = v.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–-]+$/, "")}…`;
};

/** "www.example.com › blog › post", as Google prints a result's address. */
export const breadcrumbOf = (u: URL) => {
  const part = (s: string) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  };
  return [u.hostname, ...u.pathname.split("/").filter(Boolean).map(part)].join(" › ");
};
