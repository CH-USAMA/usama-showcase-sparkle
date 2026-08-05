import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import iconSaas from "@/assets/industry-saas.png";
import iconVoip from "@/assets/industry-voip.png";
import iconEcommerce from "@/assets/industry-ecommerce.png";
import iconAutomation from "@/assets/industry-automation.png";

const industries = [
  {
    icon: iconSaas,
    alt: "SaaS platform dashboard icon",
    title: "SaaS Platforms",
    detail: "Multi-tenant Laravel products with billing, RBAC, and audit trails.",
  },
  {
    icon: iconVoip,
    alt: "Call center headset icon",
    title: "Call Centers & VoIP",
    detail: "Asterisk and FreePBX dialers, IVR trees, and SIP trunk failover.",
  },
  {
    icon: iconEcommerce,
    alt: "E-commerce storefront icon",
    title: "E-Commerce & Retail",
    detail: "Stripe checkout, catalog search, and inventory sync at scale.",
  },
  {
    icon: iconAutomation,
    alt: "Automation workflow icon",
    title: "Operations & Automation",
    detail: "n8n pipelines and queued jobs that replace manual back-office work.",
  },
];

const markers = [
  { value: "180+", label: "Projects shipped" },
  { value: "$145K+", label: "Delivered on platforms" },
  { value: "5+ yrs", label: "Senior backend work" },
  { value: "4 sectors", label: "Domains served" },
];

const IndustryProof = () => {
  return (
    <section className="py-20 bg-muted/5 border-y border-border/30">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary text-xs sm:text-sm font-inter font-medium uppercase tracking-[0.25em]">
              Where my systems run
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-inter font-bold text-foreground tracking-tight">
              Industries I build backends for
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {industries.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <Card className="h-full p-6 rounded-2xl border-border/30 bg-card/60 backdrop-blur-sm text-center flex flex-col items-center gap-3 hover:shadow-glow transition-all duration-500">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/10">
                    <img
                      src={item.icon}
                      alt={item.alt}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-inter font-semibold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter leading-relaxed">{item.detail}</p>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.25}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {markers.map((m) => (
              <div key={m.label} className="text-center rounded-xl border border-border/30 bg-card/40 py-5 px-3">
                <div className="text-xl sm:text-2xl font-inter font-bold text-primary">{m.value}</div>
                <div className="text-xs text-muted-foreground font-inter mt-1 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndustryProof;
