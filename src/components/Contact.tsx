import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const Contact = () => {
  const whatsappUrl = "https://wa.me/923038004684?text=Hi%20Usama%2C%20I%27d%20like%20to%20discuss%20a%20project";

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Contact</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold mb-4 text-foreground tracking-tight">GET IN TOUCH</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-10">
            <AnimatedSection direction="left">
              <h3 className="text-2xl font-display font-bold mb-6 text-foreground">Let's Start a Conversation</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-inter">
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a specific project in mind or just want to explore possibilities,
                I'd love to hear from you.
              </p>
            </AnimatedSection>

            <div className="space-y-5">
              {[
                { icon: Mail, title: "Email", value: "devusamaworks@gmail.com", href: "mailto:devusamaworks@gmail.com" },
                { icon: Phone, title: "Phone / WhatsApp", value: "+92 303 8004684", href: whatsappUrl },
                { icon: MapPin, title: "Location", value: "Lahore, Pakistan", href: undefined },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} direction="left">
                  <motion.div whileHover={{ x: 8 }} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10 group-hover:bg-primary/15 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-inter hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground font-inter">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <AnimatedSection delay={0.3}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { num: "180+", label: "Projects Completed" },
                { num: "5+", label: "Years Experience" },
              ].map((s, i) => (
                <AnimatedSection key={i} delay={0.2 + i * 0.1}>
                  <motion.div whileHover={{ scale: 1.05, y: -4 }}>
                    <Card className="p-6 text-center hover:shadow-cool transition-all duration-300 rounded-2xl border-border/30 bg-card/60">
                      <div className="text-3xl font-display font-extrabold text-gradient mb-2">{s.num}</div>
                      <div className="text-muted-foreground font-inter text-sm">{s.label}</div>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection direction="right" delay={0.2}>
            <Card className="p-8 bg-card-gradient border-border/30 shadow-glow rounded-2xl">
              <form action="https://formspree.io/f/mkgzjlde" method="POST" className="space-y-6">
                <p className="text-muted-foreground text-center text-sm mb-6 font-inter">
                  Share your project details, and I'll get back to you with the best solution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">Your Name</label>
                    <Input name="name" placeholder="John Doe" required className="rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">Company / Brand</label>
                    <Input name="company" placeholder="TechStart Inc." className="rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-foreground mb-2">Email</label>
                  <Input type="email" name="email" placeholder="you@example.com" required className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-foreground mb-2">Project Type</label>
                  <select name="project_type" className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-inter">
                    <option>Website Development</option>
                    <option>Web Application</option>
                    <option>AI Integration</option>
                    <option>Automation (n8n / Zapier)</option>
                    <option>System Upgrade / Maintenance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-foreground mb-2">Project Details</label>
                  <Textarea name="message" placeholder="Tell me about your project, timeline, and budget..." rows={5} required className="rounded-xl" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" variant="hero" className="w-full shadow-glow rounded-xl">
                    <Send className="w-4 h-4 mr-2" />Hire Me Now
                  </Button>
                </motion.div>
              </form>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
