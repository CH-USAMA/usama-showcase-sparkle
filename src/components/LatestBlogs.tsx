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
    <section className="py-24 bg-secondary/20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px glow-line" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Blog</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold mb-4 text-foreground tracking-tight">Latest from the Blog</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
              AI engineering, automation, web development & business digitization insights
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.15}>
              <Card className="overflow-hidden hover:shadow-glow transition-all duration-500 h-full border-border/30 bg-card/60 backdrop-blur-sm rounded-2xl group">
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.featured_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 font-inter">
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.published_at)}</div>
                    <div className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</div>
                  </div>
                  <CardTitle className="text-lg font-display leading-tight">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3 font-inter">{post.excerpt}</CardDescription>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs rounded-lg font-inter">{tag}</Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-lg">
                    <Link to={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center">
            <Button asChild size="lg" className="rounded-xl px-10">
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
