import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { preloadRoute } from './routes'
import { preloadHomeSections } from './pages/homeSections'
import { captureReaderState, startBoot } from './lib/boot'
import './index.css'
import { ThemeProvider } from "@/components/ThemeProvider"

// Canonical domain guard: send the published Lovable mirror to the canonical Vercel domain
// (preview/editor hosts are left untouched so the Lovable preview keeps working).
const CANONICAL_HOST = "www.chaudharyusama.com"
const MIRROR_HOSTS = [
  "usama-showcase-sparkle.lovable.app",
  "dev-usama-portfolio.vercel.app",
  "chaudharyusama.com",
]
if (typeof window !== "undefined" && MIRROR_HOSTS.includes(window.location.hostname)) {
  window.location.replace(
    `https://${CANONICAL_HOST}${window.location.pathname}${window.location.search}${window.location.hash}`
  )
}


const container = document.getElementById('root')!
// Set by scripts/prerender.ts on routes rendered at build time.
const prerendered = container.hasAttribute('data-prerendered')

/** Resolves once the browser has presented its first contentful frame. */
function firstPaint(cap: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, cap)
    try {
      const po = new PerformanceObserver((list) => {
        if (!list.getEntriesByName('first-contentful-paint').length) return
        po.disconnect()
        resolve()
      })
      po.observe({ type: 'paint', buffered: true })
    } catch {
      // No paint timing: a frame boundary is the next best signal.
      requestAnimationFrame(() => setTimeout(resolve, 0))
    }
  })
}

/**
 * Resolves once the prerendered page's high-priority images (a post's cover,
 * the lead card on /blog) are on screen, so the page's largest image is the
 * prerendered one rather than React's copy of it. They carry
 * elementtiming="priority", which reports when each is actually presented;
 * without Element Timing, decoded plus one frame is the closest signal.
 */
function priorityImagesPainted(cap: number) {
  const imgs = [...container.querySelectorAll<HTMLImageElement>('img[elementtiming="priority"]')]
  if (!imgs.length) return Promise.resolve()
  return new Promise<void>((resolve) => {
    setTimeout(resolve, cap)
    if (!PerformanceObserver.supportedEntryTypes?.includes('element')) {
      Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(() =>
        requestAnimationFrame(() => setTimeout(resolve, 0))
      )
      return
    }
    const shown = new Set<Element>()
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries() as (PerformanceEntry & { element?: Element | null })[]) {
        if (e.element) shown.add(e.element)
      }
      if (imgs.every((img) => shown.has(img))) {
        po.disconnect()
        resolve()
      }
    })
    po.observe({ type: 'element', buffered: true })
  })
}

const render = () => {
  startBoot(prerendered)
  if (prerendered) captureReaderState(container)
  createRoot(container).render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  )
}

// Load the current route's page before the first render. Until React renders,
// the prerendered HTML for this route stays on screen; rendering first would
// swap it for an empty Suspense fallback and then the page.
const { pathname, hash } = window.location
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const atHome = prerendered && pathname === '/'
const belowHomeFold = () => atHome && (window.scrollY > 0 || hash !== '')

const pending: Promise<unknown>[] = [preloadRoute(pathname)]
if (belowHomeFold()) pending.push(preloadHomeSections())
// The prerendered page is the real page: let the browser show it before React
// replaces it. When the bundle is already cached, or the network is fast, the
// app can otherwise render before the first frame is presented, and the first
// paint then waits for JavaScript. Capped, because hidden tabs do not paint.
if (prerendered) pending.push(firstPaint(1500), priorityImagesPainted(2000))

;(async () => {
  if (!prerendered) {
    // Nothing on screen yet (the app shell): render after at most 3s, and
    // let a slow page show its loading state.
    await Promise.race([Promise.all(pending).catch(() => undefined), wait(3000)])
    return render()
  }
  // The page on screen is complete and its links work without the app, so
  // wait for the route's code however long it takes. If it cannot load,
  // leave the page as it is rather than replace it with an empty one.
  try {
    await Promise.all(pending)
  } catch {
    return
  }
  // A reader already below the fold of the prerendered home page (scrolled,
  // or arrived on a #section link) needs its sections in memory before React
  // replaces the markup, or the page would collapse under them.
  if (belowHomeFold()) {
    try {
      await preloadHomeSections()
    } catch {
      return
    }
  }
  render()
})()
