import { motion } from "framer-motion";
import { MessageSquare, ClipboardList, Hammer, Rocket, LifeBuoy } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery call",
    desc: "30-min consultation to understand your business goals, current pain points, and technical constraints.",
    duration: "Day 1",
  },
  {
    icon: ClipboardList,
    title: "Architecture & scope",
    desc: "I write a clear technical proposal: stack, architecture, milestones, timeline, and a fixed quote.",
    duration: "Day 2-3",
  },
  {
    icon: Hammer,
    title: "Build in sprints",
    desc: "Weekly demos, transparent progress on a board you can see, code in your repo from day one.",
    duration: "Week 1+",
  },
  {
    icon: Rocket,
    title: "Launch & harden",
    desc: "CI/CD, monitoring, backups, runbooks. Production-ready, not just feature-complete.",
    duration: "Launch",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing support",
    desc: "Optional retainer for new features, scaling, and incident response so your backend keeps compounding value.",
    duration: "Post-launch",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">How we work</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-4 text-foreground tracking-tight">
              A simple, predictable process
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              No surprises, no scope creep. Here's exactly what working together looks like, step by step.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical connecting line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <AnimatedSection key={step.title} delay={i * 0.1}>
                  <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}>
                    {/* Card side */}
                    <div className={isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative inline-block w-full p-6 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm hover:shadow-glow transition-all duration-500"
                      >
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-primary">
                            {step.duration}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-inter font-semibold text-foreground mb-2 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                          {step.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Icon node side */}
                    <div className="hidden md:flex items-center justify-center relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: i * 0.1 + 0.2 }}
                        className="relative z-10 w-16 h-16 rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center shadow-glow"
                      >
                        <step.icon className="w-7 h-7 text-primary" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-inter font-bold flex items-center justify-center">
                          {i + 1}
                        </div>
                      </motion.div>
                    </div>

                    {/* Mobile icon (above card) */}
                    <div className="md:hidden flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-inter font-bold text-primary uppercase tracking-[0.2em]">
                        Step {i + 1}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
