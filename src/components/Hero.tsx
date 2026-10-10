import { lazy, Suspense } from "react";
import { Download } from "lucide-react";
import CTA from "@/components/system/CTA";
import SilkBackground from "@/components/fx/SilkBackground";
import { trackEvent } from "@/lib/analytics";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useEnter } from "@/lib/boot";
import { CV_URL, CV_FILENAME } from "@/data/site";

const SystemGraph = lazy(() => import("@/components/system/SystemGraph"));
const diagramSpace = <div className="aspect-[380/560] w-full sm:aspect-[720/680]" aria-hidden="true" />;

/** Left panel of the window: the stack, as an editor's layer list. */
const LAYERS = ["Laravel", "Node.js", "React", "React Native", "Redis", "Asterisk", "LLMs · RAG", "n8n · MCP", "Docker"];

/**
 * Hero.
 *
 * Centred statement over moving light, then the work itself in a framed
 * window that peeks above the fold: the system diagram beside a stack list,
 * like an editor with its layers panel open.
 *
 * The h1 is painted at full opacity on the first frame (it is the LCP
 * element) and everything else enters by CSS, so a throttled JS loop can never
 * leave the hero blank. The light streaks initialise in idle time.
 */
const Hero = () => {
  // The diagram runs ~24 infinite SVG animations; stop them once scrolled
  // past, and after 12s on screen untouched (they wake on pointer or focus).
  const windowRef = usePauseOffscreen<HTMLDivElement>(12_000);
  // Stagger delays; on the first render over prerendered HTML they pick up
  // where the prerendered hero's entrance had got to instead of replaying it.
  const enter = useEnter();
  return (
  <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
    <SilkBackground className="-z-10 h-[min(100svh,1000px)] [mask-image:linear-gradient(180deg,#000_70%,transparent)]" />
    {/* keeps the headline on clean black while the strands run below it */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(100svh,1000px)]"
      style={{ background: "radial-gradient(62% 52% at 50% 30%, hsl(var(--background)) 38%, transparent 80%)" }}
    />

    <div className="container relative mx-auto text-center">
      <div
        className="enter inline-flex items-center gap-2 rounded-full border border-hairline/[0.12] bg-surface-1/60 px-3.5 py-1.5 backdrop-blur-md"
        {...enter(40)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_hsl(152_60%_50%/0.2)]" aria-hidden="true" />
        <span className="font-inter text-[13px] font-medium text-foreground">Available for new projects</span>
      </div>

      {/* LCP element: painted immediately, never faded in */}
      <h1 className="type-hero mx-auto mt-7 max-w-5xl text-foreground">
        I ship websites &amp; apps <br className="hidden sm:block" />
        <em>built to last.</em>
      </h1>

      <p className="enter-lift type-lead mx-auto mt-6 max-w-2xl text-muted-foreground" {...enter(140)}>
        I'm Usama Munawar. I build websites and digital products end to end: React frontends, React
        Native apps, Node.js services, and Laravel backends that work together in production.
      </p>

      <div className="enter mt-9 flex flex-wrap items-center justify-center gap-2.5" {...enter(220)}>
        <CTA to="/book" size="lg" arrow onClick={() => trackEvent("book_call_click", { location: "hero" })}>
          Book a free call
        </CTA>
        <CTA to="/projects" tone="ghost" size="lg">
          See my work
        </CTA>
        <a
          href={CV_URL}
          download={CV_FILENAME}
          onClick={() => trackEvent("cv_download", { location: "hero" })}
          className="group inline-flex h-10 items-center gap-2 px-3 font-inter text-sm font-medium text-foreground/80 transition-colors duration-standard hover:text-foreground"
        >
          <Download className="h-4 w-4 transition-transform duration-standard group-hover:translate-y-0.5" aria-hidden="true" />
          CV
        </a>
      </div>
    </div>

    {/* ---- the window ---- */}
    <div ref={windowRef} className="enter-soft container relative mx-auto mt-16 lg:mt-20" {...enter(260)}>
      <div className="fx-rim mx-auto max-w-6xl overflow-hidden rounded-2xl border border-hairline/[0.12] bg-surface-1/85 backdrop-blur-xl">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-hairline/[0.08] px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-hairline/[0.16]" />
            <span className="h-2.5 w-2.5 rounded-full bg-hairline/[0.16]" />
            <span className="h-2.5 w-2.5 rounded-full bg-hairline/[0.16]" />
          </div>
          <span className="truncate font-mono text-[11.5px] text-subtle">usama / system.architecture</span>
          <span className="inline-flex items-center gap-1.5 font-inter text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="grid lg:grid-cols-[12rem_minmax(0,1fr)]">
          <aside className="hidden border-r border-hairline/[0.08] p-4 text-left lg:block" aria-label="Stack">
            <p className="mono-tiny text-subtle">Stack</p>
            <ul className="mt-3 space-y-0.5">
              {LAYERS.map((l, i) => (
                <li
                  key={l}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 font-inter text-[13px] ${
                    i === 0 ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-sm ${i === 0 ? "bg-primary" : "bg-hairline/[0.25]"}`} aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </aside>

          <div className="relative px-3 py-6 sm:px-8 lg:py-8">
            <div className="mx-auto max-w-[46rem]">
              {/* Reserve the diagram's own aspect ratio (it switches layouts at
                  640px) so mounting the lazy chunk never shifts the page. The
                  build-time render leaves it out: which layout fits is only
                  known in the browser. */}
              {import.meta.env.SSR ? (
                diagramSpace
              ) : (
                <Suspense fallback={diagramSpace}>
                  <SystemGraph />
                </Suspense>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
