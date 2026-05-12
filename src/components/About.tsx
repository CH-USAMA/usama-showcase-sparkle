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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-center mb-6 text-foreground tracking-tight">
              Who I am
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="max-w-4xl mx-auto mb-20">
              <Card className="p-6 sm:p-10 bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl relative overflow-hidden">
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                {/* Key stats strip */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 pb-8 border-b border-border/30">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-inter font-bold text-foreground tracking-tight">5+</div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground font-inter mt-1 uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div className="text-center border-x border-border/30">
                    <div className="text-2xl sm:text-3xl font-inter font-bold text-primary tracking-tight">$145K+</div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground font-inter mt-1 uppercase tracking-wider">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-inter font-bold text-foreground tracking-tight">180+</div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground font-inter mt-1 uppercase tracking-wider">Projects Shipped</div>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-inter">
                    I'm <span className="text-foreground font-medium">Usama Munawar</span>, a Backend Systems Engineer based in Lahore, Pakistan. For the past 5+ years I have been shipping production systems for startups and SaaS teams across Upwork, Toptal, and Fiverr.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-inter">
                    I specialise in scalable Laravel applications, automation infrastructure, VoIP/Asterisk platforms, and AI integrations, designed for high availability, operational efficiency, and long-term maintainability.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-inter">
                    I work best with founders and engineering leaders who need a senior pair of hands to architect, harden, and ship the backend their business actually depends on.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs sm:text-sm font-inter font-medium text-foreground">Production-Grade Architecture</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border/50">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs sm:text-sm font-inter text-muted-foreground">Laravel · Asterisk · n8n · Claude</span>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-center mb-4 text-foreground tracking-tight">
              Engineering services
            </h2>
            <p className="text-center text-muted-foreground text-base sm:text-lg mb-16 max-w-2xl mx-auto font-inter leading-relaxed">
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
                        <h3 className="text-base sm:text-lg font-inter font-semibold text-foreground leading-tight tracking-tight">{s.title}</h3>
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
