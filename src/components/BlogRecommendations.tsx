import { useMemo } from "react";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/system/Reveal";
import { usePosts } from "@/lib/content/posts";

/**
 * "Keep reading": three other written posts, preferring ones that share a tag
 * with the current post, newest first.
 */
const BlogRecommendations = ({ currentPostId, tags = [] }: { currentPostId: string; tags?: string[] }) => {
  const posts = usePosts();
  const picks = useMemo(() => {
    const others = posts.filter((p) => p.id !== currentPostId && !p.is_auto);
    const score = (t: string[]) => t.filter((x) => tags.includes(x)).length;
    return [...others].sort((a, b) => score(b.tags) - score(a.tags) || b.published_at.localeCompare(a.published_at)).slice(0, 3);
  }, [posts, currentPostId, tags]);

  if (picks.length === 0) return null;

  return (
    <section aria-labelledby="keep-reading" className="container mx-auto mt-24 lg:mt-28">
      <h2 id="keep-reading" className="type-h3 text-foreground">
        Keep <em>reading</em>
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {picks.map((p, i) => (
          <Reveal key={p.id} index={i}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default BlogRecommendations;
