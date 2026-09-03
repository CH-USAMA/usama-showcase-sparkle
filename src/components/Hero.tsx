import { lazy, Suspense } from "react";
import { Download } from "lucide-react";
import CTA from "@/components/system/CTA";
import Telemetry from "@/components/system/Telemetry";
import { useSpotlight } from "@/hooks/usePointerField";
import { trackEvent } from "@/lib/analytics";
import { CV_URL, CV_FILENAME } from "@/data/site";

const SystemGraph = lazy(() => import("@/components/system/SystemGraph"));

const READOUTS = [
  { label: "Status", value: "Available for work", status: "on" as const },
  { label: "Core stack", value: "Laravel · PHP 8" },
  { label: "Response", value: "Within 4 hours" },
  { label: "Based in", value: "Lahore · UTC+5" },
];

/** Stagger helper — reads as a delay token rather than a magic number inline. */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Hero.
 *
 * Two deliberate decisions here:
 *
 * 1. The h1 is painted at full opacity on the first frame — no entrance fade.
 *    An opacity-0 element is not counted for LCP, so animating the headline in
 *    would mean hand-delaying the site's own largest paint.
 *
 * 2. Everything else enters via CSS animation rather than JS. Above-the-fold
 *    content that starts invisible and waits for a JS animation loop is blank
 *    if that loop is throttled — a background tab, a restored session. CSS
 *    entrance is compositor-driven and the browser guarantees its end state.
 */
const Hero = () => {
  const spotlight = useSpotlight<HTMLElement>();

  return (
    <section
      ref={spotlight}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-hero-gradient pb-20 pt-28 lg:pb-24 lg:pt-28"
    >
      {/* blueprint field, faded toward the edges so it never reads as tiling */}
      <div className="grid-field mask-radial pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      {/* cursor spotlight, writes CSS vars only, no React re-render */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 [@media(pointer:fine)]:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 72%) var(--my, 28%), hsl(var(--primary) / 0.07), transparent 70%)",
        }}
      />

      <div className="container relative mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.04fr] lg:gap-8 xl:gap-14">
          {/* ---------------- left: the argument ---------------- */}
          <div className="max-w-[36rem]">
            <div className="enter flex flex-wrap items-center gap-x-3 gap-y-2" style={delay(40)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline/[0.1] bg-surface-1/70 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary anim-status" aria-hidden="true" />
                <span className="mono-tiny text-muted-foreground">
                  <span className="sm:hidden">Backend · AI · Automation</span>
                  <span className="hidden sm:inline">
                    Backend systems · AI · Automation · VoIP
                  </span>
                </span>
              </span>
            </div>

            {/* LCP element: painted immediately, never faded in */}
            <h1 className="type-display mt-7 text-foreground">
              Production-grade
              <br />
              backend,{" "}
              <span className="relative whitespace-nowrap">
                <span className="font-display italic text-gradient">engineered.</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary/15 to-transparent"
                />
              </span>
            </h1>

            <p
              className="enter type-lead mt-7 max-w-xl text-muted-foreground"
              style={delay(140)}
            >
              I architect and ship scalable Laravel systems, automation infrastructure,
              real-time platforms, and AI-powered backends for teams that need software
              to work in production.
            </p>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-3"
              style={delay(220)}
            >
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: "hero" })}
              >
                Book an Architecture Call
              </CTA>
              <CTA to="/projects" tone="ghost" size="lg">
                View Selected Work
              </CTA>
              <a
                href={CV_URL}
                download={CV_FILENAME}
                onClick={() => trackEvent("cv_download", { location: "hero" })}
                className="group inline-flex items-center gap-2 px-1 py-2 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
              >
                <Download
                  className="h-4 w-4 transition-transform duration-standard group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="hover-underline">CV</span>
              </a>
            </div>

            <div className="enter mt-10 max-w-lg" style={delay(320)}>
              <Telemetry items={READOUTS} columns={2} />
            </div>
          </div>

          {/* ---------------- right: the system ---------------- */}
          <div
            className="enter-soft relative mx-auto w-full max-w-[30rem] lg:max-w-none"
            style={delay(160)}
          >
            <Suspense fallback={<div className="aspect-square w-full" aria-hidden="true" />}>
              <SystemGraph />
            </Suspense>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="enter pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
        style={delay(900)}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="mono-tiny text-subtle">Scroll</span>
          <span className="block h-10 w-px overflow-hidden bg-hairline/[0.12]">
            <span
              className="block h-4 w-px bg-primary/80"
              style={{ animation: "sweep-y 2.6s cubic-bezier(0.65,0,0.35,1) infinite" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
