import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Download, Code2, Brain, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/usama-profile.jpg";
import HireMe from "@/components/HireMe";
import { lazy, Suspense } from "react";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));

const Hero = () => {
  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden grain">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <Badge variant="tech" className="text-sm py-2 px-5 inline-flex items-center gap-2 border border-primary/20 bg-primary/5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Laravel · PHP · MySQL · AI · Vibe Coding
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-[0.95] tracking-tighter"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Laravel & AI Engineer
                <br />
                <span className="text-gradient text-2xl sm:text-4xl lg:text-5xl leading-tight block mt-2">
                  I Build Fast, Scalable Systems That Automate & Scale Businesses
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-inter"
              >
                I'm <strong className="text-foreground">Usama Munawar</strong> — I combine{" "}
                <strong className="text-foreground">Laravel, PHP, MySQL</strong> with{" "}
                <strong className="text-foreground">AI agents, RAG pipelines</strong>, and{" "}
                <strong className="text-foreground">vibe coding (Claude + Cursor + Lovable)</strong>{" "}
                to deliver production-ready solutions 10x faster.
              </motion.p>

              {/* Floating code + AI icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 justify-center lg:justify-start"
              >
                {[
                  { icon: Terminal, label: "Code" },
                  { icon: Brain, label: "AI" },
                  { icon: Code2, label: "Vibe" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-inter text-muted-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <a href="#portfolio">
                <Button size="lg" variant="hero" className="gap-2 shadow-glow rounded-xl px-8">
                  View My Projects
                </Button>
              </a>
              <HireMe />
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline-white" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {[
                { href: "https://github.com/CH-USAMA", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/usama-works/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:devusamaworks@gmail.com?subject=Hire%20Me&body=Hi%20Usama,", icon: Mail, label: "Email" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button size="icon" variant="outline-white" className="rounded-full border-border/40 hover:border-primary/50 hover:bg-primary/10">
                    <s.icon className="w-5 h-5" />
                  </Button>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", damping: 20 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glowing ring behind image */}
              <div className="absolute inset-0 w-56 h-56 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] rounded-full bg-accent-gradient opacity-20 blur-3xl animate-pulse" />
              
              <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                <img src={profileImage} alt="Usama Munawar - Laravel & AI Engineer" className="w-full h-full object-cover object-top scale-125" loading="eager" />
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle at 50% 30%, transparent 35%, hsl(var(--background) / 0.6) 70%, hsl(var(--background)) 100%)'
                }} />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -top-3 -right-3 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-border/50"
              >
                <div className="text-center">
                  <div className="text-2xl font-display font-extrabold text-gradient">5+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Years</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -bottom-2 -left-4 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-border/50"
              >
                <div className="text-center">
                  <div className="text-2xl font-display font-extrabold text-gradient">180+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Projects</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute top-1/2 -right-6 bg-card/95 backdrop-blur-md rounded-2xl p-3 shadow-elegant border border-border/50"
              >
                <div className="text-center">
                  <div className="text-lg font-display font-extrabold text-gradient">$145K+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Earned</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDown className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
