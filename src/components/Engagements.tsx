import { Check } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { trackEvent } from "@/lib/analytics";

const TIERS = [
  {
    id: "sprint",
    n: "01",
    name: "Sprint",
    shape: "Short-term focused work",
    for: "You know exactly what needs doing and need it done properly.",
    price: "From $1,500",
    duration: "1–2 weeks",
    includes: [
      "Laravel feature build or bug-fix sprint",
      "API endpoints, queues, or auth hardening",
      "n8n / automation workflow setup",
      "Code review and architecture notes",
      "Direct WhatsApp + email access",
    ],
    emphasis: false,
  },
  {
    id: "build",
    n: "02",
    name: "Build",
    shape: "End-to-end system",
    for: "You have a product to ship and need the whole backend owned.",
    price: "From $4,500",
    duration: "3–6 weeks",
    includes: [
      "Full Laravel SaaS or backend platform",
      "Multi-tenant DB design, RBAC, billing",
      "REST/GraphQL API with OpenAPI spec",
      "CI/CD, observability, zero-downtime deploys",
      "Handover docs + 2-week post-launch support",
    ],
    emphasis: true,
  },
  {
    id: "scale",
    n: "03",
    name: "Scale",
    shape: "Ongoing engineering partnership",
    for: "You need senior capacity and architecture leadership, continuously.",
    price: "From $3,500 / mo",
    duration: "Ongoing",
    includes: [
      "Dedicated capacity each week",
      "VoIP / Asterisk, real-time, AI integrations",
      "Architecture leadership for your team",
      "Incident response + performance tuning",
      "Monthly roadmap & technical debt reviews",
    ],
    emphasis: false,
  },
];

/**
 * ENGAGEMENTS.
 *
 * Structured as a decision aid, not a SaaS pricing table: the reader picks by
 * the shape of their problem, which is the axis they actually differ on.
 * "Build" is emphasised with elevation and an accent rail rather than a
 * "most popular" badge — this isn't a checkout.
 */
/** "From $3,500 / mo" → { amount: "$3,500", per: "/ mo" } */
const splitPrice = (p: string) => {
  const m = p.match(/^From\s+(\S+)\s*(\/\s*\w+)?/i);
  return m ? { amount: m[1], per: m[2] } : { amount: p, per: undefined };
};

const Engagements = () => (
  <section id="pricing" className="fx-glow-top relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <SectionHeader
        align="center"
        eyebrow="Engagements"
        title={
          <>
            Three ways to work <em>together.</em>
          </>
        }
        lead="Choose by the shape of the problem rather than the budget. Every engagement starts with the same free 30-minute call."
      />

      <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
        {TIERS.map((t, i) => {
          const { amount, per } = splitPrice(t.price);
          return (
            <Reveal key={t.id} index={i} variant="fade">
              <div
                className={`relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-1 p-7 lg:p-9 ${
                  t.emphasis ? "border-primary/45" : "border-hairline/[0.1]"
                }`}
              >
                {/* soft spotlight in the corner, as if the card is lit from above */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-28 -z-10 h-72 w-72 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / ${t.emphasis ? 0.22 : 0.09}), transparent 70%)`,
                  }}
                />
                <div className="flex h-7 items-center justify-between gap-3">
                  <h3 className="mono-label text-muted-foreground">{t.name}</h3>
                  {t.emphasis ? (
                    <span className="rounded-full bg-primary px-2.5 py-1 font-inter text-xs font-semibold text-primary-foreground">
                      Most common
                    </span>
                  ) : (
                    <span className="font-inter text-xs text-subtle">{t.duration}</span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-inter text-sm text-subtle">from</span>
                  <span className="font-inter text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
                    {amount}
                  </span>
                  {per && <span className="font-inter text-sm text-subtle">{per}</span>}
                </div>

                <p className="mt-4 font-inter text-sm leading-relaxed text-muted-foreground">{t.for}</p>

                <ul className="mt-7 flex-1 border-t border-hairline/[0.08]">
                  {t.includes.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 border-b border-hairline/[0.08] py-3 font-inter text-sm leading-relaxed text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-inter text-xs text-subtle">
                  {t.shape}
                  {t.emphasis && ` · ${t.duration}`}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* One action for all three tiers. Each card used to carry its own
          "Book a free call", so the section presented the primary action three
          times in a row, which reads as a pricing template rather than as an
          engagement model. */}
      <Reveal>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <CTA to="/book" size="lg" arrow onClick={() => trackEvent("book_call_click", { location: "engagements" })}>
            Book a free call
          </CTA>
          <p className="max-w-md font-inter text-sm text-subtle">
            Pricing is a starting reference. Scope and price are agreed after the call, not before it.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Engagements;
