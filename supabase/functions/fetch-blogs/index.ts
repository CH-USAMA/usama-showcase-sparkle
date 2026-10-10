const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RSS_FEEDS = [
  { url: 'https://hnrss.org/newest?q=AI+agent+OR+LLM+OR+automation&count=5', category: 'AI' },
  { url: 'https://hnrss.org/newest?q=Laravel+OR+PHP+OR+MySQL+OR+web+development&count=5', category: 'Web Dev' },
];

const STOCK_IMAGES: Record<string, string[]> = {
  AI: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop',
  ],
  'Web Dev': [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  ],
};

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

/** A feed item in the shape the site's BlogPost uses (is_auto: curated). */
interface FeedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  rawDescription?: string;
  content?: string;
  featured_image: string;
  published_at: string;
  author: string;
  tags: string[];
  source_url: string;
  is_auto: true;
}

function parseRSSItems(xml: string, category: string) {
  const items: FeedPost[] = [];
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
      const images = STOCK_IMAGES[category] || STOCK_IMAGES['AI'];
      const imageIndex = items.length % images.length;
      const cleanTitle = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      const cleanExcerpt = description.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").slice(0, 200);
      items.push({
        id: `auto-${slug}`,
        title: cleanTitle,
        slug,
        // No invented excerpt: an empty one is better than template filler.
        excerpt: cleanExcerpt,
        rawDescription: description,
        featured_image: images[imageIndex],
        published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        // Third-party content: credit the source, never the site owner.
        author: (() => { try { return new URL(link).hostname.replace(/^www\./, ''); } catch { return 'External source'; } })(),
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
    const allItems: FeedPost[] = [];
    // hnrss.org fails now and then; the answer says so, and the site does
    // not cache or show a partial answer in place of a fuller one.
    let failedFeeds = 0;

    for (const feed of RSS_FEEDS) {
      try {
        const res = await fetch(feed.url, {
          headers: { 'User-Agent': 'UsamaBlogBot/1.0' },
        });
        if (res.ok) {
          const xml = await res.text();
          const items = parseRSSItems(xml, feed.category);
          allItems.push(...items);
        } else {
          failedFeeds++;
        }
      } catch (e) {
        failedFeeds++;
        console.error(`Failed to fetch ${feed.url}:`, e);
      }
    }

    // A post can match both feeds' searches: keep it once.
    const seenLinks = new Set<string>();
    const unique = allItems.filter((p) => {
      const key = p.source_url || p.id;
      if (seenLinks.has(key)) return false;
      seenLinks.add(key);
      return true;
    });

    // Sort by date, limit to 10
    unique.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    const latest = unique.slice(0, 10);

    // Two posts with the same title get the same slug (and id): number the later ones.
    const slugCount = new Map<string, number>();
    for (const post of latest) {
      const n = (slugCount.get(post.slug) ?? 0) + 1;
      slugCount.set(post.slug, n);
      if (n > 1) {
        post.slug = `${post.slug}-${n}`;
        post.id = `auto-${post.slug}`;
      }
    }

    // Scrape content for top posts in parallel
    await Promise.all(
      latest.map(async (post) => {
        if (post.source_url) {
          const scraped = await scrapeContent(post.source_url);
          post.content = scraped
            ? `${scraped}\n\n---\n\n**Source:** [${post.title}](${post.source_url}), *Curated by Usama Munawar*`
            : `${post.rawDescription}\n\nRead the full article: [${post.title}](${post.source_url})\n\n---\n*Curated by Usama Munawar*`;
        }
        delete post.rawDescription;
      })
    );

    return new Response(JSON.stringify({ success: true, partial: failedFeeds > 0, posts: latest }), {
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
