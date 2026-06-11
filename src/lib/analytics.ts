// Google Analytics 4 helpers
// Measurement IDs are loaded in index.html; this module wraps gtag for typed,
// SPA-aware tracking across the app.

export const GA_MEASUREMENT_ID = "G-6JEYSR3YVV";
export const GA_MEASUREMENT_ID_2 = "G-2ZHRMH3HLK";

const GA_IDS = [GA_MEASUREMENT_ID, GA_MEASUREMENT_ID_2];

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

/** Send a SPA page_view to GA4. Call this on every route change. */
export const trackPageView = (path: string, title?: string) => {
  if (!isBrowser() || !window.gtag) return;
  if (!shouldTrack(path)) return;

  const page_location = window.location.origin + path + window.location.search;
  const page_title = title ?? document.title;

  // Send page_view to both GA properties
  GA_IDS.forEach((id) => {
    window.gtag!("event", "page_view", {
      page_path: path,
      page_location,
      page_title,
      send_to: id,
    });
  });
};

/** Send a custom event. Use for clicks, form submits, downloads, etc. */
export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {}
) => {
  if (!isBrowser() || !window.gtag) return;
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
