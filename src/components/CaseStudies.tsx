import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import ArchitectureFlow from "@/components/system/ArchitectureFlow";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/data/caseStudies";

/** Registration marks — the small corner ticks on a technical drawing. */
const Corners = () => (
  <>
    {[
      "left-0 top-0 border-l border-t",
      "right-0 top-0 border-r border-t",
      "left-0 bottom-0 border-l border-b",
      "right-0 bottom-0 border-r border-b",
    ].map((pos) => (
      <span
        key={pos}
        aria-hidden="true"
        className={`pointer-events-none absolute h-3 w-3 border-hue ${pos}`}
      />
    ))}
  </>
);

const Dossier = ({ study, flipped }: { study: CaseStudy; flipped: boolean }) => {
  const meta = [
    study.client && { k: "Client", v: study.client },
    study.year && { k: "Year", v: study.year },
    { k: "Role", v: study.role },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article
      className="relative border-t border-hairline/[0.08] py-16 lg:py-24"
      style={{ "--hue": study.hue } as CSSProperties}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ---- identity column ---- */}
        <div className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="mono-tiny tabular-nums text-hue">{study.n}</span>
              <span className="h-px w-6 bg-hue opacity-50" aria-hidden="true" />
              <span className="mono-tiny text-muted-foreground">{study.category}</span>
            </div>
          </Reveal>

          <Reveal index={1}>
            <h3 className="type-h2 mt-5 text-foreground">{study.title}</h3>
          </Reveal>

          {/* Headline outcome, where a verified one exists. A dossier without
              one drops the block entirely rather than showing a placeholder. */}
          {study.metric && (
            <Reveal index={2}>
              <div className="mt-7 flex items-baseline gap-4 border-l-2 border-hue pl-5">
                <span className="font-inter text-[2.75rem] font-semibold leading-none tracking-tight text-hue sm:text-[3.5rem]">
                  {study.metric.value}
                </span>
                <span className="mono-tiny max-w-[9rem] leading-[1.5] text-muted-foreground">
                  {study.metric.label}
                </span>
              </div>
            </Reveal>
          )}

          <Reveal index={3}>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="mono-tiny text-subtle">{m.k}</dt>
                  <dd className="mt-2 font-inter text-[13px] leading-snug text-muted-foreground">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              {study.detailPath && (
                <CTA to={study.detailPath} tone="ghost" size="sm" arrow>
                  Read the case study
                </CTA>
              )}
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                >
                  <span className="hover-underline">Visit live system</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        {/* ---- visual ---- */}
        <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
          <Reveal variant="fade">
            <figure className="relative">
              <div className="relative overflow-hidden rounded-lg border border-hairline/[0.09] bg-surface-1">
                <Corners />
                <img
                  src={study.image}
                  alt={`${study.title} — ${study.category}`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover opacity-90 transition-[opacity,transform] duration-large ease-out-expo hover:scale-[1.015] hover:opacity-100"
                />
                {/* spec bar */}
                <figcaption className="flex items-center justify-between gap-4 border-t border-hairline/[0.08] bg-background/70 px-4 py-2.5 backdrop-blur-sm">
                  <span className="mono-tiny leading-[1.7] text-subtle sm:truncate">
                    {study.stack.join(" · ")}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary anim-status"
                    aria-hidden="true"
                  />
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* ---- problem / architecture / result ---- */}
      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h4 className="mono-tiny text-primary">Problem</h4>
            <p className="type-body mt-4 text-muted-foreground">{study.problem}</p>
          </Reveal>
          <Reveal index={1}>
            <h4 className="mono-tiny mt-9 text-primary">Result</h4>
            <p className="type-body mt-4 text-muted-foreground">{study.result}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <h4 className="mono-tiny text-primary">Architecture</h4>
            <p className="type-body mt-4 text-muted-foreground">{study.approach}</p>
          </Reveal>
          <Reveal index={1}>
            <ArchitectureFlow
              stages={study.flow}
              caption="Request path"
              orientation="row"
              className="mt-8"
            />
          </Reveal>
        </div>
      </div>
    </article>
  );
};

/**
 * SELECTED SYSTEMS — the section the whole page is built to deliver a reader to.
 *
 * Each entry is presented as a dossier: identity, outcome, metadata, visual,
 * then problem / architecture / result with the architecture animated as a
 * live request path. A skill list tells someone what you know; this tells them
 * what you decided.
 */
const CaseStudies = () => (
  <section
    id="work"
    className="wash relative scroll-mt-24 py-24 lg:py-32"
    style={{
      "--hue": "var(--hue-ai)",
      "--hue-2": "var(--hue-automation)",
      "--wash-x": "76%",
      "--wash-y": "4%",
    } as CSSProperties}
  >
    {/* faint field so the section reads as a distinct plane */}
    <div
      className="grid-field-fine mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 opacity-60"
      aria-hidden="true"
    />
    <div className="container mx-auto">
      <SectionHeader
        index="03"
        eyebrow="Selected systems"
        title={
          <>
            Six systems, and the
            <br className="hidden sm:block" /> decisions behind them.
          </>
        }
        lead="Problem, architecture, result. The parts a client actually pays for, rather than a grid of screenshots."
      />

      <div className="mt-14 lg:mt-20">
        {caseStudies.map((study, i) => (
          <Dossier key={study.id} study={study} flipped={i % 2 === 1} />
        ))}
      </div>

      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-hairline/[0.08] pt-10">
          <p className="type-body max-w-md text-muted-foreground">
            The full archive adds transport, quarrying, hardware retail, and
            software-house platforms.
          </p>
          <CTA to="/projects" tone="ghost" arrow>
            Browse all projects
          </CTA>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CaseStudies;
