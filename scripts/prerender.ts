// Runs after `vite build` via the `postbuild` hook.
//
// The app is a client-rendered SPA. For every real route this writes
// dist/<route>/index.html: the built shell with
//   1. the route's own <head> (title, description, robots, canonical,
//      OG/Twitter, structured data), the tags its SEOHead renders, so link
//      unfurlers and crawlers that do not run JavaScript see the right page;
//   2. the route's own page inside #root, rendered by the app itself at build
//      time (src/entry-server.tsx, built by `vite build --ssr`), so the first
//      paint is the real page and non-JS crawlers read the full content. If
//      rendering a route fails, it gets a plain HTML version of its content
//      built from the same snapshot instead (and the build log says so);
//   3. <link rel="modulepreload"> for the route's own chunks (from the Vite
//      manifest), so they download alongside the entry instead of after it.
//
// Vercel serves a matching static file before it applies vercel.json's
// rewrites. Those send the app's dynamic routes that have no file of their
// own (a post published after this build, /admin, /auth) to dist/app.html:
// the shell with an empty #root and no tags naming a URL. Any other URL gets
// dist/404.html, the app's not-found page, with a real 404 status.
// React replaces #root on its first render (main.tsx preloads the route first,
// so that render is the real page, not a blank fallback).

import "./env-production";
import { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { pathToFileURL } from "url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost, ProjectEntry } from "../src/data/types";
import { projectShareImage } from "../src/lib/content/shareImage";
import { safeHref } from "../src/lib/url";
import { servicesData } from "../src/data/services";
import { CAPABILITIES } from "../src/data/capabilities";
import { caseStudyTitle, fitDescription } from "../src/lib/seo";

const BASE_URL = "https://www.chaudharyusama.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

const distIndex = resolve("dist/index.html");
if (!existsSync(distIndex)) {
  throw new Error("dist/index.html not found — run `vite build` before prerender.");
}
const shell = readFileSync(distIndex, "utf8");

// The app's own renderer (see src/entry-server.tsx).
const ssrEntry = resolve("dist-ssr/entry-server.js");
const ssr: { render: (url: string) => Promise<{ html: string; head: string }> } | null = existsSync(ssrEntry)
  ? await import(pathToFileURL(ssrEntry).href)
  : null;
if (!ssr) console.warn("prerender: dist-ssr/entry-server.js not found; writing plain HTML bodies only.");

// --- content: the same snapshot the build rendered from (see sync-content.ts) ---
const { posts } = JSON.parse(readFileSync(resolve("src/data/snapshot.posts.json"), "utf8")) as { posts: BlogPost[] };
const { projects } = JSON.parse(readFileSync(resolve("src/data/snapshot.projects.json"), "utf8")) as {
  projects: ProjectEntry[];
};

// --- Vite manifest: which chunks each page module needs ---
type ManifestChunk = { file: string; imports?: string[]; css?: string[] };
const manifestPath = resolve("dist/.vite/manifest.json");
const manifest: Record<string, ManifestChunk> = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};
const entryKey = Object.keys(manifest).find((k) => k === "index.html");
const alreadyLoaded = new Set<string>();
const collect = (key: string, into: Set<string>) => {
  const c = manifest[key];
  if (!c || into.has(c.file)) return;
  into.add(c.file);
  for (const imp of c.imports ?? []) collect(imp, into);
};
if (entryKey) collect(entryKey, alreadyLoaded);
const chunksFor = (...modules: string[]) => {
  const files = new Set<string>();
  for (const m of modules) collect(m, files);
  return [...files].filter((f) => !alreadyLoaded.has(f));
};

