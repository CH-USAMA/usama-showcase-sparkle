import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, Calendar, User, Search, BookOpen, TrendingUp } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return blogsData;
    const term = searchTerm.toLowerCase();
    return blogsData.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
              Blog
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
              Deep dives into AI engineering, agent architecture, automation, and building production ML systems.
              <span className="text-primary font-medium"> Ship fast. Think deep.</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-4 py-2">AI Agents</Badge>
              <Badge variant="outline" className="px-4 py-2">RAG Systems</Badge>
              <Badge variant="outline" className="px-4 py-2">Automation</Badge>
              <Badge variant="outline" className="px-4 py-2">Full Stack</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto mb-16">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search articles, tutorials, insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-primary/50 rounded-xl bg-card/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 rounded-full bg-muted/50 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">No matching articles found</h2>
                <p className="text-muted-foreground">Try adjusting your search terms.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
              {filteredPosts.map((post, index) => (
                <Card key={post.id} className={`group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm ${index === 0 ? 'md:grid md:grid-cols-5 md:gap-8' : ''}`}>
                  {post.featured_image && (
                    <div className={`overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${index === 0 ? 'h-64 md:h-full' : 'h-48'}`}
                      />
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
                        {index === 0 && (
                          <Badge variant="secondary" className="ml-auto">Latest</Badge>
                        )}
                      </div>
                      <CardTitle className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'} mb-4 leading-tight`}>
                        <Link to={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className={`${index === 0 ? 'text-lg' : 'text-base'} leading-relaxed text-muted-foreground`}>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <Button asChild variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary/80 group/btn">
                        <Link to={`/blog/${post.slug}`} className="flex items-center gap-2">
                          Read Article
                          <ArrowLeft className="h-4 w-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
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
