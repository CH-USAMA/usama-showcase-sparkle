import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, ChevronRight } from "lucide-react";
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
          <div className="text-center lg:text-left space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge variant="tech" className="text-sm py-2 px-5 mb-4 inline-flex items-center gap-2 border border-primary/20 bg-primary/5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Laravel · PHP · MySQL · AI · Vibe Coding
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl lg:text-8xl font-display font-extrabold leading-[0.9] tracking-tighter"
                style={{ color: "hsl(var(--foreground))" }}
              >
                I DIGITIZE
                <br />
                <span className="text-gradient">YOUR BUSINESS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Hi, I'm <strong className="text-foreground">Usama Munawar</strong> — a{" "}
                <strong className="text-foreground">Laravel, PHP & MySQL developer</strong> and{" "}
                <strong className="text-foreground">AI engineer</strong> who uses{" "}
                <strong className="text-foreground">vibe coding with Claude, Lovable & Cursor</strong>{" "}
                to build and automate businesses 10x faster.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <HireMe />
              <a href="/blog">
                <Button size="lg" variant="outline-white" className="gap-2 group">
                  Read My Blog
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline-white" className="gap-2">
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
              <div className="absolute inset-0 w-80 h-80 lg:w-[26rem] lg:h-[26rem] rounded-full bg-accent-gradient opacity-20 blur-3xl animate-pulse" />
              
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                <img src={profileImage} alt="Usama Munawar - AI Engineer & Business Digitization Expert" className="w-full h-full object-cover" loading="eager" />
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
