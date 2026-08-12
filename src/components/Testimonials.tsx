import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "[Quote text from Shahrukh about Galway Taxis project to be added here.]",
    name: "Shahrukh",
    role: "Owner",
    company: "Galway Taxis",
  },
  {
    quote: "[Quote text from David about Marian Holy Art project to be added here.]",
    name: "David Gregathy",
    role: "Founder",
    company: "Marian Holy Art",
  },
  {
    quote: "[Quote text from Shehroz about Solutionszilla partnership to be added here.]",
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
