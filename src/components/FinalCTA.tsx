import CTA from "@/components/system/CTA";
import Reveal from "@/components/system/Reveal";
import SilkBackground from "@/components/fx/SilkBackground";
import { trackEvent } from "@/lib/analytics";

/**
 * FINAL CTA: one centred statement over the light streaks. The supporting
 * line tells the reader they can arrive with a problem rather than a
 * specification, which is the real objection at this point on the page.
 */
interface FinalCTAProps {
  /** Analytics label for the booking click. */
  location?: string;
  /** The quieter second action; defaults to the work index. */
  secondary?: { to: string; label: string };
}

const FinalCTA = ({
  location = "final_cta",
  secondary = { to: "/projects", label: "See my work" },
}: FinalCTAProps) => (
  <section className="relative isolate overflow-hidden py-28 lg:py-40">
    <SilkBackground
      seed={2}
      lift={-0.02}
      intensity={0.9}
      className="-z-10 [mask-image:linear-gradient(180deg,transparent,#000_18%,#000_80%,transparent)]"
    />
    {/* Scrim under the whole text block, footnote included, so no strand can
        pass behind a line of text at full brightness. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ background: "radial-gradient(62% 58% at 50% 50%, hsl(var(--background)) 45%, hsl(var(--background) / 0.6) 65%, transparent 88%)" }}
    />

    <div className="container relative mx-auto text-center">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline/[0.12] bg-surface-1/60 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_hsl(152_60%_50%/0.2)]" aria-hidden="true" />
          <span className="font-inter text-[13px] font-medium text-foreground">Open for new work</span>
        </div>
      </Reveal>
      <Reveal index={1}>
        <h2 className="type-hero mx-auto mt-7 max-w-4xl text-foreground">
          Have a system that needs to <em>scale?</em>
        </h2>
      </Reveal>
      <Reveal index={2}>
        <p className="type-lead mx-auto mt-6 max-w-xl text-muted-foreground">
          Bring your architecture problem, automation bottleneck, or product idea. We will work out the
          right engineering path before you spend more time or money.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          <CTA to="/book" size="lg" arrow onClick={() => trackEvent("book_call_click", { location })}>
            Book a free call
          </CTA>
          <CTA to={secondary.to} tone="ghost" size="lg">
            {secondary.label}
          </CTA>
        </div>
        <p className="mt-6 font-inter text-sm text-muted-foreground">Free, 30 minutes, no pitch. You leave with a next step either way.</p>
      </Reveal>
    </div>
  </section>
);

export default FinalCTA;
