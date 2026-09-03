import CountUp from "@/components/system/CountUp";
import { METRICS, PLATFORM_PROOF } from "@/data/site";
import Reveal from "@/components/system/Reveal";

/**
 * PROOF — the credibility band directly under the hero.
 *
 * Presented as an instrument readout rather than four cards: hairline dividers,
 * tabular figures, mono labels. Every number here is one already published on
 * the linked Upwork and Fiverr profiles.
 */
const ProofStrip = () => {
  return (
    <section
      aria-label="Track record"
      className="relative border-y border-hairline/[0.08] bg-surface-1/40"
    >
      <div className="container mx-auto">
        {/* Reveal is the site's own primitive and no longer carries a
            motion library, so this section stops pulling framer-motion into
            the entry chunk. Same fade, same stagger. */}
        <Reveal as="dl" className="grid grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`group relative px-1 py-8 sm:px-6 lg:py-10
                ${i % 2 === 1 ? "border-l border-hairline/[0.07]" : ""}
                ${i > 1 ? "border-t border-hairline/[0.07] lg:border-t-0" : ""}
                ${i > 0 ? "lg:border-l lg:border-hairline/[0.07]" : ""}`}
            >
              {/* hover trace along the top edge */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-primary/70 transition-[width] duration-large ease-out-expo group-hover:w-full"
              />
              <dd className="font-inter text-[2rem] font-semibold leading-none tracking-tight text-foreground sm:text-[2.75rem]">
                <CountUp value={m.value} />
              </dd>
              <dt className="mono-tiny mt-3.5 text-muted-foreground">{m.label}</dt>
              {/* Always visible. This line is the qualifier that makes the figure
                  above checkable ("Upwork · Fiverr · direct"), and it was
                  hover-only — so the number shipped without its own context to
                  every reader who never moused over it, and to every phone. */}
              <p className="mt-2 font-inter text-[11px] leading-none text-subtle lg:mt-2.5">
                {m.note}
              </p>
            </div>
          ))}
        </Reveal>

        {/* platform verification, the numbers above are checkable, so link them */}
        <Reveal
          as="div"
          index={1}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline/[0.07] py-5"
        >
          <span className="mono-tiny text-subtle">Verified on</span>
          {PLATFORM_PROOF.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[24px] items-center gap-2.5 py-1 font-inter text-[13px] text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <span className="font-medium text-foreground/90">{p.name}</span>
              <span className="mono-tiny text-primary/80">{p.status}</span>
              <span className="text-subtle">
                {p.rating} · {p.reviews}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-3 bg-hairline/[0.2] transition-all duration-standard group-hover:w-5 group-hover:bg-primary/60"
              />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ProofStrip;
