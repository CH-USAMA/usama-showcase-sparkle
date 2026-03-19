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
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground">
            SKILLS & TECH STACK
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto">
            Constantly evolving with the latest in AI, automation, and full-stack development.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((cat, i) => (
            <AnimatedSection key={cat.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 h-full"
              >
                <h3 className="text-lg font-semibold text-primary mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03 + i * 0.05 }}
                    >
                      <Badge variant="tech" className="text-xs px-3 py-1.5">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
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
