// Runs before `vite dev` and `vite build` via predev/prebuild hooks.
// Writes public/sitemap.xml and public/rss.xml from one parse of the blog data,
// so the two can no longer drift apart (rss.xml used to be hand-maintained and
// was missing the seven newest posts).

import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { projectsData } from "../src/data/projects";
import { servicesData } from "../src/data/services";

// blogs.ts imports image assets, which Node cannot resolve outside Vite,
// so post fields are parsed from the source file instead of imported.
const blogSource = readFileSync(resolve("src/data/blogs.ts"), "utf8");

// Two passes rather than one big pattern: title/slug/excerpt are contiguous
// fields, but `content` (a template literal that can itself contain the text
// "published_at:") sits between excerpt and published_at. Matching the date
// from the slug separately keeps a code sample inside a post from capturing it.
const meta = new Map(
  Array.from(
    blogSource.matchAll(
      /title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*slug:\s*"([^"]+)"\s*,\s*excerpt:\s*"((?:[^"\\]|\\.)*)"/g
    )
  ).map((m) => [m[2], { title: m[1], excerpt: m[3] }])
);

const blogsData = Array.from(
  blogSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?published_at:\s*"([^"]+)"/g)
).map((m) => ({
  slug: m[1],
  published_at: m[2],
  title: meta.get(m[1])?.title ?? m[1],
  excerpt: meta.get(m[1])?.excerpt ?? "",
}));

if (blogsData.length === 0) throw new Error("parsed 0 blog posts from src/data/blogs.ts");
const missing = blogsData.filter((p) => !meta.has(p.slug)).map((p) => p.slug);
if (missing.length) throw new Error(`no title/excerpt parsed for: ${missing.join(", ")}`);

const BASE_URL = "https://dev-usama-portfolio.vercel.app";

// JS string escapes survive the regex verbatim; unescape the two that occur.
const unescapeJs = (s: string) => s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
const xml = (s: string) =>
  unescapeJs(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/book", changefreq: "weekly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/laravel-scaling-checklist", changefreq: "monthly", priority: "0.8" },
];

const serviceEntries: SitemapEntry[] = servicesData.map((s) => ({
  path: `/services/${s.slug}`,
  changefreq: "monthly",
  priority: "0.85",
}));

const projectEntries: SitemapEntry[] = Object.keys(projectsData).map((id) => ({
  path: `/project/${id}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const today = new Date().toISOString().slice(0, 10);
const blogEntries: SitemapEntry[] = blogsData.map((post) => ({
  path: `/blog/${post.slug}`,
  lastmod: (post.published_at || today).slice(0, 10),
  changefreq: "monthly",
  priority: "0.8",
}));

const entries = [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

function generateRss() {
  // Newest first, the order a reader expects.
  const posts = [...blogsData].sort(
    (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
  );

  const rfc822 = (d: string) => new Date(d).toUTCString();

  // Derived from the newest post rather than Date.now(), so regenerating
  // without a content change produces a byte-identical file (no git churn
  // on every build).
  const lastBuildDate = posts.length ? rfc822(posts[0].published_at) : new Date(0).toUTCString();

  const items = posts.map((p) => {
    const url = `${BASE_URL}/blog/${p.slug}`;
    return [
      `    <item>`,
      `      <title>${xml(p.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${rfc822(p.published_at)}</pubDate>`,
      `      <description>${xml(p.excerpt)}</description>`,
      `    </item>`,
    ].join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>Usama Munawar | Laravel, VoIP &amp; AI Engineering Blog</title>`,
    `    <link>${BASE_URL}/blog</link>`,
    `    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <description>Deep dives on Laravel, VoIP/Asterisk, n8n automation, AI agents, and production engineering by Usama Munawar.</description>`,
    `    <language>en-us</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    ``,
    ...items,
    `  </channel>`,
    `</rss>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);

writeFileSync(resolve("public/rss.xml"), generateRss());
console.log(`rss.xml written (${blogsData.length} posts)`);
