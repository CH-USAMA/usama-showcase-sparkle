import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/usama-profile.jpg";
import HireMe from "@/components/HireMe";
import ParticleBackground from "@/components/ParticleBackground";

const Hero = () => {
  const techStack = [
    "React", "Next.js", "TypeScript", "Python",
    "LangChain", "OpenAI API", "GPT-4", "Claude API",
    "n8n", "MCP Protocol", "RAG Systems", "Vector DBs",
    "Lovable", "Replit", "Cursor AI",
    "TensorFlow", "PyTorch", "Hugging Face",
    "Node.js", "Laravel", "PostgreSQL", "Docker",
    "AWS", "Supabase", "Pinecone", "Redis",
    "CI/CD", "MLOps", "Agent Architecture"
  ];

  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden">
      <ParticleBackground />

      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="tech" className="text-sm py-2 px-4 mb-4 inline-block">
                  🤖 AI Engineer • Full Stack Developer • Automation Architect
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
                style={{ color: "hsl(var(--foreground))" }}
              >
                I BUILD
                <br />
                <motion.span
                  initial={{ backgroundSize: "0% 3px" }}
                  animate={{ backgroundSize: "100% 3px" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="text-foreground/90"
                  style={{
                    backgroundImage: "linear-gradient(hsl(var(--primary)), hsl(var(--primary)))",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 100%",
                  }}
                >
                  INTELLIGENT SYSTEMS
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                Hi, I'm Usama Munawar — an AI Engineer & Full Stack Developer who builds
                <strong className="text-foreground"> autonomous agents, RAG pipelines, and AI-powered products</strong> that
                automate businesses and solve real problems.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <HireMe />
              <a href="/blog">
                <Button size="lg" variant="outline-white" className="gap-2 hover:scale-105 transition-all duration-300">
                  Read My Blog
                </Button>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline-white" className="gap-2 hover:scale-105 transition-all duration-300">
                  Download CV
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { href: "https://github.com/CH-USAMA", icon: Github },
                { href: "https://www.linkedin.com/in/usama-works/", icon: Linkedin },
                { href: "mailto:devusamaworks@gmail.com?subject=Hire%20Me&body=Hi%20Usama,", icon: Mail },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button size="icon" variant="outline-white">
                    <s.icon className="w-5 h-5" />
                  </Button>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant"
              >
                <img src={profileImage} alt="Usama Munawar - AI Engineer" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm rounded-full p-4 shadow-elegant border border-border"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">5+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -bottom-2 -left-4 bg-card/90 backdrop-blur-sm rounded-2xl p-3 shadow-elegant border border-border"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">AI + Dev</div>
                  <div className="text-xs text-muted-foreground">Full Stack</div>
                </div>
              </motion.div>

              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ transformOrigin: "center" }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-glow -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mt-16 border border-border/30"
        >
          <p className="text-center text-muted-foreground text-sm mb-4 uppercase tracking-wider">Tech Arsenal</p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, y: -4 }}
              >
                <Badge variant="tech" className="text-sm py-2 px-4 hover:shadow-cool transition-shadow">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
