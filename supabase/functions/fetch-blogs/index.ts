const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RSS_FEEDS = [
  { url: 'https://hnrss.org/newest?q=AI+agent+OR+LLM+OR+automation&count=5', category: 'AI' },
  { url: 'https://hnrss.org/newest?q=Laravel+OR+PHP+OR+MySQL+OR+web+development&count=5', category: 'Web Dev' },
];

async function scrapeContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'UsamaBlogBot/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return '';
    const html = await res.text();
    // Extract text from paragraphs
    const paragraphs: string[] = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m;
    while ((m = pRegex.exec(html)) !== null && paragraphs.length < 15) {
      const text = m[1].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
      if (text.length > 50) paragraphs.push(text);
    }
    return paragraphs.join('\n\n').slice(0, 3000);
  } catch {
    return '';
  }
}

function parseRSSItems(xml: string, category: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    const title = content.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/)?.[1] || content.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = content.match(/<link>(.*?)<\/link>/)?.[1] || '';
    const description = content.match(/<description><!\[CDATA\[(.*?)\]\]>|<description>(.*?)<\/description>/)?.[1]?.replace(/<[^>]*>/g, '').slice(0, 300) || '';
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
      items.push({
        id: `auto-${slug}`,
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        slug,
        excerpt: description.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").slice(0, 200),
        rawDescription: description,
        featured_image: null,
        published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        author: 'Usama Munawar',
        tags: [category],
        source_url: link,
        is_auto: true,
      });
    }
  }
  return items;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const allItems: any[] = [];

    for (const feed of RSS_FEEDS) {
      try {
        const res = await fetch(feed.url, {
          headers: { 'User-Agent': 'UsamaBlogBot/1.0' },
        });
        if (res.ok) {
          const xml = await res.text();
          const items = parseRSSItems(xml, feed.category);
          allItems.push(...items);
        }
      } catch (e) {
        console.error(`Failed to fetch ${feed.url}:`, e);
      }
    }

    // Sort by date, limit to 10
    allItems.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    const latest = allItems.slice(0, 10);

    // Scrape content for top posts in parallel
    await Promise.all(
      latest.map(async (post) => {
        if (post.source_url) {
          const scraped = await scrapeContent(post.source_url);
          post.content = scraped
            ? `${scraped}\n\n---\n\n**Source:** [${post.title}](${post.source_url}) — *Curated by Usama Munawar*`
            : `${post.rawDescription}\n\nRead the full article: [${post.title}](${post.source_url})\n\n---\n*Curated by Usama Munawar*`;
        }
        delete post.rawDescription;
      })
    );

    return new Response(JSON.stringify({ success: true, posts: latest }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ success: false, posts: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
