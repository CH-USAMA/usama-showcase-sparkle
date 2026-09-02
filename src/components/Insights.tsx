import type { CSSProperties } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import { blogsData } from "@/data/blogs";

const readingTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/**
 * INSIGHTS — an editorial index rather than a row of cards.
 *
 * The newest post is given real estate; the rest are listed the way a
 * knowledge base lists things, with date, topic, and reading time visible so a
 * reader can choose rather than guess.
 */
const Insights = () => {
  const posts = useMemo(
    () =>
      [...blogsData].sort(
        (a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      ),
    []
  );

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;
  const list = rest.slice(0, 5);

  return (
    <section
      id="blog"
      className="wash relative scroll-mt-24 py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-ai)",
        "--hue-2": "var(--hue-realtime)",
        "--wash-x": "78%",
        "--wash-y": "8%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="09"
          eyebrow="Insights"
          title="The engineering log."
          lead="Comparisons and field notes on backend architecture, VoIP economics, automation, and where AI actually earns its place."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* ---- featured ---- */}
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <article>
                <Link to={`/blog/${featured.slug}`} className="group block">
                  {featured.featured_image && (
                    <div className="relative overflow-hidden rounded-lg border border-hairline/[0.09]">
                      <img
                        src={featured.featured_image}
                        alt=""
                        width={1200}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full object-cover opacity-85 transition-[opacity,transform] duration-large ease-out-expo group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"
                      />
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="mono-tiny rounded border border-primary/25 bg-primary/[0.07] px-2 py-1 text-primary">
                      Latest
                    </span>
                    {featured.tags.slice(0, 2).map((t) => (
                      <span key={t} className="mono-tiny text-subtle">
                        {t}
                      </span>
                    ))}
                    <span className="mono-tiny text-subtle">
                      {formatDate(featured.published_at)} ·{" "}
                      {readingTime(featured.content)} min
                    </span>
                  </div>

                  <h3 className="type-h3 mt-4 text-foreground transition-colors duration-standard group-hover:text-primary">
                    {featured.title}
                  </h3>

                  <p className="type-body mt-4 max-w-xl text-muted-foreground">
                    {featured.excerpt}
                  </p>

                  <span className="mt-5 inline-flex min-h-[24px] items-center gap-1.5 py-1 font-inter text-sm font-medium text-primary">
                    <span className="hover-underline">Read the article</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </article>
            </Reveal>
          </div>

          {/* ---- index ---- */}
          <div className="lg:col-span-5">
            <ul className="border-t border-hairline/[0.08]">
              {list.map((post, i) => (
                <Reveal as="li" key={post.id} index={i}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block border-b border-hairline/[0.08] py-5 transition-[padding-left] duration-standard ease-out-expo hover:pl-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="mono-tiny text-primary/70">
                        {post.tags[0] ?? "Engineering"}
                      </span>
                      <span className="mono-tiny text-subtle">
                        {readingTime(post.content)} min
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-inter text-[15px] font-medium leading-snug tracking-tight text-muted-foreground transition-colors duration-standard group-hover:text-foreground">
                      {post.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <div className="mt-8">
                <CTA to="/blog" tone="ghost" size="sm" arrow>
                  All {posts.length} articles
                </CTA>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
