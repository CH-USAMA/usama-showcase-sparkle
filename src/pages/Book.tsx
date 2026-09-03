import { lazy, Suspense } from "react";
import type { CSSProperties } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import Reveal from "@/components/system/Reveal";
import { SITE_URL } from "@/data/site";

const CalendlyEmbed = lazy(() => import("@/components/CalendlyEmbed"));

/* ---------------------------------------------------------------------------
   /book — the destination of the site's one primary action.

   Rebuilt onto the same system as the landing page: left-aligned indexed
   headers, hairline rules, mono labels, Reveal entrances. No new motion and no
   new effects — every primitive here already existed.

   The page answers the four questions a reader has between clicking "Book an
   Architecture Call" and picking a slot, and every answer is drawn from copy
   the site already publishes: the audience panels, the process section, and
   the engagement tiers. Nothing here is a new claim.
--------------------------------------------------------------------------- */


/**
 * The problems people actually arrive with. Personas told a reader which box
 * they fell into; these tell them whether their problem is one I take. Every
 * line maps to a capability in capabilities.ts, so nothing here is a new claim.
 */
const FOR = [
  "Scaling a Laravel application that has outgrown its foundations",
  "Building a SaaS backend: multi-tenancy, billing, roles, audit trails",
  "Introducing AI into an existing product without bolting it on",
  "Designing real-time infrastructure: WebSockets, presence, live state",
  "Building or fixing VoIP and Asterisk systems",
  "Automating manual back-office work that runs unattended",
  "Deciding between Laravel, Node.js and Python for a given layer",
];

const AGENDA = [
  {
    n: "01",
    title: "The system as it stands",
    body: "What you have running today, who uses it, and what it has to keep doing while anything changes.",
  },
  {
    n: "02",
    title: "The problem and the constraints",
    body: "What is actually breaking, slowing down, or costing money, and what you cannot change: budget, team, deadline, the parts nobody is allowed to touch.",
  },
  {
    n: "03",
    title: "The existing architecture",
    body: "Where it fails under load and which parts are worth keeping. Bring a diagram if you have one; a description is fine if you do not.",
  },
  {
    n: "04",
    title: "The approaches worth considering",
    body: "Usually more than one, with the trade-off of each stated plainly rather than a single recommendation presented as the only option.",
  },
  {
    n: "05",
    title: "The recommended next step",
    body: "One opinionated answer. Sometimes a sprint, sometimes one query and an index, sometimes that you do not need me.",
  },
];

const AFTER = [
  { k: "Within 24 hours", v: "If a project makes sense, you get a written scope, timeline, and price." },
  { k: "If it doesn't", v: "You still leave with the technical next step, and I'll say so plainly rather than quote you anyway." },
  { k: "Before anything sensitive", v: "NDAs are signed before architecture, codebases, or business detail are shared." },
];

const faqs = [
  {
    q: "What does an engagement cost?",
    a: "Sprint work starts from $1,500 for a scoped one-to-two week piece. Build engagements start from $4,500, and ongoing retainers from $3,500 a month. Exact scope and price are quoted after this call, once the problem is clear. The call itself is free.",
  },
  {
    q: "Is the call really free, and is it a sales call?",
    a: "It is free and there is no pitch. You bring the Laravel scaling, automation, VoIP, or AI integration problem, and you leave with an opinionated technical next step whether or not we end up working together.",
  },
  {
    q: "How do you decide between Laravel, Node.js and Python on a system?",
    a: "By the shape of the problem. Laravel and PHP carry the application core: domain logic, APIs, queues and billing, with MySQL or PostgreSQL and Redis behind them. Node.js and TypeScript take the event-driven edge: WebSockets, socket services, integrations. Python takes the AI and data work: RAG pipelines, agents, processing. Asterisk and SIP handle telephony.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. NDAs are signed before any sensitive architecture, codebase, or business detail is shared.",
  },
  {
    q: "What if I don't know what the problem is yet?",
    a: "That is a normal reason to book. Describing the symptom is enough to start narrowing it down on the call: slow requests, failing jobs, a release that keeps breaking, or a manual process nobody wants to own.",
  },
];

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/book#webpage`,
  url: `${SITE_URL}/book`,
  name: "Book an Architecture Call | Usama Munawar",
  description:
    "Book a free 30-minute architecture call with Usama Munawar, a backend systems engineer working in Laravel, Node.js, Python, VoIP and automation.",
  inLanguage: "en",
  primaryImageOfPage: `${SITE_URL}/og-image.png`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Section heading treatment, matching SectionHeader but scoped to this page. */
