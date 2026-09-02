import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lazy, Suspense } from "react";
import { getService, servicesData } from "@/data/services";
import { ArrowLeft, ArrowRight, CalendarCheck, Check } from "lucide-react";
import NotFound from "@/pages/NotFound";

const Footer = lazy(() => import("@/components/Footer"));

const BASE = "https://dev-usama-portfolio.vercel.app";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const url = `${BASE}/services/${service.slug}`;
  const others = servicesData.filter((s) => s.slug !== service.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.name,
      name: service.title,
      description: service.metaDescription,
      url,
      provider: { "@type": "Person", name: "Usama Munawar", url: BASE },
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={url}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All services
            </Link>
          </nav>

          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-primary text-xs sm:text-sm font-inter font-medium uppercase tracking-[0.25em]">
                {service.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-foreground tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground font-inter leading-relaxed">{service.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book">
                  <Button variant="hero" className="rounded-full px-6 gap-2">
                    <CalendarCheck className="w-4 h-4" /> Book a free consultation
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="rounded-full px-6">
                    See related work
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {service.outcomes.map((o) => (
                <div key={o.label} className="rounded-xl border border-border/30 bg-card/40 py-5 px-4 text-center">
                  <div className="text-xl sm:text-2xl font-inter font-bold text-primary">{o.value}</div>
                  <div className="text-xs text-muted-foreground font-inter mt-1 uppercase tracking-wider">{o.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-2 max-w-3xl">
              {service.stack.map((t) => (
                <Badge key={t} variant="outline" className="px-3 py-1 font-inter">
                  {t}
                </Badge>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-10 items-start">
            <div className="space-y-12 max-w-3xl">
              {service.sections.map((s, i) => (
                <AnimatedSection key={s.heading} delay={i * 0.05}>
                  <section>
                    <h2 className="text-2xl sm:text-3xl font-inter font-semibold text-foreground tracking-tight">
                      {s.heading}
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground font-inter leading-relaxed">{s.body}</p>
                    {s.bullets && (
                      <ul className="mt-5 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-sm sm:text-base text-muted-foreground font-inter">
                            <Check className="w-4 h-4 mt-1 shrink-0 text-primary" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </AnimatedSection>
              ))}

              <AnimatedSection>
                <section>
                  <h2 className="text-2xl sm:text-3xl font-inter font-semibold text-foreground tracking-tight">
                    Frequently asked questions
                  </h2>
                  <dl className="mt-6 space-y-6">
                    {service.faqs.map((f) => (
                      <div key={f.q} className="rounded-2xl border border-border/30 bg-card/40 p-6">
                        <dt className="font-inter font-semibold text-foreground">{f.q}</dt>
                        <dd className="mt-2 text-sm text-muted-foreground font-inter leading-relaxed">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </AnimatedSection>
            </div>

            <aside className="lg:sticky lg:top-28 space-y-6">
              <Card className="p-6 rounded-2xl border-primary/20 bg-card/60 backdrop-blur-sm">
                <h2 className="text-lg font-inter font-semibold text-foreground">Have a project like this?</h2>
                <p className="mt-2 text-sm text-muted-foreground font-inter leading-relaxed">
                  Bring the problem to a free 30-minute call and leave with a clear technical next step, whether or not
                  we work together.
                </p>
                <Link to="/book" className="block mt-5">
                  <Button variant="hero" className="w-full rounded-xl">
                    Book a consultation
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 rounded-2xl border-border/30 bg-card/40">
                <h2 className="text-sm font-inter font-semibold uppercase tracking-[0.2em] text-primary">
                  Other services
                </h2>
                <ul className="mt-4 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/services/${o.slug}`}
                        className="group inline-flex items-center gap-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {o.name}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ServiceDetail;
