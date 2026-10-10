import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { trendingRepos } from "@/data/github-trending";
import Reveal from "@/components/system/Reveal";
import { githubAvatar } from "@/lib/img";

const formatStars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const FILTERS = ["all", "AI", "Web Dev"] as const;

/**
 * Open-source projects worth knowing, each with its README readable on the
 * site. Third-party descriptions have their em dashes normalised, as the site
 * does not use them.
 */
const TrendingRepos = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const shown = filter === "all" ? trendingRepos : trendingRepos.filter((r) => r.category === filter);

  return (
    <section aria-labelledby="repos" className="container mx-auto mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="chip-hue">
            <span className="mono-label">Open source</span>
          </span>
          <h2 id="repos" className="type-h3 mt-4 text-foreground">
            Repositories I keep <em>an eye on</em>
          </h2>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter repositories">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`inline-flex h-9 items-center rounded-full border px-4 font-inter text-sm font-medium transition-colors duration-standard ${
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-hairline/[0.12] text-muted-foreground hover:border-hairline/[0.3] hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((repo, i) => (
          <Reveal as="li" key={repo.id} index={i % 3}>
            <Link
              to={`/github/${repo.id}`}
              className="project-card fx-border group flex h-full flex-col rounded-2xl border border-hairline/[0.1] bg-surface-1 p-5"
            >
              <div className="flex items-center gap-3">
                <img loading="lazy" decoding="async" src={githubAvatar(repo.owner_avatar, 72)} alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-inter text-[15px] font-semibold text-foreground">{repo.full_name}</p>
                  <p className="mt-0.5 flex items-center gap-3 font-inter text-xs text-subtle">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" aria-hidden="true" />
                      {formatStars(repo.stars)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" aria-hidden="true" />
                      {formatStars(repo.forks)}
                    </span>
                    {repo.language && <span>{repo.language}</span>}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
              </div>
              <p className="mt-4 line-clamp-2 font-inter text-sm leading-relaxed text-muted-foreground">
                {repo.description?.replace(/\s—\s/g, ", ").replace(/—/g, ", ")}
              </p>
              <p className="mt-auto pt-4 font-inter text-xs font-medium text-primary">{repo.category}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default TrendingRepos;
