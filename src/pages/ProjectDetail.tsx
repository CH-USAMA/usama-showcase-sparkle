import { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import ProjectCover from "@/components/system/ProjectCover";
import { useProjects } from "@/lib/content/projects";
import { SITE_URL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { safeHref } from "@/lib/url";
import { projectShareImage } from "@/lib/content/shareImage";
import NotFound from "@/pages/NotFound";
import { responsiveImage } from "@/lib/img";
import { FinalCTA, Footer } from "@/components/lazyParts";
import { caseStudyTitle } from "@/lib/seo";


/* ---------------------------------------------------------------------------
   /project/:id — the case study.

   Reads top to bottom like a short article: what it is, what it looks like,
   what came out of it (as figures), then the story, then where to go next.
   The cover prefers the case study's own screenshot, and falls back to the
   system diagram rather than to stock photography, which never shows the
   real product.
--------------------------------------------------------------------------- */


const isStock = (src: string) => src.includes("images.unsplash.com");

/*
 * Grid columns follow the number of cells, so three results or a missing
 * client never leave an empty grey cell. Static strings, so Tailwind sees them.
 */
const COLS_SM = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4"];
const COLS_LG = ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"];
/** On two-column layouts an odd last cell spans both columns. */
const ODD_LAST = "[&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1";
const ODD_LAST_SM = "sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1";

/**
 * `fullDescription` uses a "THE PROBLEM: ..." convention for its paragraphs.
 * The label is lifted into its own heading so the prose starts clean.
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

/**
 * Splits "85% reduction in manual work" into a figure and its label, so the
 * figure can be set large. Results with no leading figure ("Sub-3 second
 * response times") are returned whole and render as plain statements.
 */
const FIGURE = /^((?:\d[\d.,]*)(?:\/\d+)?(?:%|x|\+)?)\s+(.+)$/i;

function splitResult(r: string): { value: string | null; label: string } {
  const m = r.match(FIGURE);
  return m ? { value: m[1], label: m[2] } : { value: null, label: r };
}

const ProjectDetail = () => {
  const { id } = useParams();
  const { projectsById, caseStudies, pages, settling } = useProjects();
  const projectId = Number.parseInt(id || "", 10);
  const project = Number.isFinite(projectId) ? projectsById[projectId] : undefined;

  if (!project && settling) {
    return (
      <div className="min-h-screen bg-background" aria-busy="true">
        <Navbar />
      </div>
    );
  }
  if (!project) return <NotFound />;

  // Placeholder ("#") and unsafe (javascript:, //host) links render no button.
  const liveHref = safeHref(project.liveUrl);
  const codeHref = safeHref(project.githubUrl);
  const hasLive = Boolean(liveHref);
  const hasCode = Boolean(codeHref);

  const dossier = caseStudies.find((c) => c.detailPath === `/project/${project.id}`);

  // Cover: the case study's real screenshot if it has one, otherwise the
  // project's own image unless that is stock, otherwise the system diagram.
  const coverImage =
    dossier && dossier.cover !== "diagram"
      ? dossier.image
      : !dossier && !isStock(project.image)
        ? project.image
        : null;
  const coverStages =
    dossier?.flow ?? project.technologies.slice(0, 6).map((t) => ({ label: t }));

  const index = pages.findIndex((p) => p.id === project.id);
  const next = pages[(index + 1) % pages.length];

  const paragraphs = parseOverview(project.fullDescription);
  const results = project.results.map(splitResult);

  // Not every project records a client (some are self-initiated products).
  const client = (project as { client?: string }).client;

  const meta = [
    client && { k: "Client", v: client },
    project.duration && { k: "Duration", v: project.duration },
    project.teamSize && { k: "Team", v: project.teamSize },
    project.completionDate && { k: "Delivered", v: project.completionDate },
  ].filter(Boolean) as { k: string; v: string }[];

  const shareImage = projectShareImage({ caseStudy: dossier ?? null, project });
  // The card the reader clicked names the project; the page must agree with it.
  const title = dossier?.title ?? project.title;
  const category = dossier?.category ?? project.category;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/project/${project.id}`,
    image: shareImage ? (shareImage.startsWith("/") ? `${SITE_URL}${shareImage}` : shareImage) : `${SITE_URL}/og-image.png`,
    creator: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={caseStudyTitle(title)}
        description={project.description}
        canonical={`${SITE_URL}/project/${project.id}`}
        ogImage={shareImage}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main id="main" className="pt-28 lg:pt-36">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb">
            <Link
              to="/projects"
              className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All work
            </Link>
          </nav>

          {/* ---- header ---- */}
          <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-8">
              <span className="chip-hue">
                <span className="mono-label">{category}</span>
              </span>
              <h1 className="type-display mt-5 text-foreground">{title}</h1>
              <p className="type-lead measure mt-6 text-muted-foreground">{project.description}</p>
            </Reveal>

            {(hasLive || hasCode) && (
              <Reveal index={1} className="flex flex-wrap items-center gap-2 lg:col-span-4 lg:justify-end">
                {hasLive && (
                  <CTA href={liveHref!} size="md" arrow>
                    Visit live site
                  </CTA>
                )}
                {hasCode && (
                  <CTA href={codeHref!} tone="ghost" size="md">
                    <span className="inline-flex items-center gap-2">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Code
                    </span>
                  </CTA>
                )}
              </Reveal>
            )}
          </header>

          {meta.length > 0 && (
            <Reveal index={1}>
              <dl
                className={`mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline/[0.1] bg-hairline/[0.08] ${COLS_SM[meta.length]} ${ODD_LAST}`}
              >
                {meta.map((m) => (
                  <div key={m.k} className="bg-surface-1 px-4 py-3.5 sm:px-5">
                    <dt className="mono-tiny text-subtle">{m.k}</dt>
                    <dd className="mt-1.5 font-inter text-sm font-medium text-foreground">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {/* ---- cover ---- */}
          <Reveal variant="fade">
            <figure className="mt-6 overflow-hidden rounded-xl border border-hairline/[0.1] bg-surface-2 p-2.5 sm:p-3">
              <div className="overflow-hidden rounded-lg border border-hairline/[0.1]">
                {coverImage ? (
                  <img
                    {...responsiveImage(coverImage, { widths: [720, 1440], aspect: 16 / 10 })}
                    sizes="(min-width: 1280px) 72rem, calc(100vw - 4rem)"
                    alt={`${project.title}, ${category}`}
                    width={1440}
                    height={900}
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                ) : (
                  /* The diagram's type scales with its width, so at full
                     page width it is capped and centred in the frame. */
                  <div className="flex justify-center bg-surface-2">
                    <ProjectCover stages={coverStages} caption="System path" className="max-w-3xl" />
                  </div>
                )}
              </div>
            </figure>
          </Reveal>

          {/* ---- results, as figures ---- */}
          <Reveal>
            <section aria-labelledby="results" className="mt-16 lg:mt-20">
              <h2 id="results" className="type-h3 text-foreground">
                The <em>outcome</em>
              </h2>
              <ul
                className={`mt-6 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.1] bg-hairline/[0.08] sm:grid-cols-2 ${COLS_LG[Math.min(results.length, 4)]} ${ODD_LAST_SM}`}
              >
                {results.map((r) => (
                  <li key={r.label} className="flex flex-col justify-end bg-surface-1 p-5 sm:p-6">
                    {r.value ? (
                      <>
                        <span className="font-inter text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
                          {r.value}
                        </span>
                        <span className="mt-3 font-inter text-sm leading-snug text-muted-foreground">
                          {r.label}
                        </span>
                      </>
                    ) : (
                      <span className="font-inter text-[15px] font-medium leading-snug text-foreground">
                        {r.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* ---- body ---- */}
          <div className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <article className="max-w-[44rem]">
              <Reveal>
                <h2 className="type-h3 text-foreground">
                  The <em>story</em>
                </h2>
                <div className="mt-6 space-y-8">
                  {paragraphs.map(({ label, body }, i) => (
                    <div key={label ? label + i : body.slice(0, 48)}>
                      {label && (
                        <h3 className="mb-2 font-inter text-base font-semibold text-foreground">
                          {label}
                        </h3>
                      )}
                      <p className="type-body text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {project.challenges.length > 0 && (
                <Reveal>
                  <section className="mt-14 border-t border-hairline/[0.08] pt-10">
                    <h2 className="type-h3 text-foreground">
                      What made it <em>hard</em>
                    </h2>
                    <ol className="mt-6 space-y-6">
                      {project.challenges.map((c, i) => (
                        <li key={c.title} className="grid grid-cols-[2rem_1fr] gap-x-3">
                          <span className="pt-0.5 font-inter text-sm font-semibold tabular-nums text-primary" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-inter text-[15px] font-semibold text-foreground">{c.title}</h3>
                            <p className="type-body mt-1.5 text-muted-foreground">{c.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                </Reveal>
              )}
            </article>

            {/* ---- rail ---- */}
            <aside className="space-y-4 lg:sticky lg:top-28">
              <Reveal variant="fade">
                <div className="card-surface p-5">
                  <h2 className="mono-tiny text-subtle">Built with</h2>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-surface-2 px-2 py-1 font-inter text-xs font-medium text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade" index={1}>
                <div className="card-surface p-5">
                  <h2 className="mono-tiny text-subtle">What it does</h2>
                  <ul className="mt-3 space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="font-inter text-[13px] leading-snug text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* ---- next ---- */}
          <Reveal>
            <Link
              to={`/project/${next.id}`}
              className="group mt-20 flex flex-wrap items-end justify-between gap-6 border-y border-hairline/[0.1] py-10 lg:mt-24"
            >
              <span>
                <span className="mono-tiny text-subtle">Next project</span>
                <span className="mt-3 block font-inter text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {next.title}
                </span>
              </span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline/[0.16] text-foreground transition-colors duration-standard group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>

        </div>

        <Suspense fallback={<div className="py-24" />}>
          <FinalCTA location="project_detail" secondary={{ to: "/projects", label: "All work" }} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ProjectDetail;
