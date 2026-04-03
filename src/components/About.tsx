import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Workflow, Rocket, Building2, Bot } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const About = () => {
  const services = [
    {
      icon: Building2,
      title: "Business Digitization",
      desc: "Transform manual workflows into automated digital systems. From CRMs to inventory management — I build the digital backbone your business needs.",
      tags: ["Process Automation", "Digital Transformation", "SaaS Products"],
    },
    {
      icon: Bot,
      title: "AI-Powered Solutions",
      desc: "Custom chatbots, RAG pipelines, and intelligent agents that handle customer support, content generation, and data analysis autonomously.",
      tags: ["Chatbots", "RAG Systems", "AI Agents"],
    },
    {
      icon: Workflow,
      title: "Automation & Integration",
      desc: "Connect your tools with n8n workflows, API integrations, and MCP-powered agent systems that eliminate repetitive work.",
      tags: ["n8n", "API Integration", "MCP Protocol"],
    },
    {
      icon: Rocket,
      title: "Full Stack Development",
      desc: "Production-ready web apps with React, Laravel, Node.js. Scalable architecture on AWS/Supabase with CI/CD pipelines.",
      tags: ["React", "Laravel", "Node.js", "AWS"],
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Services</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-center mb-4 text-foreground tracking-tight">
              HOW I HELP BUSINESSES
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-20 max-w-3xl mx-auto font-inter">
              As a Laravel PHP MySQL developer and AI engineer, I help companies digitize operations, automate workflows with n8n, and build AI-powered products using Claude, LangChain, and vibe coding tools.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-8 hover:shadow-glow transition-all duration-500 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm h-full group relative overflow-hidden">
                    {/* Subtle corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/10 group-hover:bg-primary/15 transition-colors">
                          <s.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-foreground">{s.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-5 font-inter">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 rounded-lg font-inter">
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
