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

type Status = "loading" | "drawn" | "failed";

/*
 * Calendly's frame is light in both themes: on this account's plan it ignores
 * the colour parameters, so none are sent (and toggling the theme no longer
 * reloads the frame). The card is at most 720 px wide, about the width of
 * Calendly's own desktop layout; a wider frame only adds empty white around a
 * 400 px calendar. Below about 650 px Calendly switches to its mobile layout,
 * which reflows to any width, so the frame has no minimum width: a 320 px one
 * was wider than the card on 360 px phones and lost the Sunday column.
 *
 * The card's color-scheme is light, like Calendly's page. In the dark theme a
 * mismatch made Chrome paint the frame opaque white over the loading label.
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
  const [status, setStatus] = useState<Status>("loading");

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
      // Blocked (an extension, a company filter) or offline: say so, with a
      // link. Removed so a later mount can try again.
      script.onerror = () => {
        script.remove();
        setStatus("failed");
      };
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
  // page reports itself (it posts "calendly.*" messages to this window; until
  // it draws, it shows its own loading dots). With no word after 45 s, a frame
  // on the page is taken as drawn, and no frame means it never loaded.
  useEffect(() => {
    if (!visible || status === "drawn") return;
    const onMessage = (e: MessageEvent) => {
      const event = (e.data as { event?: unknown } | null)?.event;
      if (e.origin === "https://calendly.com" && typeof event === "string" && event.startsWith("calendly.")) setStatus("drawn");
    };
    window.addEventListener("message", onMessage);
    const timer =
      status === "loading"
        ? window.setTimeout(() => setStatus(containerRef.current?.querySelector("iframe") ? "drawn" : "failed"), 45_000)
        : 0;
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [visible, status]);

  return (
    <div
      className={`relative mx-auto w-full max-w-[720px] overflow-hidden rounded-xl bg-white ${className}`}
      style={{ colorScheme: "light" }}
    >
      <div ref={sentinelRef} />
      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="animate-pulse font-inter text-sm text-neutral-500">Loading calendar…</span>
        </div>
      )}
      {status === "failed" && (
        // Above the frame: there is none to cover, or it never loaded.
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center" role="status">
          <span className="font-inter text-sm text-neutral-600">The calendar did not load here.</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm font-medium text-neutral-900 underline underline-offset-4"
          >
            Open it on Calendly
          </a>
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
