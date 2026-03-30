const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TOPICS: Record<string, string[]> = {
  AI: ['artificial-intelligence', 'machine-learning', 'llm', 'deep-learning', 'langchain'],
  'Web Dev': ['laravel', 'react', 'nextjs', 'php', 'nodejs'],
};

async function ghFetch(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'UsamaTrendingBot/1.0', Accept: 'application/vnd.github.v3+json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json();
}

async function fetchReadme(owner: string, repo: string): Promise<string> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { 'User-Agent': 'UsamaTrendingBot/1.0', Accept: 'application/vnd.github.v3.raw' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const seen = new Set<string>();
    const allRepos: any[] = [];

    for (const [category, topics] of Object.entries(TOPICS)) {
      for (const topic of topics) {
        try {
          const data = await ghFetch(
            `https://api.github.com/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=5`
          );
          if (!data?.items) continue;

          for (const item of data.items) {
            if (seen.has(item.full_name)) continue;
            seen.add(item.full_name);

            const [owner, repoName] = item.full_name.split('/');
            const readme = await fetchReadme(owner, repoName);
            const safeName = item.full_name.replace('/', '--');

            allRepos.push({
              id: `gh-${safeName}`,
              full_name: item.full_name,
              name: item.name,
              description: item.description || '',
              stars: item.stargazers_count,
              forks: item.forks_count,
              language: item.language || '',
              url: item.html_url,
              topics: (item.topics || []).slice(0, 5),
              category,
              readme_file: `${safeName}.md`,
              owner_avatar: item.owner.avatar_url,
              updated_at: item.pushed_at || new Date().toISOString(),
              readme_content: readme,
            });
          }
          // Small delay to respect rate limits
          await new Promise(r => setTimeout(r, 300));
        } catch (e) {
          console.error(`Failed topic ${topic}:`, e);
        }
      }
    }

    // Sort by stars, take top 10
    allRepos.sort((a, b) => b.stars - a.stars);
    const top10 = allRepos.slice(0, 10);

    return new Response(JSON.stringify({ success: true, repos: top10, scraped_at: new Date().toISOString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
