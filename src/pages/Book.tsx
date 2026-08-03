import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";

const CalendlyEmbed = lazy(() => import("@/components/CalendlyEmbed"));

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://dev-usama-portfolio.vercel.app/book#webpage",
  "url": "https://dev-usama-portfolio.vercel.app/book",
  "name": "Book a Free 30-Min Backend Engineering Consultation — Usama Munawar",
  "description": "Schedule a free 30-minute consultation with Usama Munawar, a senior backend systems engineer specializing in Laravel, automation, VoIP, and AI integrations.",
  "inLanguage": "en",
  "primaryImageOfPage": "https://dev-usama-portfolio.vercel.app/og-image.png",
};

const faqs = [
  {
    q: "How much does it cost to hire a senior Laravel developer?",
    a: "Engagements typically start around $2,500 for a scoped sprint and scale with team size and duration. Retainers for ongoing backend and automation work are quoted after the free 30-minute call, once the scope is clear.",
  },
  {
    q: "Is the 30-minute consultation really free?",
    a: "Yes. It is a free, no-obligation call. You bring the Laravel scaling, automation, VoIP, or AI integration challenge and you leave with an opinionated technical next step, whether or not we work together.",
  },
  {
    q: "What happens on the call?",
    a: "We review your current architecture, identify the bottleneck, and outline the shortest path to a fix. If a project makes sense, you get a scope, timeline, and price within 24 hours.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. NDAs are signed before any sensitive architecture, codebase, or business detail is shared.",
  },
  {
    q: "What technologies do you work with?",
    a: "Laravel and PHP, MySQL and PostgreSQL, REST and GraphQL APIs, n8n and workflow automation, Asterisk and VoIP call platforms, plus AI and LLM integrations including RAG and agent systems.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};


const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book a Free 30-Min Consultation — Usama Munawar"
        description="Schedule a free 30-minute backend engineering consultation. Laravel, automation, VoIP & AI systems. No sales pitch, just a clear next step."
        canonical="https://dev-usama-portfolio.vercel.app/book"
        jsonLd={bookJsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <AnimatedSection>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary/40" />
                <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Free Consultation</span>
                <div className="h-px w-12 bg-primary/40" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-4 text-foreground tracking-tight">
                Book your 30-minute roadmap call
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
                Bring your Laravel scaling, automation, VoIP, or AI integration challenge. You'll leave with a clear, opinionated next step.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-inter text-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" /> 30 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-inter text-foreground">
                  <CalendarCheck className="w-3.5 h-3.5 text-primary" /> Pick a time that works for you
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-inter text-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> NDA-friendly
                </span>
              </div>
            </div>
          </AnimatedSection>

          <Suspense fallback={<div className="min-h-[700px] bg-card/30 rounded-2xl animate-pulse" />}>
            <CalendlyEmbed height={720} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
