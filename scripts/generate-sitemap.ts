// Runs before `vite dev` and `vite build` via predev/prebuild hooks.
// Writes public/sitemap.xml with all static routes + dynamic blog/project entries.

import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { projectsData } from "../src/data/projects";

// blogs.ts imports image assets, which Node cannot resolve outside Vite,
// so slugs and dates are parsed from the source file instead of imported.
const blogSource = readFileSync(resolve("src/data/blogs.ts"), "utf8");
const blogsData = Array.from(
  blogSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?published_at:\s*"([^"]+)"/g)
).map((m) => ({ slug: m[1], published_at: m[2] }));

const BASE_URL = "https://dev-usama-portfolio.vercel.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/book", changefreq: "weekly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
];

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

const entries = [...staticEntries, ...projectEntries, ...blogEntries];

function generate(entries: SitemapEntry[]) {
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

writeFileSync(resolve("public/sitemap.xml"), generate(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
