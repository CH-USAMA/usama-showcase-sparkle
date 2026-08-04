import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/usama-profile.jpg";
import profileImageWebp from "@/assets/usama-profile.webp";
import cvAsset from "@/assets/usama-cv.pdf.asset.json";

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
          <div className="text-center lg:text-left space-y-7 order-1">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-full border border-border/40 bg-background/40 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-inter font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Backend Engineer · Laravel · Automation · VoIP · AI
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
              >
                <span className="block text-4xl sm:text-5xl lg:text-6xl">
                  Production-grade
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl italic text-gradient">
                  backend, engineered.
                </span>
                <span className="block mt-3 text-base sm:text-lg lg:text-xl font-inter font-normal text-muted-foreground tracking-normal max-w-xl">
                  Scalable Laravel systems, automation infrastructure & real-time communication platforms.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-sm sm:text-base text-muted-foreground/90 max-w-xl leading-relaxed font-inter"
              >
                I'm <span className="text-foreground font-medium">Usama Munawar</span>, a Backend Systems Engineer helping
                SaaS founders, startups, and operations-heavy teams ship high-availability Laravel applications, robust APIs,
                VoIP/Asterisk platforms, and AI-powered automation that drives measurable operational efficiency.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <a href="/book">
                <Button size="lg" variant="hero" className="gap-2 shadow-glow rounded-xl px-8">
                  Book a Consultation
                </Button>
              </a>
              <a href="#portfolio">
                <Button size="lg" variant="outline-white" className="gap-2 rounded-xl">
                  View Projects
                </Button>
              </a>
              <a href={cvAsset.url} target="_blank" rel="noopener noreferrer" download="Usama-Munawar-CV.pdf">
                <Button size="lg" variant="ghost" className="gap-2 rounded-xl">
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
                { href: "mailto:devusamaworks@gmail.com?subject=Project%20Inquiry", icon: Mail, label: "Email" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="group flex items-center gap-2 px-3 py-2 rounded-full border border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-inter text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">{s.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", damping: 20 }}
            className="flex justify-center lg:justify-end order-2"
          >
            <div className="relative">
              {/* Glowing ring behind image */}
              <div className="absolute inset-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-[26rem] lg:h-[26rem] rounded-full bg-accent-gradient opacity-20 blur-3xl animate-pulse" />

              <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                <picture>
                  <source srcSet={profileImageWebp} type="image/webp" />
                  <img
                    src={profileImage}
                    alt="Usama Munawar - Laravel & AI Engineer"
                    className="w-full h-full object-cover object-top scale-125"
                    loading="eager"
                    decoding="async"
                    width="384"
                    height="384"
                  />
                </picture>
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle at 50% 30%, transparent 35%, hsl(var(--background) / 0.6) 70%, hsl(var(--background)) 100%)'
                }} />
              </div>

              {/* Floating stats - desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="hidden sm:block absolute -top-3 -right-3 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-border/50"
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
                className="hidden sm:block absolute -bottom-2 -left-4 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-border/50"
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
                className="hidden sm:block absolute top-1/2 -right-6 bg-card/95 backdrop-blur-md rounded-2xl p-3 shadow-elegant border border-border/50"
              >
                <div className="text-center">
                  <div className="text-lg font-display font-extrabold text-gradient">$145K+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Earned</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="sm:hidden mt-10 grid grid-cols-3 gap-3 max-w-sm mx-auto"
        >
          {[
            { value: "5+", label: "Years" },
            { value: "180+", label: "Projects" },
            { value: "$145K+", label: "Earned" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30">
              <div className="text-lg font-display font-extrabold text-gradient">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