// A page's lazy parts (src/components/lazyParts.ts). main.tsx loads them
// before the first render; listing them here lets them download alongside
// the page's own chunk instead of after the entry has run.
const part = (name: string) => `src/components/${name}.tsx`;
const PARTS = {
  projects: [part("TrackRecord"), part("FinalCTA"), part("Footer")],
  project: [part("FinalCTA"), part("Footer")],
  blog: [part("TrendingRepos"), part("Footer")],
  post: [part("BlogRecommendations"), part("FinalCTA"), part("Footer")],
  services: [part("TechMatrix"), part("FinalCTA"), part("Footer")],
  service: [part("FinalCTA"), part("Footer")],
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const absImage = (src: string | undefined | null) =>
  !src ? DEFAULT_OG_IMAGE : src.startsWith("http") ? src : `${BASE_URL}${src.startsWith("/") ? "" : "/"}${src}`;

const md = (content: string) =>
  renderToStaticMarkup(
    createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      // same URL policy as the app's renderer
      urlTransform: (url: string) => (/^#[\w-]+$/.test(url) ? url : safeHref(url) ?? ""),
      children: content,
    })
  );

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

interface Route {
  path: string;
  /** false: keep the shell's own <head> (it is the home page's). */
  head?: boolean;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  /** Inner HTML for #root. */
  body: string;
  /** Page module key in the Vite manifest, for modulepreload. */
  module?: string;
  /** Lazy parts the page renders (mirrors preloadRoute in src/routes.ts). */
  parts?: string[];
  jsonLd?: unknown[];
}

// ---------------------------------------------------------------------------
// Static body pieces
// ---------------------------------------------------------------------------
const NAV = `<nav aria-label="Primary"><a href="/">Usama Munawar</a> · <a href="/projects">Work</a> · <a href="/services">Services</a> · <a href="/blog">Blog</a> · <a href="/book">Book a free call</a></nav>`;
const MAIN_STYLE =
  "max-width:960px;margin:0 auto;padding:7rem 1.25rem 3rem;font-family:Inter,'Inter Fallback',system-ui,sans-serif;color:hsl(var(--foreground));background:hsl(var(--background));line-height:1.6;";
const page = (inner: string) => `<main id="main" style="${MAIN_STYLE}">${NAV}${inner}</main>`;
const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
const cards = projects.filter((e) => e.caseStudy || e.project);
const titleOf = (e: ProjectEntry) => e.caseStudy?.title ?? e.project?.title ?? e.slug;
const categoryOf = (e: ProjectEntry) => e.caseStudy?.category ?? e.project?.category ?? "";

