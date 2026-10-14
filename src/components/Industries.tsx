import { Link } from "react-router-dom";
import {
  Car,
  Code2,
  Factory,
  Headset,
  HeartPulse,
  Home,
  Landmark,
  Package,
  PhoneCall,
  Scale,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { trackEvent } from "@/lib/analytics";

/** Each industry is one I have shipped in (see /projects), with what that usually means. */
const INDUSTRIES: { name: string; points: string[]; line: string; Icon: LucideIcon }[] = [
  { name: "Transport & Dispatch", points: ["Booking flows that hold at peak hours", "Driver and dispatcher apps", "Live status and notifications"], line: "Booking, dispatch, driver apps", Icon: Car },
  { name: "E-commerce & Retail", points: ["Checkout and payment fixes", "Catalogue and order management", "Speed and SEO tuning"], line: "Stores, checkout, catalogues", Icon: ShoppingCart },
  { name: "Healthcare", points: ["Appointment and patient portals", "Role-based access and audit trails", "Reminders and reporting"], line: "Clinic and patient workflows", Icon: HeartPulse },
  { name: "Fintech & Billing", points: ["Subscriptions and invoicing", "Payment gateway integration", "Reconciliation and reports"], line: "Payments, subscriptions, invoicing", Icon: Landmark },
  { name: "Legal Tech", points: ["Case and document workflows", "Client portals", "Secure sharing and permissions"], line: "Case, document and client portals", Icon: Scale },
  { name: "Telecom & VoIP", points: ["Asterisk and call routing", "IVR menus and queues", "Call logs and CRM hooks"], line: "Asterisk, IVR, call routing", Icon: PhoneCall },
  { name: "Contact Centres", points: ["Dialer and agent tooling", "Call recording and analytics", "CRM and ticket sync"], line: "Dialers, CRM and agent tooling", Icon: Headset },
  { name: "Industrial & Mining", points: ["Operations dashboards", "Field data capture", "Reporting and integrations"], line: "Operations and field platforms", Icon: Factory },
  { name: "B2B & Wholesale", points: ["Trade ordering and pricing tiers", "Inventory sync", "Account and quote portals"], line: "Ordering, pricing, inventory", Icon: Package },
  { name: "Security", points: ["Monitoring and alerting", "Detection tooling", "Hardened APIs"], line: "Monitoring and detection tooling", Icon: ShieldCheck },
  { name: "Local Services", points: ["Booking and lead capture", "Service marketplaces", "Showcase sites that convert"], line: "Interiors, trades, marketplaces", Icon: Home },
  { name: "IT Services & Agencies", points: ["White-label backend delivery", "Laravel and Node.js teams on demand", "Handover with docs and CI/CD"], line: "White-label backend delivery", Icon: Code2 },
];

/**
 * INDUSTRIES: a dark stage with a drifting blueprint grid and two slow light
 * orbs (CSS only, collapsed under prefers-reduced-motion), and twelve tiles
 * whose icon lifts and whose one-line detail slides in on hover. Static
 * markup, so it prerenders as-is.
 */
const Industries = () => (
  <section id="industries" className="ind-stage relative isolate scroll-mt-24 overflow-hidden py-24 lg:py-32">
    <div className="ind-grid" aria-hidden="true" />
    <div className="ind-orb ind-orb-a" aria-hidden="true" />
    <div className="ind-orb ind-orb-b" aria-hidden="true" />

    <div className="container mx-auto">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip-hue">
            <span className="mono-label">Industries</span>
          </span>
          <h2 className="type-h2 mt-6 text-foreground">
            Built for the way <em>your industry</em> works.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            The same engineering, shaped by the rules, volumes and edge cases of the fields I have
            shipped in.
          </p>
        </div>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 lg:gap-4">
        {INDUSTRIES.map(({ name, line, points, Icon }, i) => (
          <Reveal as="li" key={name} index={Math.min(i % 4, 4)}>
            <div className="ind-tile fx-border fx-dots group flex h-full min-h-[17rem] flex-col items-center justify-start gap-3 rounded-2xl border border-hairline/[0.1] bg-surface-1/80 p-6 text-center backdrop-blur-sm">
              <span className="ind-icon inline-flex h-14 w-14 items-center justify-center rounded-xl border border-hairline/[0.12] bg-surface-2 text-foreground">
                <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="font-inter text-[15px] font-semibold leading-snug text-foreground [text-wrap:balance]">
                {name}
              </h3>
              <p className="ind-line max-w-[13rem] font-inter text-[13px] leading-snug text-muted-foreground">
                {line}
              </p>
              <ul className="ind-points mt-1 space-y-1 text-left font-inter text-[12.5px] leading-snug text-muted-foreground">
                {points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          <CTA to="/projects" size="md">
            See the work
          </CTA>
          <CTA to="/book" tone="ghost" size="md" onClick={() => trackEvent("book_call_click", { location: "industries" })}>
            Talk about your industry
          </CTA>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Industries;
