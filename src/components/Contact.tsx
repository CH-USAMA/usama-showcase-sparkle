import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Let's Start a Conversation
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">devusamaworks@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+92 303 8004684</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">Pakistan</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <Card className="p-6 text-center hover:shadow-cool transition-all duration-300 hover:scale-105 animate-scale-in">
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-cool transition-all duration-300 hover:scale-105 animate-scale-in" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl font-bold text-foreground mb-2">5+</div>
                <div className="text-foreground">Years Experience</div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card-gradient border-border/50 shadow-glow">
      <form
        action="https://formspree.io/f/mkgzjlde" // <-- replace with your Formspree form ID
        method="POST"
        className="space-y-6"
      >
       
        <p className="text-muted-foreground text-center text-sm mb-6">
          Share your project details, and I'll get back to you with the best solution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <Input name="name" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company / Brand
            </label>
            <Input name="company" placeholder="TechStart Inc." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <Input type="email" name="email" placeholder="you@example.com" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Type
          </label>
          <select
            name="project_type"
            className="w-full p-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Website Development</option>
            <option>Web Application</option>
            <option>AI Integration</option>
            <option>System Upgrade / Maintenance</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Details
          </label>
          <Textarea
            name="message"
            placeholder="Tell me about your project, timeline, and budget..."
            rows={5}
            required
          />
        </div>

        <Button
  type="submit"
  size="lg"
  variant="hero"
  className="w-full text-white shadow-glow hover:scale-105 transition-transform"
>
  <Send className="w-4 h-4 mr-2" />
  Hire Me Now
</Button>
      </form>
    </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;