import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface CalendlyEmbedProps {
  url?: string;
  height?: number;
  className?: string;
  title?: string;
}

const CalendlyEmbed = ({
  url = "https://calendly.com/usamaresume30/30min",
  height = 700,
  className = "",
  title = "Book a free 30-minute consultation",
}: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Calendly widget script only once
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
  }, [url]);

  return (
    <Card className={`overflow-hidden rounded-2xl border-border/30 bg-card/60 ${className}`}>
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: `${height}px` }}
        aria-label={title}
        role="region"
      />
    </Card>
  );
};

export default CalendlyEmbed;