const staticRoutes: Route[] = [
  {
    path: "/blog",
    title: "Blog | React, Node.js, Laravel & AI | Usama Munawar",
    description:
      "Articles on React, React Native, Node.js, TypeScript, Laravel/PHP, product architecture, AI, automation, and VoIP.",
    ogType: "website",
    module: "src/pages/Blog.tsx",
    parts: PARTS.blog,
    body: page(
      `<h1>Engineering notes</h1><p>Deep dives into React, React Native, Node.js, TypeScript, Laravel, AI and automation, written from systems running in production.</p>` +
        list(
          posts.map(
            (p) =>
              `<a href="/blog/${esc(p.slug)}">${esc(p.title)}</a> <time datetime="${esc(p.published_at)}">${fmtDate(p.published_at)}</time><p>${esc(p.excerpt)}</p>`
          )
        )
    ),
  },
  {
    path: "/projects",
    title: "Websites, Apps & Systems I've Built | Usama Munawar",
    description:
      "Explore websites, apps and production systems shipped by Usama Munawar across React, React Native, Node.js, TypeScript, Laravel, AI and automation.",
    ogType: "website",
    module: "src/pages/Projects.tsx",
    parts: PARTS.projects,
    body: page(
      `<h1>Websites &amp; apps I've shipped</h1><p>Websites, apps and production systems, from customer-facing sites to the infrastructure behind them.</p>` +
        list(
          cards.map((e) => {
            const name = esc(titleOf(e));
            const link = e.project ? `<a href="/project/${e.id}">${name}</a>` : name;
            return `${link} · ${esc(categoryOf(e))}`;
          })
        )
    ),
  },
  {
    path: "/services",
    title: "Full-Stack Development Services | Usama Munawar",
    description:
      "React and TypeScript web apps, React Native mobile apps, Node.js services and Laravel backends, designed and built by one engineer across the whole stack.",
    ogType: "website",
    module: "src/pages/Services.tsx",
    parts: PARTS.services,
    body: page(
      `<h1>Full-stack development services</h1><p>React, React Native, Node.js and Laravel: one engineer across the stack.</p>` +
        CAPABILITIES.map((c) => `<h2>${esc(c.title)}</h2><p>${esc(c.summary)}</p>${c.href ? `<p><a href="${esc(c.href)}">Read more about ${esc(c.title)}</a></p>` : ""}`).join("")
    ),
  },
  {
    path: "/book",
    title: "Book a free call | Usama Munawar",
    description:
      "A free 30-minute call for React, React Native, Node.js, TypeScript, Laravel/PHP, automation, or AI product work.",
    ogType: "website",
    module: "src/pages/Book.tsx",
    body: page(
      `<h1>Bring the problem. Leave with the next step.</h1><p>Thirty minutes on your architecture: what is breaking, what it will cost to fix, and whether it is worth fixing yet. Free, no pitch, and no obligation to hire me at the end of it.</p><p>Email <a href="mailto:devusamaworks@gmail.com">devusamaworks@gmail.com</a> or message on <a href="https://wa.me/923038004684">WhatsApp</a>.</p>`
    ),
  },
  {
    path: "/laravel-scaling-checklist",
    title: "Laravel Scaling Checklist | 26 Production Checks",
    description:
      "A free 26-point checklist for scaling Laravel in production: indexes, Redis caching, queues, observability, backups and zero-downtime deploys.",
    ogType: "article",
    module: "src/pages/Checklist.tsx",
    body: page(
      `<h1>Laravel scaling checklist</h1><p>A free 26-point checklist for scaling Laravel apps in production: indexing, Redis caching, queues, API resilience, observability, backups and zero-downtime deploys.</p>`
    ),
  },
];

const projectRoutes: Route[] = projects
  .filter((e) => e.project)
  .map((e) => {
    const p = e.project!;
    const title = titleOf(e);
    const paras = p.fullDescription
      .split("\n\n")
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => {
        const m = x.match(/^([A-Z][A-Z0-9 ,/&-]{2,40}):\s*/);
        return m ? `<h3>${esc(m[1].charAt(0) + m[1].slice(1).toLowerCase())}</h3><p>${esc(x.slice(m[0].length))}</p>` : `<p>${esc(x)}</p>`;
      })
      .join("");
    const url = `${BASE_URL}/project/${e.id}`;
    return {
      path: `/project/${e.id}`,
      title: caseStudyTitle(title),
      description: fitDescription(p.description),
      ogType: "article",
      ogImage: absImage(projectShareImage(e)),
      module: "src/pages/ProjectDetail.tsx",
      parts: PARTS.project,
      body: page(
        `<article><p><a href="/projects">All work</a> · ${esc(categoryOf(e))}</p><h1>${esc(title)}</h1><p>${esc(p.description)}</p>` +
          (p.results.length ? `<h2>The outcome</h2>${list(p.results.map(esc))}` : "") +
          `<h2>The story</h2>${paras}` +
          (p.challenges.length ? `<h2>What made it hard</h2>${list(p.challenges.map((c) => `<strong>${esc(c.title)}</strong>: ${esc(c.description)}`))}` : "") +
          `<h2>Built with</h2><p>${p.technologies.map(esc).join(", ")}</p>` +
          (p.features.length ? `<h2>What it does</h2>${list(p.features.map(esc))}` : "") +
          `</article>`
      ),
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: title,
          description: p.description,
          url,
          image: absImage(projectShareImage(e)),
          creator: { "@type": "Person", name: "Usama Munawar", url: BASE_URL },
        },
      ],
    };
  });

