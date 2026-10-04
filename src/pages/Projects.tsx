import type { CSSProperties } from "react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { caseStudies } from "@/data/caseStudies";
import { projectsData } from "@/data/projects";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const Footer = lazy(() => import("@/components/Footer"));

/* ---------------------------------------------------------------------------
   /projects — the case-study index.

   This page used to carry its own hard-coded project array with Unsplash stock
   photography and its own id sequence, which did not match projects.ts. Cards
   linked to /project/{id} using the local ids, so eight of them opened a
   different project's detail page. Both problems disappear by reading the same
   two canonical sources the rest of the site reads.

   Weight follows evidence: the six systems with a written architecture get the
   full treatment, and everything else is a compact archive row. Metrics render
   only where caseStudies.ts carries a verified one — the clinic dossier has no
   defensible figure and shows none here either.
--------------------------------------------------------------------------- */

/** Detail pages already owned by a case study — not repeated in the archive. */
const COVERED = new Set(
  caseStudies
    .map((c) => c.detailPath?.replace("/project/", ""))
    .filter(Boolean)
    .map(Number)
);

const archive = Object.values(projectsData).filter((p) => !COVERED.has(p.id));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#webpage`,
  url: `${SITE_URL}/projects`,
  name: "Selected systems | Usama Munawar",
  description:
    "Case studies of production web, mobile, and backend products built with React, Node.js, TypeScript, Laravel, AI, and automation.",
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      ...(c.detailPath ? { url: `${SITE_URL}${c.detailPath}` } : {}),
    })),
  },
};

const Projects = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Websites, Apps & Systems I've Built | Usama Munawar"
      description="Explore websites, apps and production systems shipped by Usama Munawar across React, React Native, Node.js, TypeScript, Laravel, AI and automation."
      canonical={`${SITE_URL}/projects`}
      jsonLd={jsonLd}
    />
    <Navbar />

    <main
      id="main"
      className="wash pb-24 pt-32 lg:pt-40"
      style={{
        "--hue": "var(--hue-ai)",
        "--hue-2": "var(--hue-automation)",
        "--wash-x": "78%",
        "--wash-y": "0%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        {/* ---- header ---- */}
        <Reveal>
          <span className="mono-label text-hue">Selected systems</span>
          <h1 className="type-h2 mt-6 max-w-3xl text-foreground">
            Websites, apps &amp; systems I've shipped.
          </h1>
          <p className="type-lead measure mt-7 text-muted-foreground">
            Real projects, from customer-facing websites to the infrastructure behind them.
            Open a case study for the challenge, build and outcome.
          </p>
        </Reveal>

        {/* ---- case studies ---- */}
        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:mt-20 lg:gap-7">
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.id} index={Math.min(i + 1, 4)}>
              <article
                className="project-card group flex h-full flex-col overflow-hidden rounded-lg border border-hairline/[0.12] bg-surface-1"
                style={{ "--hue": c.hue } as CSSProperties}
              >
                <div className="relative overflow-hidden bg-surface-2">
                  <img src={c.image} alt={`${c.title} project preview`} width={1200} height={750} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-large ease-out-expo group-hover:scale-[1.045]" />
                  <span className="absolute bottom-0 left-0 h-1 w-24 bg-hue transition-[width] duration-large group-hover:w-full" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="mono-tiny tabular-nums text-hue">{c.n}</span>
                      <span className="h-px w-6 bg-hue opacity-50" aria-hidden="true" />
                      <span className="mono-tiny text-muted-foreground">{c.category}</span>
                    </div>

                    <h2 className="type-h3 mt-5 text-foreground">{c.title}</h2>
                    <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-muted-foreground">{c.result}</p>
                    {c.metric && (
                      <div className="mt-5 flex items-baseline gap-3 border-l-2 border-hue pl-4">
                        <span className="font-inter text-2xl font-semibold leading-none text-hue">
                          {c.metric.value}
                        </span>
                        <span className="mono-tiny leading-[1.5] text-muted-foreground">
                          {c.metric.label}
                        </span>
                      </div>
                    )}
                    <details className="project-details mt-6 border-t border-hairline/[0.1] pt-4">
                      <summary className="cursor-pointer font-inter text-sm font-medium text-hue">Inside the build</summary>
                      <dl className="mt-5 space-y-4 font-inter text-sm leading-relaxed text-muted-foreground">
                        {c.client && <div><dt className="mono-tiny text-hue">Client</dt><dd>{c.client}</dd></div>}
                        {c.year && <div><dt className="mono-tiny text-hue">Year</dt><dd>{c.year}</dd></div>}
                        <div><dt className="mono-tiny text-hue">Role</dt><dd>{c.role}</dd></div>
                        <div><dt className="mono-tiny text-hue">Challenge</dt><dd>{c.problem}</dd></div>
                        <div><dt className="mono-tiny text-hue">Build</dt><dd>{c.approach}</dd></div>
                        <div><dt className="mono-tiny text-hue">Outcome</dt><dd>{c.result}</dd></div>
                      </dl>
                    </details>
                    <div className="mt-5 flex flex-wrap gap-1.5">{c.stack.map(t => <span key={t} className="rounded border border-hairline/[0.12] px-2 py-1 font-mono text-[10px] text-muted-foreground">{t}</span>)}</div>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
                      {c.detailPath && (
                        <CTA to={c.detailPath} tone="ghost" size="sm" arrow>
                          Read case study
                        </CTA>
                      )}
                      {c.liveUrl && (
                        <a
                          href={c.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                        >
                          <span className="hover-underline">Visit live system</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* ---- archive ---- */}
        {archive.length > 0 && (
          <div className="mt-20 lg:mt-24">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="mono-tiny text-hue tabular-nums">09</span>
                <span className="h-px w-8 bg-hue opacity-50" aria-hidden="true" />
                <span className="mono-label text-hue">Archive</span>
              </div>
              <h2 className="type-h3 mt-5 max-w-2xl text-foreground">
                Shipped, without a written case study.
              </h2>
            </Reveal>

            <ul className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {archive.map((p, i) => (
                <Reveal as="li" key={p.id} index={Math.min(i + 1, 4)}>
                  <Link
                    to={`/project/${p.id}`}
                    className="project-card group flex h-full flex-col overflow-hidden rounded-lg border border-hairline/[0.12] bg-surface-1"
                  >
                    <span className="block overflow-hidden bg-surface-2"><img src={p.image} alt={`${p.title} project preview`} width={800} height={500} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-large group-hover:scale-[1.045]" /></span>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="mono-tiny text-hue">{p.category}</span>
                      <span className="mt-3 font-inter text-lg font-medium text-foreground">
                        {p.title}
                      </span>
                      <span className="mt-2 line-clamp-3 font-inter text-sm leading-relaxed text-muted-foreground">
                        {p.description}
                      </span>
                      <span className="mt-auto flex items-center gap-2 pt-5 font-inter text-sm text-hue">Explore project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {/* ---- close: one action ---- */}
        <Reveal>
          <div className="mt-20 border-t border-hairline/[0.08] pt-14 lg:mt-24">
            <h2 className="type-h3 max-w-xl text-foreground">
              Recognise your system in one of these?
            </h2>
            <p className="type-lead mt-5 max-w-xl text-muted-foreground">
              Bring the problem to a call and we will work out which layer it lives in.
            </p>
            <div className="mt-9">
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: "projects" })}
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

export default Projects;
