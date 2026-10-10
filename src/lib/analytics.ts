// Google Analytics 4 helpers
// Measurement IDs are loaded in index.html; this module wraps gtag for typed,
// SPA-aware tracking across the app.

export const GA_MEASUREMENT_ID = "G-6JEYSR3YVV";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

const isBrowser = () => typeof window !== "undefined";

const shouldTrack = (path: string) => {
  if (!isBrowser()) return false;
  // Don't pollute analytics with admin / auth traffic
  if (path.startsWith("/admin")) return false;
  if (path.startsWith("/auth")) return false;
  return true;
};

/**
 * GA's own off switch (see index.html) follows the route: set on /admin and
 * /auth, so GA's automatic events (scroll, session start) stay quiet there
 * too. Call on every route change, before anything is sent.
 */
export const syncTrackingFlag = (path: string) => {
  if (!isBrowser()) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !shouldTrack(path);
};

/** Web vitals are reported under the landing page: its path, and the title its page_view carried. */
const landingPath = isBrowser() ? window.location.pathname : "";
let landingTitle: string | undefined;
let pendingVitals: (() => void)[] = [];
const flushVitals = () => {
  const queue = pendingVitals;
  pendingVitals = [];
  queue.forEach((report) => report());
};

/**
 * Send a SPA page_view to GA4. Call this on every route change, with the
 * route's own query string: a page_view sent late must not take the next URL's.
 */
export const trackPageView = (path: string, title?: string, search?: string) => {
  if (!isBrowser() || !window.gtag) return;
  if (!shouldTrack(path)) return;

  const page_location = window.location.origin + path + (search ?? window.location.search);
  const page_title = title ?? document.title;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location,
    page_title,
    send_to: GA_MEASUREMENT_ID,
  });
  if (landingTitle === undefined && path === landingPath) {
    landingTitle = page_title;
    flushVitals();
  }
};

/** Send a custom event. Use for clicks, form submits, downloads, etc. */
export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {}
) => {
  if (!isBrowser() || !window.gtag) return;
  // Admin and sign-in pages stay out of analytics, web vitals included.
  if (!shouldTrack(window.location.pathname)) return;
  window.gtag("event", name, params);
};

/** Update consent state (call from a cookie-banner Accept/Reject). */
export const updateConsent = (granted: boolean) => {
  if (!isBrowser() || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
};

/** Report Core Web Vitals (LCP, INP, CLS, FCP, TTFB) as GA4 events. */
export const initWebVitals = () => {
  if (!isBrowser()) return;
  // The metrics describe the page the visit started on, but LCP is reported
  // on the first click (often a link to another page) and CLS and INP when
  // the tab is hidden, by which time the URL may have changed. They carry the
  // landing page's URL and the title its page_view carried. Early ones (TTFB,
  // FCP) can arrive before that page_view (a page served by the app shell
  // waits for its own title): they wait for it, at most 3 s.
  if (!shouldTrack(landingPath)) return;
  const page_location = window.location.href;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushVitals();
  });
  import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
    const send = (metric: { name: string; value: number; id: string; rating?: string }) => {
      const report = () =>
        trackEvent("web_vitals", {
          metric_name: metric.name,
          metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_rating: metric.rating,
          non_interaction: true,
          page_location,
          page_title: landingTitle ?? document.title,
        });
      if (landingTitle !== undefined || document.visibilityState === "hidden") return report();
      pendingVitals.push(report);
      window.setTimeout(flushVitals, 3000);
    };
    onCLS(send); onINP(send); onLCP(send); onFCP(send); onTTFB(send);
  }).catch(() => {});
};
