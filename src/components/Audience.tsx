import type { CSSProperties } from "react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import { AUDIENCES } from "@/data/audiences";
import CTA from "@/components/system/CTA";


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
    company: "Solutionszilla",
  },
];

/**
 * WHO I WORK WITH — framed as a diagnosis rather than a list of personas.
 * Each panel leads with the question the reader is already asking themselves.
 */
const Audience = () => (
  <section
    id="clients"
    className="wash band band-edge relative scroll-mt-24 py-24 lg:py-32"
    style={{
      "--hue": "var(--hue-interface)",
      "--hue-2": "var(--hue-ai)",
      "--wash-x": "80%",
      "--wash-y": "6%",
    } as CSSProperties}
  >
    <div className="container mx-auto">
      <SectionHeader
        index="07"
        eyebrow="Client feedback"
        title="What the people who hired me say."
        lead="Named, attributable, and tied to systems listed on this page. Nothing here is anonymous or reconstructed."
      />

      <div className="mt-14 lg:mt-20">
        <ul className="grid grid gap-px overflow-hidden bg-hairline/[0.06] lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} index={i} variant="fade">
              <figure className="flex h-full flex-col bg-background p-7 lg:p-8">
                <blockquote className="flex-1">
                  <p className="font-inter text-[14.5px] leading-[1.75] text-muted-foreground">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-7 border-t border-hairline/[0.07] pt-5">
                  <div className="font-inter text-sm font-medium text-foreground">
                    {t.name}
                  </div>
                  <div className="mono-tiny mt-2 text-subtle">
                    {t.role} · {t.company}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Audience;