const serviceRoutes: Route[] = servicesData.map((s) => ({
  path: `/services/${s.slug}`,
  title: s.metaTitle,
  description: s.metaDescription,
  ogType: "website",
  module: "src/pages/ServiceDetail.tsx",
  parts: PARTS.service,
  body: page(
    `<article><p><a href="/services">All services</a></p><h1>${esc(s.title)}</h1><p>${esc(s.intro)}</p>` +
      s.sections
        .map((sec) => `<h2>${esc(sec.heading)}</h2><p>${esc(sec.body)}</p>${sec.bullets ? list(sec.bullets.map(esc)) : ""}`)
        .join("") +
      `<h2>Frequently asked</h2>` +
      s.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("") +
      `</article>`
  ),
}));

const blogRoutes: Route[] = posts.map((p) => {
  const cover = safeHref(p.featured_image);
  const url = `${BASE_URL}/blog/${p.slug}`;
  return {
    path: `/blog/${p.slug}`,
    title: p.seo_title || p.title,
    description: fitDescription(p.excerpt),
    ogType: "article",
    ogImage: absImage(cover),
    module: "src/pages/BlogPost.tsx",
    parts: PARTS.post,
    body: page(
      `<article><p><a href="/blog">All articles</a></p><h1>${esc(p.title)}</h1><p>${esc(p.excerpt)}</p><p>${esc(p.author)} · <time datetime="${esc(p.published_at)}">${fmtDate(p.published_at)}</time></p>${md(p.content)}</article>`
    ),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        image: cover ? [absImage(cover)] : undefined,
        author: { "@type": "Person", name: p.author || "Usama Munawar", url: BASE_URL },
        publisher: { "@type": "Person", name: "Usama Munawar", url: BASE_URL },
        datePublished: p.published_at,
        dateModified: p.updated_at ?? p.published_at,
        keywords: (p.tags || []).join(", "),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "en-US",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
});

// The home page keeps the shell's head; only its body is rendered.
const homeRoute: Route = {
  path: "/",
  head: false,
  title: "",
  description: "",
  body: page(
    `<h1>Usama Munawar builds and ships websites, apps and production systems</h1>` +
      list([
        `<a href="/projects">Work</a>`,
        `<a href="/services">Services</a>`,
        `<a href="/blog">Blog</a>`,
        `<a href="/book">Book a free call</a>`,
      ])
  ),
};

const routes = [homeRoute, ...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];

// ---------------------------------------------------------------------------
// Rewrite
// ---------------------------------------------------------------------------
/**
 * The shell with this route's head and the given #root content. `head` is the
 * route's own tags as the app rendered them; without it (the fallback), the
 * shell's tags are rewritten from the route table below.
 */
function rewrite(html: string, r: Route, body: string, prerendered: boolean, head?: string): string {
  let out = head ? withRenderedHead(html, r, head) : r.head === false ? html : rewriteHead(html, r);
  if (prerendered) out = loadAppAfterFirstPaint(out, r.path);
  const start = out.indexOf('<div id="root">');
  const end = out.lastIndexOf("</div>", out.indexOf("</body>"));
  if (start < 0 || end < start) throw new Error(`prerender: #root not found for ${r.path}`);
  // data-prerendered tells main.tsx that the page on screen is the real one.
  return out.slice(0, start) + `<div id="root"${prerendered ? " data-prerendered" : ""}>${body}` + out.slice(end);
}

/**
 * A prerendered page is complete before any script runs, so its app code
 * (the entry, its chunks, the route's chunks) starts loading once the page has
 * been painted rather than alongside the HTML: on a slow connection those
 * ~100 kB no longer compete with the stylesheet, fonts and images for the
 * first paint. The loader starts them on the first-contentful-paint entry,
 * with a frame-based fallback and a cap for tabs that never paint.
 */
function loadAppAfterFirstPaint(html: string, path: string): string {
  const entry = /<script type="module" crossorigin src="([^"]+)"><\/script>\s*/.exec(html);
  if (!entry) throw new Error(`prerender: entry script not found for ${path}`);
  const chunks: string[] = [];
  let out = html.replace(entry[0], "").replace(/<link rel="modulepreload" crossorigin href="([^"]+)">\s*/g, (_m, href: string) => {
    chunks.push(href);
    return "";
  });
  const loader = `<script>
    (function (entry, chunks) {
      var started = false;
      function load() {
        if (started) return;
        started = true;
        chunks.forEach(function (href) {
          var l = document.createElement("link");
          l.rel = "modulepreload";
          l.crossOrigin = "";
          l.href = href;
          document.head.appendChild(l);
        });
        var s = document.createElement("script");
        s.type = "module";
        s.crossOrigin = "";
        s.src = entry;
        document.head.appendChild(s);
      }
      try {
        if (PerformanceObserver.supportedEntryTypes.indexOf("paint") < 0) throw 0;
        new PerformanceObserver(function (list, observer) {
          if (!list.getEntriesByName("first-contentful-paint").length) return;
          observer.disconnect();
          load();
        }).observe({ type: "paint", buffered: true });
      } catch (e) {
        requestAnimationFrame(function () { setTimeout(load, 0); });
      }
      setTimeout(load, 1500);
    })(${JSON.stringify(entry[1])}, ${JSON.stringify(chunks)});
  </script>
  </head>`;
  out = out.replace("</head>", () => loader);
  return out;
}

