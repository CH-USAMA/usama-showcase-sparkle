import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { safeHref } from "@/lib/url";
import { PRIORITY_TIMING, responsiveImage } from "@/lib/img";
import { formatDate, readingTime } from "@/lib/postFormat";

/**
 * A blog post as a card, in the same frame as the work cards. Posts without a
 * cover image get a typographic one on the blue panel rather than a hole.
 * `size="lead"` is the wide featured card at the top of /blog.
 */
const PostCard = ({ post, size = "grid", eager = false }: { post: BlogPost; size?: "grid" | "lead"; eager?: boolean }) => {
  const cover = safeHref(post.featured_image);
  const tag = post.tags[0];
  const lead = size === "lead";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`project-card fx-border group flex h-full rounded-2xl border border-hairline/[0.1] bg-surface-1 p-2.5 ${
        lead ? "flex-col md:grid md:grid-cols-[1.15fr_1fr] md:items-center md:gap-4" : "flex-col"
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-hairline/[0.08]">
        {cover ? (
          <img
            {...responsiveImage(cover, { widths: [480, 800], aspect: 16 / 9 })}
            sizes={lead ? "(min-width: 768px) 40rem, calc(100vw - 3rem)" : "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, calc(100vw - 3rem)"}
            alt=""
            width={800}
            height={450}
            loading={eager ? "eager" : "lazy"}
            // The lead card's cover is /blog's largest paint on phones.
            fetchPriority={eager ? "high" : undefined}
            {...(eager ? PRIORITY_TIMING : null)}
            decoding="async"
            className="aspect-[16/9] w-full object-cover transition-transform duration-large ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          <div className="fx-panel relative flex aspect-[16/9] flex-col justify-end p-5" aria-hidden="true">
            <div className="fx-dotgrid absolute inset-0" />
            {tag && <span className="relative font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">{tag}</span>}
            <span className={`relative mt-1.5 line-clamp-3 font-inter font-semibold leading-tight tracking-tight text-white ${lead ? "text-2xl" : "text-lg"}`}>
              {post.title}
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col px-2 pb-2 ${lead ? "pt-5 md:px-6 md:py-6" : "pt-4"}`}>
        <div className="flex flex-wrap items-center gap-x-2 font-inter text-[13px] text-subtle">
          {tag && <span className="font-medium text-primary">{tag}</span>}
          {tag && <span aria-hidden="true">·</span>}
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          {post.content && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.content)} min read</span>
            </>
          )}
        </div>
        <h3
          className={`mt-2 font-inter font-semibold tracking-tight text-foreground ${
            lead ? "text-[1.6rem] leading-tight sm:text-[2rem]" : "line-clamp-2 text-[17px] leading-snug"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-2 font-inter text-sm leading-relaxed text-muted-foreground ${lead ? "line-clamp-3 sm:text-[15px]" : "line-clamp-2"}`}>
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-inter text-[13px] font-medium text-foreground">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
