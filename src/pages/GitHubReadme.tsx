import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, GitFork, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import CTA from "@/components/system/CTA";
import Markdown from "@/components/Markdown";
import { trendingRepos } from "@/data/github-trending";
import { SITE_URL } from "@/data/site";
import NotFound from "@/pages/NotFound";
import { Footer } from "@/components/lazyParts";
import { githubAvatar } from "@/lib/img";


/*
 * README loaders. A template-literal import with a ?raw query cannot be
 * analysed by Vite, so the old dynamic import always threw and every page
 * showed "README not available". import.meta.glob gives one lazy chunk per
 * file, keyed by path.
 */
const READMES = import.meta.glob("../data/github-trending/readmes/*.md", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>;

const formatStars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

/**
 * /github/:repoId: a third-party README, readable in the site's own shell.
 * The text belongs to the repository, so the page is noindex: indexing a copy
 * of someone else's README would only compete with the original.
 */
const GitHubReadme = () => {
  const { repoId } = useParams();
  const repo = trendingRepos.find((r) => r.id === repoId);
  const [readme, setReadme] = useState<string | null>(null);

  useEffect(() => {
    if (!repo) return;
    let live = true;
    setReadme(null);
    const load = READMES[`../data/github-trending/readmes/${repo.readme_file}`];
    (load ? load() : Promise.reject(new Error("missing")))
      .then((text) => live && setReadme(text))
      .catch(() => live && setReadme("README not available here. Read it on GitHub instead."));
    return () => {
      live = false;
    };
  }, [repo]);

  if (!repo) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${repo.full_name} README | Usama Munawar`}
        description={repo.description ?? `README for ${repo.full_name}`}
        canonical={`${SITE_URL}/github/${repo.id}`}
        noindex
      />
      <Navbar />

      <main id="main" className="fx-glow-top relative pb-24 pt-28 lg:pt-36">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the blog
          </Link>

          <header className="mt-10 flex flex-wrap items-start gap-5">
            <img decoding="async" src={githubAvatar(repo.owner_avatar, 128)} alt="" width={64} height={64} className="h-16 w-16 rounded-2xl border border-hairline/[0.1]" />
            <div className="min-w-0 flex-1">
              <h1 className="font-inter text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {repo.full_name}
              </h1>
              {repo.description && <p className="type-lead mt-3 text-muted-foreground">{repo.description}</p>}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 font-inter text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4" aria-hidden="true" /> {formatStars(repo.stars)} stars
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GitFork className="h-4 w-4" aria-hidden="true" /> {formatStars(repo.forks)} forks
                </span>
                {repo.language && <span>{repo.language}</span>}
                <CTA href={repo.url} tone="ghost" size="sm" arrow>
                  View on GitHub
                </CTA>
              </div>
            </div>
          </header>

          <div className="mt-10 rounded-2xl border border-hairline/[0.1] bg-surface-1 p-6 md:p-10" aria-busy={readme === null}>
            {readme === null ? (
              // Tall enough that the footer stays below the fold until the text lands.
              <div className="min-h-[60vh] animate-pulse space-y-4" aria-hidden="true">
                <div className="h-8 w-1/3 rounded bg-surface-3" />
                <div className="h-4 w-full rounded bg-surface-3" />
                <div className="h-4 w-2/3 rounded bg-surface-3" />
              </div>
            ) : (
              <Markdown className="prose-base">{readme}</Markdown>
            )}
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default GitHubReadme;
