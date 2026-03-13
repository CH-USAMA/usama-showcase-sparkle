import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, BrainCircuit, Rocket, Cpu, Workflow, Bot } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const About = () => {
  const skills = {
    "AI & Machine Learning": [
      "LangChain", "OpenAI API", "Claude API", "RAG Systems",
      "Vector Databases", "Fine-Tuning", "Prompt Engineering",
      "TensorFlow", "PyTorch", "Hugging Face", "Deep Learning"
    ],
    "Agent & Automation": [
      "Multi-Agent Systems", "MCP Protocol", "n8n Workflows",
      "Autonomous Agents", "Task Orchestration", "AI Pipelines",
      "OpenClaw", "CrewAI", "AutoGPT Patterns"
    ],
    "Full Stack Development": [
      "React.js", "Next.js", "TypeScript", "Node.js",
      "Laravel", "Python", "PostgreSQL", "Supabase",
      "Docker", "AWS", "CI/CD", "MLOps"
    ],
    "AI-Powered Tools": [
      "Lovable", "Replit AI", "Cursor", "GPT-4",
      "Claude", "Copilot", "v0.dev", "Midjourney"
    ],
  };

  const iconMap: Record<string, JSX.Element> = {
    "AI & Machine Learning": <BrainCircuit className="w-5 h-5 text-primary" />,
    "Agent & Automation": <Bot className="w-5 h-5 text-primary" />,
    "Full Stack Development": <Code className="w-5 h-5 text-primary" />,
    "AI-Powered Tools": <Cpu className="w-5 h-5 text-primary" />,
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground">WHO I AM</h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto">
              An AI Engineer & Full Stack Developer who doesn't just write code — I architect intelligent systems that automate, scale, and deliver real business impact.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                { icon: BrainCircuit, text: <>With <strong>5+ years in software engineering</strong> and a deep pivot into AI, I build <span className="text-foreground font-semibold">autonomous agents, RAG pipelines, and multi-agent systems</span> that solve problems no single API call can handle. I understand <strong>MCP protocol, agent orchestration, and production ML</strong>.</> },
                { icon: Workflow, text: <>I'm not just using AI tools — I'm <span className="text-foreground font-semibold">building with them and building them</span>. From setting up <strong>n8n automation workflows</strong> to deploying <strong>fine-tuned models</strong>, I help businesses <strong>digitize operations and automate repetitive work</strong>.</> },
                { icon: Rocket, text: <>I ship fast using tools like <strong>Lovable, Replit, and Cursor</strong> — and I architect for scale with <strong>Docker, AWS, and CI/CD</strong>. Whether it's a <span className="text-foreground font-semibold">custom AI chatbot, an automated content pipeline, or a full SaaS product</span> — I deliver end-to-end.</> },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15} direction="left">
                  <div className="flex items-start gap-4">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }} className="p-2 bg-primary/10 rounded-full">
                      <item.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={0.5}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <p className="text-sm text-muted-foreground italic">
                    💡 <strong className="text-foreground">My motto:</strong> "Don't just build software — build systems that think, adapt, and scale autonomously."
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillList], catIdx) => (
                <AnimatedSection key={category} delay={catIdx * 0.12} direction="right">
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="p-6 hover:shadow-glow transition-all duration-300 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">{iconMap[category]}</div>
                        <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, index) => (
                          <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Badge variant="secondary" className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
