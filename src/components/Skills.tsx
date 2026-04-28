import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Database, Brain, Layout, Workflow, Cloud, Briefcase } from "lucide-react";

const skillCategories = [
  {
    title: "Backend",
    icon: Database,
    skills: ["Laravel", "PHP", "MySQL", "PostgreSQL", "REST APIs", "Node.js"],
  },
  {
    title: "AI & Agents",
    icon: Brain,
    skills: ["LangChain", "RAG Pipelines", "OpenAI / GPT", "Claude", "AI Agents", "Hugging Face", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Automation",
    icon: Workflow,
    skills: ["n8n", "Zapier", "Make.com", "Webhooks", "MCP Protocol", "ETL Pipelines", "Cron Jobs"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Supabase", "Vercel", "Docker", "CI/CD", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    title: "AI Tools & Strategy",
    icon: Briefcase,
    skills: ["ChatGPT", "Claude", "Lovable", "Cursor", "Replit", "OpenRouter", "Digital Transformation", "SaaS Architecture", "Product Strategy"],
  },
];

const Skills = () => {
  return (
    <section className="py-24 bg-secondary/20 relative">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Expertise</span>
            <div className="h-px w-12 bg-primary/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-center mb-4 text-foreground tracking-tight">
            SKILLS & TECH STACK
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-20 max-w-3xl mx-auto font-inter">
            Constantly evolving with the latest in AI, automation, and full-stack development.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((cat, i) => (
            <AnimatedSection key={cat.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-7 rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm hover:shadow-glow transition-all duration-500 h-full group relative overflow-hidden"
              >
                {/* Hover gradient reveal */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10 group-hover:bg-primary/15 group-hover:shadow-cool transition-all duration-300">
                      <cat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-normal italic text-gradient tracking-tight leading-none">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.03 + i * 0.05 }}
                      >
                        <Badge variant="tech" className="text-xs px-3 py-1.5 rounded-lg border border-border/20 font-inter hover:shadow-cool hover:border-primary/30 transition-all duration-300 cursor-default">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
