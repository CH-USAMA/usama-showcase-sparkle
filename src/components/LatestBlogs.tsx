import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
  profiles: {
    full_name: string;
  };
}

const LatestBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image,
          published_at,
          profiles (
            full_name
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest insights, tutorials, and thoughts on web development
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.published_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.profiles.full_name}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/blog/${post.slug}`}>
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/blog" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;