import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const Contact = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">GET IN TOUCH</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <AnimatedSection direction="left">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Let's Start a Conversation</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a specific project in mind or just want to explore possibilities,
                I'd love to hear from you.
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email", value: "devusamaworks@gmail.com" },
                { icon: Phone, title: "Phone", value: "+92 303 8004684" },
                { icon: MapPin, title: "Location", value: "Pakistan" },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} direction="left">
                  <motion.div whileHover={{ x: 8 }} className="flex items-center gap-4">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {[
                { num: "50+", label: "Projects Completed" },
                { num: "5+", label: "Years Experience" },
              ].map((s, i) => (
                <AnimatedSection key={i} delay={0.2 + i * 0.1}>
                  <motion.div whileHover={{ scale: 1.05, y: -4 }}>
                    <Card className="p-6 text-center hover:shadow-cool transition-all duration-300">
                      <div className="text-3xl font-bold text-foreground mb-2">{s.num}</div>
                      <div className="text-muted-foreground">{s.label}</div>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection direction="right" delay={0.2}>
            <Card className="p-8 bg-card-gradient border-border/50 shadow-glow">
              <form action="https://formspree.io/f/mkgzjlde" method="POST" className="space-y-6">
                <p className="text-muted-foreground text-center text-sm mb-6">
                  Share your project details, and I'll get back to you with the best solution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                    <Input name="name" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company / Brand</label>
                    <Input name="company" placeholder="TechStart Inc." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                  <select name="project_type" className="w-full p-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Website Development</option>
                    <option>Web Application</option>
                    <option>AI Integration</option>
                    <option>System Upgrade / Maintenance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
                  <Textarea name="message" placeholder="Tell me about your project, timeline, and budget..." rows={5} required />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" variant="hero" className="w-full shadow-glow hover:scale-105 transition-transform">
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
