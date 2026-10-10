import { Link } from "react-router-dom";
import {
  Cloud,
  CreditCard,
  Hexagon,
  Layers,
  LayoutDashboard,
  PhoneCall,
  Radio,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { CAPABILITIES } from "@/data/capabilities";
import { trackEvent } from "@/lib/analytics";

const ICONS: Record<string, LucideIcon> = {
  frontend: LayoutDashboard,
  mobile: Smartphone,
  node: Hexagon,
  laravel: Layers,
  saas: CreditCard,
  ai: Sparkles,
  automation: Workflow,
  voip: PhoneCall,
  realtime: Radio,
  cloud: Cloud,
};

/** Tile titles, shortened to fit two lines in a square. */
const SHORT: Record<string, string> = {
  frontend: "React & TypeScript front ends",
  mobile: "React Native mobile apps",
  node: "Node.js services & APIs",
  laravel: "Laravel & PHP backends",
  saas: "SaaS & billing platforms",
  ai: "AI & agent integration",
  automation: "Automation infrastructure",
  voip: "VoIP & Asterisk",
  realtime: "Real-time systems",
  cloud: "Cloud & DevOps",
};

/**
 * WHAT I BUILD: ten tiles, one per capability. Hovering lights the tile's
 * edge and fades in a dot matrix; each opens the matching card on /services
 * (or its full page where one exists).
 */
const ServiceExplorer = () => (
  <section id="services" className="fx-glow-bottom relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="chip-hue">
              <span className="mono-label">What I build</span>
            </span>
            <h2 className="type-h2 mt-6 text-foreground">
              Ten systems I&nbsp;take <em>end to end.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <CTA to="/services" size="md">
              All services
            </CTA>
            <CTA to="/book" tone="ghost" size="md" onClick={() => trackEvent("book_call_click", { location: "services_tiles" })}>
              Start a project
            </CTA>
          </div>
        </div>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5 lg:mt-14 lg:gap-4">
        {CAPABILITIES.map((c, i) => {
          const Icon = ICONS[c.id] ?? Layers;
          return (
            <Reveal as="li" key={c.id} index={Math.min(i % 5, 4)}>
              <Link
                to={c.href ?? `/services#${c.id}`}
                className="fx-border fx-dots group flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl border border-hairline/[0.1] bg-surface-1 p-4 text-center"
              >
                <Icon
                  className="h-7 w-7 text-foreground"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span className="max-w-[11rem] font-inter text-[15px] leading-snug text-muted-foreground transition-colors duration-standard [text-wrap:balance] group-hover:text-foreground">
                  {SHORT[c.id] ?? c.title}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </div>
  </section>
);

export default ServiceExplorer;
