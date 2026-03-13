import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import HireMe from "@/components/HireMe";
import AnimatedSection from "@/components/AnimatedSection";

const FreelancingPlatforms = () => {
  const platforms = [
    { name: "Upwork", rating: 5.0, reviews: 47, earnings: "$50,000+", badge: "Top Rated Plus", description: "Specialized in full-stack web development with focus on React and Node.js projects", profileUrl: "https://www.upwork.com/freelancers/~01007bf0a0286da654", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
    { name: "Fiverr", rating: 4.9, reviews: 89, earnings: "$30,000+", badge: "Level 2 Seller", description: "Offering premium web development gigs with quick turnaround times", profileUrl: "https://www.fiverr.com/ch_usama_", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
    { name: "Freelancer", rating: 4.8, reviews: 32, earnings: "$25,000+", badge: "Preferred Freelancer", description: "Building custom web applications and providing technical consultation", profileUrl: "#", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
    { name: "Toptal", rating: 5.0, reviews: 15, earnings: "$40,000+", badge: "Top 3% Developer", description: "Working with enterprise clients on complex, high-stakes projects", profileUrl: "#", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
  ];

  const totalStats = { totalEarnings: "$145,000+", totalProjects: 180, totalClients: 95, averageRating: 4.9 };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">FREELANCING PLATFORMS</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Trusted by clients worldwide across multiple freelancing platforms</p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { value: totalStats.totalEarnings, label: "Total Earnings" },
            { value: `${totalStats.totalProjects}+`, label: "Projects Completed" },
            { value: `${totalStats.totalClients}+`, label: "Happy Clients" },
            { value: totalStats.averageRating.toString(), label: "Average Rating" },
          ].map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }}>
                <Card className="p-6 text-center bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.1 }} className="text-3xl font-bold text-primary mb-2">{s.value}</motion.div>
                  <div className="text-muted-foreground">{s.label}</div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <AnimatedSection key={index} delay={index * 0.12} direction={index % 2 === 0 ? "left" : "right"}>
              <motion.div whileHover={{ y: -8, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-8 bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <motion.div whileHover={{ rotate: 12 }} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <img src={platform.logo} alt={platform.name} className="w-12 h-12 rounded-xl object-cover" />
                    </motion.div>
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-foreground">{platform.name}</h3>
                          <Badge className="bg-accent-gradient border-0">{platform.badge}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold text-foreground">{platform.rating}</span>
                            <span className="text-muted-foreground">({platform.reviews} reviews)</span>
                          </div>
                          <div className="text-primary font-semibold">{platform.earnings} earned</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{platform.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />View Profile
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Ready to Work Together?</h3>
              <p className="text-muted-foreground">Whether through these platforms or direct contact, I'm always excited to take on new challenges.</p>
              <HireMe />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FreelancingPlatforms;
