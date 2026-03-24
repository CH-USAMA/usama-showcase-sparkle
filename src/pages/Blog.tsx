import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { useTrendingBlogs } from '@/hooks/useTrendingBlogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, Calendar, User, Search, BookOpen, TrendingUp, Rss } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: trendingPosts = [] } = useTrendingBlogs();

  const allPosts = useMemo(() => {
    const combined = [...blogsData, ...trendingPosts];
    combined.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    return combined;
  }, [trendingPosts]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return allPosts;
    const term = searchTerm.toLowerCase();
    return allPosts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [searchTerm, allPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex justify-between items-start mb-12">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <ThemeToggle />
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Latest Articles
              </Badge>
              {trendingPosts.length > 0 && (
                <Badge variant="outline" className="px-3 py-1">
                  <Rss className="h-3 w-3 mr-1" />
                  +{trendingPosts.length} Trending
                </Badge>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
              Blog
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
              Deep dives into AI, automation, web development, Laravel, and business digitization.
              <span className="text-primary font-medium"> Updated daily with trending topics.</span>
            </p>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto mb-16">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-primary/50 rounded-xl bg-card/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 rounded-full bg-muted/50 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">No matching articles found</h2>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
              {filteredPosts.map((post, index) => (
                <Card key={post.id} className={`group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm ${index === 0 ? 'md:grid md:grid-cols-5 md:gap-8' : ''}`}>
                  {post.featured_image && (
                    <div className={`overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
                      <img src={post.featured_image} alt={post.title} loading="lazy" className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${index === 0 ? 'h-64 md:h-full' : 'h-48'}`} />
                    </div>
                  )}
                  <div className={`${post.featured_image && index === 0 ? "md:col-span-3" : ""} p-8`}>
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        {(post as any).is_auto && <Badge variant="outline" className="text-xs">Trending</Badge>}
                      </div>
                      <CardTitle className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'} mb-4 leading-tight`}>
                        <Link to={(post as any).source_url || `/blog/${post.slug}`} target={(post as any).source_url ? "_blank" : undefined} className="group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className={`${index === 0 ? 'text-lg' : 'text-base'} leading-relaxed text-muted-foreground`}>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Button asChild variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary/80">
                        <Link to={(post as any).source_url || `/blog/${post.slug}`} target={(post as any).source_url ? "_blank" : undefined}>
                          Read Article →
                        </Link>
                      </Button>
                    </CardContent>
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
