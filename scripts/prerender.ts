// Runs after `vite build` via the `postbuild` hook.
//
// The app is a client-rendered SPA: every route is served the same index.html,
// whose <head> carries the HOME page's title/description/OG tags. react-helmet
// rewrites them per route — but only after JavaScript runs. Social scrapers and
// link unfurlers (LinkedIn, WhatsApp, X, Slack, Facebook) and many answer-engine
// crawlers do NOT run JS, so a shared /blog/<post> or /project/<id> link shows
// the generic home preview.
//
// This script fixes that without touching the app: for every real route it emits
// dist/<route>/index.html — a byte-for-byte copy of the built shell with the
// <head> meta (title, description, canonical, OG, Twitter) rewritten to that
// route's values. Vercel serves a matching static file before it applies the SPA
// rewrite, so a crawler on /blog/<post> gets that post's real metadata. Browsers
// still boot the SPA exactly as before; helmet re-applies the same tags on mount.
//
// Meta values mirror each page's <SEOHead>. Keep them in sync when a page changes.

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { projectsData } from "../src/data/projects";
import { servicesData } from "../src/data/services";

const BASE_URL = "https://www.chaudharyusama.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

const distIndex = resolve("dist/index.html");
if (!existsSync(distIndex)) {
  throw new Error("dist/index.html not found — run `vite build` before prerender.");
}
const shell = readFileSync(distIndex, "utf8");

// --- blog posts: parsed from source (blogs.ts imports image assets Node can't load) ---
const blogSource = readFileSync(resolve("src/data/blogs.ts"), "utf8");
const blogMeta = new Map(
  Array.from(
    blogSource.matchAll(
      /title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*slug:\s*"([^"]+)"\s*,\s*excerpt:\s*"((?:[^"\\]|\\.)*)"/g,
    ),
  ).map((m) => [m[2], { title: m[1], excerpt: m[3] }]),
);

const unescapeJs = (s: string) => s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
const esc = (s: string) =>
  unescapeJs(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Matches BlogPost.tsx: trim long titles to ~55 chars on a word boundary.
const trimTitle = (t: string) =>
  t.length > 55 ? t.slice(0, 55).replace(/[\s,.;:]+\S*$/, "") + "…" : t;

const absImage = (src: string | undefined) =>
  !src ? DEFAULT_OG_IMAGE : src.startsWith("http") ? src : `${BASE_URL}${src.startsWith("/") ? "" : "/"}${src}`;

interface Route {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
}

// Static routes — meta copied from each page's <SEOHead>.
const staticRoutes: Route[] = [
  {
    path: "/blog",
    title: "Blog | React, Node.js, Laravel & AI | Usama Munawar",
    description:
      "Articles on React, React Native, Node.js, TypeScript, Laravel/PHP, product architecture, AI, automation, and VoIP.",
    ogType: "website",
  },
  {
    path: "/projects",
    title: "Websites, Apps & Systems I've Built | Usama Munawar",
    description:
      "Explore websites, apps and production systems shipped by Usama Munawar across React, React Native, Node.js, TypeScript, Laravel, AI and automation.",
    ogType: "website",
  },
  {
    path: "/services",
    title:
      "Full-Stack Capabilities | React, React Native, Node.js, Laravel, TypeScript",
    description:
      "React and TypeScript on the front end, React Native for mobile, Node.js for typed services and real-time, Laravel and PHP for the application core. One engineer across the whole stack.",
    ogType: "website",
  },
  {
    path: "/book",
    title: "Book an Architecture Call | Usama Munawar",
    description:
      "A free 30-minute architecture call for React, React Native, Node.js, TypeScript, Laravel/PHP, automation, or AI product work.",
    ogType: "website",
  },
  {
    path: "/laravel-scaling-checklist",
    title: "Laravel Scaling Checklist | 26 Production Checks",
    description:
      "A free 26-point checklist for scaling Laravel apps in production: indexing, Redis caching, queues, API resilience, observability, backups and zero-downtime deploys.",
    ogType: "article",
  },
];

const projectRoutes: Route[] = Object.values(projectsData).map((p) => ({
  path: `/project/${p.id}`,
  title: `${p.title} | Case Study | Usama Munawar`,
  description: p.description.slice(0, 155),
  ogType: "article",
  ogImage: absImage(p.image),
}));

const serviceRoutes: Route[] = servicesData.map((s) => ({
  path: `/services/${s.slug}`,
  title: s.metaTitle,
  description: s.metaDescription,
  ogType: "website",
}));

const blogRoutes: Route[] = Array.from(blogMeta.entries()).map(([slug, m]) => ({
  path: `/blog/${slug}`,
  title: trimTitle(m.title),
  description: m.excerpt,
  ogType: "article",
}));

const routes = [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];

function rewriteHead(html: string, r: Route): string {
  const canonical = `${BASE_URL}${r.path}`;
  const title = esc(r.title);
  const description = esc(r.description);
  const ogImage = esc(r.ogImage || DEFAULT_OG_IMAGE);
  const ogType = r.ogType || "website";

  // Each entry rewrites the value of one tag already present in the built shell.
  // A missing pattern means index.html changed shape — fail loudly rather than
  // ship a page with stale home metadata.
  const edits: [RegExp, string][] = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`],
    [/(<meta property="og:type" content=")[^"]*(")/, `$1${ogType}$2`],
    [/(<meta property="og:image" content=")[^"]*(")/, `$1${ogImage}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta name="twitter:url" content=")[^"]*(")/, `$1${canonical}$2`],
    [/(<meta name="twitter:image" content=")[^"]*(")/, `$1${ogImage}$2`],
  ];

  let out = html;
  for (const [re, replacement] of edits) {
    if (!re.test(out)) throw new Error(`prerender: tag not found for ${r.path}: ${re}`);
    out = out.replace(re, replacement);
  }
  return out;
}

let written = 0;
for (const r of routes) {
  const html = rewriteHead(shell, r);
  const outPath = resolve("dist", r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  written++;
}

console.log(`prerender: wrote ${written} route HTML files into dist/`);
