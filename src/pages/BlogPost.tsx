import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { useTrendingBlogs } from '@/hooks/useTrendingBlogs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import BlogComments from '@/components/BlogComments';
import BlogRecommendations from '@/components/BlogRecommendations';
import { ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: trendingPosts = [] } = useTrendingBlogs();

  const post = useMemo(() => {
    return blogsData.find(p => p.slug === slug) || trendingPosts.find((p: any) => p.slug === slug);
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
              dangerouslySetInnerHTML={{
                __html: text
                  .slice(lastIndex, match.index)
                  .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\n/g, '<br>')
              }}
            />
          );
        }

        const language = match[1] || 'javascript';
        const code = match[2].trim();
        parts.push(
          <SyntaxHighlighter
            key={`code-${match.index}`}
            language={language}
            style={vscDarkPlus}
            customStyle={{ borderRadius: '8px', fontSize: '14px', lineHeight: '1.5', margin: '1.5rem 0' }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        );

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push(
          <div
            key={`text-${lastIndex}`}
            dangerouslySetInnerHTML={{
              __html: text
                .slice(lastIndex)
                .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>')
            }}
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
                <span>{Math.ceil(post.content.length / 1000)} min read</span>
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
                <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl" />
              </div>
            )}

            <article className="prose prose-lg max-w-none blog-content">
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

            {(post as any).source_url && (
              <div className="mt-8 p-4 rounded-xl border border-border bg-muted/50">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Source: </span>
                  <a href={(post as any).source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {(post as any).source_url}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Curated and commented by Usama Munawar</p>
              </div>
            )}

            <div className="mt-16 pt-8 border-t border-border">
              <BlogComments blogPostId={post.id} />
            </div>

            <BlogRecommendations currentPostId={post.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
