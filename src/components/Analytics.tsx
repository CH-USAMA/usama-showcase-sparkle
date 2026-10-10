import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initWebVitals, syncTrackingFlag, trackPageView } from "@/lib/analytics";

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
    const first = lastPath.current === null;
    lastPath.current = path;
    syncTrackingFlag(location.pathname);

    // The landing page's title is already in its HTML. After a client-side
    // navigation the new page writes its title a little later (Helmet does it
    // in an animation frame, and a lazy page may still be loading), so the
    // page_view waits for the title to change, or 1.5 s at most. Sent sooner,
    // it carried the previous page's title.
    if (first) {
      trackPageView(location.pathname, document.title);
      return;
    }
    const before = document.title;
    let sent = false;
    let timer = 0;
    const observer = new MutationObserver(() => {
      if (document.title !== before) send();
    });
    const send = () => {
      if (sent) return;
      sent = true;
      observer.disconnect();
      window.clearTimeout(timer);
      trackPageView(location.pathname, document.title);
    };
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    timer = window.setTimeout(send, 1500);
    // Leaving before the title changes still counts the visit.
    return send;
  }, [location.pathname, location.search]);

  return null;
};

export default Analytics;
