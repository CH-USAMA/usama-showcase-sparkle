import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, BrainCircuit, Rocket, Cpu, Workflow, Bot } from "lucide-react";

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
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground">
            WHO I AM
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto">
            An AI Engineer & Full Stack Developer who doesn't just write code — I architect intelligent systems that automate, scale, and deliver real business impact.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With <strong>5+ years in software engineering</strong> and a deep pivot into AI, I build
                  <span className="text-foreground font-semibold"> autonomous agents, RAG pipelines, and multi-agent systems</span> that 
                  solve problems no single API call can handle. I understand <strong>MCP protocol, agent orchestration, and production ML</strong>.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Workflow className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm not just using AI tools — I'm <span className="text-foreground font-semibold">building with them and building them</span>. 
                  From setting up <strong>n8n automation workflows</strong> to deploying <strong>fine-tuned models</strong>, 
                  I help businesses <strong>digitize operations and automate repetitive work</strong> — saving thousands of hours.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I ship fast using tools like <strong>Lovable, Replit, and Cursor</strong> — 
                  and I architect for scale with <strong>Docker, AWS, and CI/CD</strong>. Whether it's a 
                  <span className="text-foreground font-semibold"> custom AI chatbot, an automated content pipeline, or a full SaaS product</span> — I deliver end-to-end.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground italic">
                  💡 <strong className="text-foreground">My motto:</strong> "Don't just build software — build systems that think, adapt, and scale autonomously."
                </p>
              </div>
            </div>

            {/* Right Content - Skills */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              {Object.entries(skills).map(([category, skillList]) => (
                <Card
                  key={category}
                  className="p-6 hover:shadow-xl transition-all duration-300 rounded-xl border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">{iconMap[category]}</div>
                    <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
