# usama-showcase-sparkle

Personal portfolio + lead-gen site for **Usama Munawar** — full-stack product engineer (React, React Native, Node.js, TypeScript, Laravel/PHP, VoIP/Asterisk, automation, AI).

- **Live:** https://www.chaudharyusama.com
- **Repo:** https://github.com/CH-USAMA/usama-showcase-sparkle
- **Stack:** Vite 5 · React 18 · TypeScript · Tailwind + shadcn/ui · React Router 6 (SPA) · framer-motion · TanStack Query · Supabase (auth + edge functions only) · deployed on Vercel

> ⚠️ This project was generated in [Lovable](https://lovable.dev/projects/229265ce-3579-4bf7-85dd-77988fd0c57f), and **Lovable still pushes commits directly to `main`**. Always `git pull` before you start local work.

---

## Quick start

Requires **Node.js 18+** and npm (developed on Node 22).

```bash
git pull            # Lovable may have pushed since you last worked
npm install
npm run dev:clean   # frees port 8080, then starts the dev server
```

Then open **http://localhost:8080/**.

> First run after a dependency change takes ~40s while Vite re-optimizes; later starts are instant.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Regenerates the sitemap/RSS, then starts Vite on **:8080** |
| `npm run dev:clean` | **Frees port 8080 first, then runs `dev`** — use this as your daily driver so you never hit "port already in use" |
| `npm run kill` | Kills whatever is holding port 8080 (and its child processes). Pass extra ports: `npm run kill -- 5173` |
| `npm run build` | Regenerates the sitemap/RSS, then production build to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | ESLint over the repo |

### Why `kill` / `dev:clean` exist

On Windows especially, a Vite dev server that's closed abruptly (crash, or closing the terminal instead of Ctrl-C) can leave an orphaned Node process holding **:8080**, so the next `npm run dev` fails with *"Port 8080 is already in use."* `npm run kill` clears it in one shot; `npm run dev:clean` does that automatically before every start. The logic lives in [`scripts/kill-dev.mjs`](scripts/kill-dev.mjs) and is cross-platform.

---

## Project structure (short version)

```
index.html                  Static <head> (GA4, 6 JSON-LD blocks) + no-JS crawler fallback <main>
src/main.tsx                Providers + canonical-host redirect
src/App.tsx                 Routes (Index eager; everything else React.lazy)
src/pages/                  Index, Projects, ProjectDetail, Blog, BlogPost, Services, Book, …
src/components/             Landing sections + system/ design components
src/components/ui/          shadcn primitives
src/components/SEOHead.tsx  Per-route title/description/canonical/OG/JSON-LD (react-helmet-async)
src/data/blogs.ts           Blog posts (the "CMS" — edit this file to add a post)
src/data/projects.ts        Project case studies
src/data/services.ts        Service pages
scripts/generate-sitemap.ts Writes public/sitemap.xml + rss.xml from content (runs pre dev/build)
scripts/kill-dev.mjs        Frees the dev port (see above)
supabase/functions/         Edge functions: chat (LLM proxy), fetch-blogs, scrape-github-trending
vercel.json                 SPA rewrites + redirects + cache headers
```

📖 **For deep architecture, conventions, gotchas, and third-party wiring, read [`CLAUDE.md`](CLAUDE.md).** The full code-review findings live in [`docs/audit-2026-09.md`](docs/audit-2026-09.md).

---

## Adding content

- **Blog post** → add an object to `src/data/blogs.ts` (markdown in the `content` string). The sitemap + RSS pick it up automatically on the next `dev`/`build`.
- **Project** → add to `src/data/projects.ts`.
- **Service** → add to `src/data/services.ts`.

Every page component should render a `<SEOHead>` with an explicit `canonical`.

---

## Deploy

Pushing to `main` deploys via Vercel (and is mirrored by Lovable). The canonical host is `www.chaudharyusama.com`; the apex and `*.vercel.app` mirrors 301-redirect to it (see `vercel.json`).