/** Tags in the shell that belong to one page: its title and every data-rh tag. */
const PAGE_TAGS = /[ \t]*<(?:meta|link)\b[^>]*\bdata-rh="true"[^>]*>\r?\n?/g;

/** <link rel="modulepreload"> for a route's own chunks. */
function modulePreloads(r: Route): string[] {
  if (!r.module) return [];
  const chunks = chunksFor(r.module, ...(r.parts ?? []));
  if (!chunks.length) console.warn(`prerender: no manifest chunks for ${r.module}`);
  return chunks.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`);
}

/** The shell's page tags swapped for the ones the app rendered for this route. */
function withRenderedHead(html: string, r: Route, head: string): string {
  if (!/<title>[\s\S]*?<\/title>/.test(html)) throw new Error(`prerender: no <title> in the shell for ${r.path}`);
  let out = html.replace(PAGE_TAGS, "");
  // Where the title was: title and description stay first in <head>.
  out = out.replace(/<title>[\s\S]*?<\/title>/, () => head.split("\n").join("\n    "));
  // twitter:url is not one of SEOHead's tags: point it at this page, or drop it.
  const canonical = /<link\b(?=[^>]*\brel="canonical")[^>]*\bhref="([^"]*)"/.exec(head)?.[1];
  out = out.replace(/[ \t]*<meta name="twitter:url" content="[^"]*" \/>\r?\n?/, () =>
    canonical ? `    <meta name="twitter:url" content="${canonical}" />\n` : ""
  );
  const extra = modulePreloads(r);
  if (extra.length) out = out.replace("</head>", () => `    ${extra.join("\n    ")}\n  </head>`);
  return out;
}

/** The SPA fallback's head: the site's, minus anything that names one URL. */
function appShellHead(html: string): string {
  return html
    .replace(/[ \t]*<link rel="canonical"[^>]*>\r?\n?/, "")
    .replace(/[ \t]*<meta property="og:url"[^>]*>\r?\n?/, "")
    .replace(/[ \t]*<meta name="twitter:url"[^>]*>\r?\n?/, "");
}

function rewriteHead(html: string, r: Route): string {
  const canonical = `${BASE_URL}${r.path}`;
  const title = esc(r.title);
  const description = esc(r.description);
  const ogImage = esc(r.ogImage || DEFAULT_OG_IMAGE);
  const ogType = r.ogType || "website";

  // Each entry rewrites the value of one tag already present in the built
  // shell; a missing pattern means index.html changed shape, so fail loudly.
  // Values go in through a function: String.replace expands "$1" and "$&"
  // inside a replacement string. Every pattern captures (open)(close).
  const edits: [RegExp, string][] = [
    [/(<title>)[\s\S]*?(<\/title>)/, title],
    [/(<meta name="description" content=")[^"]*(")/, description],
    [/(<link rel="canonical" href=")[^"]*(")/, canonical],
    [/(<meta property="og:title" content=")[^"]*(")/, title],
    [/(<meta property="og:description" content=")[^"]*(")/, description],
    [/(<meta property="og:url" content=")[^"]*(")/, canonical],
    [/(<meta property="og:type" content=")[^"]*(")/, ogType],
    [/(<meta property="og:image" content=")[^"]*(")/, ogImage],
    [/(<meta name="twitter:title" content=")[^"]*(")/, title],
    [/(<meta name="twitter:description" content=")[^"]*(")/, description],
    [/(<meta name="twitter:url" content=")[^"]*(")/, canonical],
    [/(<meta name="twitter:image" content=")[^"]*(")/, ogImage],
  ];
  let out = html;
  for (const [re, value] of edits) {
    if (!re.test(out)) throw new Error(`prerender: tag not found for ${r.path}: ${re}`);
    out = out.replace(re, (_m, open: string, close: string) => `${open}${value}${close}`);
  }

  // Head additions: route chunks and route structured data. (A post's cover
  // needs no preload: it is in the prerendered body with fetchpriority=high
  // and a srcset the preload could not match.) JSON-LD
  // carries data-rh so react-helmet replaces it rather than duplicating it.
  const head: string[] = modulePreloads(r);
  for (const data of r.jsonLd ?? []) {
    head.push(`<script type="application/ld+json" data-rh="true">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
  }
  if (head.length) out = out.replace("</head>", () => `    ${head.join("\n    ")}\n  </head>`);
  return out;
}

