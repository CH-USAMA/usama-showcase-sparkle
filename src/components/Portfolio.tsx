import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const Portfolio = () => {
  const projects = [
    {
      title: "AI-Powered Content Pipeline",
      description: "Multi-agent system that autonomously generates, reviews, and publishes SEO-optimized content using GPT-4 + LangChain orchestration.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      technologies: ["LangChain", "GPT-4", "n8n", "React", "Supabase"],
      liveUrl: "#",
      badge: "AI Agents"
    },
    {
      title: "Smart Lead Qualification Engine",
      description: "AI-driven lead scoring system with n8n automation, reducing manual qualification time by 85% for a SaaS company.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["n8n", "OpenAI", "PostgreSQL", "Next.js", "Webhook"],
      liveUrl: "#",
      badge: "Automation"
    },
    {
      title: "RAG-Powered Legal Assistant",
      description: "Production RAG system achieving 94% accuracy on legal queries using hybrid search (vector + BM25) and validation agents.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
      technologies: ["RAG", "Pinecone", "Python", "FastAPI", "React"],
      liveUrl: "#",
      badge: "Deep Learning"
    },
    {
      title: "Solutions Zilla Call Portal",
      description: "Call center management portal with AI-powered analytics, CRM workflows, and intelligent call routing.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
      technologies: ["Laravel", "Next.js", "MySQL", "TailwindCSS", "AI Analytics"],
      liveUrl: "https://call.solutionszilla.com",
      badge: "Enterprise"
    },
    {
      title: "Focus Interiors — AI-Enhanced E-Commerce",
      description: "Luxury interior design platform with AI product recommendations, automated SEO, and intelligent search.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      technologies: ["Shopify", "React", "OpenAI", "SEO Automation"],
      liveUrl: "https://focusinteriors.com.pk",
      badge: "E-Commerce"
    },
    {
      title: "Five Stars Galway — Smart Booking",
      description: "Taxi booking platform with intelligent route optimization, Google Maps integration, and automated dispatch.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      technologies: ["WordPress", "Google Maps API", "Booking System", "SEO"],
      liveUrl: "https://www.fivestarsgalwaytaxis.ie",
      badge: "Transport"
    },
    {
      title: "iSmart Clinic — Healthcare SaaS",
      description: "Enterprise multi-tenant healthcare platform with AI-powered patient engagement, automated WhatsApp appointment reminders, real-time billing, and audit trails.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      technologies: ["Next.js", "AI Agents", "WhatsApp API", "Multi-Tenant", "Real-Time"],
      liveUrl: "https://solutionzilla.ismart.link",
      badge: "Healthcare AI"
    },
    {
      title: "Jabulani Hardware Store",
      description: "Complete South African hardware e-commerce platform with Stripe payments, Google login, fast product search, and optimized checkout flow.",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      technologies: ["E-Commerce", "Stripe", "Google Auth", "Fast Search"],
      liveUrl: "https://store.jabulanigroupofcompanies.co.za",
      badge: "E-Commerce"
    },
    {
      title: "Solutions Zilla Software",
      description: "Professional software house website showcasing development services, team expertise, and client portfolio with modern UI/UX.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      technologies: ["Web Development", "UI/UX", "SEO", "Branding"],
      liveUrl: "https://software.solutionszilla.com",
      badge: "Software House"
    }
  ];

  return (
    <section className="py-24 bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-inter font-medium uppercase tracking-[0.25em] text-sm">Featured Work</span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold mb-5 text-foreground tracking-tight">
              AI-POWERED SOLUTIONS
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter">
              From autonomous agents to production ML systems — here's how I'm helping businesses automate, digitize, and scale with AI
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.08}>
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-500 cursor-pointer h-full border-border/30 bg-card/60 backdrop-blur-sm rounded-2xl">
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-card/90 backdrop-blur-md text-primary text-xs font-inter font-semibold px-3 py-1.5 rounded-lg border border-border/30">
                        {project.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {project.liveUrl !== "#" && (
                          <Button size="sm" variant="outline-white" className="flex-1 rounded-lg" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <ExternalLink className="w-4 h-4 mr-2" />Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm font-inter leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-primary/8 text-primary text-xs rounded-md font-inter border border-primary/10">{tech}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

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
