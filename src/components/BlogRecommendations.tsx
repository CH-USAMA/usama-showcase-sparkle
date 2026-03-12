import { Link } from 'react-router-dom';
import { blogsData } from '@/data/blogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface BlogRecommendationsProps {
  currentPostId: string;
  maxRecommendations?: number;
}

const BlogRecommendations = ({ currentPostId, maxRecommendations = 3 }: BlogRecommendationsProps) => {
  const recommendations = blogsData
    .filter(post => post.id !== currentPostId)
    .slice(0, maxRecommendations);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-8 text-center">Recommended Reading</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
            <Link to={`/blog/${post.slug}`} className="block">
              {post.featured_image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.published_at)}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogRecommendations;
