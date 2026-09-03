import type { CSSProperties } from "react";
import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { projectsData } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";

const Footer = lazy(() => import("@/components/Footer"));

/* ---------------------------------------------------------------------------
   /project/:id, on the same system as everything else.

   This was the last page still built from shadcn Card, Badge and Button with
   its own type scale and a `bg-hero-gradient` header, so a reader who clicked
   "Read the case study" from a rebuilt dossier landed on what looked like a
   different site. All of the content is unchanged.

   Where a case study exists for the same project, its hue is reused so the
   colour follows the reader across the click.
--------------------------------------------------------------------------- */

/** Placeholder links in projects.ts; a dead button costs more trust than none. */
const isReal = (url?: string) => Boolean(url) && url !== "#";

/**
 * `fullDescription` uses a "THE PROBLEM: ..." convention for its paragraphs.
 * Rendered raw, those read as shouted prefixes mid-sentence, so the label is
 * lifted into its own small heading and the prose starts clean.
 */
const LABELLED = /^([A-Z][A-Z0-9 ,/&-]{2,40}):\s*/;

function parseOverview(text: string) {
  return text
    .split("\n\n")
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => {
      const m = para.match(LABELLED);
      if (!m) return { label: null as string | null, body: para };
      return {
        label: m[1].charAt(0) + m[1].slice(1).toLowerCase(),
        body: para.slice(m[0].length).trim(),
      };
    });
}

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = Number.parseInt(id || "", 10);
  const project = Number.isFinite(projectId)
    ? projectsData[projectId as keyof typeof projectsData]
    : undefined;

  if (!project) return <NotFound />;

  const hasLive = isReal(project.liveUrl);
  const hasCode = isReal(project.githubUrl);

  // Carry the dossier's hue through the click where one exists.
  const dossier = caseStudies.find((c) => c.detailPath === `/project/${project.id}`);
  const hue = dossier?.hue ?? "var(--hue-backend)";

  const related = Object.values(projectsData)
    .filter((p) => p.id !== project.id && p.category === project.category)
    .concat(Object.values(projectsData).filter((p) => p.id !== project.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 3);

  const paragraphs = parseOverview(project.fullDescription);

  const meta = [
    project.client && { k: "Client", v: project.client },
    project.duration && { k: "Duration", v: project.duration },
    project.teamSize && { k: "Team", v: project.teamSize },
    project.completionDate && { k: "Delivered", v: project.completionDate },
  ].filter(Boolean) as { k: string; v: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/project/${project.id}`,
    image: `${SITE_URL}${project.image.startsWith("/") ? project.image : ""}`,
    creator: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${project.title} | Case Study | Usama Munawar`}
        description={project.description.slice(0, 155)}
        canonical={`${SITE_URL}/project/${project.id}`}
        ogImage={project.image}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main
        id="main"
        className="wash band-edge pb-24 pt-32 lg:pt-40"
        style={{ "--hue": hue, "--wash-x": "76%", "--wash-y": "0%" } as CSSProperties}
      >
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hover-underline">All systems</span>
            </Link>
          </nav>

          {/* ---- header ---- */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="chip-hue">
                  <span className="mono-label">{project.category}</span>
                </span>
                <h1 className="type-h2 mt-6 text-foreground">{project.title}</h1>
                <p className="type-lead mt-6 text-muted-foreground">{project.description}</p>
              </Reveal>

              <Reveal index={1}>
                <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                  {meta.map((m) => (
                    <div key={m.k}>
                      <dt className="mono-tiny text-subtle">{m.k}</dt>
                      <dd className="mt-2 font-inter text-[13.5px] leading-snug text-foreground">
                        {m.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {(hasLive || hasCode) && (
                <Reveal index={2}>
                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm font-medium text-hue"
                      >
                        <span className="hover-underline">Visit live system</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {hasCode && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[24px] items-center gap-2 py-1 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        <span className="hover-underline">View the code</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="fade">
                <figure className="overflow-hidden rounded-xl border border-hairline/[0.09] bg-surface-1">
                  <img
                    src={project.image}
                    alt={`${project.title}, ${project.category}`}
                    width={1200}
                    height={750}
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <figcaption className="flex items-center justify-between gap-4 border-t border-hairline/[0.08] px-4 py-2.5">
                    <span className="mono-tiny leading-[1.7] text-subtle sm:truncate">
                      {project.technologies.join(" · ")}
                    </span>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-hue"
                      aria-hidden="true"
                    />
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          {/* ---- body ---- */}
          <div className="mt-16 grid items-start gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="max-w-3xl">
              <Reveal>
                <section>
                  <h2 className="mono-label text-hue">Overview</h2>
                  <div className="mt-6 space-y-6">
                    {paragraphs.map(({ label, body }, i) => (
                      <div key={label ? label + i : body.slice(0, 48)}>
                        {label && <h3 className="mono-tiny mb-2.5 text-hue">{label}</h3>}
                        <p className="type-body measure text-muted-foreground">{body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              <Reveal index={1}>
                <section className="mt-14 border-t border-hairline/[0.08] pt-10">
                  <h2 className="mono-label text-hue">What made it hard</h2>
                  <dl className="mt-7 border-t border-hairline/[0.08]">
                    {project.challenges.map((c) => (
                      <div key={c.title} className="border-b border-hairline/[0.08] py-5">
                        <dt className="font-inter text-[15px] font-medium text-foreground">
                          {c.title}
                        </dt>
                        <dd className="type-body measure mt-2.5 text-muted-foreground">{c.description}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>

              <Reveal index={2}>
                <section className="mt-14 border-t border-hairline/[0.08] pt-10">
                  <h2 className="mono-label text-hue">Result</h2>
                  <ul className="mt-7 grid gap-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06] sm:grid-cols-2">
                    {project.results.map((r) => (
                      <li key={r} className="flex items-start gap-3 bg-surface-1 px-5 py-4">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-px w-3 shrink-0 bg-hue"
                        />
                        <span className="type-body text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>

            {/* ---- rail ---- */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              <Reveal variant="fade">
                <div className="card-surface p-6">
                  <h2 className="mono-label text-hue">Built with</h2>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="mono-tiny text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade" index={1}>
                <div className="card-surface p-6">
                  <h2 className="mono-label text-hue">What it does</h2>
                  <ul className="mt-4 space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-hue"
                        />
                        <span className="font-inter text-[13px] leading-snug text-muted-foreground">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal variant="fade" index={2}>
                <div className="card-surface p-6">
                  <h2 className="mono-label text-hue">More systems</h2>
                  <ul className="mt-4 border-t border-hairline/[0.08]">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link
                          to={`/project/${r.id}`}
                          className="group flex items-center justify-between gap-3 border-b border-hairline/[0.08] py-3.5"
                        >
                          <span className="min-w-0">
                            <span className="block truncate font-inter text-[13.5px] text-foreground">
                              {r.title}
                            </span>
                            <span className="mono-tiny text-subtle">{r.category}</span>
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-subtle opacity-0 transition-opacity duration-standard group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* ---- close: one action ---- */}
          <Reveal>
            <div className="mt-20 border-t border-hairline/[0.08] pt-14 lg:mt-24">
              <h2 className="type-h3 max-w-xl text-foreground">Building something like this?</h2>
              <p className="type-lead mt-5 max-w-xl text-muted-foreground">
                Bring the architecture problem to a call and we will work out the shortest
                path to a fix.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <CTA
                  to="/book"
                  size="lg"
                  arrow
                  onClick={() => trackEvent("book_call_click", { location: "project_detail" })}
                >
                  Book an Architecture Call
                </CTA>
                <CTA to="/projects" tone="ghost" size="lg" arrow>
                  Explore Case Studies
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
};

export default ProjectDetail;
