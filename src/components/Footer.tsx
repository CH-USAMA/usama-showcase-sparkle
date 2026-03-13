import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Usama Munawar</h3>
            <p className="text-muted-foreground">AI Engineer & Full Stack Developer</p>
          </div>

          <div className="flex justify-center gap-4">
            {[
              { href: "https://github.com/CH-USAMA", icon: Github },
              { href: "https://www.linkedin.com/in/usama-works/", icon: Linkedin },
              { href: "mailto:devusamaworks@gmail.com", icon: Mail },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button size="icon" variant="outline" className="border-border text-foreground hover:text-primary hover:border-primary transition-colors" asChild>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <s.icon className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground">Made by Usama</p>
            <p className="text-muted-foreground/60 text-sm mt-1">© 2026 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
