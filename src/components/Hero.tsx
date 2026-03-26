import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/usama-profile.jpg";
import HireMe from "@/components/HireMe";
import { lazy, Suspense } from "react";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));

const Hero = () => {
  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

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
                  🚀 Laravel · PHP · MySQL · AI · Vibe Coding Expert
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
                style={{ color: "hsl(var(--foreground))" }}
              >
                I DIGITIZE
                <br />
                <span className="text-primary">YOUR BUSINESS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                Hi, I'm <strong className="text-foreground">Usama Munawar</strong> — a <strong className="text-foreground">Laravel, PHP & MySQL developer</strong> and
                <strong className="text-foreground"> AI engineer</strong> who uses <strong className="text-foreground">vibe coding with Claude, Lovable & Cursor</strong> to build and automate businesses 10x faster.
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elegant">
                <img src={profileImage} alt="Usama Munawar - AI Engineer & Business Digitization Expert" className="w-full h-full object-cover" loading="eager" />
              </div>

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

            </div>
          </motion.div>
        </div>

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
