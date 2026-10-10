# CLAUDE.md — usama-showcase-sparkle

Personal portfolio + lead-gen site for **Usama Munawar** (full-stack product engineer: React, React Native, Node.js, Laravel/PHP, VoIP/Asterisk, automation, AI).

- **Repo:** https://github.com/CH-USAMA/usama-showcase-sparkle
- **Origin:** generated in [Lovable](https://lovable.dev/projects/229265ce-3579-4bf7-85dd-77988fd0c57f); Lovable still pushes to `main`.
- **Live (canonical):** https://www.chaudharyusama.com (Vercel project `portfolio`, team `ch-usamas-projects`). `chaudharyusama.com` and `dev-usama-portfolio.vercel.app` 308 to it (Vercel domain settings); the Lovable mirror is redirected in `src/main.tsx`.

> Lovable commits to `main` directly. Before starting local work, `git pull`. Expect commit messages like "Changes".

## Stack

Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui, React Router 6 (`BrowserRouter`), react-helmet-async, TanStack Query. Deployed on Vercel as static files plus a few serverless functions in `api/`.

- **Every public route is rendered to HTML at build time** by the app itself (see *Prerendering* below). The browser does not hydrate: it renders over that HTML.
- **Content (blog posts, projects) lives in Turso (libSQL)**, edited at `/admin`. Builds snapshot it; the browser refetches from `/api`.
- **Supabase** is used for `/auth` sign-in (admin access) and edge functions (`chat`, `fetch-blogs`). It has no tables in use.

## Commands

```bash
npm install
npm run dev:clean  # frees :8080 (orphaned dev servers), then dev — preferred
npm run dev        # predev: content snapshot + sitemap/rss/llms.txt, then vite on :8080 (serves /api too)
npm run kill       # just free :8080; extra ports: npm run kill -- 5173
npm run build      # prebuild: snapshot + sitemap/rss/llms.txt → client build → SSR build → postbuild: prerender
npm run lint       # not clean (mostly no-explicit-any)
npm run content:sync   # refresh src/data/snapshot.*.json from the database
npm run content:seed   # load the TS seed files (src/data/blogs.ts, projects.ts, caseStudies.ts) into the database
```

`vite preview` does **not** serve the per-route HTML files (it falls back to `index.html` for every path), so it cannot show prerendered pages. Use `vercel dev`, or any static server that serves `<path>/index.html` and falls back to `app.html`.

## Layout

```
index.html                     Shell: pre-paint theme script, static head (site-wide JSON-LD), GA loader, fallback <main>
src/main.tsx                   Canonical-host redirect; boot over prerendered HTML (see below)
src/entry-server.tsx           Build-time renderer: render(url) → { html, head } (Helmet tags)
src/App.tsx                    All routes; ScrollManager, ChunkErrorBoundary
src/routes.ts                  Lazy pages with preload(); preloadRoute(path) also loads that page's lazy parts
src/lib/boot.ts                First render over prerendered HTML: useEnter, isBootRender, scroll/form carry-over
src/pages/homeSections.ts      Home's below-the-fold sections (progressively mounted by Index)
src/components/lazyParts.ts    Footer, FinalCTA, TrackRecord, TechMatrix, BlogRecommendations, TrendingRepos
src/components/SEOHead.tsx     Per-route title/description/robots/canonical/OG/JSON-LD via Helmet
src/data/snapshot.*.json       Build-time content snapshot (generated; committed so a DB-less build works)
src/data/blogs.ts, projects.ts, caseStudies.ts   Seed content (used when no database is configured)
src/data/services.ts           4 service pages (static, in code)
api/                           Vercel functions: /api/posts, /api/projects, /api/admin/* (Turso via @libsql/client/web)
scripts/sync-content.ts        DB → snapshot (falls back to seed files without credentials)
scripts/generate-sitemap.ts    sitemap.xml, rss.xml, llms.txt (from the snapshot + scripts/llms.template.md)
scripts/prerender.ts           Writes dist/<route>/index.html for 49 routes, dist/app.html and dist/404.html
supabase/functions/            chat (LLM proxy), fetch-blogs (HN RSS), scrape-github-trending
supabase/migrations/           STALE, do not reflect the live project (see below)
vercel.json                    Old-URL redirects, rewrites for dynamic routes to /app.html, security + cache headers
```

## Prerendering — read this before adding pages or components

`npm run build` runs `vite build` (client), `vite build --ssr src/entry-server.tsx` (→ `dist-ssr/`), then `scripts/prerender.ts`, which renders every public route with the app (`/`, `/projects`, `/services`, `/blog`, `/book`, `/laravel-scaling-checklist`, every project, service and post in the snapshot) and writes `dist/<route>/index.html` with that route's own `<head>` and `<div id="root" data-prerendered>`. If a route fails to render, it gets a plain HTML body instead and the build log says `used plain HTML` — check for that line.

In the browser, `main.tsx` waits for the page's chunks and its first paint, then renders over the prerendered markup. To keep that seamless:

- **No `window`/`document`/`localStorage` during render** (effects are fine). Guard with `typeof window` or `import.meta.env.SSR`.
- **Browser-only parts** (the hero diagram, Calendly, the chat launcher, the code highlighter) render their placeholder when `import.meta.env.SSR`.
- **Entrance classes** (`enter`, `enter-lift`, `enter-soft`) on anything in a page's first render must spread `useEnter()`: `<p className="enter-lift" {...enter(140)}>`. Otherwise the entrance replays when React takes over. `Reveal` handles itself.
- **Lazy parts of a page** go in `src/components/lazyParts.ts` and in that route's line in `preloadRoute`. A plain `React.lazy` there renders its fallback over the prerendered markup at boot.
- **Home page:** the app mounts the lower sections a few at a time. Until each has mounted, its prerendered copy stays on screen in a box just after `#root` (`src/lib/homeStash.ts`), and `Index` drops it in the same commit as the live copy appears, so the page never shrinks under a reader. Keep `Hero` and `ProofStrip` as the first two children of `<main>`: the box takes everything after them.
- **New route?** Add it to `App.tsx`, `preloadRoute` in `src/routes.ts`, the route list in `scripts/prerender.ts` and `scripts/generate-sitemap.ts`. If it has a URL parameter (or is not prerendered), also add a rewrite to `/app.html` in `vercel.json`: **any URL without a file and without a rewrite gets a real 404** (`dist/404.html`, the app's not-found page).
- `vercel.json` rewrites the dynamic routes (`/blog/:slug`, `/project/:id`, `/services/:slug`, `/github/:repoId`, `/auth`, `/admin/*`) to `/app.html` (empty shell, no URL-specific tags, `X-Robots-Tag: noindex` when requested directly), so posts and projects published after the last build still work. Old `/projects/<name>` URLs 308 to their `/project/<id>` pages.
- Domains: `www.chaudharyusama.com` is primary. `chaudharyusama.com` and `dev-usama-portfolio.vercel.app` redirect to it in the Vercel project's domain settings (308, every path); the host rules in `vercel.json` are a backup.

## How content works

- **Posts and projects** are rows in Turso, edited at `/admin` (Supabase sign-in, then the email must be in `ADMIN_EMAILS`). `/api/*` serves published rows; admin writes go through `/api/admin/*` and can trigger a rebuild via `VERCEL_DEPLOY_HOOK_URL`, so new content gets prerendered and into the sitemap.
- The **snapshot** (`src/data/snapshot.*.json`) is what pages render first and what the sitemap, RSS, `llms.txt` and prerendered pages are built from. TanStack Query uses it as `initialData` and refetches `/api` in the background.
- **Markdown** is rendered by `src/components/Markdown.tsx` (react-markdown + remark-gfm, `skipHtml`, URLs through `safeHref`). No `dangerouslySetInnerHTML` anywhere outside shadcn.
- **Trending posts** on `/blog` come from the `fetch-blogs` edge function (HN RSS). The list renders from `src/data/snapshot.trending.json`, refreshed on Vercel builds and by `npm run content:trending`; browsers refresh it once it is 1h old (localStorage cache), but never to fewer rows than are on screen; `src/lib/readingList.ts` drops repeated and unsafe links. Their own pages are noindex and not in the sitemap.
- **Search titles**: a post's optional `seo_title` (the editor's "Search title") is its `<title>` when the headline is over ~60 characters; the h1, JSON-LD `headline` and share tags keep the full headline. New columns go in `ADDED_COLUMNS` in `api/_lib/db.ts`; `npm run content:migrate` adds them (schema only, no rows). Run it against the live database before deploying code that reads them.
- **Project routes are numeric ids** (`/project/4`), not slugs.

Environment (Vercel + `.env.local`, never committed): `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_EMAILS`, optional `VERCEL_DEPLOY_HOOK_URL`; public `VITE_SUPABASE_*` (see `.env.example`). Without Turso credentials the build uses the seed files.

## Supabase — read this before touching it

`src/integrations/supabase/types.ts` shows **zero tables** (`[_ in never]: never`), and no file calls `supabase.from()`. The project (`bjsbzhcbcsylmfkdcxeo`) is newer than the migrations in `supabase/migrations/` (Jul 2025, Lovable era). **Treat those migrations as historical artifacts, not the live schema.** They contain two RLS bugs that must not be re-applied as-is:

- `profiles` UPDATE policy has no `WITH CHECK` and no column guard → any signed-in user could set their own `role = 'admin'`.
- `blog_comments` has `SELECT USING (true)` over a table holding `guest_email` → public PII read.

The `/auth` page still has an open **Sign Up** tab; admin access is gated by `ADMIN_EMAILS` on the server, not by sign-up.

## Third-party wiring

| Thing | Where |
| --- | --- |
| Formspree `mkgzjlde` | Contact form, chatbot lead capture + transcript, checklist lead magnet, newsletter |
| Calendly `usamaresume30/30min` | `CalendlyEmbed`: inline on `/book`; on the home Contact section only after "Show available times" |
| GA4 `G-6JEYSR3YVV` | `index.html` (loader, after `load` + idle) + `src/lib/analytics.ts`. One property on purpose: each extra GA4 ID adds its own container script (G-2ZHRMH3HLK was removed for that reason). Page views come from the router (`src/components/Analytics.tsx`), so in GA4 Admin, Enhanced measurement, "Page changes based on browser history events" must stay off, or every in-app navigation counts twice. `/admin` and `/auth` set `ga-disable` |
| Lovable AI Gateway | `supabase/functions/chat` via `LOVABLE_API_KEY`; model `google/gemini-3-flash-preview` |

## Conventions

- Import alias `@/` → `src/`.
- Scroll entrances use `Reveal` (CSS, IntersectionObserver). framer-motion is only in the on-demand chat panel; keep it off page routes.
- Every page renders a `<SEOHead>` with an explicit `canonical` (`null` on error pages).
- Images: explicit `width`/`height`; `loading="lazy" decoding="async"` below the fold; content images through `responsiveImage()` (`src/lib/img.ts`: Unsplash resizing, 720px project thumbnails); a page's LCP image gets `fetchPriority="high"` and `PRIORITY_TIMING`.
- Absolute URLs are hardcoded as `https://www.chaudharyusama.com` in several files. If the domain changes, grep for it.

## Known traps

1. Anything added through Lovable that touches `window` during render, uses entrance classes without `useEnter`, or adds a plain `React.lazy` to a page will build fine but degrade prerendering (see above). Check the build log and the page with JavaScript blocked.
2. The 49 shadcn primitives in `src/components/ui/` are mostly unused (16 are imported).
3. `docs/audit-2026-09.md` is the original findings list; several items there are fixed now.
