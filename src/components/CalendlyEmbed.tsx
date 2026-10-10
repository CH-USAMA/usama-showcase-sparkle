import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  url?: string;
  height?: number;
  className?: string;
  title?: string;
  /** Only load the Calendly script once the widget scrolls into view. */
  lazy?: boolean;
}

/** Tracks the theme class on <html>, so the embed re-renders on toggle. */
function useIsDark() {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const root = document.documentElement;
    const mo = new MutationObserver(() => setDark(root.classList.contains("dark")));
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

const CalendlyEmbed = ({
  url = "https://calendly.com/usamaresume30/30min",
  height = 700,
  className = "",
  title = "Book a free 30-minute consultation",
  lazy = true,
}: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dark = useIsDark();
  // Calendly's own embed options: theme colours, no cookie banner inside the
  // frame, and no event panel (it shows the account name).
  const themedUrl = `${url}?${new URLSearchParams({
    hide_gdpr_banner: "1",
    hide_event_type_details: "1",
    background_color: dark ? "0b0b0b" : "ffffff",
    text_color: dark ? "f5f5f5" : "1a1d24",
    primary_color: dark ? "3d9bff" : "0b62d6",
  })}`;
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);

  // Defer loading until the embed is close to the viewport
  useEffect(() => {
    if (visible || typeof IntersectionObserver === "undefined") {
      if (!visible) setVisible(true);
      return;
    }
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const existing = document.getElementById("calendly-widget-script") as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as typeof window & { Calendly?: { initInlineWidget: (opts: Record<string, unknown>) => void } }).Calendly) {
      (window as typeof window & { Calendly: { initInlineWidget: (opts: Record<string, unknown>) => void } }).Calendly.initInlineWidget({
        url: themedUrl,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, [themedUrl, visible]);

  return (
    <div className={`overflow-hidden rounded-2xl bg-card/60 ${className}`}>
      <div ref={sentinelRef} />
      {visible ? (
        <div
          key={themedUrl}
          ref={containerRef}
          className="calendly-inline-widget"
          data-url={themedUrl}
          style={{ minWidth: "320px", height: `${height}px` }}
          aria-label={title}
          role="region"
        />
      ) : (
        <div
          className="flex items-center justify-center bg-card/30 animate-pulse"
          style={{ minWidth: "320px", height: `${height}px` }}
          aria-hidden="true"
        >
          <span className="text-sm text-muted-foreground font-inter">Loading calendar…</span>
        </div>
      )}
    </div>
  );
};

export default CalendlyEmbed;
