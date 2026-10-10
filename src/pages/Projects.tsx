import { Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import WorkCard from "@/components/WorkCard";
import { fromCaseStudy, fromProject } from "@/lib/content/workItems";
import type { WorkItem } from "@/lib/content/workItems";
import { snapshotCaseStudies, useProjects } from "@/lib/content/projects";
import { SITE_URL } from "@/data/site";
import { useEnter } from "@/lib/boot";
import { FinalCTA, Footer, TrackRecord } from "@/components/lazyParts";

// The year-by-year log moved here from the home page: it is a record of the
// work, so it belongs next to the work rather than in the sales path.

/* ---------------------------------------------------------------------------
   /projects: every piece of work as one uniform grid, filterable by kind.

   Cards come from the projects table (see lib/content/projects): projects with
   a card first, in their admin order, then projects that only have a page.
--------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#webpage`,
  url: `${SITE_URL}/projects`,
  name: "Websites, apps & systems I've shipped | Usama Munawar",
  description:
    "Case studies of production web, mobile, and backend products built with React, Node.js, TypeScript, Laravel, AI, and automation.",
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: snapshotCaseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      ...(c.detailPath ? { url: `${SITE_URL}${c.detailPath}` } : {}),
    })),
  },
};

type Group = "all" | "web" | "platform" | "ai";

const GROUPS: { id: Group; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Websites & commerce" },
  { id: "platform", label: "Platforms & SaaS" },
  { id: "ai", label: "AI & automation" },
];

/** Grouped by the free-text category, so projects added in /admin sort themselves. */
const groupOf = (category: string): Exclude<Group, "all"> =>
  /\bai\b|automation|learning|agent|retrieval/i.test(category)
    ? "ai"
    : /enterprise|security|product|fintech|saas|voip|healthcare|platform/i.test(category)
      ? "platform"
      : "web";

const Projects = () => {
  const enter = useEnter();
  const { caseStudies, archive } = useProjects();
  const [params, setParams] = useSearchParams();
  const raw = params.get("type");
  const group: Group = GROUPS.find((g) => g.id === raw)?.id ?? "all";

  const items = useMemo<(WorkItem & { group: Exclude<Group, "all"> })[]>(
    () => [
      ...caseStudies.map((c) => ({ ...fromCaseStudy(c), group: groupOf(c.category) })),
      ...archive.map((p) => ({ ...fromProject(p), group: groupOf(p.category) })),
    ],
    [caseStudies, archive]
  );

  const shown = group === "all" ? items : items.filter((i) => i.group === group);
  const count = (g: Group) => (g === "all" ? items.length : items.filter((i) => i.group === g).length);

  const choose = (g: Group) => {
    const next = new URLSearchParams(params);
    if (g === "all") next.delete("type");
    else next.set("type", g);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Websites, Apps & Systems I've Built | Usama Munawar"
        description="Explore websites, apps and production systems shipped by Usama Munawar across React, React Native, Node.js, TypeScript, Laravel, AI and automation."
        canonical={`${SITE_URL}/projects`}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main id="main">
        <section className="fx-glow-top relative pb-20 pt-36 lg:pt-44">
          <div className="container mx-auto">
            {/* The h1 is this page's LCP element: painted on the first frame, never
                faded in by a JS observer. */}
            <div className="text-center">
              <h1 className="type-hero text-foreground">
                Websites &amp; apps I&apos;ve <em>shipped</em>
              </h1>
              <p className="enter-lift type-lead mx-auto mt-6 max-w-2xl text-muted-foreground" {...enter()}>
                Websites, apps and production systems I&apos;ve shipped, from customer-facing sites to
                the infrastructure behind them. Open any one for the challenge, the build and the outcome.
              </p>
            </div>

            <Reveal index={1}>
              <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
                {GROUPS.map((g) => {
                  const on = g.id === group;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(g.id)}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 font-inter text-sm font-medium transition-colors duration-standard ${
                        on
                          ? "border-foreground bg-foreground text-background"
                          : "border-hairline/[0.12] text-muted-foreground hover:border-hairline/[0.3] hover:text-foreground"
                      }`}
                    >
                      {g.label}
                      <span className={`tabular-nums ${on ? "text-background/60" : "text-subtle"}`}>{count(g.id)}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <h2 className="sr-only">All projects</h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {shown.map((item, i) => (
                <Reveal as="li" key={item.key} index={Math.min(i % 3, 3)}>
                  <WorkCard item={item} eager={i < 3} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <Suspense fallback={<div className="py-24" />}>
          <div className="border-t border-hairline/[0.08]">
            <TrackRecord />
          </div>
          <FinalCTA location="projects" secondary={{ to: "/services", label: "Explore services" }} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Projects;
