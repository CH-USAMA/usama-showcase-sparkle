import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, Download, Loader2, RefreshCw, Star, GitFork, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ScrapedRepo {
  id: string;
  full_name: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  topics: string[];
  category: string;
  readme_file: string;
  owner_avatar: string;
  updated_at: string;
  readme_content: string;
}

const AdminScraper = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<ScrapedRepo[]>([]);
  const [scrapedAt, setScrapedAt] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const runScraper = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('scrape-github-trending');
      if (fnError || !data?.success) {
        throw new Error(fnError?.message || data?.error || 'Scrape failed');
      }
      setRepos(data.repos);
      setScrapedAt(data.scraped_at);
      toast({ title: '✅ Scrape complete', description: `Fetched ${data.repos.length} repos with READMEs` });
    } catch (e: any) {
      setError(e.message);
      toast({ title: 'Scrape failed', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const generateIndexTs = () => {
    const reposWithoutReadme = repos.map(({ readme_content, ...rest }) => rest);
    return `export interface TrendingRepo {
  id: string;
  full_name: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  topics: string[];
  category: string;
  readme_file: string;
  owner_avatar: string;
  updated_at: string;
}

export const trendingRepos: TrendingRepo[] = ${JSON.stringify(reposWithoutReadme, null, 2)};
`;
  };

  const downloadFile = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    // Download index.ts
    downloadFile(generateIndexTs(), 'index.ts', 'text/typescript');

    // Download each README
    repos.forEach(repo => {
      if (repo.readme_content) {
        downloadFile(repo.readme_content, repo.readme_file, 'text/markdown');
      }
    });

    toast({ title: '📥 Files downloaded', description: `index.ts + ${repos.length} README files. Place them in src/data/github-trending/` });
  };

  const downloadZip = async () => {
    // Create a simple script that writes all files
    const script = `#!/bin/bash
# Auto-generated scraper output — run from project root
# Generated: ${scrapedAt}

mkdir -p src/data/github-trending/readmes

cat > src/data/github-trending/index.ts << 'INDEXEOF'
${generateIndexTs()}
INDEXEOF

${repos.map(r => `cat > src/data/github-trending/readmes/${r.readme_file} << '${r.id.toUpperCase().replace(/[^A-Z0-9]/g, '_')}EOF'
${r.readme_content || '# No README available'}
${r.id.toUpperCase().replace(/[^A-Z0-9]/g, '_')}EOF`).join('\n\n')}

echo "✅ Updated ${repos.length} repos in src/data/github-trending/"
`;
    downloadFile(script, 'update-trending.sh', 'text/x-shellscript');
    toast({ title: '📥 Shell script downloaded', description: 'Run `bash update-trending.sh` from your project root to update all files' });
  };

  const formatStars = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Admin Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">GitHub Trending Scraper</h1>
          <p className="text-muted-foreground text-lg">
            Fetch trending AI & Web Dev repos from GitHub, scrape their READMEs, and save locally in your project.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button onClick={runScraper} disabled={loading} size="lg" className="gap-2">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                {loading ? 'Scraping GitHub...' : 'Run Scraper Now'}
              </Button>

              {repos.length > 0 && (
                <>
                  <Button onClick={downloadAll} variant="outline" size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download Files
                  </Button>
                  <Button onClick={downloadZip} variant="secondary" size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download Shell Script
                  </Button>
                </>
              )}
            </div>

            {scrapedAt && (
              <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Last scraped: {new Date(scrapedAt).toLocaleString()}
              </p>
            )}

            {error && (
              <p className="mt-4 text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {repos.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Scraped Repos ({repos.length})</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {repos.map(repo => (
                <Card key={repo.id} className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <img loading="lazy" decoding="async" src={repo.owner_avatar} alt="" className="w-8 h-8 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate">{repo.full_name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />{formatStars(repo.stars)}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />{formatStars(repo.forks)}
                          </span>
                          <Badge variant="tech" className="text-xs">{repo.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground line-clamp-2">{repo.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      {repo.readme_content ? (
                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          README scraped ({(repo.readme_content.length / 1024).toFixed(1)}KB)
                        </span>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          No README
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminScraper;
