import { useMemo, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { useTrendingBlogs } from '@/hooks/useTrendingBlogs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import BlogComments from '@/components/BlogComments';
import BlogRecommendations from '@/components/BlogRecommendations';
import { ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

// Lazy-load the syntax highlighter (~631KB) so it only downloads for posts that actually render code blocks.
const CodeBlock = lazy(() => import('@/components/CodeBlock'));

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const inline = (text: string) =>
  text
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

const renderMarkdown = (text: string) =>
  text
    .split('\n')
    .map((line) => {
      const h2 = line.match(/^##\s+(.*)$/);
      if (h2) return `<h2 id="${slugify(h2[1])}">${inline(h2[1])}</h2>`;
      const h3 = line.match(/^###\s+(.*)$/);
      if (h3) return `<h3 id="${slugify(h3[1])}">${inline(h3[1])}</h3>`;
      return `${inline(line)}<br>`;
    })
    .join('');

// Table of contents entries from the top-level markdown headings, ignoring fenced code blocks.
const extractHeadings = (content: string) => {
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  return Array.from(withoutCode.matchAll(/^##\s+(.*)$/gm)).map((m) => ({
    id: slugify(m[1]),
    label: m[1].trim(),
  }));
};

const readingTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));


const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: trendingPosts = [] } = useTrendingBlogs();

  const post = useMemo(() => {
    return blogsData.find(p => p.slug === slug) || trendingPosts.find((p) => p.slug === slug);
  }, [slug, trendingPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogContent = ({ content }: { content: string }) => {
    const processContent = (text: string) => {
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(
            <div
              key={`text-${lastIndex}`}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(text.slice(lastIndex, match.index)) }}
            />
          );
        }

        const language = match[1] || 'javascript';
        const code = match[2].trim();
        parts.push(
          <Suspense key={`code-${match.index}`} fallback={<pre className="rounded-lg p-4 my-6 bg-muted overflow-x-auto text-sm"><code>{code}</code></pre>}>
            <CodeBlock language={language} code={code} />
          </Suspense>
        );

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push(
          <div
            key={`text-${lastIndex}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(text.slice(lastIndex)) }}
          />
        );
      }

      return parts;
    };

    return <div>{processContent(content)}</div>;
  };


  if (!post) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild><Link to="/blog">Back to Blog</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <>
    <SEOHead
      title={post.title.length > 55 ? post.title.slice(0, 55).replace(/[\s,.;:]+\S*$/, '') + '…' : post.title}
      description={post.excerpt}
      canonical={`https://dev-usama-portfolio.vercel.app/blog/${post.slug}`}
      ogType="article"
      ogImage={post.featured_image || undefined}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.featured_image ? [post.featured_image] : undefined,
          "author": {
            "@type": "Person",
            "name": post.author || "Usama Munawar",
            "url": "https://dev-usama-portfolio.vercel.app",
          },
          "publisher": {
            "@type": "Person",
            "name": "Usama Munawar",
            "url": "https://dev-usama-portfolio.vercel.app",
            "logo": {
              "@type": "ImageObject",
              "url": "https://dev-usama-portfolio.vercel.app/favicon.png",
            },
          },
          "datePublished": post.published_at,
          "dateModified": post.published_at,
          "keywords": (post.tags || []).join(", "),
          "articleSection": post.tags?.[0] || "Engineering",
          "url": `https://dev-usama-portfolio.vercel.app/blog/${post.slug}`,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://dev-usama-portfolio.vercel.app/blog/${post.slug}`,
          },
          "wordCount": post.content ? post.content.split(/\s+/).length : undefined,
          "inLanguage": "en-US",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dev-usama-portfolio.vercel.app/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dev-usama-portfolio.vercel.app/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://dev-usama-portfolio.vercel.app/blog/${post.slug}` },
          ],
        },
      ]}
    />
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex justify-between items-start mb-12">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            <ThemeToggle />
          </div>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readingTime(post.content)} min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="px-3 py-1">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {post.featured_image && (
              <div className="mb-12">
                <img loading="lazy" decoding="async" width={1200} height={630} src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl" />
              </div>
            )}

            {extractHeadings(post.content).length > 2 && (
              <nav
                aria-label="Table of contents"
                className="mb-12 rounded-2xl border border-border/40 bg-muted/30 p-6"
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">In this article</h2>
                <ol className="space-y-2 list-decimal list-inside">
                  {extractHeadings(post.content).map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {h.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="prose prose-lg max-w-none blog-content">
              <style>{`.blog-content h2, .blog-content h3 { scroll-margin-top: 6rem; }`}</style>
              <style>{`
                .blog-content .inline-code {
                  background-color: hsl(var(--muted));
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.375rem;
                  font-family: 'Monaco', 'Consolas', monospace;
                  font-size: 0.875rem;
                  color: hsl(var(--foreground));
                  border: 1px solid hsl(var(--border));
                }
                .blog-content p { margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground)); font-size: 1.125rem; }
                .blog-content h2 { margin-top: 3rem; margin-bottom: 1.5rem; color: hsl(var(--foreground)); font-weight: 700; font-size: 2rem; border-bottom: 2px solid hsl(var(--border)); padding-bottom: 0.5rem; }
                .blog-content h3 { margin-top: 2rem; margin-bottom: 1rem; color: hsl(var(--foreground)); font-size: 1.5rem; font-weight: 600; }
                .blog-content blockquote { border-left: 4px solid hsl(var(--primary)); padding: 1.5rem; margin: 2rem 0; font-style: italic; background: hsl(var(--muted)); border-radius: 0.75rem; }
              `}</style>
              <BlogContent content={post.content} />
            </article>

            {post.source_url && (
              <div className="mt-8 p-4 rounded-xl border border-border bg-muted/50">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Source: </span>
                  <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {post.source_url}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Curated and commented by Usama Munawar</p>
              </div>
            )}

            {/* Conversion CTA for warm blog traffic */}
            <aside className="mt-16 rounded-2xl border border-primary/20 bg-card/60 p-6 sm:p-8 text-center">
              <p className="text-primary text-xs font-inter font-semibold uppercase tracking-[0.25em] mb-3">
                Working on something similar?
              </p>
              <h2 className="text-xl sm:text-2xl font-inter font-bold text-foreground mb-3 tracking-tight">
                Get a second opinion on your architecture
              </h2>
              <p className="text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto mb-6">
                Free 30-minute call. Bring your Laravel scaling, automation, VoIP, or AI integration challenge and leave with a clear next step.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/book">
                  <Button size="lg" variant="hero" className="rounded-xl px-8 shadow-glow">
                    Book a free call
                  </Button>
                </Link>
                <a href="https://wa.me/923038004684?text=Hi%20Usama%2C%20I%20read%20your%20article%20and%20have%20a%20question" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Ask on WhatsApp
                  </Button>
                </a>
              </div>
            </aside>

            <div className="mt-16 pt-8 border-t border-border">
              <BlogComments blogPostId={post.id} />
            </div>


            <BlogRecommendations currentPostId={post.id} />
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default BlogPost;
