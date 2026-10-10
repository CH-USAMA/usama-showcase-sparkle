import type { CSSProperties } from "react";
import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { getService, servicesData } from "@/data/services";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";
import { useEnter } from "@/lib/boot";
import { FinalCTA, Footer } from "@/components/lazyParts";


/* ---------------------------------------------------------------------------
   /services/:slug, on the same system as everything else.

   This was the last page still built from shadcn Card, Badge and Button with
   its own type scale, so a reader who clicked through from the rebuilt
   /services landed somewhere that looked like a different site. Content is
   unchanged; only the surface it sits on is.
--------------------------------------------------------------------------- */

/** Where "Explore case studies" lands for each service. */
const WORK_FILTER: Record<string, string> = {
  "laravel-development": "platform",
  "voip-asterisk": "platform",
  "automation-n8n": "ai",
  "ai-integration": "ai",
};

const ServiceDetail = () => {
  const enter = useEnter();
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const url = `${SITE_URL}/services/${service.slug}`;
  const others = servicesData.filter((s) => s.slug !== service.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.name,
      name: service.title,
      description: service.metaDescription,
      url,
      provider: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
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

      <main
        id="main"
        className="fx-glow-top relative pt-32 lg:pt-40"
        style={{
          "--hue": service.hue,
          "--wash-x": "22%",
          "--wash-y": "0%",
        } as CSSProperties}
      >
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb">
            <Link
              to="/services"
              className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All services
            </Link>
          </nav>

          {/* ---- header ---- (h1 is the LCP element: painted, never faded in) */}
          <div className="mt-10">
            <span className="chip-hue">
              <span className="mono-label">{service.eyebrow}</span>
            </span>
            <h1 className="type-display mt-5 max-w-4xl text-foreground">{service.title}</h1>
            <p className="enter-lift type-lead mt-6 max-w-2xl text-muted-foreground" {...enter()}>{service.intro}</p>
          </div>

          <Reveal index={1}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: `service_${service.slug}` })}
              >
                Book a free call
              </CTA>
              <CTA to={`/projects${WORK_FILTER[service.slug] ? `?type=${WORK_FILTER[service.slug]}` : ""}`} tone="ghost" size="lg" arrow>
                Explore case studies
              </CTA>
            </div>
          </Reveal>

          {/* ---- what it means in practice ---- */}
          <Reveal index={2}>
            {/* Same outcome tiles as the project pages: the value large, the label as a sentence. */}
            <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.1] bg-hairline/[0.08] sm:grid-cols-3">
              {service.outcomes.map((o) => (
                <div key={o.label} className="flex flex-col-reverse justify-end bg-surface-1 p-5 sm:p-6">
                  <dd className="mt-3 font-inter text-sm leading-snug text-muted-foreground">{o.label}</dd>
                  <dt className="font-inter text-[2rem] font-semibold leading-none tracking-[-0.03em] text-foreground">{o.value}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline/[0.08] pt-6">
              {service.stack.map((t) => (
                <span key={t} className="rounded-md bg-surface-2 px-2 py-1 font-inter text-xs font-medium text-foreground">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* ---- body ---- */}
          <div className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="max-w-3xl">
              {service.sections.map((s, i) => (
                // The divider goes by index: each section is the first child of
                // its own Reveal, so :first-child matched (and stripped) them all.
                <Reveal key={s.heading} index={Math.min(i + 1, 4)}>
                  <section className={`py-10 ${i > 0 ? "border-t border-hairline/[0.08]" : "pt-0"}`}>
                    <h2 className="type-h3 text-foreground">{s.heading}</h2>
                    <p className="type-body measure mt-4 text-muted-foreground">{s.body}</p>
                    {s.bullets && (
                      <ul className="mt-6 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-3 type-body text-muted-foreground">
                            <Check
                              className="mt-1 h-4 w-4 shrink-0 text-hue"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section className="border-t border-hairline/[0.08] py-10">
                  <h2 className="type-h3 text-foreground">Frequently asked</h2>
                  <dl className="mt-7 border-t border-hairline/[0.08]">
                    {service.faqs.map((f) => (
                      <div key={f.q} className="border-b border-hairline/[0.08] py-5">
                        <dt className="font-inter text-[15px] font-medium text-foreground">{f.q}</dt>
                        <dd className="type-body measure mt-2.5 text-muted-foreground">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            </div>

            {/* ---- rail ---- */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              <Reveal variant="fade">
                <div className="card-surface p-6">
                  <h2 className="font-inter text-[15px] font-medium text-foreground">
                    Have a system like this?
                  </h2>
                  <p className="type-body mt-3 text-muted-foreground">
                    Bring the problem to a free 30-minute call and leave with a clear
                    technical next step, whether or not we work together.
                  </p>
                  <div className="mt-6">
                    <CTA
                      to="/book"
                      size="sm"
                      arrow
                      className="w-full justify-center"
                      onClick={() =>
                        trackEvent("book_call_click", { location: `service_rail_${service.slug}` })
                      }
                    >
                      Book a free call
                    </CTA>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade" index={1}>
                <div className="card-surface p-6">
                  <h2 className="mono-tiny text-subtle">Other services</h2>
                  <ul className="mt-5 border-t border-hairline/[0.08]">
                    {others.map((o) => (
                      <li key={o.slug} style={{ "--hue": o.hue } as CSSProperties}>
                        <Link
                          to={`/services/${o.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-hairline/[0.08] py-3.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                        >
                          <span className="flex items-center gap-2.5">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {o.name}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-standard group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
        <Suspense fallback={<div className="py-24" />}>
          <FinalCTA location={`service_${service.slug}`} secondary={{ to: "/services", label: "All services" }} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ServiceDetail;
