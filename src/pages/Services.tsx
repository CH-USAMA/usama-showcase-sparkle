import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import SectionHeader from "@/components/system/SectionHeader";
import SilkBackground from "@/components/fx/SilkBackground";
import ServiceVisual from "@/components/ServiceVisual";
import { CAPABILITIES } from "@/data/capabilities";
import { AUDIENCES } from "@/data/audiences";
import { servicesData } from "@/data/services";
import { SITE_URL } from "@/data/site";
import { scrollToId } from "@/lib/scrollToId";
import { useEnter } from "@/lib/boot";
import { FinalCTA, Footer, TechMatrix } from "@/components/lazyParts";

// The interactive stack matrix moved here from the home page, where it was
// the eighth section of twelve. On the capabilities page it answers the
// question the reader came with.

/* ---------------------------------------------------------------------------
   /services: ten kinds of work as cards, each with a sketch of what it
   produces, over the light streaks. Capability copy comes from the same
   source the home page reads, so the two cannot drift.
--------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Full-stack engineering capabilities",
      itemListElement: servicesData.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
  ],
};

const Services = () => {
  const enter = useEnter();
  const { hash } = useLocation();

  // Home page tiles link to /services#<id>; scroll there once the page lays out.
  useEffect(() => {
    if (!hash) return;
    return scrollToId(hash.slice(1), { smooth: false });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Full-Stack Capabilities | React, React Native, Node.js, Laravel, TypeScript"
        description="React and TypeScript on the front end, React Native for mobile, Node.js for typed services and real-time, Laravel and PHP for the application core. One engineer across the whole stack."
        canonical={`${SITE_URL}/services`}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main id="main">
        <section className="relative isolate overflow-hidden pb-24 pt-36 lg:pb-32 lg:pt-44">
          <SilkBackground
            seed={1}
            lift={0.04}
            resolution={0.7}
            className="-z-10 bottom-auto h-[1150px] [mask-image:linear-gradient(180deg,#000_55%,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]"
            style={{ background: "radial-gradient(60% 70% at 50% 30%, hsl(var(--background)) 35%, transparent 80%)" }}
          />

          <div className="container mx-auto">
            {/* The h1 is this page's LCP element: painted on the first frame, never
                faded in by a JS observer. */}
            <div className="text-center">
              <h1 className="type-hero text-foreground">
                Full-stack development <em>services</em>
              </h1>
              <p className="enter-lift type-lead mx-auto mt-6 max-w-2xl text-muted-foreground" {...enter()}>
                React, React Native, Node.js and Laravel: one engineer across the stack. Every engagement
                draws on whichever of these the work actually needs, and nothing it does not.
              </p>
            </div>

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
              {CAPABILITIES.map((c, i) => (
                <Reveal as="li" key={c.id} index={Math.min(i % 3, 3)}>
                  <article
                    id={c.id}
                    className="fx-border group flex h-full scroll-mt-28 flex-col rounded-2xl border border-hairline/[0.1] bg-surface-1 p-2.5"
                  >
                    <ServiceVisual id={c.id} />
                    <div className="flex flex-1 items-end justify-between gap-4 px-2 pb-1.5 pt-4">
                      <div className="min-w-0">
                        <h2 className="font-inter text-lg font-semibold tracking-tight text-foreground">{c.title}</h2>
                        <p className="mt-1 font-inter text-sm leading-relaxed text-muted-foreground">
                          {c.summary}
                        </p>
                      </div>
                      {/* Four domains have a full page; the rest go to a call. */}
                      <CTA to={c.href ?? "/book"} tone="ghost" size="sm" className="shrink-0" aria-label={`${c.href ? "Explore" : "Discuss"} ${c.title}`}>
                        {c.href ? "Explore" : "Discuss"}
                      </CTA>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <Suspense fallback={<div className="py-24" />}>
          <div className="border-t border-hairline/[0.08]">
            <TechMatrix />
          </div>
        </Suspense>

        {/* ---- who these are for ----
            Moved here from the home page: "is this you?" is the question this
            page exists to answer. */}
        <section className="fx-glow-top relative border-t border-hairline/[0.08] py-24 lg:py-32">
          <div className="container mx-auto">
            <SectionHeader
              align="center"
              eyebrow="Who these are for"
              title={
                <>
                  Four situations behind most of the <em>work.</em>
                </>
              }
              lead="If one of these is uncomfortably familiar, that is the conversation worth having."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {AUDIENCES.map((a, i) => (
                <Reveal key={a.n} index={Math.min(i, 3)} variant="fade">
                  <div className="fx-border h-full rounded-2xl border border-hairline/[0.1] bg-surface-1 p-7 lg:p-9">
                    <span className="mono-tiny text-subtle">{a.who}</span>
                    <p className="mt-5 font-display text-2xl italic leading-[1.25] text-foreground lg:text-[1.75rem]">
                      “{a.ask}”
                    </p>
                    <dl className="mt-7 space-y-5 border-t border-hairline/[0.08] pt-6">
                      <div>
                        <dt className="mono-tiny text-subtle">The problem</dt>
                        <dd className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{a.problem}</dd>
                      </div>
                      <div>
                        <dt className="mono-tiny text-primary">What I do about it</dt>
                        <dd className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{a.solve}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="py-24" />}>
          <FinalCTA location="services" />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Services;
