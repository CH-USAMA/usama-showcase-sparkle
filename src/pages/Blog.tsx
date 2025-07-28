import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
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
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Insights, tutorials, and thoughts on web development and technology
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">No blog posts yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-12">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="md:flex">
                    {post.featured_image && (
                      <div className="md:w-1/3">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={post.featured_image ? "md:w-2/3" : "w-full"}>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.profiles.full_name}
                          </div>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl mb-2">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline">
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;