import { useEffect, useRef, useState } from "react";
import { CALENDLY_HEIGHT, CALENDLY_URL } from "@/data/site";

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
 * 400 px calendar. Below about 650 px Calendly switches to its mobile layout,
 * which reflows to any width, so the frame has no minimum width: a 320 px one
 * was wider than the card on 360 px phones and lost the Sunday column.
 */
const CalendlyEmbed = ({
  url = CALENDLY_URL,
  height = CALENDLY_HEIGHT,
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
  const [drawn, setDrawn] = useState(false);

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

  // Calendly takes 8 to 15 seconds to draw, and its frame is transparent until
  // then, so a label behind it says what is coming. It goes once Calendly's
  // page reports itself (it posts "calendly.*" messages to this window), or
  // after 45 s, so it is never left behind the calendar.
  useEffect(() => {
    if (!visible || drawn) return;
    const onMessage = (e: MessageEvent) => {
      const event = (e.data as { event?: unknown } | null)?.event;
      if (e.origin === "https://calendly.com" && typeof event === "string" && event.startsWith("calendly.")) setDrawn(true);
    };
    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => setDrawn(true), 45_000);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [visible, drawn]);

  return (
    <div className={`relative mx-auto w-full max-w-[720px] overflow-hidden rounded-xl bg-white ${className}`}>
      <div ref={sentinelRef} />
      {!drawn && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="animate-pulse font-inter text-sm text-neutral-500">Loading calendar…</span>
        </div>
      )}
      {visible ? (
        <div
          ref={containerRef}
          className="calendly-inline-widget relative"
          data-url={embedUrl}
          style={{ height: `${height}px` }}
          aria-label={title}
          role="region"
        />
      ) : (
        <div style={{ height: `${height}px` }} aria-hidden="true" />
      )}
    </div>
  );
};

export default CalendlyEmbed;
