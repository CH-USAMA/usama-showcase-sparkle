import { MessageCircle } from "lucide-react";
import CTA from "@/components/system/CTA";
import Reveal from "@/components/system/Reveal";
import { useSpotlight } from "@/hooks/usePointerField";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/data/site";

/**
 * FINAL CTA.
 *
 * One ask, stated plainly. The supporting line does the real work: it tells the
 * reader they can arrive with a problem rather than a specification, which is
 * the actual objection at this point on the page.
 */
const FinalCTA = () => {
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <section className="relative py-6">
      <div className="container mx-auto">
        <Reveal variant="fade">
          <div
            ref={spotlight}
            className="relative isolate overflow-hidden rounded-2xl border border-hairline/[0.09] bg-surface-1/60 px-7 py-16 lg:px-16 lg:py-24"
          >
            <div
              className="grid-field mask-radial pointer-events-none absolute inset-0 -z-10 opacity-70"
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 [@media(pointer:fine)]:opacity-100"
              style={{
                background:
                  "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.09), transparent 70%)",
              }}
            />

            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary anim-status" aria-hidden="true" />
                <span className="mono-label text-primary">Open for new work</span>
              </div>

              <h2 className="type-h2 mt-7 text-foreground">
                Have a system that
                <br /> needs to{" "}
                <span className="font-display italic text-gradient">scale?</span>
              </h2>

              <p className="type-lead mt-7 max-w-xl text-muted-foreground">
                Bring your architecture problem, automation bottleneck, or product idea.
                Let's figure out the right engineering path before you spend more time
                or money.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CTA
                  to="/book"
                  size="lg"
                  arrow
                  onClick={() => trackEvent("book_call_click", { location: "final_cta" })}
                >
                  Book an Architecture Call
                </CTA>
                <CTA
                  href={WHATSAPP_URL}
                  tone="ghost"
                  size="lg"
                  arrow
                  onClick={() => trackEvent("whatsapp_click", { location: "final_cta" })}
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </span>
                </CTA>
              </div>

              <p className="mono-tiny mt-8 text-subtle">
                Free · 30 minutes · No pitch — you leave with a next step either way
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
