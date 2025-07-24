import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-dark-section text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Usama Munawar</h3>
            <p className="text-white/70">Full Stack Web Developer</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button
              size="icon"
              variant="outline"
              className="border-white text-white hover:text-primary hover:border-primary transition-colors"
              asChild
            >
              <a href="https://github.com/CH-USAMA" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-white text-white hover:text-primary hover:border-primary transition-colors"
              asChild
            >
              <a href="https://www.linkedin.com/in/usama-works/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-white text-white hover:text-primary hover:border-primary transition-colors"
              asChild
            >
              <a href="mailto:devusamaworks@gmail.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>


          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-white/70 flex items-center justify-center md:justify-end gap-1">
              Made by Usama 
            </p>
            <p className="text-white/50 text-sm mt-1">
              © 2026 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;