/** The app's own render of a URL, or null if it failed or came back without its page. */
async function renderPage(path: string) {
  if (!ssr) return null;
  try {
    const out = await ssr.render(path);
    // Every page renders <main id="main">; without it the page suspended and
    // this is the app's loading fallback, not the page.
    if (!out.html.includes('id="main"')) throw new Error("rendered without its page");
    return out;
  } catch (e) {
    console.warn(`prerender: ${path}: ${(e as Error).message}`);
    return null;
  }
}

// The SPA fallback (vercel.json rewrites the app's dynamic routes here when
// they have no file: a post published after this build, /admin, /auth): no
// page in it, and no tags naming a URL.
writeFileSync(resolve("dist/app.html"), rewrite(appShellHead(shell), homeRoute, "", false));

// Every other URL without a file gets Vercel's 404 response, which serves
// dist/404.html: the app's own not-found page, noindex and without a
// canonical, rendered like any other page.
const notFound = await renderPage("/404");
if (!notFound) console.warn("prerender: 404.html falls back to the empty app shell");
writeFileSync(
  resolve("dist/404.html"),
  notFound
    ? rewrite(shell, { ...homeRoute, path: "/404" }, notFound.html, true, notFound.head)
    : rewrite(appShellHead(shell), homeRoute, "", false)
);

let written = 0;
const fellBack: string[] = [];
for (const r of routes) {
  const page = await renderPage(r.path);
  if (!page) {
    fellBack.push(r.path);
    console.warn(`prerender: ${r.path} uses plain HTML`);
  }
  const outPath = resolve("dist", r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page ? rewrite(shell, r, page.html, true, page.head) : rewrite(shell, r, r.body, false));
  written++;
}
if (fellBack.length) console.warn(`prerender: ${fellBack.length} route(s) used plain HTML: ${fellBack.join(", ")}`);

// The manifest is a build artefact; it does not need to be deployed.
if (existsSync(resolve("dist/.vite"))) rmSync(resolve("dist/.vite"), { recursive: true, force: true });

console.log(`prerender: wrote ${written} route HTML files into dist/ (${written - fellBack.length} rendered by the app)`);
