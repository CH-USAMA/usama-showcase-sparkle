import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "@/components/ThemeProvider";
import { preloadRoute } from "./routes";
import { preloadHomeSections } from "./pages/homeSections";

/*
 * Build-time rendering. scripts/prerender.ts calls render() for every public
 * route and writes the HTML into that route's index.html, so the first paint
 * is the real page (and its largest text is a Largest Contentful Paint
 * candidate before any JavaScript has run), and readers and crawlers without
 * JavaScript get the full content.
 *
 * The browser does not hydrate this markup; main.tsx renders over it (see
 * src/lib/boot.ts for how the entrances carry on without replaying).
 *
 * The route's page is preloaded first, so React.lazy resolves synchronously
 * and renderToString renders the page rather than its Suspense fallback.
 * Parts that only make sense in a browser (the hero diagram, the calendar,
 * the chat launcher, the code highlighter) check import.meta.env.SSR and
 * render their placeholders, which is also what the browser's first render
 * shows.
 */
export interface Rendered {
  /** The page, for #root. */
  html: string;
  /**
   * The page's own <head> tags, exactly as SEOHead renders them in the
   * browser: title, description, robots, canonical, Open Graph, Twitter and
   * structured data. Each carries data-rh, so react-helmet takes them over.
   */
  head: string;
}

const renderOnce = (url: string): Rendered => {
  const context: { helmet?: HelmetServerState | null } = {};
  const html = renderToString(
    <HelmetProvider context={context}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
  const h = context.helmet;
  const head = h ? [h.title, h.meta, h.link, h.script].map((d) => d.toString()).filter(Boolean).join("\n") : "";
  return { html, head };
};

export async function render(url: string): Promise<Rendered> {
  const pathname = url.split(/[?#]/)[0];
  await preloadRoute(pathname);
  if (pathname === "/") await preloadHomeSections();

  // Lazy parts below a page's own content (footer, closing call to action,
  // related posts) start loading on the first pass and render on a later one.
  // renderToString does not wait for them: a boundary still loading when it
  // finishes is written out as its fallback, marked <!--$!-->. Render again
  // until none are left and a pass changes nothing (capped: a part that keeps
  // failing on the server stays a fallback, and the browser renders it).
  const deadline = Date.now() + 5000;
  let out = renderOnce(url);
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const next = renderOnce(url);
    const settled = next.html === out.html && !next.html.includes("<!--$!-->");
    out = next;
    if (settled) break;
  }
  return out;
}
