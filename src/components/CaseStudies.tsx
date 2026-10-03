import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import ArchitectureFlow from "@/components/system/ArchitectureFlow";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/data/caseStudies";

const ProjectCard = ({ study }: { study: CaseStudy }) => {
  return (
    <article
      className="project-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-hairline/[0.12] bg-surface-1"
      style={{ "--hue": study.hue } as CSSProperties}
    >
      <div className="relative overflow-hidden bg-surface-2">
        <img src={study.image} alt={`${study.title} project preview`} width={1200} height={750} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-large ease-out-expo group-hover:scale-[1.045]" />
        <div className="absolute left-4 top-4 chip-hue bg-surface-1/90 backdrop-blur-md"><span className="mono-tiny">{study.category}</span></div>
        <span className="absolute bottom-0 left-0 h-1 w-24 bg-hue transition-[width] duration-large group-hover:w-full" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4"><span className="mono-tiny text-hue">{study.n} / {study.year || "Project"}</span>{study.metric && <span className="mono-tiny text-hue">{study.metric.value} · {study.metric.label}</span>}</div>
        <h3 className="mt-4 font-inter text-2xl font-semibold leading-tight text-foreground">{study.title}</h3>
        <p className="mt-3 line-clamp-2 font-inter text-sm leading-relaxed text-muted-foreground">{study.result}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">{study.stack.slice(0, 4).map(s => <span key={s} className="rounded border border-hairline/[0.12] px-2 py-1 font-mono text-[10px] text-muted-foreground">{s}</span>)}</div>
        <details className="project-details mt-6 border-t border-hairline/[0.1] pt-4">
          <summary className="cursor-pointer font-inter text-sm font-medium text-hue">Inside the build</summary>
          <dl className="mt-5 space-y-4 font-inter text-sm leading-relaxed text-muted-foreground">
            {study.client && <div><dt className="mono-tiny text-hue">Client</dt><dd>{study.client}</dd></div>}
            <div><dt className="mono-tiny text-hue">Role</dt><dd>{study.role}</dd></div>
            <div><dt className="mono-tiny text-hue">Challenge</dt><dd>{study.problem}</dd></div>
            <div><dt className="mono-tiny text-hue">Build</dt><dd>{study.approach}</dd></div>
            <div><dt className="mono-tiny text-hue">Outcome</dt><dd>{study.result}</dd></div>
          </dl>
          <ArchitectureFlow stages={study.flow} caption="Request path" orientation="row" className="mt-6" />
          <p className="mt-4 mono-tiny text-subtle">{study.stack.join(" · ")}</p>
        </details>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {study.detailPath && <CTA to={study.detailPath} tone="ghost" size="sm" arrow>Read case study</CTA>}
          {study.liveUrl && <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-inter text-sm text-muted-foreground hover:text-foreground">Live site <ArrowUpRight className="h-4 w-4" /></a>}
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
    className="wash band-edge relative scroll-mt-24 py-24 lg:py-32"
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
        title="Websites, apps & systems I've shipped."
        lead="A selection of live products and production systems. Open a card for the decisions behind each build."
      />

      {/* Four on the home page, all eight on /projects.
          Eight full dossiers here made the home page a documentation site and
          blurred the line between this section and the case-study index. These
          four are the first four in the sequence and cover four different
          domains: VoIP, security tooling, multi-tenant SaaS and AI retrieval. */}
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-7">
        {[caseStudies[6], caseStudies[7], caseStudies[1], caseStudies[0], caseStudies[2], caseStudies[3]].map((study, i) => (
          <Reveal key={study.id} index={Math.min(i, 3)}><ProjectCard study={study} /></Reveal>
        ))}
      </div>

      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-hairline/[0.08] pt-10">
          <p className="type-body max-w-md text-muted-foreground">
            More websites, platforms and behind-the-scenes engineering in the full portfolio.
          </p>
          <CTA to="/projects" tone="ghost" arrow>
            Explore Case Studies
          </CTA>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CaseStudies;
