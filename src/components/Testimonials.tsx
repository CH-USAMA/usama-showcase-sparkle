import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AnimatedSection from "@/components/AnimatedSection";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => { if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (emblaApi) emblaApi.on("select", onSelect); }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const testimonials = [
    { name: "Sarah Johnson", position: "CEO", company: "TechStart Inc.", rating: 5, content: "Usama delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.", avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop&crop=face", project: "E-Commerce Platform" },
    { name: "Michael Chen", position: "Product Manager", company: "Digital Solutions Ltd.", rating: 5, content: "Working with Usama was a game-changer for our business. He transformed our outdated system into a modern, scalable solution.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", project: "Dashboard Redesign" },
    { name: "Emily Rodriguez", position: "Founder", company: "HealthTech Innovations", rating: 5, content: "Usama's expertise in healthcare technology is remarkable. He built a comprehensive patient management system that has improved our workflow significantly.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", project: "Healthcare Management System" },
    { name: "David Thompson", position: "CTO", company: "EduLearn Platform", rating: 5, content: "The learning management system Usama developed has been a huge success. His understanding of educational technology and user experience design is impressive.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", project: "LMS Development" },
    { name: "Lisa Wang", position: "Marketing Director", company: "PropertyHub", rating: 5, content: "Our real estate platform has seen a 60% increase in user engagement since Usama's redesign. His technical skills combined with business understanding make him exceptional.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", project: "Real Estate Platform" },
    { name: "James Miller", position: "Restaurant Owner", company: "Miller's Kitchen", rating: 5, content: "The restaurant management system has streamlined our operations completely. Orders are processed faster, inventory is tracked automatically.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", project: "Restaurant Management" },
  ];

  const stats = [
    { label: "Client Satisfaction", value: "100%" },
    { label: "Projects Delivered", value: "180+" },
    { label: "Repeat Clients", value: "85%" },
    { label: "Average Rating", value: "5.0" },
  ];

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">CLIENT TESTIMONIALS</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it - here's what my clients say about working with me
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div whileHover={{ y: -6, scale: 1.03 }} transition={{ type: "spring" }}>
                <Card className="p-6 text-center bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, index) => (
                  <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] px-4">
                    <Card className="p-6 pt-10 bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 relative h-full">
                      <div className="space-y-4">
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">"{t.content}"</p>
                        <Badge variant="secondary" className="text-xs">{t.project}</Badge>
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h4 className="font-semibold text-foreground">{t.name}</h4>
                            <p className="text-sm text-muted-foreground">{t.position} at {t.company}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollPrev} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 shadow-md">
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollNext} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 shadow-md">
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
