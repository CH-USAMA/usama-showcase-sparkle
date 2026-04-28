import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trendingRepos } from '@/data/github-trending';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, GitFork, ExternalLink, BookOpen, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const formatStars = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const TrendingRepos = () => {
  const [filter, setFilter] = useState<'all' | 'AI' | 'Web Dev'>('all');

  const filtered = filter === 'all'
    ? trendingRepos
    : trendingRepos.filter(r => r.category === filter);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Trending GitHub Repos</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Top open-source projects in AI & Web Development, curated with full README access
            </p>
            <div className="flex justify-center gap-2">
              {(['all', 'AI', 'Web Dev'] as const).map(cat => (
                <Button
                  key={cat}
                  variant={filter === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? 'All' : cat}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filtered.map((repo, index) => (
            <AnimatedSection key={repo.id} delay={index * 0.08}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={repo.owner_avatar}
                      alt={repo.full_name}
                      className="w-10 h-10 rounded-lg"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight truncate group-hover:text-primary transition-colors">
                        {repo.full_name}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500" />
                          {formatStars(repo.stars)}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {formatStars(repo.forks)}
                        </span>
                        {repo.language && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {repo.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="tech" className="text-xs">{repo.category}</Badge>
                    {repo.topics.slice(0, 2).map(t => (
                      <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/github/${repo.id}`}>
                        <BookOpen className="h-3.5 w-3.5 mr-1" />
                        README
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingRepos;
