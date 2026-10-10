import { useMemo, useState } from "react";
import { useEnter } from "@/lib/boot";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import DotGlobe from "@/components/fx/DotGlobe";
import { useProjects } from "@/lib/content/projects";

/** Real, attributed feedback from named clients. Nothing here is placeholder. */
const TESTIMONIALS = [
  {
    quote:
      "Usama rebuilt our booking and dispatch flow and it simply stopped breaking. Bookings that used to fail at peak hours now go through cleanly, and the driver side is far easier to manage. He explained every decision in plain language and delivered on the dates he promised.",
    name: "Shahrukh",
    role: "Owner",
    company: "Galway Taxis",
  },
  {
    quote:
      "We came to Usama with a half-finished store and a lot of doubts. He tightened the backend, fixed the checkout and made the whole site fast. Orders now come through reliably and I can manage the catalogue myself without calling a developer every week.",
    name: "David Gregathy",
    role: "Founder",
    company: "Marian Holy Art",
  },
  {
    quote:
      "Usama is the engineer we hand the hard backend work to. Laravel systems, Asterisk call flows, automation pipelines, he takes ownership from architecture to deployment. Clean code, clear communication, and clients keep asking for him by name.",
    name: "Shehroz Kunwar",
    role: "Director",
    company: "Solutions Zilla",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * CLIENT FEEDBACK: a turning globe of dots behind two glass cards. The left
 * card names clients, taken from the projects themselves (generic entries
 * like "SaaS startup (NDA)" are left out); the right card is a manual
 * carousel, never auto-advancing, with the quote announced politely.
 */
const Audience = () => {
  const { caseStudies, projectsById } = useProjects();
  const [i, setI] = useState(0);
  const enter = useEnter();
  const t = TESTIMONIALS[i];

  // One entry per client: page entries carry a "(Country)" suffix and card
  // entries do not, and spellings vary ("Solutions Zilla" / "Solutionszilla"),
  // so names are compared without the suffix, case, spaces or punctuation.
  const clients = useMemo(() => {
    const seen = new Map<string, string>();
    for (const raw of [...caseStudies.map((c) => c.client), ...Object.values(projectsById).map((p) => p.client)]) {
      const name = raw?.replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (!name || /startup|company|nda|agency/i.test(name)) continue;
      const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seen.has(key)) seen.set(key, name);
    }
    return [...seen.values()];
  }, [caseStudies, projectsById]);

  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="clients" className="relative isolate scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <DotGlobe className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(980px,140vw)] -translate-x-1/2 -translate-y-[44%] [mask-image:radial-gradient(circle,#000_52%,transparent_74%)]" />

      <div className="container mx-auto">
        <SectionHeader
          align="center"
          eyebrow="Client feedback"
          title={
            <>
              What the people who hired me <em>say.</em>
            </>
          }
          lead="Named, attributable, and tied to systems listed on this page."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:mt-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)]">
          <Reveal variant="fade">
            <div className="h-full rounded-2xl border border-hairline/[0.1] bg-surface-1/70 p-7 backdrop-blur-xl lg:p-9">
              <p className="mono-tiny text-subtle">Clients</p>
              <ul className="mt-5 space-y-3.5">
                {clients.map((c) => (
                  <li key={c} className="flex items-center gap-3 font-inter text-[15px] text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-inter text-sm text-subtle">and more through Upwork and Fiverr.</p>
            </div>
          </Reveal>

          <Reveal variant="fade" index={1}>
            <figure className="relative flex h-full flex-col rounded-2xl border border-hairline/[0.1] bg-surface-1/70 p-7 backdrop-blur-xl lg:p-10">
              <div className="flex items-start justify-between">
                <span className="border-b border-hairline/[0.16] pb-2 font-inter text-sm tabular-nums text-subtle">
                  <span className="text-foreground">{pad(i + 1)}</span> / {pad(TESTIMONIALS.length)}
                </span>
                <Quote className="h-9 w-9 fill-hairline/[0.12] text-transparent" aria-hidden="true" />
              </div>

              <blockquote className="mt-8 flex-1" aria-live="polite">
                <p
                  key={i}
                  className="enter font-inter text-xl font-medium leading-[1.45] tracking-tight text-foreground lg:text-[1.65rem]"
                  {...enter()}
                >
                  “{t.quote}”
                  <span className="sr-only">
                    {" "}
                    {t.name}, {t.role}, {t.company}
                  </span>
                </p>
              </blockquote>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <figcaption className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline/[0.12] bg-surface-2 font-inter text-base font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-inter text-sm font-semibold uppercase tracking-wide text-foreground">{t.name}</span>
                    <span className="block font-inter text-sm text-muted-foreground">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline/[0.14] text-foreground transition-colors duration-standard hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline/[0.14] text-foreground transition-colors duration-standard hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Audience;
