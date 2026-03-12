import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/usama-profile.jpg";
import HireMe from "@/components/HireMe";

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
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Badge variant="tech" className="text-sm py-2 px-4 mb-4 inline-block">
                🤖 AI Engineer • Full Stack Developer • Automation Architect
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                I BUILD
                <br />
                <span className="text-white/90">INTELLIGENT SYSTEMS</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Hi, I'm Usama Munawar — an AI Engineer & Full Stack Developer who builds 
                <strong className="text-white"> autonomous agents, RAG pipelines, and AI-powered products</strong> that 
                automate businesses and solve real problems. I turn complex AI into production-ready solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-scale-in" style={{ animationDelay: "0.6s" }}>
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
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="https://github.com/CH-USAMA" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline-white" className="hover:scale-110 transition">
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/usama-works/" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline-white" className="hover:scale-110 transition">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
              <a href="mailto:devusamaworks@gmail.com?subject=Hire%20Me&body=Hi%20Usama,">
                <Button size="icon" variant="outline-white" className="hover:scale-110 transition">
                  <Mail className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Profile */}
          <div className="flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant transform hover:scale-110 transition-all duration-500 hover:shadow-glow">
                <img src={profileImage} alt="Usama Munawar - AI Engineer" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-elegant">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">5+</div>
                  <div className="text-sm text-black">Years</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-elegant">
                <div className="text-center">
                  <div className="text-lg font-bold text-black">AI + Dev</div>
                  <div className="text-xs text-black/70">Full Stack</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-dark-section rounded-2xl p-6 mt-16 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-center text-white/60 text-sm mb-4 uppercase tracking-wider">Tech Arsenal</p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, index) => (
              <Badge key={index} variant="tech" className="text-sm py-2 px-4 hover:scale-110 transition-all duration-300 hover:shadow-cool">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
