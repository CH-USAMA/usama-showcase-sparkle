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

/** Reused verbatim from the Audience section — same four, same questions. */
const FOR_WHOM = [
  { n: "01", who: "Startup founders", ask: "Will this architecture survive our first real traffic?" },
  { n: "02", who: "SaaS teams", ask: "Why does every feature take three weeks now?" },
  { n: "03", who: "Operations-heavy businesses", ask: "How much of this is a person copying data between tabs?" },
  { n: "04", who: "Communication platforms", ask: "Can anyone here actually debug the dialplan?" },
];

const AGENDA = [
  {
    n: "01",
    title: "The constraint",
    body: "What is actually breaking, slowing down, or costing money. Not the feature list — the bottleneck underneath it.",
  },
  {
    n: "02",
    title: "The current architecture",
    body: "What you have now, where it fails under load, and which parts are worth keeping. Bring a diagram if you have one; a description is fine if you don't.",
  },
  {
    n: "03",
    title: "The shortest path to a fix",
    body: "An opinionated next step, with the trade-off stated. Sometimes that is a sprint, sometimes it is one query and an index, sometimes it is that you do not need me.",
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
    a: "Sprint work starts from $1,500 for a scoped one-to-two week piece. Build engagements start from $4,500, and ongoing retainers from $3,500 a month. Exact scope and price are quoted after this call, once the problem is clear — the call itself is free.",
  },
  {
    q: "Is the call really free, and is it a sales call?",
    a: "It is free and there is no pitch. You bring the Laravel scaling, automation, VoIP, or AI integration problem, and you leave with an opinionated technical next step whether or not we end up working together.",
  },
  {
    q: "How do you decide between Laravel, Node.js and Python on a system?",
    a: "By the shape of the problem. Laravel and PHP carry the application core — domain logic, APIs, queues, billing — with MySQL or PostgreSQL and Redis behind them. Node.js and TypeScript take the event-driven edge: WebSockets, socket services, integrations. Python takes the AI and data work: RAG pipelines, agents, processing. Asterisk and SIP handle telephony.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. NDAs are signed before any sensitive architecture, codebase, or business detail is shared.",
  },
  {
    q: "What if I don't know what the problem is yet?",
    a: "That is a normal reason to book. Describing the symptom — slow requests, failing jobs, a release that keeps breaking, a manual process nobody wants to own — is enough to start narrowing it down on the call.",
  },
];

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/book#webpage`,
  url: `${SITE_URL}/book`,
  name: "Book an Architecture Call — Usama Munawar",
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
        title="Book an Architecture Call — Usama Munawar"
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
              Thirty minutes on your architecture — what is breaking, what it will cost to
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
              <Head index="01" eyebrow="Who books this" title="You are probably asking one of these." />
              <ul className="mt-9 border-t border-hairline/[0.08]">
                {FOR_WHOM.map((a, i) => (
                  <Reveal as="li" key={a.n} index={Math.min(i + 1, 4)}>
                    <div className="border-b border-hairline/[0.08] py-5">
                      <div className="flex items-baseline gap-3">
                        <span className="mono-tiny tabular-nums text-hue">{a.n}</span>
                        <span className="font-inter text-[14px] font-medium text-foreground">
                          {a.who}
                        </span>
                      </div>
                      <p className="mt-2 pl-9 font-inter text-[13.5px] leading-snug text-muted-foreground">
                        “{a.ask}”
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <Head index="02" eyebrow="What we cover" title="Three things, in this order." />
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
