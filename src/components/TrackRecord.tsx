import { useMemo } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import { useProjectEntries } from "@/lib/content/projects";

const CREDENTIALS = [
  "Top Rated Plus on Upwork",
  "Level 2 Seller on Fiverr with 89+ reviews",
  "Enterprise SaaS products serving 10K+ users",
  "Production Asterisk deployments for 40+ agent call centres",
  "Zero-downtime Laravel deploys with CI/CD on AWS and Vercel",
  "AI agents, RAG pipelines, and n8n automation in production",
];

interface LogItem {
  title: string;
  href?: string;
}

/**
 * The record, by year. Built from the projects themselves (a card's year, or
 * the year in its page's delivery date), so it can never contradict the work
 * listed above it; it used to be a hand-written log that fell behind.
 * Projects with no date are simply not on it.
 */
const TrackRecord = () => {
  const entries = useProjectEntries();

  const years = useMemo(() => {
    const byYear = new Map<string, LogItem[]>();
    for (const e of entries) {
      const title = e.caseStudy?.title ?? e.project?.title;
      const year = e.caseStudy?.year ?? e.project?.completionDate?.match(/\d{4}/)?.[0];
      if (!title || !year) continue;
      const list = byYear.get(year) ?? [];
      list.push({ title, href: e.project ? `/project/${e.id}` : undefined });
      byYear.set(year, list);
    }
    return [...byYear.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries]);

  return (
    <section id="experience" className="fx-glow-bottom relative scroll-mt-24 py-24 lg:py-32">
      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Track record"
          title={
            <>
              The work, <em>by year.</em>
            </>
          }
          lead="Every dated project on this page, grouped by the year it was delivered."
        />

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-8">
            {years.map(([year, items], i) => (
              <Reveal as="li" key={year} index={Math.min(i, 3)}>
                <div className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-hairline/[0.08] py-6 sm:grid-cols-[6rem_1fr] sm:gap-x-6">
                  <div className="font-inter text-xl font-semibold tabular-nums text-foreground">{year}</div>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((it) => (
                      <li key={it.title}>
                        {it.href ? (
                          <Link
                            to={it.href}
                            className="inline-flex min-h-9 items-center rounded-full border border-hairline/[0.12] px-3.5 font-inter text-sm text-foreground/90 transition-colors duration-standard hover:border-foreground hover:text-foreground"
                          >
                            {it.title}
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-9 items-center rounded-full border border-hairline/[0.08] px-3.5 font-inter text-sm text-muted-foreground">
                            {it.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal variant="fade" className="lg:col-span-4">
            <div className="rounded-2xl border border-hairline/[0.1] bg-surface-1 p-6">
              <h3 className="mono-tiny text-subtle">Credentials</h3>
              <ul className="mt-4 space-y-3">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="flex gap-3 font-inter text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;
