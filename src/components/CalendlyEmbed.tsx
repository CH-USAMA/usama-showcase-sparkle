import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface CalendlyEmbedProps {
  url?: string;
  height?: number;
  className?: string;
  title?: string;
  /** Only load the Calendly script once the widget scrolls into view. */
  lazy?: boolean;
}

const CalendlyEmbed = ({
  url = "https://calendly.com/usamaresume30/30min",
  height = 700,
  className = "",
  title = "Book a free 30-minute consultation",
  lazy = true,
}: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
        url,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, [url, visible]);

  return (
    <Card className={`overflow-hidden rounded-2xl border-border/30 bg-card/60 ${className}`}>
      <div ref={sentinelRef} />
      {visible ? (
        <div
          ref={containerRef}
          className="calendly-inline-widget"
          data-url={url}
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
    </Card>
  );
};

export default CalendlyEmbed;
