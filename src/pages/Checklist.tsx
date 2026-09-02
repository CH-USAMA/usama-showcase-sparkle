import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const BASE_URL = "https://dev-usama-portfolio.vercel.app";

const sections: { title: string; items: string[] }[] = [
  {
    title: "1. Database and queries",
    items: [
      "Every query used on a hot path has a covering index, verified with EXPLAIN.",
      "N+1 queries are eliminated with eager loading and caught in CI by a query counter.",
      "Slow query log is enabled with a 200ms threshold and reviewed weekly.",
      "Read-heavy reporting runs against a replica, never the primary.",
      "Large tables have a retention or partitioning plan before they pass 50 million rows.",
    ],
  },
  {
    title: "2. Caching",
    items: [
      "Redis is used for sessions, rate limits, counters, and precomputed dashboard tiles.",
      "Cache keys carry a version prefix so a deploy can invalidate a whole class of keys.",
      "TTLs have jitter and expensive keys are rebuilt behind Cache::lock to avoid stampedes.",
      "Config, routes, views, and events are cached in production builds.",
    ],
  },
  {
    title: "3. Queues and background work",
    items: [
      "Nothing that can fail or take longer than 200ms happens inside a web request.",
      "Horizon is running with separate queues for critical, default, and bulk work.",
      "Every job is idempotent and safe to retry, with backoff configured.",
      "Failed jobs alert the channel the team already watches, not an unread inbox.",
    ],
  },
  {
    title: "4. API and integrations",
    items: [
      "All external calls have timeouts, retries with backoff, and a circuit breaker.",
      "Webhooks verify signatures and are processed asynchronously.",
      "Rate limiting is applied per client, not globally.",
      "API responses are versioned and paginated by cursor on large collections.",
    ],
  },
  {
    title: "5. Observability",
    items: [
      "Structured logs with a request ID that follows a job into the queue.",
      "Error tracking with release tagging so regressions are attributed to a deploy.",
      "Dashboards for queue depth, job runtime, database connections, and p95 latency.",
      "Alerts are based on user-visible symptoms, not CPU graphs.",
    ],
  },
  {
    title: "6. Security and reliability",
    items: [
      "Authorization enforced by policies, and tenancy enforced at the query layer.",
      "Secrets live in the environment, never in the repository.",
      "Automated daily backups with a restore that has actually been tested.",
      "Zero-downtime deploys with migrations that are backwards compatible.",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Laravel Scaling Checklist",
  "description":
    "A 26-point production checklist for scaling Laravel applications: database indexing, caching, queues, API resilience, observability, and security.",
  "url": `${BASE_URL}/laravel-scaling-checklist`,
  "step": sections.map((s) => ({
    "@type": "HowToSection",
    "name": s.title,
    "itemListElement": s.items.map((i) => ({ "@type": "HowToStep", "text": i })),
  })),
};

const Checklist = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Laravel Scaling Checklist — 26 Production Checks"
        description="A free 26-point checklist for scaling Laravel apps in production: indexing, Redis caching, queues, API resilience, observability, backups and zero-downtime deploys."
        canonical={`${BASE_URL}/laravel-scaling-checklist`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">
                Free resource
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold tracking-tight text-foreground mb-5">
              The Laravel Scaling Checklist
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              Twenty six checks I run before calling a Laravel application production ready. Use it
              as a pre-launch review, or as an audit of a system that is already struggling under
              load.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Card className="mt-10 border-border/40 bg-card/60 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-inter font-semibold mb-2">
                  Want it as a PDF, plus new checklists?
                </h2>
                <p className="text-muted-foreground text-sm mb-5">
                  Drop your email and I will send the printable version. No newsletter spam, only
                  practical backend material.
                </p>
                <form
                  action="https://formspree.io/f/mkgzjlde"
                  method="POST"
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={() => trackEvent("lead_magnet_submit", { resource: "laravel-scaling-checklist" })}
                >
                  <input type="hidden" name="_subject" value="Laravel Scaling Checklist download" />
                  <input type="hidden" name="resource" value="laravel-scaling-checklist" />
                  <label htmlFor="checklist-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="checklist-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="rounded-xl"
                  />
                  <Button type="submit" className="rounded-xl px-6 shrink-0">
                    <Download className="mr-2 h-4 w-4" />
                    Send it to me
                  </Button>
                </form>
                <p className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Your email is used for this request only and never shared.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          <div className="mt-14 space-y-10">
            {sections.map((section, i) => (
              <AnimatedSection key={section.title} delay={0.05 * i}>
                <section>
                  <h2 className="text-xl sm:text-2xl font-inter font-semibold tracking-tight mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <Card className="mt-16 border-primary/30 bg-primary/5 rounded-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-inter font-semibold mb-3">
                  Failing more than five of these?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Book a free 30 minute review. We go through your architecture together and you
                  leave with the shortest path to a fix.
                </p>
                <Button asChild size="lg" className="rounded-xl px-8">
                  <Link
                    to="/book"
                    onClick={() => trackEvent("book_call_click", { source: "checklist" })}
                  >
                    Book a free review
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checklist;
