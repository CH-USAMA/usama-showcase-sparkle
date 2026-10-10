// Runs before `vite dev` and `vite build` via predev/prebuild hooks.
// Writes public/sitemap.xml and public/rss.xml from one parse of the blog data,
// so the two can no longer drift apart (rss.xml used to be hand-maintained and
// was missing the seven newest posts).

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { servicesData } from "../src/data/services";
import type { BlogPost, ProjectEntry } from "../src/data/types";

// Content comes from the snapshot that scripts/sync-content.ts writes from the
// database just before this runs, so posts published in /admin are indexed on
// the next build.
const { posts: blogsData } = JSON.parse(readFileSync("src/data/snapshot.posts.json", "utf8")) as {
  posts: BlogPost[];
};
const { projects } = JSON.parse(readFileSync("src/data/snapshot.projects.json", "utf8")) as {
  projects: ProjectEntry[];
};
const projectIds = projects.filter((e) => e.project).map((e) => e.id);

if (blogsData.length === 0) throw new Error("snapshot has 0 blog posts; run `npm run content:sync`");

const BASE_URL = "https://www.chaudharyusama.com";

// Values come from JSON now, so there are no source-level escapes to undo.
const unescapeJs = (s: string) => s;
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

const projectEntries: SitemapEntry[] = projectIds.map((id) => ({
  path: `/project/${id}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const blogEntries: SitemapEntry[] = blogsData.map((post) => ({
  path: `/blog/${post.slug}`,
  // Last real edit (updated_at only moves when a post is edited in /admin),
  // else publication. Never a build-day fallback.
  lastmod: (post.updated_at ?? post.published_at)?.slice(0, 10),
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
    `    <title>Usama Munawar | React, Node.js &amp; Laravel Engineering Blog</title>`,
    `    <link>${BASE_URL}/blog</link>`,
    `    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <description>Deep dives on React, React Native, Node.js, TypeScript, Laravel/PHP, VoIP, automation, and AI engineering by Usama Munawar.</description>`,
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

// llms.txt: the hand-written intro and facts (scripts/llms.template.md) with
// the page, project and post lists generated from the same snapshot, so its
// links can no longer point at the wrong pages.
function generateLlms() {
  // Git may check the template out with CRLF endings on Windows.
  const tpl = readFileSync(resolve("scripts/llms.template.md"), "utf8").replace(/\r\n/g, "\n");
  const line = (title: string, path: string, note?: string) =>
    `- [${title}](${BASE_URL}${path})${note ? `: ${note}` : ""}`;
  const projectLines = projects
    .filter((e) => e.project)
    .map((e) => line(e.caseStudy?.title ?? e.project!.title, `/project/${e.id}`, e.project!.description));
  const postLines = [...blogsData]
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .map((p) => line(p.title, `/blog/${p.slug}`));
  const serviceLines = servicesData.map((sv) => line(sv.name, `/services/${sv.slug}`, sv.metaDescription));
  const pages = [
    "## Pages",
    "",
    line("Home", "/", "Overview, selected work, services, process, pricing, contact"),
    line("Work", "/projects", `${projects.length} shipped projects: websites, platforms, AI and automation`),
    line("Services", "/services", "Full-stack capabilities and who they are for"),
    line("Blog", "/blog", "Engineering articles"),
    line("Book a free call", "/book", "Free 30-minute call"),
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Projects",
    "",
    ...projectLines,
    "",
    "## Articles",
    "",
    ...postLines,
    "",
  ].join("\n");
  // A function, not a string: replace() would expand "$&" or "$'" in CMS text.
  return tpl.replace("<!-- GENERATED: pages, projects and posts from the content snapshot -->\n", () => pages);
}
writeFileSync(resolve("public/llms.txt"), generateLlms());
console.log("llms.txt written");
