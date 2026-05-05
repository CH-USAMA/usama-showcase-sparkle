import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Building, Workflow, PhoneCall, ArrowRight, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const audiences = [
  {
    icon: Rocket,
    title: "Startup Founders",
    desc: "Need a senior backend engineer to architect your MVP correctly the first time, without rebuilds in 12 months.",
  },
  {
    icon: Building,
    title: "SaaS Teams",
    desc: "Scaling a multi-tenant Laravel product? I harden APIs, queues, and billing so you can ship features, not firefight.",
  },
  {
    icon: Workflow,
    title: "Operations-Heavy Businesses",
    desc: "Replace spreadsheets and manual handoffs with automation infrastructure that runs reliably 24/7.",
  },
  {
    icon: PhoneCall,
    title: "Communication Platforms",
    desc: "Building VoIP, call-center, or real-time products? I bring deep Asterisk, SIP, and WebSocket experience.",
  },
];

const WhoIWorkWith = () => {
  const whatsappUrl = "https://wa.me/923038004684?text=Hi%20Usama%2C%20I%27d%20like%20to%20book%20a%20consultation";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Who I Work With</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-5 text-foreground tracking-tight">
              Built for serious teams
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              I partner with teams that treat their backend as a long-term asset, not a throwaway prototype.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto mb-16">
          {audiences.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <Card className="p-6 h-full rounded-2xl border-border/30 bg-card/60 backdrop-blur-sm group hover:shadow-glow transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10 w-fit mb-4 group-hover:bg-primary/15 transition-colors">
                      <a.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-inter font-semibold text-foreground mb-2 tracking-tight leading-snug">{a.title}</h3>
                    <p className="text-sm text-muted-foreground font-inter leading-relaxed">{a.desc}</p>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Consultation CTA band */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <Card className="relative overflow-hidden rounded-3xl border-primary/20 bg-card-gradient p-8 sm:p-12">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarCheck className="w-4 h-4 text-primary" />
                    <span className="text-xs font-inter font-semibold uppercase tracking-[0.25em] text-primary">Free 30-min Consultation</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-inter font-bold text-foreground mb-3 tracking-tight">
                    Let's pressure-test your backend roadmap.
                  </h3>
                  <p className="text-muted-foreground font-inter leading-relaxed max-w-2xl">
                    Bring your architecture questions, scaling bottlenecks, automation ideas, or VoIP requirements. You'll leave with a clear, opinionated next step, no sales pitch.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:min-w-[220px]">
                  <a href="#contact">
                    <Button size="lg" variant="hero" className="w-full gap-2 shadow-glow rounded-xl">
                      Book a Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline-white" className="w-full gap-2 rounded-xl">
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
