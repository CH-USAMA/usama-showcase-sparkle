import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: ["OpenAI / GPT", "LangChain", "RAG Pipelines", "AI Agents", "Deep Learning", "NLP", "Computer Vision", "Hugging Face", "TensorFlow", "PyTorch"],
  },
  {
    title: "Automation & Integration",
    skills: ["n8n", "MCP Protocol", "API Integration", "Zapier", "Make.com", "Webhooks", "Cron Jobs", "ETL Pipelines"],
  },
  {
    title: "AI Tools & Platforms",
    skills: ["ChatGPT", "Claude", "Lovable", "Replit", "Cursor", "OpenRouter", "Vercel AI SDK", "Supabase AI"],
  },
  {
    title: "Full Stack Development",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Laravel", "PHP", "MySQL", "PostgreSQL", "Tailwind CSS", "REST APIs"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Supabase", "Vercel", "Docker", "CI/CD", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    title: "Business & Strategy",
    skills: ["Digital Transformation", "Process Automation", "SaaS Architecture", "Product Strategy", "Agile / Scrum"],
  },
];

const Skills = () => {
  return (
    <section className="py-24 bg-secondary/20 relative">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
      
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Expertise</span>
            <div className="h-px w-12 bg-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-extrabold text-center mb-4 text-foreground tracking-tight">
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
                  <h3 className="text-lg font-display font-bold text-primary mb-5">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.03 + i * 0.05 }}
                      >
                        <Badge variant="tech" className="text-xs px-3 py-1.5 rounded-lg border border-border/20 font-inter">
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
