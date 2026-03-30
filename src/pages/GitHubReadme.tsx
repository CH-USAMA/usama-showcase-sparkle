import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { trendingRepos } from '@/data/github-trending';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, GitFork, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const formatStars = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const GitHubReadme = () => {
  const { repoId } = useParams();
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const repo = trendingRepos.find(r => r.id === repoId);

  useEffect(() => {
    if (!repo) return;
    const loadReadme = async () => {
      try {
        const mod = await import(`../data/github-trending/readmes/${repo.readme_file}?raw`);
        setReadme(mod.default);
      } catch {
        setReadme('# README not available\n\nVisit the repository on GitHub for the full README.');
      }
      setLoading(false);
    };
    loadReadme();
  }, [repo]);

  if (!repo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Repository not found</h1>
          <Button asChild><Link to="/blog">Back to Blog</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-start gap-4 mb-8">
          <img src={repo.owner_avatar} alt={repo.full_name} className="w-16 h-16 rounded-xl" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{repo.full_name}</h1>
            <p className="text-lg text-muted-foreground mb-3">{repo.description}</p>
            <div className="flex items-center flex-wrap gap-3">
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                {formatStars(repo.stars)} stars
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <GitFork className="h-4 w-4" />
                {formatStars(repo.forks)} forks
              </span>
              <Badge variant="tech">{repo.category}</Badge>
              {repo.language && <Badge variant="outline">{repo.language}</Badge>}
              <Button asChild variant="outline" size="sm">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-xl p-6 md:p-10 bg-card">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-img:rounded-lg prose-a:text-primary">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GitHubReadme;
