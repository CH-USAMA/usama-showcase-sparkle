import { Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import AnimatedSection from "@/components/AnimatedSection";

const LatestBlogs = () => {
  const posts = blogsData.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from the Blog</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI engineering, automation, web development & business digitization insights
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.15}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.featured_image} alt={post.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.published_at)}</div>
                    <div className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</div>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">{post.excerpt}</CardDescription>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/blog" className="group">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LatestBlogs;
