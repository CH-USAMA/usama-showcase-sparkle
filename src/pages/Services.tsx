import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services";
import { ArrowRight, CalendarCheck } from "lucide-react";

const Footer = lazy(() => import("@/components/Footer"));

const BASE = "https://dev-usama-portfolio.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Backend engineering services",
      itemListElement: servicesData.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${BASE}/services/${s.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: servicesData.flatMap((s) =>
        s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        }))
      ),
    },
  ],
};

const Services = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Backend Engineering Services — Laravel, VoIP, Automation & AI"
      description="Specialist backend services: Laravel SaaS development, Asterisk VoIP platforms, n8n automation infrastructure, and production AI integrations."
      canonical={`${BASE}/services`}
      jsonLd={jsonLd}
    />
    <Navbar />

    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="max-w-3xl">
            <span className="text-primary text-xs sm:text-sm font-inter font-medium uppercase tracking-[0.25em]">
              What I do
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-foreground tracking-tight leading-tight">
              Backend engineering services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground font-inter leading-relaxed">
              Four areas, one engineer. Each engagement ships with tests, deployment, and documentation so your team owns
              the system afterwards.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-5xl">
          {servicesData.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 0.06}>
              <Card className="h-full p-7 rounded-2xl border-border/30 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-500 flex flex-col">
                <span className="text-primary text-[0.7rem] font-inter font-medium uppercase tracking-[0.2em]">
                  {s.eyebrow}
                </span>
                <h2 className="mt-3 text-xl sm:text-2xl font-inter font-semibold text-foreground tracking-tight">
                  {s.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground font-inter leading-relaxed flex-1">{s.intro}</p>
                <Link
                  to={`/services/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-inter font-medium text-primary hover:gap-3 transition-all"
                >
                  Explore {s.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-14 max-w-5xl rounded-2xl border border-primary/20 bg-card/50 p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-inter font-semibold text-foreground">
              Not sure which one you need?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground font-inter">
              Describe the problem on a free 30-minute call and I will tell you the shortest path to a fix.
            </p>
            <a href="/book" className="inline-block mt-6">
              <Button variant="hero" className="rounded-full px-6 gap-2">
                <CalendarCheck className="w-4 h-4" /> Book a consultation
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </main>

    <Suspense fallback={<div className="py-20" />}>
      <Footer />
    </Suspense>
  </div>
);

export default Services;
