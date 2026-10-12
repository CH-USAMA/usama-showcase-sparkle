import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { Input } from "@/components/ui/input";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { useEnter } from "@/lib/boot";
import {
  HABITS,
  LEARN_AI_DESCRIPTION,
  LEARN_AI_PUBLISHED,
  LEARN_AI_TITLE,
  PROMPT_GROUPS,
  PROMPT_PARTS,
  SAFETY,
  STRONG_PROMPT,
  WEAK_PROMPT,
} from "@/data/learnAI";

/* ---------------------------------------------------------------------------
   /learn-ai: a free guide for people who want to use AI day to day, not
   build with it. Top of the funnel on purpose: it ends with the side offers
   (virtual assistant, idea to launch) for readers who would rather hand the
   work over.
--------------------------------------------------------------------------- */

const url = `${SITE_URL}/learn-ai`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to use AI in daily life",
    description: LEARN_AI_DESCRIPTION,
    url,
    datePublished: LEARN_AI_PUBLISHED,
    dateModified: LEARN_AI_PUBLISHED,
    author: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Learn AI", item: url },
    ],
  },
];

const NEXT_STEPS = [
  {
    to: "/virtual-assistant",
    title: "Hand the tasks over",
    text: "Customer replies, content, social media and website updates, done by someone who uses these tools every day.",
  },
  {
    to: "/services/mvp-development",
    title: "Turn an idea into an app",
    text: "Have an idea for an app or tool? Get a working first version in front of real users in weeks.",
  },
  {
    to: "/services/ai-integration",
    title: "Put AI inside your business",
    text: "Support assistants, document search and automations built on your own data, with costs you can predict.",
  },
];

