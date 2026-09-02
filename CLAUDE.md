# CLAUDE.md — usama-showcase-sparkle

Personal portfolio + lead-gen site for **Usama Munawar** (Backend Systems Engineer — Laravel, VoIP/Asterisk, n8n automation, AI).

- **Repo:** https://github.com/CH-USAMA/usama-showcase-sparkle
- **Origin:** generated in [Lovable](https://lovable.dev/projects/229265ce-3579-4bf7-85dd-77988fd0c57f); Lovable still pushes to `main`.
- **Live (canonical):** https://dev-usama-portfolio.vercel.app
- **Mirror:** `usama-showcase-sparkle.lovable.app` — hard-redirected to the canonical host in `src/main.tsx`.

> Lovable commits to `main` directly. Before starting local work, `git pull`. Expect commit messages like "Changes".

## Stack

Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui, React Router 6 (SPA, **no SSR/SSG**), react-helmet-async for per-route meta, framer-motion, TanStack Query. Deployed on Vercel as a static SPA. Supabase is used only for **auth + edge functions** — there are no database tables in use.

## Commands

```bash
npm install
npm run dev      # predev regenerates public/sitemap.xml, then vite on :8080
npm run build    # prebuild regenerates sitemap, then vite build
npm run lint     # currently 37 errors / 9 warnings (mostly no-explicit-any) — not clean
```

## Layout

```
index.html                     Static <head>: GA4 x2, 6 JSON-LD blocks, crawler fallback <main> inside #root
src/main.tsx                   Providers + canonical-host redirect
src/App.tsx                    All routes (Index eager, everything else React.lazy)
src/pages/                     Index, Projects, ProjectDetail, Blog, BlogPost, Services, ServiceDetail,
                               Book, Checklist, GitHubReadme, Auth, Admin*, NotFound
src/components/                Landing sections (Hero, About, Skills, Portfolio, Packages, Contact…)
src/components/ui/             49 shadcn primitives — only 19 are imported anywhere
src/components/SEOHead.tsx     Per-route title/description/canonical/OG/JSON-LD via Helmet
src/data/blogs.ts              19 blog posts as inline markdown strings (the CMS)
src/data/projects.ts           11 case studies, keyed by NUMBER (routes are /project/1 … /project/11)
src/data/services.ts           4 service pages
src/data/github-trending/      Snapshotted GitHub READMEs for /github/:repoId
scripts/generate-sitemap.ts    Writes public/sitemap.xml from projects/services + regex-parsed blogs.ts
public/                        robots.txt, sitemap.xml (generated), rss.xml (HAND-MAINTAINED, stale),
                               llms.txt, ai.txt, .htaccess (dead — Apache config on Vercel)
supabase/functions/            chat (LLM proxy), fetch-blogs (HN RSS), scrape-github-trending
supabase/migrations/           5 SQL files — STALE, do not reflect the live project (see below)
vercel.json                    SPA rewrite + cache headers
```

## How content works

- **Blog posts** live in `src/data/blogs.ts` as objects with a markdown `content` string. Adding a post = editing that file. `/admin/*` pages are vestigial read-only stubs that say exactly this.
- `BlogPost.tsx` renders markdown with a hand-rolled regex renderer into `dangerouslySetInnerHTML`, splitting out fenced code blocks to a lazy `CodeBlock`.
- **Trending posts** are fetched client-side from the `fetch-blogs` edge function (HN RSS → scraped `<p>` text), merged into `/blog`, cached in localStorage for 1h, and rendered through the same `dangerouslySetInnerHTML` path. They are *not* in the sitemap.
- **Projects/services** are static TS objects. Project routes are numeric ids, not slugs.

## Supabase — read this before touching it

`src/integrations/supabase/types.ts` shows **zero tables** (`[_ in never]: never`), and no file calls `supabase.from()`. The project (`bjsbzhcbcsylmfkdcxeo`, anon key issued ~Mar 2026) is newer than the migrations in `supabase/migrations/` (Jul 2025, from the Lovable era). **Treat those migrations as historical artifacts, not the live schema.** They also contain two RLS bugs that must not be re-applied as-is:

- `profiles` UPDATE policy has no `WITH CHECK` and no column guard → any signed-in user could set their own `role = 'admin'`.
- `blog_comments` has `SELECT USING (true)` over a table holding `guest_email` → public PII read.

Supabase is currently used for: `supabase.auth` (the `/auth` page still has an open **Sign Up** tab) and `functions.invoke`.

## Third-party wiring

| Thing | Where |
| --- | --- |
| Formspree `mkgzjlde` | Contact form, chatbot lead capture, chatbot transcript, checklist lead magnet — all four share one endpoint |
| Calendly `usamaresume30/30min` | `CalendlyEmbed`, used on `/book` and in `Contact` |
| GA4 `G-6JEYSR3YVV` + `G-2ZHRMH3HLK` | `index.html` (loader) + `src/lib/analytics.ts` (SPA page_view, events, web-vitals) |
| Lovable AI Gateway | `supabase/functions/chat` via `LOVABLE_API_KEY`; model `google/gemini-3-flash-preview` |
| Lovable asset CDN | `src/assets/usama-cv.pdf.asset.json` → `/__l5e/...` — **404s on Vercel** |

## Conventions

- Import alias `@/` → `src/`.
- Sections use `AnimatedSection` (framer-motion) wrappers; entrance animations are everywhere, including on the hero `<h1>`.
- Every page should render a `<SEOHead>` with an explicit `canonical`.
- Images: WebP in `src/assets`, `loading="lazy" decoding="async"` + explicit `width`/`height` on non-LCP images.
- Absolute URLs are hardcoded as `https://dev-usama-portfolio.vercel.app` in ~8 files. If a custom domain is ever added, grep for it.

## Known traps

1. `manualChunks.syntax` in `vite.config.ts` makes Vite emit a `<link rel="modulepreload">` for the 634 kB syntax highlighter **on every page**, defeating the lazy import in `BlogPost.tsx`.
2. ~20 internal links are raw `<a href="/...">` instead of `<Link>` → full page reloads on the primary "Book a call" CTA.
3. `public/rss.xml` is written by hand and is missing the 7 newest posts. `sitemap.xml` is generated and is correct — the two disagree.
4. The `.env` file is committed and **not** gitignored (currently only the public anon key, but the pattern is a footgun).
5. `BlogComments.tsx` is fake — comments live in React state only and vanish on reload, while the form collects name + email.

See `docs/audit-2026-09.md` for the full findings list with severities.
