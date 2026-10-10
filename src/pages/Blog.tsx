import { Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import PostCard from "@/components/PostCard";
import { formatDate } from "@/lib/postFormat";
import { usePosts } from "@/lib/content/posts";
import { useTrendingBlogs } from "@/hooks/useTrendingBlogs";
import { safeHref } from "@/lib/url";
import { FORMSPREE_URL, SITE_URL } from "@/data/site";
import { useEnter } from "@/lib/boot";
import { Footer, TrendingRepos } from "@/components/lazyParts";


const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/**
 * /blog. Written articles lead: the newest as a wide card, the rest in the
 * work-card grid. Links curated from the news feed sit in their own clearly
 * labelled list, credited to their source and never to the site's author.
 */
const Blog = () => {
  const enter = useEnter();
  const [term, setTerm] = useState("");
  const written = usePosts();
  const { data: trending = [] } = useTrendingBlogs();

  const q = term.trim().toLowerCase();
  const match = (t: string, ex: string, tags: string[]) =>
    !q || t.toLowerCase().includes(q) || ex.toLowerCase().includes(q) || tags.some((x) => x.toLowerCase().includes(q));

  const posts = useMemo(
    () =>
      written
        .filter((p) => !p.is_auto && match(p.title, p.excerpt, p.tags))
        .sort((a, b) => b.published_at.localeCompare(a.published_at)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [written, q]
  );
  const links = useMemo(
    () => trending.filter((p) => safeHref(p.source_url) && match(p.title, "", p.tags)).slice(0, 8),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trending, q]
  );

  const [lead, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog | React, Node.js, Laravel & AI | Usama Munawar"
        description="Articles on React, React Native, Node.js, TypeScript, Laravel/PHP, product architecture, AI, automation, and VoIP."
        canonical={`${SITE_URL}/blog`}
        ogType="website"
      />
      <Navbar />

      <main id="main" className="fx-glow-top relative pb-24 pt-36 lg:pt-44">
        <div className="container mx-auto">
          {/* The h1 is this page's LCP element: painted on the first frame, never
                faded in by a JS observer. */}
            <div className="text-center">
            <h1 className="type-hero text-foreground">
              Engineering <em>notes</em>
            </h1>
            <p className="enter-lift type-lead mx-auto mt-6 max-w-2xl text-muted-foreground" {...enter()}>
              Deep dives into React, React Native, Node.js, TypeScript, Laravel, AI and automation, written from
              systems running in production.
            </p>
            <div className="relative mx-auto mt-9 max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
              <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
                className="h-11 w-full rounded-full border border-hairline/[0.14] bg-surface-1 pl-11 pr-4 font-inter text-sm text-foreground placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>
          </div>

          {posts.length === 0 && links.length === 0 && (
            <p className="mt-16 text-center font-inter text-muted-foreground">No articles match “{term}”.</p>
          )}

          {lead && (
            <Reveal className="mt-14">
              <h2 className="sr-only">Latest article</h2>
              <PostCard post={lead} size="lead" eager />
            </Reveal>
          )}

          {rest.length > 0 && (
            <>
              <h2 className="sr-only">More articles</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {rest.map((p, i) => (
                  <Reveal as="li" key={p.id} index={i % 3}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </ul>
            </>
          )}

          {links.length > 0 && (
            <section aria-labelledby="from-the-web" className="mt-24">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="chip-hue">
                    <span className="mono-label">Reading list</span>
                  </span>
                  <h2 id="from-the-web" className="type-h3 mt-4 text-foreground">
                    Worth reading <em>elsewhere</em>
                  </h2>
                </div>
                <p className="max-w-sm font-inter text-sm text-subtle">Links I am following this week, from other authors.</p>
              </div>
              <ul className="mt-8 divide-y divide-hairline/[0.08] rounded-2xl border border-hairline/[0.1] bg-surface-1">
                {links.map((p) => (
                  <li key={p.id}>
                    <a
                      href={safeHref(p.source_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 px-5 py-4"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-inter text-[15px] font-medium text-foreground group-hover:text-primary">{p.title}</span>
                        <span className="mt-0.5 block font-inter text-xs text-subtle">
                          {host(p.source_url ?? "")} · {formatDate(p.published_at)}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Newsletter */}
          <section aria-labelledby="newsletter" className="mt-24">
            <div className="fx-border relative isolate overflow-hidden rounded-3xl border border-hairline/[0.1] bg-surface-1 px-7 py-12 text-center lg:px-14">
              <div className="fx-horizon !top-[62%] opacity-70" aria-hidden="true" />
              <h2 id="newsletter" className="type-h3 relative text-foreground">
                One deep-dive <em>a month</em>
              </h2>
              <p className="relative mx-auto mt-3 max-w-md font-inter text-sm text-muted-foreground">
                Web, mobile, backend and AI engineering write-ups. No spam, unsubscribe any time.
              </p>
              <form action={FORMSPREE_URL} method="POST" className="relative mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row">
                <input type="hidden" name="_subject" value="New newsletter subscriber" />
                <input type="hidden" name="source" value="blog-newsletter" />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder="you@example.com"
                  className="h-10 flex-1 rounded-full border border-hairline/[0.14] bg-background px-4 font-inter text-sm text-foreground placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <CTA type="submit" size="lg">
                  Subscribe
                </CTA>
              </form>
              <p className="relative mt-5 font-inter text-sm text-subtle">
                Or start with the free{" "}
                <Link to="/laravel-scaling-checklist" className="text-foreground underline underline-offset-4">
                  Laravel scaling checklist
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        <Suspense fallback={<div className="py-16" />}>
          <TrendingRepos />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Blog;
