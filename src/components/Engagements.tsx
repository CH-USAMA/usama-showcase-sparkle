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
const Engagements = () => (
  <section id="pricing" className="relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <SectionHeader
        index="08"
        eyebrow="Engagements"
        title="Three ways to work together."
        lead="Choose by the shape of the problem rather than the budget. Every engagement starts with the same free 30-minute architecture call."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.08] bg-hairline/[0.06] lg:mt-20 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.id} index={i} variant="fade">
            <div
              className={`relative flex h-full flex-col p-7 lg:p-9 ${
                t.emphasis ? "bg-surface-1" : "bg-background"
              }`}
            >
              {t.emphasis && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              )}

              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="mono-tiny tabular-nums text-primary/70">{t.n}</span>
                  <h3 className="font-inter text-xl font-medium tracking-tight text-foreground">
                    {t.name}
                  </h3>
                </div>
                {t.emphasis && (
                  <span className="mono-tiny rounded border border-primary/30 bg-primary/[0.08] px-2 py-1 text-primary">
                    Most common
                  </span>
                )}
              </div>

              <p className="mono-tiny mt-4 leading-[1.6] text-subtle">{t.shape}</p>

              <p className="mt-5 font-inter text-[13.5px] leading-relaxed text-muted-foreground">
                {t.for}
              </p>

              <div className="mt-7 flex items-baseline gap-3 border-y border-hairline/[0.07] py-5">
                <span className="font-inter text-2xl font-semibold tracking-tight text-foreground">
                  {t.price}
                </span>
                <span className="mono-tiny text-subtle">{t.duration}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {t.includes.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 font-inter text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <Check
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-primary/80"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTA
                  to="/book"
                  tone={t.emphasis ? "primary" : "ghost"}
                  size="md"
                  arrow
                  className="w-full"
                  onClick={() => trackEvent("engagement_click", { tier: t.id })}
                >
                  Book an Architecture Call
                </CTA>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mono-tiny mt-7 text-subtle">
          Pricing is a starting reference. Final scope is shaped together on the call.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Engagements;
