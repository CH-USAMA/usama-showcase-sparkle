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
      badge: "🤖 AI Agents"
    },
    {
      title: "Smart Lead Qualification Engine",
      description: "AI-driven lead scoring system with n8n automation, reducing manual qualification time by 85% for a SaaS company.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["n8n", "OpenAI", "PostgreSQL", "Next.js", "Webhook"],
      liveUrl: "#",
      badge: "⚡ Automation"
    },
    {
      title: "RAG-Powered Legal Assistant",
      description: "Production RAG system achieving 94% accuracy on legal queries using hybrid search (vector + BM25) and validation agents.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
      technologies: ["RAG", "Pinecone", "Python", "FastAPI", "React"],
      liveUrl: "#",
      badge: "🧠 Deep Learning"
    },
    {
      title: "Solutions Zilla Call Portal",
      description: "Call center management portal with AI-powered analytics, CRM workflows, and intelligent call routing.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
      technologies: ["Laravel", "Next.js", "MySQL", "TailwindCSS", "AI Analytics"],
      liveUrl: "https://call.solutionszilla.com",
      badge: "🏢 Enterprise"
    },
    {
      title: "Focus Interiors — AI-Enhanced E-Commerce",
      description: "Luxury interior design platform with AI product recommendations, automated SEO, and intelligent search.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      technologies: ["Shopify", "React", "OpenAI", "SEO Automation"],
      liveUrl: "https://focusinteriors.com.pk",
      badge: "🛒 E-Commerce"
    },
    {
      title: "Five Stars Galway — Smart Booking",
      description: "Taxi booking platform with intelligent route optimization, Google Maps integration, and automated dispatch.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      technologies: ["WordPress", "Google Maps API", "Booking System", "SEO"],
      liveUrl: "https://www.fivestarsgalwaytaxis.ie",
      badge: "🚕 Transport"
    },
    {
      title: "iSmart Clinic — Healthcare SaaS",
      description: "Enterprise multi-tenant healthcare platform with AI-powered patient engagement, automated WhatsApp appointment reminders, real-time billing, and audit trails.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      technologies: ["Next.js", "AI Agents", "WhatsApp API", "Multi-Tenant", "Real-Time"],
      liveUrl: "https://solutionzilla.ismart.link",
      badge: "🏥 Healthcare AI"
    }
  ];

  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Featured Work</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">AI-POWERED SOLUTIONS I'VE BUILT</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From autonomous agents to production ML systems — here's how I'm helping businesses automate, digitize, and scale with AI
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div whileHover={{ y: -12, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-500 cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {project.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {project.liveUrl !== "#" && (
                          <Button size="sm" variant="outline-white" className="flex-1" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <ExternalLink className="w-4 h-4 mr-2" />Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link to="/projects">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="hero" className="shadow-glow">View All Projects</Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
