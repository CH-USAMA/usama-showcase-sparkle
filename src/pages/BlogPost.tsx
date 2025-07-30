import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import BlogComments from '@/components/BlogComments';
import BlogRecommendations from '@/components/BlogRecommendations';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  published_at: string;
  profiles: {
    full_name: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          published_at,
          profiles (
            full_name
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        setNotFound(true);
        throw error;
      }
      
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: string) => {
    // Enhanced content processing for code blocks and formatting
    const processedContent = content
      // Handle code blocks with language specification
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
        const lang = language || 'javascript';
        const trimmedCode = code.trim();
        return `<div class="code-block-wrapper"><pre><code class="language-${lang}">${trimmedCode}</code></pre></div>`;
      })
      // Handle inline code
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Handle bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Handle italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Handle line breaks
      .replace(/\n/g, '<br>');

    return processedContent;
  };

const BlogContent = ({ content }: { content: string }) => {
  const processContent = (text: string) => {
    // Handle code blocks with syntax highlighting
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
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

      // Add code block with syntax highlighting
      const language = match[1] || 'javascript';
      const code = match[2].trim();
      parts.push(
        <SyntaxHighlighter
          key={`code-${match.index}`}
          language={language}
          style={vscDarkPlus}
          customStyle={{
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '1.5rem 0',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }
    console.log("Fetched posts:", post);
  return (

    
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 opacity-20" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex justify-between items-start mb-12">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            <ThemeToggle />
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>{post.profiles.full_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(post.content.length / 1000)} min read</span>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {post.featured_image && (
              <div className="mb-12 group">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                />
              </div>
            )}
            
            <article className="prose prose-lg max-w-none blog-content">
              <style>{`
                .blog-content .inline-code {
                  background-color: hsl(var(--muted));
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.375rem;
                  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                  font-size: 0.875rem;
                  color: hsl(var(--foreground));
                  border: 1px solid hsl(var(--border));
                }
                .blog-content h1, .blog-content h2 {
                  margin-top: 3rem;
                  margin-bottom: 1.5rem;
                  color: hsl(var(--foreground));
                  font-weight: 700;
                  line-height: 1.2;
                }
                .blog-content h2 {
                  font-size: 2rem;
                  border-bottom: 2px solid hsl(var(--border));
                  padding-bottom: 0.5rem;
                }
                .blog-content h3 {
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                  color: hsl(var(--foreground));
                  font-size: 1.5rem;
                  font-weight: 600;
                }
                .blog-content p {
                  margin-bottom: 1.5rem;
                  line-height: 1.8;
                  color: hsl(var(--foreground));
                  font-size: 1.125rem;
                }
                .blog-content ul, .blog-content ol {
                  margin: 1.5rem 0;
                  padding-left: 2rem;
                }
                .blog-content li {
                  margin-bottom: 0.75rem;
                  line-height: 1.7;
                  font-size: 1.125rem;
                }
                .blog-content blockquote {
                  border-left: 4px solid hsl(var(--primary));
                  padding: 1.5rem;
                  margin: 2rem 0;
                  font-style: italic;
                  background: linear-gradient(135deg, hsl(var(--muted)/0.3), hsl(var(--muted)/0.1));
                  border-radius: 0.75rem;
                  font-size: 1.125rem;
                }
                .blog-content pre {
                  margin: 2rem 0;
                  border-radius: 0.75rem;
                  overflow-x: auto;
                  box-shadow: 0 10px 25px -5px hsl(var(--shadow)/0.1);
                }
              `}</style>
              <BlogContent content={post.content} />
            </article>

            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <BlogComments blogPostId={post.id} />
            </div>

            {/* Recommendations Section */}
            <BlogRecommendations currentPostId={post.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;