/** Copies a prompt; "Copied" is announced to screen readers. */
const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent("prompt_copy", { prompt: label });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, old browser): the prompt is still selectable.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy prompt: ${label}`}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-hairline/[0.12] px-2.5 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.24] hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

const LearnAI = () => {
  const enter = useEnter();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={LEARN_AI_TITLE}
        description={LEARN_AI_DESCRIPTION}
        canonical={url}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main id="main" className="fx-glow-top relative pb-24 pt-32 lg:pt-40">
        <div className="container mx-auto">
          {/* ---- header ---- (h1 is the LCP element: painted, never faded in) */}
          <div className="max-w-3xl">
            <span className="chip-hue">
              <span className="mono-label">Free guide</span>
            </span>
            <h1 className="type-display mt-5 text-foreground">How to use AI in daily life</h1>
            <p className="enter-lift type-lead mt-6 text-muted-foreground" {...enter()}>
              AI assistants can now save most people an hour a day, but only if you know what to ask. This
              guide covers how to ask, over twenty prompts you can copy for everyday tasks, and the few
              things you should never hand to an AI.
            </p>
            <p className="enter-lift mt-5 font-inter text-sm text-subtle" {...enter(80)}>
              By Usama Munawar, full-stack engineer and daily AI user
            </p>
          </div>

          <Reveal index={1}>
            <nav aria-label="On this page" className="mt-12 max-w-3xl border-t border-hairline/[0.08] pt-6">
              <p className="mono-tiny text-subtle">On this page</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[{ id: "start", title: "Getting started" }, { id: "how-to-ask", title: "How to ask" }, ...PROMPT_GROUPS, { id: "safety", title: "Staying safe" }].map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex min-h-9 items-center rounded-md bg-surface-2 px-3 font-inter text-xs font-medium text-foreground transition-colors duration-standard hover:text-primary"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <div className="mt-16 max-w-3xl space-y-0">
            {/* ---- start ---- */}
            <Reveal>
              <section id="start" className="scroll-mt-28 py-10 pt-0">
                <h2 className="type-h3 text-foreground">Start with one assistant</h2>
                <p className="type-body measure mt-4 text-muted-foreground">
                  ChatGPT (from OpenAI), Claude (from Anthropic) and Gemini (from Google) all have free versions that
                  handle everything in this guide, on the web and as phone apps. The differences between them matter
                  far less than the habit. Pick one, keep it open in a browser tab or on your phone, and reach for it
                  whenever you face a blank page, a long document or a decision.
                </p>
                <p className="type-body measure mt-4 text-muted-foreground">
                  Most people give up on AI after asking one vague question and getting a vague answer back. The fix
                  is not a better tool. It is a better question.
                </p>
              </section>
            </Reveal>

            {/* ---- how to ask ---- */}
            <Reveal>
              <section id="how-to-ask" className="scroll-mt-28 border-t border-hairline/[0.08] py-10">
                <h2 className="type-h3 text-foreground">How to ask: the four-part prompt</h2>
                <p className="type-body measure mt-4 text-muted-foreground">
                  A good request has four parts. You do not need all four every time, but the more you include, the
                  less the AI has to guess.
                </p>
                <dl className="mt-7 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.1] bg-hairline/[0.08] sm:grid-cols-2">
                  {PROMPT_PARTS.map((p, i) => (
                    <div key={p.label} className="bg-surface-1 p-5">
                      <dt className="font-inter text-sm font-semibold text-foreground">
                        <span className="mr-2 text-primary">{i + 1}.</span>
                        {p.label}
                      </dt>
                      <dd className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{p.text}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="card-surface p-5">
                    <p className="mono-tiny text-subtle">Vague</p>
                    <p className="mt-3 font-inter text-sm leading-relaxed text-muted-foreground">“{WEAK_PROMPT}”</p>
                  </div>
                  <div className="card-surface p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="mono-tiny text-primary">Clear</p>
                      <CopyButton text={STRONG_PROMPT} label="Email to my landlord" />
                    </div>
                    <p className="mt-3 font-inter text-sm leading-relaxed text-foreground">“{STRONG_PROMPT}”</p>
                  </div>
                </div>
                <p className="type-body measure mt-6 text-muted-foreground">
                  Then keep going: “make it friendlier”, “shorter”, “add a subject line”. The first answer is a draft,
                  not the result.
                </p>
              </section>
            </Reveal>
          </div>

          {/* ---- prompt groups ---- */}
          {PROMPT_GROUPS.map((g) => (
            <Reveal key={g.id}>
              <section id={g.id} className="scroll-mt-28 border-t border-hairline/[0.08] py-10">
                <div className="max-w-3xl">
                  <h2 className="type-h3 text-foreground">{g.title}</h2>
                  <p className="type-body measure mt-4 text-muted-foreground">{g.intro}</p>
                </div>
                <ul className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {g.prompts.map((p) => (
                    <li key={p.title} className="card-surface flex flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-inter text-[15px] font-medium text-foreground">{p.title}</h3>
                        <CopyButton text={p.prompt} label={p.title} />
                      </div>
                      <p className="mt-3 font-mono text-[13px] leading-relaxed text-muted-foreground">{p.prompt}</p>
                      {p.note && <p className="mt-4 border-t border-hairline/[0.08] pt-3 font-inter text-xs leading-relaxed text-subtle">{p.note}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}

          <div className="max-w-3xl">
            {/* ---- signup ---- */}
            <Reveal>
              <div className="card-surface mt-6 p-6 sm:p-8">
                <h2 className="font-inter text-xl font-semibold text-foreground">Get new prompts and guides by email</h2>
                <p className="type-body mt-2 text-muted-foreground">
                  Occasional, practical and short: new prompts, tools worth trying, and what is changing in AI, in
                  plain English.
                </p>
                <form
                  action="https://formspree.io/f/mkgzjlde"
                  method="POST"
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                  onSubmit={() => trackEvent("lead_magnet_submit", { resource: "learn-ai" })}
                >
                  <input type="hidden" name="_subject" value="Learn AI guide signup" />
                  <input type="hidden" name="resource" value="learn-ai" />
                  <label htmlFor="learn-ai-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="learn-ai-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="rounded-xl"
                  />
                  <CTA type="submit" size="md" className="shrink-0">
                    Sign me up
                  </CTA>
                </form>
                <p className="mt-4 flex items-center gap-2 font-inter text-xs text-subtle">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Your email is only used for these emails and never shared.
                </p>
              </div>
            </Reveal>

            {/* ---- habits ---- */}
            <Reveal>
              <section className="mt-10 border-t border-hairline/[0.08] py-10">
                <h2 className="type-h3 text-foreground">Habits that get better answers</h2>
                <ul className="mt-6 space-y-3">
                  {HABITS.map((h) => (
                    <li key={h} className="type-body flex gap-3 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* ---- safety ---- */}
            <Reveal>
              <section id="safety" className="scroll-mt-28 border-t border-hairline/[0.08] py-10">
                <h2 className="type-h3 text-foreground">Staying safe</h2>
                <p className="type-body measure mt-4 text-muted-foreground">
                  AI assistants are tools run by companies, and they make mistakes. A few rules cover almost every risk.
                </p>
                <ul className="mt-6 space-y-3">
                  {SAFETY.map((s) => (
                    <li key={s} className="type-body flex gap-3 text-muted-foreground">
                      <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* ---- next steps ---- */}
          <Reveal>
            <section className="border-t border-hairline/[0.08] pt-10">
              <h2 className="type-h3 text-foreground">Want AI working for you, not just with you?</h2>
              <p className="type-body measure mt-4 text-muted-foreground">
                If you would rather hand the work to someone, or build something with AI inside it, this is what I do.
              </p>
              <ul className="mt-7 grid gap-4 md:grid-cols-3">
                {NEXT_STEPS.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      onClick={() => trackEvent("learn_ai_next_step", { to: n.to })}
                      className="card-surface card-surface-hover group flex h-full flex-col p-5"
                    >
                      <span className="flex items-center justify-between gap-3 font-inter text-[15px] font-medium text-foreground">
                        {n.title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-primary" aria-hidden="true" />
                      </span>
                      <span className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{n.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CTA to="/book" size="lg" arrow onClick={() => trackEvent("book_call_click", { location: "learn_ai" })}>
                  Book a free call
                </CTA>
              </div>
            </section>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnAI;
