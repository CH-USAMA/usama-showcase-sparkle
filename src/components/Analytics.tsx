import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, initWebVitals } from "@/lib/analytics";

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
    lastPath.current = path;

    // Wait a tick so <SEOHead> can update document.title first.
    const id = window.setTimeout(() => {
      trackPageView(location.pathname, document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default Analytics;
