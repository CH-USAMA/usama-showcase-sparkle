import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const categories = ["All", "AI Projects", "Laravel Projects", "Automation", "E-Commerce"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Solutions Zilla Call Portal",
      description: "Asterisk-powered call center platform with intelligent dispatch, live agent monitoring, and CRM-integrated workflows.",
      problem: "Manual call routing across 40+ agents caused dropped leads and inconsistent SLAs.",
      solution: "Built a Laravel + Asterisk dispatch engine with real-time queues, AGI scripting, and CRM webhooks.",
      stack: "Laravel · Asterisk · MySQL · Redis · WebSockets",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      technologies: ["Laravel", "Asterisk", "MySQL", "WebSockets", "Redis"],
      liveUrl: "https://call.solutionszilla.com",
      badge: "VoIP Platform",
      category: "Laravel Projects",
      result: "70% faster call routing"
    },
    {
      title: "iSmart Clinic, Healthcare SaaS",
      description: "Multi-tenant healthcare platform with automated patient engagement, billing, and audit trails.",
      problem: "Clinics were losing patients to no-shows and manual billing reconciliation errors.",
      solution: "Designed a multi-tenant Laravel backend with WhatsApp automation, role-based access, and event-sourced audit logs.",
      stack: "Next.js · Laravel API · PostgreSQL · WhatsApp API · Multi-Tenant",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      technologies: ["Next.js", "Laravel", "Multi-Tenant", "WhatsApp API", "Real-Time"],
      liveUrl: "https://solutionzilla.ismart.link",
      badge: "Healthcare SaaS",
      category: "AI Projects",
      result: "40% more patient retention"
    },
    {
      title: "Smart Lead Qualification Engine",
      description: "Automation infrastructure that scores, routes, and enriches inbound leads end-to-end.",
      problem: "SaaS sales team spent 6+ hours/day manually qualifying low-fit leads.",
      solution: "n8n orchestration + LLM scoring + CRM sync, with retries, dead-letter queues, and observability baked in.",
      stack: "n8n · OpenAI · PostgreSQL · Webhooks · Sentry",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["n8n", "OpenAI", "PostgreSQL", "Webhooks"],
      liveUrl: "#",
      badge: "Automation",
      category: "Automation",
      result: "85% time reduction"
    },
    {
      title: "RAG-Powered Legal Assistant",
      description: "Production RAG system with hybrid search and validation agents for legal Q&A.",
      problem: "Generic LLM answers hallucinated case law, blocking adoption inside the firm.",
      solution: "Built hybrid (vector + BM25) retrieval, citation-grounded answers, and an evaluation harness.",
      stack: "Python · FastAPI · Pinecone · Postgres · React",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
      technologies: ["RAG", "Pinecone", "FastAPI", "React"],
      liveUrl: "#",
      badge: "AI Integration",
      category: "AI Projects",
      result: "94% query accuracy"
    },
    {
      title: "Focus Interiors, Commerce Platform",
      description: "Headless commerce with AI recommendations, automated SEO, and intelligent search.",
      problem: "Low conversion rates and poor product discoverability on a luxury catalog.",
      solution: "Migrated to a headless stack with AI-driven search, automated metadata, and Core Web Vitals tuning.",
      stack: "Shopify · React · OpenAI · Edge Functions",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      technologies: ["Shopify", "React", "OpenAI", "SEO"],
      liveUrl: "https://focusinteriors.com.pk",
      badge: "Commerce",
      category: "E-Commerce",
      result: "35% conversion lift"
    },
    {
      title: "AI Content Operations Pipeline",
      description: "Multi-agent system that drafts, reviews, and publishes SEO content autonomously.",
      problem: "Editorial team couldn't scale output without sacrificing quality or brand voice.",
      solution: "Built a LangChain-based agent graph with reviewer agents, brand-voice evals, and CMS publishing hooks.",
      stack: "LangChain · GPT-4 · n8n · Supabase · React",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["LangChain", "GPT-4", "n8n", "Supabase"],
      liveUrl: "#",
      badge: "AI Agents",
      category: "AI Projects",
      result: "10x content output"
    },
  ];

  const moreProjects = [
    {
      title: "Five Stars Galway, Smart Booking",
      description: "Taxi booking platform with intelligent route optimization, Google Maps integration, and automated dispatch.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Google Maps API", "Booking System", "SEO"],
      liveUrl: "https://www.fivestarsgalwaytaxis.ie",
      badge: "Transport",
      category: "Laravel Projects",
      result: "Automated dispatch"
    },
    {
      title: "Jabulani Hardware Store",
      description: "Complete South African hardware e-commerce platform with Stripe payments, Google login, fast product search, and optimized checkout flow.",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
      technologies: ["E-Commerce", "Stripe", "Google Auth", "Fast Search"],
      liveUrl: "https://store.jabulanigroupofcompanies.co.za",
      badge: "E-Commerce",
      category: "E-Commerce",
      result: "50% faster checkout"
    },
    {
      title: "Solutions Zilla Software",
      description: "Professional software house website showcasing development services, team expertise, and client portfolio with modern UI/UX.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      technologies: ["Web Development", "UI/UX", "SEO", "Branding"],
      liveUrl: "https://software.solutionszilla.com",
      badge: "Software House",
      category: "Laravel Projects",
      result: "3x lead generation"
    }
  ];

  const allProjects = [...projects, ...moreProjects];

  const filteredProjects = activeFilter === "All"
    ? projects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-inter font-medium uppercase tracking-[0.25em] text-sm">Case Studies</span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold mb-5 text-foreground tracking-tight">
              SHIPPED TO PRODUCTION
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter">
              Real backend systems, automation pipelines, and VoIP platforms, each one engineered to solve a specific business bottleneck.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl font-inter text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card/60 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-500 cursor-pointer h-full border-border/30 bg-card/60 backdrop-blur-sm rounded-2xl">
                    <div className="relative overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-52 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-card/90 backdrop-blur-md text-primary text-xs font-inter font-semibold px-3 py-1.5 rounded-lg border border-border/30">
                          {project.badge}
                        </span>
                      </div>
                      {project.result && (
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-inter font-bold px-3 py-1.5 rounded-lg">
                            {project.result}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          {project.liveUrl !== "#" && (
                            <Button size="sm" variant="outline-white" className="flex-1 rounded-lg" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="w-4 h-4 mr-2" />Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl sm:text-2xl font-display font-normal italic text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">{project.title}</h3>
                      <p className="text-muted-foreground text-sm font-inter leading-relaxed">{project.description}</p>

                      {("problem" in project && (project as any).problem) && (
                        <div className="space-y-2 pt-2 border-t border-border/30">
                          <div className="flex gap-2 text-xs font-inter">
                            <span className="text-primary font-semibold uppercase tracking-wider shrink-0">Problem</span>
                            <span className="text-muted-foreground leading-relaxed">{(project as any).problem}</span>
                          </div>
                          <div className="flex gap-2 text-xs font-inter">
                            <span className="text-primary font-semibold uppercase tracking-wider shrink-0">Solution</span>
                            <span className="text-muted-foreground leading-relaxed">{(project as any).solution}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 bg-primary/8 text-primary text-xs rounded-md font-inter border border-primary/10">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-16">
            <Link to="/projects">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="hero" className="shadow-glow rounded-xl px-10">View All Projects</Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
