import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/system/CountUp";
import Reveal from "@/components/system/Reveal";
import { METRICS, PLATFORM_PROOF } from "@/data/site";

/**
 * PROOF: the numbers directly under the hero. Large figures with the unit in
 * the accent colour; the two platform tiles link to the public profiles, so
 * every figure here is checkable in one click.
 */

/** "5+" → ["5", "+"], "20" → ["20", ""] */
const split = (v: string) => {
  const m = v.match(/^([\d.,]+)(.*)$/);
  return m ? [m[1], m[2]] : [v, ""];
};

const Cell = ({ value, unit, label, note }: { value: string; unit: string; label: string; note: string }) => (
  <>
    <div className="flex items-start font-inter text-[2.75rem] font-semibold leading-none tracking-[-0.035em] text-foreground sm:text-[3.5rem]">
      <CountUp value={value} />
      {unit && <span className="ml-0.5 text-[0.5em] font-medium leading-none text-primary">{unit}</span>}
    </div>
    <div className="mt-3 font-inter text-sm text-foreground/90">{label}</div>
    <div className="mt-1 font-inter text-[13px] text-subtle">{note}</div>
  </>
);

const ProofStrip = () => (
  <section aria-label="Track record" className="relative border-y border-hairline/[0.08]">
    <div className="container mx-auto">
      <Reveal as="dl" className="grid grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => {
          const [v, unit] = split(m.value);
          return (
            <div key={m.label} className={`px-1 py-9 sm:px-6 lg:py-12 ${i % 2 ? "border-l border-hairline/[0.08]" : ""}`}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <Cell value={v} unit={unit} label={m.label} note={m.note} />
              </dd>
            </div>
          );
        })}
        {PLATFORM_PROOF.map((p, i) => (
          <div
            key={p.name}
            className={`border-t border-hairline/[0.08] lg:border-t-0 ${i % 2 ? "border-l" : "lg:border-l"} border-hairline/[0.08]`}
          >
            <dt className="sr-only">{p.name} rating</dt>
            <dd>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full px-1 py-9 sm:px-6 lg:py-12"
              >
                <ArrowUpRight
                  className="absolute right-2 top-9 h-4 w-4 text-subtle transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground sm:right-6 lg:top-12"
                  aria-hidden="true"
                />
                <Cell value={p.rating} unit="★" label={`${p.name} · ${p.status}`} note={p.reviews} />
              </a>
            </dd>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export default ProofStrip;
