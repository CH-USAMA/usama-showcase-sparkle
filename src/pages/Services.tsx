import type { CSSProperties } from "react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { CAPABILITIES, RUNTIME_LABEL } from "@/data/capabilities";
import { AUDIENCES } from "@/data/audiences";
import { servicesData } from "@/data/services";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const Footer = lazy(() => import("@/components/Footer"));

/* ---------------------------------------------------------------------------
   /services — a capability page, not a wall of service cards.

   Same system as the landing page: left-aligned indexed headers, hairline
   rules, mono labels, domain hues, Reveal entrances. No new motion, no new
   effects, no shadcn Card.

   The page opens by naming which runtime owns which layer, because that is the
   distinction the whole site is arguing and a grid of equal-weight cards
   actively destroys it. Capability copy is imported from the same source the
   landing page reads, so the two can no longer drift.
--------------------------------------------------------------------------- */

/** Laravel first and largest — the ordering is the argument. */
const RUNTIMES = [
  {
    id: "laravel",
    name: "Laravel · PHP",
    role: "The application core",
    body: "Domain logic, APIs, queues, billing, permissions, audit trails. The part of the system that holds the business rules and has to be right. This is the specialisation everything else is arranged around.",
    hue: "var(--hue-backend)",
    primary: true,
  },
  {
    id: "node",
    name: "Node.js · TypeScript",
    role: "The event-driven edge",
    body: "WebSockets, socket services, presence and live state, and the integrations that have to stay connected. Used where the work is events rather than requests.",
    hue: "var(--hue-realtime)",
    primary: false,
  },
  {
    id: "python",
    name: "Python",
    role: "AI and data",
    body: "RAG pipelines, retrieval and reranking, agents, evaluation harnesses, and data processing. Used where the problem is intelligence rather than transactions.",
    hue: "var(--hue-ai)",
    primary: false,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Backend engineering capabilities",
      itemListElement: servicesData.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: servicesData.flatMap((s) =>
        s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        }))
      ),
    },
  ],
};

