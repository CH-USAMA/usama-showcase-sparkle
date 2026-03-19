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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground">HOW I HELP BUSINESSES</h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto">
              I help companies digitize their operations, automate workflows, and build AI-powered products that drive real growth.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-6 hover:shadow-glow transition-all duration-300 rounded-xl border border-border/50 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* TeacherOn Badge */}
          <AnimatedSection delay={0.5}>
            <div className="flex justify-center mt-12">
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
