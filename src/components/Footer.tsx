import { Github, Linkedin, Mail, Twitter, Rss, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border/30 py-16">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px glow-line" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 items-start text-center md:text-left">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-inter font-bold mb-2 text-foreground tracking-tight">Usama Munawar</h2>
            <p className="text-muted-foreground font-inter text-sm max-w-md">
              Backend Systems Engineer & Laravel Automation Specialist. Building scalable Laravel apps, automation infrastructure, VoIP platforms, and AI integrations for production teams.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-inter font-semibold text-foreground uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm font-inter text-muted-foreground">
              <li><a href="/book" className="hover:text-primary transition-colors">Book a Call</a></li>
              <li><a href="/services/laravel-development" className="hover:text-primary transition-colors">Laravel Development</a></li>
              <li><a href="/services/voip-asterisk" className="hover:text-primary transition-colors">VoIP &amp; Asterisk</a></li>
              <li><a href="/services/automation-n8n" className="hover:text-primary transition-colors">Automation Infrastructure</a></li>
              <li><a href="/services/ai-integration" className="hover:text-primary transition-colors">AI Integration</a></li>
              <li><a href="/projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a></li>
              <li><a href="/rss.xml" className="hover:text-primary transition-colors inline-flex items-center gap-1.5"><Rss className="w-3 h-3" /> RSS</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-inter font-semibold text-foreground uppercase tracking-wider">Connect</h3>
            <div className="flex justify-center md:justify-start gap-2">
              {[
                { href: "https://github.com/CH-USAMA", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/usama-works/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://x.com/usloopsama", icon: Twitter, label: "X" },
                { href: "mailto:devusamaworks@gmail.com", icon: Mail, label: "Email" },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" variant="outline" className="rounded-full border-border/40 text-foreground hover:text-primary hover:border-primary/50 transition-colors" asChild>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <s.icon className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-inter">© 2026 Usama Munawar. All rights reserved.</p>
          <p className="text-muted-foreground text-xs font-inter">Built with Laravel, React & attention to detail.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
