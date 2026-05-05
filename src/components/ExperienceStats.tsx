import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Trophy, Star, Clock, Users, TrendingUp, Award } from "lucide-react";

const stats = [
  { icon: Clock, value: "5+", label: "Years Experience", color: "text-primary" },
  { icon: Trophy, value: "180+", label: "Projects Delivered", color: "text-primary" },
  { icon: TrendingUp, value: "$145K+", label: "Total Earned", color: "text-primary" },
  { icon: Award, value: "Top Rated Plus", label: "Upwork Status", color: "text-primary" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "text-primary" },
  { icon: Users, value: "95+", label: "Happy Clients", color: "text-primary" },
];

const achievements = [
  "Top Rated Plus on Upwork, top 3% of freelancers",
  "Level 2 Seller on Fiverr with 89+ reviews",
  "Top 3% Developer on Toptal",
  "Built enterprise SaaS products serving 10K+ users",
  "Specialized in AI agents, RAG pipelines & n8n automation",
  "Vibe coding expert, ship 10x faster with Claude + Cursor + Lovable",
];

const ExperienceStats = () => {
  return (
    <section className="py-24 bg-secondary/20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Track Record</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-4 text-foreground tracking-tight">
              Experience & impact
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              Five years of shipping production systems for startups, SaaS teams, and enterprise clients.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.08} className="h-full">
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <Card className="p-5 text-center bg-card/60 backdrop-blur-sm border-border/30 hover:shadow-glow transition-all duration-500 rounded-2xl h-full min-h-[180px] flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-inter font-bold text-gradient leading-none break-words w-full tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-inter text-xs sm:text-sm leading-snug">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <Card className="p-8 sm:p-10 bg-card/60 backdrop-blur-sm border-border/30 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-lg font-inter font-semibold text-foreground mb-6 tracking-tight">Key achievements</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground font-inter text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExperienceStats;
