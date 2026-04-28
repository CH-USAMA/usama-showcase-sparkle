import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Workflow, Server, Building2, Bot, PhoneCall, Plug, Radio, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const About = () => {
  const services = [
    {
      icon: Building2,
      title: "SaaS Development",
      desc: "Multi-tenant SaaS platforms architected for scale, billing, role-based access, audit trails, and zero-downtime deployments.",
      tags: ["Multi-Tenant", "Stripe Billing", "RBAC", "Zero-Downtime"],
    },
    {
      icon: Server,
      title: "Laravel Backend Systems",
      desc: "Production-grade Laravel apps with queue workers, event-driven architecture, and clean domain-driven design.",
      tags: ["Laravel 11", "Domain-Driven", "Horizon", "Octane"],
    },
    {
      icon: Plug,
      title: "API Development",
      desc: "Versioned REST and GraphQL APIs with rate limiting, OAuth2, OpenAPI specs, and predictable contracts your team can trust.",
      tags: ["REST", "GraphQL", "OAuth2", "OpenAPI"],
    },
    {
      icon: Workflow,
      title: "Automation Systems",
      desc: "End-to-end automation infrastructure, n8n workflows, MCP agents, and orchestration that eliminates manual operations.",
      tags: ["n8n", "MCP", "Webhooks", "Cron"],
    },
    {
      icon: PhoneCall,
      title: "VoIP & Asterisk",
      desc: "Self-hosted call centers, IVR flows, predictive dialers, and SIP trunking integrated with your CRM and analytics.",
      tags: ["Asterisk", "FreePBX", "SIP", "AGI / AMI"],
    },
    {
      icon: Bot,
      title: "AI Integrations",
      desc: "RAG pipelines, autonomous agents, and LLM features wired safely into existing backends with evals and guardrails.",
      tags: ["RAG", "LangChain", "Claude / GPT", "Vectors"],
    },
    {
      icon: Radio,
      title: "Real-Time Systems",
      desc: "WebSockets, presence, live dashboards, and chat infrastructure built on Laravel Reverb, Pusher, or Socket.IO.",
      tags: ["WebSockets", "Reverb", "Pusher", "Socket.IO"],
    },
    {
      icon: ShieldCheck,
      title: "High-Availability Infra",
      desc: "Load-balanced deployments on AWS / DigitalOcean with CI/CD, observability, backups, and incident-ready runbooks.",
      tags: ["AWS", "Docker", "CI/CD", "Monitoring"],
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Story-driven About */}
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">About Me</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal italic text-center mb-6 text-foreground tracking-tight">
              Who I am
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="max-w-4xl mx-auto mb-20">
              <Card className="p-8 sm:p-10 bg-card/60 backdrop-blur-sm border-border/30 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <div className="relative space-y-5">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-inter font-light">
                    I'm <span className="text-foreground font-normal">Usama Munawar</span>, a Backend Systems Engineer based in Lahore, Pakistan, with{" "}
                    <span className="text-foreground font-normal">5+ years</span> shipping production systems and{" "}
                    <span className="text-gradient font-normal">$145K+ delivered</span> to startups and SaaS teams across Upwork, Toptal, and Fiverr.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-inter font-light">
                    I specialise in <span className="text-foreground font-normal">scalable Laravel applications</span>, automation infrastructure, VoIP/Asterisk platforms, and AI integrations, designed for high availability, operational efficiency, and long-term maintainability.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-inter font-light">
                    I work best with founders and engineering leaders who need a senior pair of hands to architect, harden, and ship the backend their business actually depends on.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/15">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span className="text-sm font-inter font-semibold text-foreground">Production-Grade Architecture</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/15">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-inter text-muted-foreground">Laravel · Asterisk · n8n · Claude</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Services</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal italic text-center mb-4 text-foreground tracking-tight">
              Engineering services
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto font-inter">
              Senior backend engineering for teams that need scalable Laravel systems, automation infrastructure, real-time communication, and AI integrations, delivered with production discipline.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                  <Card className="p-6 hover:shadow-glow transition-all duration-500 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm h-full group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10 group-hover:bg-primary/15 group-hover:shadow-glow transition-all duration-300">
                          <s.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-normal italic text-foreground leading-tight tracking-tight">{s.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-inter">{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[11px] px-2 py-0.5 rounded-md font-inter">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* TeacherOn Badge */}
          <AnimatedSection delay={0.5}>
            <div className="flex justify-center mt-16">
              <a href="https://www.teacheron.com/tutor/3aif?r=3aif" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.teacheron.com/resources/assets/img/badges/recommendedOn.png"
                  alt="Recommended on TeacherOn"
                  width={336}
                  height={144}
                  loading="lazy"
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
