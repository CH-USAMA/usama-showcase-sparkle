import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border/30 py-16">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px glow-line" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h3 className="text-2xl font-display font-extrabold mb-2 text-foreground tracking-tight">Usama Munawar</h3>
            <p className="text-muted-foreground font-inter text-sm">Laravel PHP MySQL Developer · AI Engineer · Vibe Coding Expert</p>
          </div>

          <div className="flex justify-center gap-3">
            {[
              { href: "https://github.com/CH-USAMA", icon: Github },
              { href: "https://www.linkedin.com/in/usama-works/", icon: Linkedin },
              { href: "mailto:devusamaworks@gmail.com", icon: Mail },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button size="icon" variant="outline" className="rounded-full border-border/40 text-foreground hover:text-primary hover:border-primary/50 transition-colors" asChild>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <s.icon className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground font-inter text-sm">Made by Usama</p>
            <p className="text-muted-foreground/50 text-xs mt-1 font-inter">© 2026 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
