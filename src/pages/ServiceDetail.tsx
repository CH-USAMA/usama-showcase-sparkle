import type { CSSProperties } from "react";
import { lazy, Suspense } from "react";
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

const Footer = lazy(() => import("@/components/Footer"));

/* ---------------------------------------------------------------------------
   /services/:slug, on the same system as everything else.

   This was the last page still built from shadcn Card, Badge and Button with
   its own type scale, so a reader who clicked through from the rebuilt
   /services landed somewhere that looked like a different site. Content is
   unchanged; only the surface it sits on is.
--------------------------------------------------------------------------- */

const ServiceDetail = () => {
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
        className="wash band-edge pb-24 pt-32 lg:pt-40"
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
              className="inline-flex items-center gap-2 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hover-underline">All capabilities</span>
            </Link>
          </nav>

          {/* ---- header ---- */}
          <Reveal>
            <div className="mt-10">
              <span className="chip-hue">
                <span className="mono-label">{service.eyebrow}</span>
              </span>
              <h1 className="type-h2 mt-6 max-w-3xl text-foreground">{service.title}</h1>
              <p className="type-lead mt-7 max-w-2xl text-muted-foreground">{service.intro}</p>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: `service_${service.slug}` })}
              >
                Book an Architecture Call
              </CTA>
              <CTA to="/projects" tone="ghost" size="lg" arrow>
                Explore Case Studies
              </CTA>
            </div>
          </Reveal>

          {/* ---- what it means in practice ---- */}
          <Reveal index={2}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] sm:grid-cols-3">
              {service.outcomes.map((o) => (
                <div key={o.label} className="bg-surface-1 px-5 py-6">
                  <dt className="font-inter text-[1.35rem] font-semibold tracking-tight text-hue">
                    {o.value}
                  </dt>
                  <dd className="mono-tiny mt-2 text-muted-foreground">{o.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline/[0.08] pt-6">
              {service.stack.map((t) => (
                <span key={t} className="mono-tiny text-subtle">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* ---- body ---- */}
          <div className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="max-w-3xl">
              {service.sections.map((s, i) => (
                <Reveal key={s.heading} index={Math.min(i + 1, 4)}>
                  <section className="border-t border-hairline/[0.08] py-10 first:border-t-0 first:pt-0">
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
                      Book an Architecture Call
                    </CTA>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade" index={1}>
                <div className="card-surface p-6">
                  <h2 className="mono-label text-hue">Other capabilities</h2>
                  <ul className="mt-5 border-t border-hairline/[0.08]">
                    {others.map((o) => (
                      <li key={o.slug} style={{ "--hue": o.hue } as CSSProperties}>
                        <Link
                          to={`/services/${o.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-hairline/[0.08] py-3.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-hue"
                            />
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
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ServiceDetail;
