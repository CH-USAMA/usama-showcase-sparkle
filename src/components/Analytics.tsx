import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initWebVitals, syncTrackingFlag, trackPageView } from "@/lib/analytics";

/** Longest wait for a page's own title before its page_view goes out anyway. */
const TITLE_WAIT = 8000;

/**
 * Tracks SPA route changes as GA4 page_views.
 * Mount once inside <BrowserRouter>.
 */
const Analytics = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);
  const vitalsInit = useRef(false);

  useEffect(() => {
    if (!vitalsInit.current) {
      vitalsInit.current = true;
      initWebVitals();
    }
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPath.current === path) return;
    const previous = lastPath.current;
    lastPath.current = path;
    // Captured now: a page_view sent later must not pick up the next URL.
    const pathname = location.pathname;
    const search = location.search;
    syncTrackingFlag(pathname);

    // The title is already right on a prerendered landing page, and when only
    // the query string changed (a filter on the same page).
    const prerendered = previous === null && document.getElementById("root")?.hasAttribute("data-prerendered");
    const samePage = previous !== null && previous.split("?")[0] === pathname;
    if (prerendered || samePage) {
      trackPageView(pathname, document.title, search);
      return;
    }

    // Otherwise the page writes its title once it has rendered: Helmet does it
    // in an animation frame, and a lazy page, or one served by the app shell
    // and waiting on /api, takes longer. Sent sooner, the page_view carried
    // the previous page's title. A page left before it rendered is not
    // counted (the visitor never saw it); one whose title matches the
    // previous page's goes out after TITLE_WAIT.
    const before = document.title;
    let done = false;
    const finish = (send: boolean) => {
      if (done) return;
      done = true;
      observer.disconnect();
      window.clearTimeout(timer);
      if (send) trackPageView(pathname, document.title, search);
    };
    const observer = new MutationObserver(() => {
      if (document.title !== before) finish(true);
    });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    const timer = window.setTimeout(() => finish(true), TITLE_WAIT);
    return () => {
      // StrictMode (dev) runs this effect twice for the same URL: let the
      // second run start the wait again rather than skip the page.
      if (!done && window.location.pathname + window.location.search === path) lastPath.current = previous;
      finish(false);
    };
  }, [location.pathname, location.search]);

  return null;
};

export default Analytics;
