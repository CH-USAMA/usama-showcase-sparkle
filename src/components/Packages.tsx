import { Check, Zap, Layers, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const tiers = [
  {
    icon: Zap,
    name: "Sprint",
    tagline: "Fast, focused engineering",
    price: "From $1,500",
    duration: "1–2 weeks",
    bullets: [
      "Laravel feature build or bug-fix sprint",
      "API endpoints, queues, or auth hardening",
      "n8n / automation workflow setup",
      "Code review and architecture notes",
      "Direct WhatsApp + email access",
    ],
    cta: "Book a sprint",
    featured: false,
  },
  {
    icon: Layers,
    name: "Build",
    tagline: "Production system, end-to-end",
    price: "From $4,500",
    duration: "3–6 weeks",
    bullets: [
      "Full Laravel SaaS or backend platform",
      "Multi-tenant DB design, RBAC, billing",
      "REST/GraphQL API with OpenAPI spec",
      "CI/CD, observability, zero-downtime deploys",
      "Handover docs + 2-week post-launch support",
    ],
    cta: "Start a build",
    featured: true,
  },
  {
    icon: Rocket,
    name: "Scale",
    tagline: "Senior engineer on retainer",
    price: "From $3,500 / mo",
    duration: "Ongoing",
    bullets: [
      "Dedicated capacity each week",
      "VoIP / Asterisk, real-time, AI integrations",
      "Architecture leadership for your team",
      "Incident response + performance tuning",
      "Monthly roadmap & technical debt reviews",
    ],
    cta: "Discuss retainer",
    featured: false,
  },
];

const Packages = () => {
  const goContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-24 bg-background relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">
                Engagement Packages
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-4 text-foreground tracking-tight">
              Transparent ways to work together
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              Pick the engagement that fits your stage. Every package starts with a free 30-minute architecture call.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-2xl border p-7 lg:p-8 flex flex-col h-full ${
                  tier.featured
                    ? "border-primary/50 bg-gradient-to-b from-primary/5 to-transparent shadow-[0_0_60px_-20px_hsl(var(--primary)/0.4)]"
                    : "border-border/50 bg-card/40 hover:border-border"
                } transition-colors`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-medium tracking-wider uppercase">
                    Most popular
                  </span>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-inter font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-border/40">
                  <div className="text-2xl font-inter font-semibold text-foreground">{tier.price}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tier.duration}</div>
                </div>

                <ul className="space-y-3 mb-7 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" onClick={goContact}>
                  <Button
                    variant={tier.featured ? "hero" : "outline"}
                    size="sm"
                    className="w-full rounded-full"
                  >
                    {tier.cta}
                  </Button>
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 font-inter">
          Pricing is a starting reference. Final scope is shaped together on the discovery call.
        </p>
      </div>
    </section>
  );
};

export default Packages;
