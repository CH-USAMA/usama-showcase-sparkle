import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  url?: string;
  height?: number;
  className?: string;
  title?: string;
  /** Only load the Calendly script once the widget scrolls into view. */
  lazy?: boolean;
}

/*
 * Calendly's frame is light in both themes: on this account's plan it ignores
 * the colour parameters, so none are sent (and toggling the theme no longer
 * reloads the frame). The card is at most 720 px wide, about the width of
 * Calendly's own desktop layout; a wider frame only adds empty white around a
 * 400 px calendar. Below about 650 px Calendly switches to its mobile layout.
 */
const CalendlyEmbed = ({
  url = "https://calendly.com/usamaresume30/30min",
  height = 700,
  className = "",
  title = "Book a free 30-minute consultation",
  lazy = true,
}: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Calendly's own embed options: no cookie banner inside the frame, and no
  // event panel (it shows the account name).
  const embedUrl = `${url}?${new URLSearchParams({ hide_gdpr_banner: "1", hide_event_type_details: "1" })}`;
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
        url: embedUrl,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, [embedUrl, visible]);

  return (
    <div className={`mx-auto w-full max-w-[720px] overflow-hidden rounded-xl bg-white ${className}`}>
      <div ref={sentinelRef} />
      {visible ? (
        <div
          ref={containerRef}
          className="calendly-inline-widget"
          data-url={embedUrl}
          style={{ minWidth: "320px", height: `${height}px` }}
          aria-label={title}
          role="region"
        />
      ) : (
        <div
          className="flex animate-pulse items-center justify-center"
          style={{ minWidth: "320px", height: `${height}px` }}
          aria-hidden="true"
        >
          <span className="font-inter text-sm text-neutral-500">Loading calendar…</span>
        </div>
      )}
    </div>
  );
};

export default CalendlyEmbed;