const Services = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Backend Engineering Capabilities | Laravel, Node.js, Python, VoIP"
      description="Laravel and PHP for the application core, Node.js for real-time and event-driven services, Python for AI and data, Asterisk for telephony. One engineer across the stack."
      canonical={`${SITE_URL}/services`}
      jsonLd={jsonLd}
    />
    <Navbar />

    <main
      id="main"
      className="wash pb-24 pt-32 lg:pt-40"
      style={{
        "--hue": "var(--hue-backend)",
        "--hue-2": "var(--hue-ai)",
        "--wash-x": "20%",
        "--wash-y": "0%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        {/* ---- header ---- */}
        <Reveal>
          <span className="mono-label text-hue">Capabilities</span>
          <h1 className="type-h2 mt-6 max-w-3xl text-foreground">
            One engineer, and the right runtime for each layer.
          </h1>
          <p className="type-lead mt-7 max-w-2xl text-muted-foreground">
            I am not a generalist who lists languages. Each of these owns a specific part
            of a production system, and the reason for using it is the shape of the
            problem, not preference.
          </p>
        </Reveal>

        {/* ---- the three runtimes: the distinction the site is arguing ---- */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] lg:mt-16 lg:grid-cols-3">
          {RUNTIMES.map((r, i) => (
            <Reveal key={r.id} index={Math.min(i + 1, 4)}>
              <div
                className="h-full bg-surface-1 px-6 py-7"
                style={{ "--hue": r.hue } as CSSProperties}
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-hue" aria-hidden="true" />
                  <span className="mono-tiny text-hue">{r.role}</span>
                </div>
                {/* Laravel is set larger on purpose: it is the specialisation,
                    and three identically-sized cards would say otherwise. */}
                <h2
                  className={`mt-4 font-inter font-semibold tracking-tight text-foreground ${
                    r.primary ? "text-[1.5rem] sm:text-[1.75rem]" : "text-[1.25rem]"
                  }`}
                >
                  {r.name}
                </h2>
                <p className="type-body mt-3.5 text-muted-foreground">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- capabilities ---- */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="mono-tiny text-hue tabular-nums">01</span>
              <span className="h-px w-8 bg-hue opacity-50" aria-hidden="true" />
              <span className="mono-label text-hue">What I take on</span>
            </div>
            <h2 className="type-h3 mt-5 max-w-2xl text-foreground">
              Seven domains, each with the stack that runs it.
            </h2>
          </Reveal>

          <ul className="mt-10 border-t border-hairline/[0.08]">
            {CAPABILITIES.map((c, i) => (
              <Reveal as="li" key={c.id} index={Math.min(i + 1, 4)}>
                <div
                  className="group border-b border-hairline/[0.08] py-8"
                  style={{ "--hue": c.hue } as CSSProperties}
                >
                  <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                      <div className="flex items-baseline gap-3">
                        <span className="mono-tiny tabular-nums text-hue">{c.n}</span>
                        <h3 className="font-inter text-[17px] font-medium tracking-tight text-foreground">
                          {c.title}
                        </h3>
                      </div>
                      <p className="mono-tiny mt-2.5 pl-9 text-subtle">
                        {RUNTIME_LABEL[c.runtime]}
                      </p>
                    </div>

                    <div className="lg:col-span-8">
                      <p className="type-body max-w-2xl text-muted-foreground">{c.summary}</p>

                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                        {c.stack.map((t) => (
                          <span key={t} className="mono-tiny text-subtle">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Only the four domains with a real page link out. */}
                      {c.href && (
                        <Link
                          to={c.href}
                          className="mt-6 inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm font-medium text-hue"
                        >
                          <span className="hover-underline">Read the detail</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* ---- who these are for ----

            Moved here from the home page. The question "is this you?" is the
            same question this page exists to answer, and on the home page it
            sat between the process section and pricing as a long read that
            /book already summarises. */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="chip-hue">
                <span className="mono-tiny tabular-nums opacity-70">02</span>
                <span className="mono-label">Who these are for</span>
              </span>
            </div>
            <h2 className="type-h3 mt-5 max-w-2xl text-foreground">
              Four situations that account for most of the work.
            </h2>
            <p className="type-lead mt-5 max-w-2xl text-muted-foreground">
              If one of these is uncomfortably familiar, that is the conversation
              worth having.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.08] bg-hairline/[0.06] lg:grid-cols-2">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.n} index={Math.min(i + 1, 4)} variant="fade">
                <div className="h-full bg-surface-1 p-7 lg:p-9">
                  <div className="flex items-center gap-3">
                    <span className="mono-tiny tabular-nums text-hue">{a.n}</span>
                    <span className="mono-tiny text-subtle">{a.who}</span>
                  </div>

                  <p className="mt-5 font-display text-2xl italic leading-[1.25] text-foreground lg:text-[1.65rem]">
                    “{a.ask}”
                  </p>

                  <dl className="mt-7 space-y-5 border-t border-hairline/[0.07] pt-6">
                    <div>
                      <dt className="mono-tiny text-subtle">The problem</dt>
                      <dd className="mt-2 font-inter text-[13.5px] leading-relaxed text-muted-foreground">
                        {a.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="mono-tiny text-hue">What I do about it</dt>
                      <dd className="mt-2 font-inter text-[13.5px] leading-relaxed text-muted-foreground">
                        {a.solve}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---- close: one action ---- */}
        <Reveal>
          <div className="mt-20 border-t border-hairline/[0.08] pt-14 lg:mt-24">
            <h2 className="type-h3 max-w-xl text-foreground">
              Not sure which of these your problem is?
            </h2>
            <p className="type-lead mt-5 max-w-xl text-muted-foreground">
              That is a normal reason to book. Describe the symptom and I will tell you
              which layer it lives in.
            </p>
            <div className="mt-9">
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: "services" })}
              >
                Book an Architecture Call
              </CTA>
            </div>
          </div>
        </Reveal>
      </div>
    </main>

    <Suspense fallback={<div className="py-20" />}>
      <Footer />
    </Suspense>
  </div>
);

export default Services;
