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
    "Case studies of production backend systems: VoIP infrastructure, multi-tenant SaaS, RAG retrieval, automation pipelines and commerce platforms.",
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
      title="Selected Systems | Backend Case Studies | Usama Munawar"
      description="Production systems with the architecture written down: Asterisk call routing, multi-tenant healthcare SaaS, RAG retrieval, lead automation and headless commerce."
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
            The systems, and the decisions behind them.
          </h1>
          <p className="type-lead mt-7 max-w-2xl text-muted-foreground">
            Six with the architecture written down, and the rest of the archive below.
            Where a figure appears it comes from the project record, where none does,
            there was nothing defensible to quote.
          </p>
        </Reveal>

        {/* ---- case studies ---- */}
        <ul className="mt-16 border-t border-hairline/[0.08] lg:mt-20">
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.id} index={Math.min(i + 1, 4)}>
              <article
                className="border-b border-hairline/[0.08] py-12 lg:py-16"
                style={{ "--hue": c.hue } as CSSProperties}
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* identity */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3">
                      <span className="mono-tiny tabular-nums text-hue">{c.n}</span>
                      <span className="h-px w-6 bg-hue opacity-50" aria-hidden="true" />
                      <span className="mono-tiny text-muted-foreground">{c.category}</span>
                    </div>

                    <h2 className="type-h3 mt-5 text-foreground">{c.title}</h2>

                    {c.metric && (
                      <div className="mt-6 flex items-baseline gap-4 border-l-2 border-hue pl-5">
                        <span className="font-inter text-[2rem] font-semibold leading-none tracking-tight text-hue sm:text-[2.5rem]">
                          {c.metric.value}
                        </span>
                        <span className="mono-tiny max-w-[9rem] leading-[1.5] text-muted-foreground">
                          {c.metric.label}
                        </span>
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                      {c.detailPath && (
                        <CTA to={c.detailPath} tone="ghost" size="sm" arrow>
                          Read the case study
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

                  {/* the problem and the shape of the answer */}
                  <div className="lg:col-span-7">
                    <dl className="space-y-6">
                      <div>
                        <dt className="mono-tiny text-subtle">The problem</dt>
                        <dd className="type-body mt-2.5 max-w-2xl text-muted-foreground">
                          {c.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="mono-tiny text-subtle">The result</dt>
                        <dd className="type-body mt-2.5 max-w-2xl text-muted-foreground">
                          {c.result}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline/[0.08] pt-5">
                      {c.stack.map((t) => (
                        <span key={t} className="mono-tiny text-subtle">
                          {t}
                        </span>
                      ))}
                    </div>
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
                <span className="mono-tiny text-hue tabular-nums">07</span>
                <span className="h-px w-8 bg-hue opacity-50" aria-hidden="true" />
                <span className="mono-label text-hue">Archive</span>
              </div>
              <h2 className="type-h3 mt-5 max-w-2xl text-foreground">
                Shipped, without a written case study.
              </h2>
            </Reveal>

            <ul className="mt-9 border-t border-hairline/[0.08]">
              {archive.map((p, i) => (
                <Reveal as="li" key={p.id} index={Math.min(i + 1, 4)}>
                  <Link
                    to={`/project/${p.id}`}
                    className="group flex flex-col gap-3 border-b border-hairline/[0.08] py-6 transition-colors duration-standard hover:bg-surface-1/50 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="mono-tiny w-28 shrink-0 text-subtle">{p.category}</span>
                    <span className="flex-1">
                      <span className="font-inter text-[15px] font-medium text-foreground">
                        {p.title}
                      </span>
                      <span className="type-body mt-1.5 block max-w-2xl text-muted-foreground">
                        {p.description}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="hidden h-4 w-4 shrink-0 text-subtle transition-colors duration-standard group-hover:text-hue sm:block"
                      aria-hidden="true"
                    />
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