const Head = ({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) => (
  <Reveal>
    <div className="flex items-center gap-3">
      <span className="mono-tiny text-hue tabular-nums">{index}</span>
      <span className="h-px w-8 bg-hue opacity-50" aria-hidden="true" />
      <span className="mono-label text-hue">{eyebrow}</span>
    </div>
    <h2 className="type-h3 mt-5 max-w-2xl text-foreground">{title}</h2>
  </Reveal>
);

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book an Architecture Call | Usama Munawar"
        description="A free 30-minute architecture call. Bring a Laravel scaling, automation, VoIP or AI integration problem and leave with an opinionated next step."
        canonical={`${SITE_URL}/book`}
        jsonLd={[bookJsonLd, faqJsonLd]}
      />
      <Navbar />

      <main
        id="main"
        className="wash pb-24 pt-32 lg:pt-40"
        style={{
          "--hue": "var(--hue-backend)",
          "--hue-2": "var(--hue-realtime)",
          "--wash-x": "22%",
          "--wash-y": "0%",
        } as CSSProperties}
      >
        <div className="container mx-auto">
          {/* ---- header ---- */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="mono-label text-hue">Architecture call</span>
            </div>
            <h1 className="type-h2 mt-6 max-w-3xl text-foreground">
              Bring the problem. Leave with the next step.
            </h1>
            <p className="type-lead mt-7 max-w-2xl text-muted-foreground">
              Thirty minutes on your architecture. What is breaking, what it will cost to
              fix, and whether it is worth fixing yet. No pitch, and no obligation to
              hire me at the end of it.
            </p>
          </Reveal>

          <Reveal index={1}>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-hairline/[0.08] py-5">
              {[
                { k: "Length", v: "30 minutes" },
                { k: "Cost", v: "Free" },
                { k: "Format", v: "Video call" },
                { k: "Confidentiality", v: "NDA on request" },
              ].map((m) => (
                <div key={m.k}>
                  <dt className="mono-tiny text-subtle">{m.k}</dt>
                  <dd className="mt-1.5 font-inter text-[13.5px] text-foreground">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ---- who / agenda ---- */}
          <div className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Head
                index="01"
                eyebrow="Who this is for"
                title="Bring one of these and the call will be useful."
              />
              <ul className="mt-9 border-t border-hairline/[0.08]">
                {FOR.map((item, i) => (
                  <Reveal as="li" key={item} index={Math.min(i + 1, 4)}>
                    <div className="flex gap-3 border-b border-hairline/[0.08] py-4">
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-px w-3 shrink-0 bg-hue"
                      />
                      <span className="type-body text-muted-foreground">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal>
                <p className="mono-tiny mt-7 leading-[1.7] text-subtle">
                  If your problem is not on this list, it is still worth asking.
                  The worst outcome is a short answer pointing you somewhere better.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Head index="02" eyebrow="What we discuss" title="Five things, in this order." />
              <ol className="mt-9 border-t border-hairline/[0.08]">
                {AGENDA.map((s, i) => (
                  <Reveal as="li" key={s.n} index={Math.min(i + 1, 4)}>
                    <div className="border-b border-hairline/[0.08] py-6">
                      <div className="flex items-baseline gap-3">
                        <span className="mono-tiny tabular-nums text-hue">{s.n}</span>
                        <h3 className="font-inter text-[15px] font-medium text-foreground">
                          {s.title}
                        </h3>
                      </div>
                      <p className="type-body mt-2.5 pl-9 text-muted-foreground">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          {/* ---- after ---- */}
          <div className="mt-20 lg:mt-24">
            <Head index="03" eyebrow="After the call" title="What you get, either way." />
            <dl className="mt-9 grid gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] sm:grid-cols-3">
              {AFTER.map((a, i) => (
                <Reveal key={a.k} index={Math.min(i + 1, 4)}>
                  <div className="h-full bg-surface-1 px-5 py-6">
                    <dt className="mono-tiny text-hue">{a.k}</dt>
                    <dd className="type-body mt-3 text-muted-foreground">{a.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* ---- booking ---- */}
          <div className="mt-20 lg:mt-24">
            <Head index="04" eyebrow="Pick a time" title="Choose a slot that suits you." />
            <div className="mt-9 overflow-hidden rounded-xl border border-hairline/[0.09]">
              <Suspense
                fallback={<div className="h-[720px] w-full bg-surface-1/50" aria-hidden="true" />}
              >
                <CalendlyEmbed height={720} lazy={false} />
              </Suspense>
            </div>
          </div>

          {/* ---- faq ---- */}
          <section className="mt-20 lg:mt-24" aria-labelledby="book-faq-heading">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="mono-tiny text-hue tabular-nums">05</span>
                <span className="h-px w-8 bg-hue opacity-50" aria-hidden="true" />
                <span className="mono-label text-hue">Before you book</span>
              </div>
              <h2 id="book-faq-heading" className="type-h3 mt-5 max-w-2xl text-foreground">
                The questions people actually ask.
              </h2>
            </Reveal>

            <div className="mt-9 border-t border-hairline/[0.08]">
              {faqs.map((f, i) => (
                <Reveal key={f.q} index={Math.min(i + 1, 4)}>
                  <details className="group border-b border-hairline/[0.08]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-inter text-[15px] font-medium text-foreground transition-colors duration-standard hover:text-hue">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-lg leading-none text-hue transition-transform duration-standard group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="type-body max-w-3xl pb-6 text-muted-foreground">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
