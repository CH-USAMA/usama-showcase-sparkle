import { Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Markdown from "@/components/Markdown";
import { formatDate, readingTime } from "@/lib/postFormat";
import { usePost } from "@/lib/content/posts";
import { useTrendingBlogs } from "@/hooks/useTrendingBlogs";
import { slugify } from "@/lib/markdown";
import { safeHref } from "@/lib/url";
import { SITE_URL, WHATSAPP_URL } from "@/data/site";
import NotFound from "@/pages/NotFound";
import { PRIORITY_TIMING, responsiveImage } from "@/lib/img";
import { BlogRecommendations, FinalCTA, Footer } from "@/components/lazyParts";


/** Table of contents from the top-level headings, ignoring fenced code. */
const extractHeadings = (content: string) =>
  Array.from(content.replace(/```[\s\S]*?```/g, "").matchAll(/^##\s+(.*)$/gm)).map((m) => {
    const label = m[1].replace(/[*_`]/g, "").trim();
    return { id: slugify(label), label };
  });

/**
 * /blog/:slug. Reads like the project pages: header, cover, then a reading
 * column with the contents beside it on wide screens. A slug that does not
 * exist renders the real 404 page (noindex), not a soft "not found" block.
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: trendingPosts = [] } = useTrendingBlogs();
  const { post: written, loading } = usePost(slug);

  const post = useMemo(() => written || trendingPosts.find((p) => p.slug === slug), [slug, written, trendingPosts]);
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);

  // A post published after this build is not in the snapshot: wait for the
  // API rather than flashing "not found".
  if (!post && loading) {
    return (
      <div className="min-h-screen bg-background" aria-busy="true">
        <Navbar />
      </div>
    );
  }
  if (!post) return <NotFound />;

  const url = `${SITE_URL}/blog/${post.slug}`;
  const cover = safeHref(post.featured_image);
  const source = safeHref(post.source_url);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.seo_title || post.title}
        shareTitle={post.title}
        description={post.excerpt}
        canonical={url}
        ogType="article"
        ogImage={cover}
        noindex={Boolean(post.is_auto)}
        jsonLd={post.is_auto ? undefined : [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: cover ? [cover.startsWith("/") ? `${SITE_URL}${cover}` : cover] : undefined,
            author: { "@type": "Person", name: post.author || "Usama Munawar", url: SITE_URL },
            publisher: {
              "@type": "Person",
              name: "Usama Munawar",
              url: SITE_URL,
            },
            datePublished: post.published_at,
            dateModified: post.updated_at ?? post.published_at,
            keywords: (post.tags || []).join(", "),
            articleSection: post.tags?.[0] || "Engineering",
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            wordCount: post.content ? post.content.split(/\s+/).length : undefined,
            inLanguage: "en-US",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />
      <Navbar />

      <main id="main" className="fx-glow-top relative pt-28 lg:pt-36">
        <article>
          <header className="container mx-auto">
            <Link
              to="/blog"
              className="-my-2.5 inline-flex min-h-10 items-center gap-2 py-2.5 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>

            <div className="mx-auto mt-10 max-w-4xl text-center">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {post.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full border border-hairline/[0.12] px-3 py-1 font-inter text-xs font-medium text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="mt-6 font-inter text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
                {post.title}
              </h1>
              <p className="type-lead mx-auto mt-6 max-w-2xl text-muted-foreground">{post.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 font-inter text-sm text-subtle">
                <span className="text-foreground/85">{post.is_auto ? "Curated link" : post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                {post.content && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime(post.content)} min read</span>
                  </>
                )}
              </p>
            </div>

            {cover && (
              <figure className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-hairline/[0.1] bg-surface-2 p-2.5">
                <img
                  {...responsiveImage(cover, { widths: [640, 960, 1280], aspect: 1200 / 630 })}
                  sizes="(min-width: 1024px) 64rem, calc(100vw - 3rem)"
                  alt=""
                  width={1200}
                  height={630}
                  decoding="async"
                  fetchPriority="high"
                  {...PRIORITY_TIMING}
                  className="aspect-[1200/630] w-full rounded-xl object-cover"
                />
              </figure>
            )}
          </header>

          <div className="container mx-auto mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="mx-auto w-full max-w-[44rem]">
              {source && (
                <p className="mb-8 flex flex-wrap items-center gap-2 rounded-xl border border-hairline/[0.1] bg-surface-1 px-4 py-3 font-inter text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Curated from
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    {new URL(source, SITE_URL).hostname.replace(/^www\./, "")}
                  </a>
                </p>
              )}

              <Markdown>{post.content}</Markdown>

              <p className="mt-14 flex flex-wrap items-center gap-2 border-t border-hairline/[0.08] pt-8 font-inter text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                A question about this article?
                <a
                  href={`${WHATSAPP_URL.split("?")[0]}?text=${encodeURIComponent(`Hi Usama, I read "${post.title}" and have a question`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Ask me on WhatsApp
                </a>
              </p>
            </div>

            {headings.length > 2 && (
              <nav aria-label="Table of contents" className="order-first lg:sticky lg:top-28 lg:order-none">
                <div className="rounded-2xl border border-hairline/[0.1] bg-surface-1 p-5">
                  <p className="mono-tiny text-subtle">In this article</p>
                  <ol className="mt-3 space-y-2">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="block font-inter text-sm leading-snug text-muted-foreground transition-colors duration-standard hover:text-foreground">
                          {h.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
            )}
          </div>
        </article>

        <Suspense fallback={<div className="py-24" />}>
          <BlogRecommendations currentPostId={post.id} tags={post.tags} />
          <FinalCTA location="blog_post" secondary={{ to: "/blog", label: "More articles" }} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BlogPost;
