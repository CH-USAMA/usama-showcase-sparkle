import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Usama rebuilt our booking and dispatch flow and it simply stopped breaking. Bookings that used to fail at peak hours now go through cleanly, and the driver side is far easier to manage. He explained every decision in plain language and delivered on the dates he promised.",
    name: "Shahrukh",
    role: "Owner",
    company: "Galway Taxis",
  },
  {
    quote:
      "We came to Usama with a half-finished store and a lot of doubts. He tightened the backend, fixed the checkout and made the whole site fast. Orders now come through reliably and I can manage the catalogue myself without calling a developer every week.",
    name: "David Gregathy",
    role: "Founder",
    company: "Marian Holy Art",
  },
  {
    quote:
      "Usama is the engineer we hand the hard backend work to. Laravel systems, Asterisk call flows, automation pipelines, he takes ownership from architecture to deployment. Clean code, clear communication, and clients keep asking for him by name.",
    name: "Shehroz Kunwar",
    role: "Director",
    company: "Solutionszilla",
  },
];


const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary text-xs sm:text-sm font-inter font-medium uppercase tracking-[0.25em]">
              Client feedback
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-foreground tracking-tight">
              What clients say
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              Direct feedback from the people who shipped these systems with me.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <Card className="h-full p-7 rounded-2xl border-border/30 bg-card/50 backdrop-blur-sm relative hover:shadow-glow transition-all duration-500">
                  <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />
                  <p className="text-sm sm:text-base text-muted-foreground font-inter leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="mt-auto pt-5 border-t border-border/30">
                    <div className="font-inter font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground font-inter">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
