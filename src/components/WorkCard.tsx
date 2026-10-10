import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectCover from "@/components/system/ProjectCover";
import { thumbOf } from "@/lib/thumbs";
import type { WorkItem } from "@/lib/content/workItems";

/**
 * One card for every piece of work, on the home page and on /projects: the
 * screenshot inset in a dark frame, then name and category on the left and
 * the year on the right. Projects whose only image is an illustration get
 * their own system path drawn on a blue panel instead.
 */
const WorkCard = ({ item, eager = false }: { item: WorkItem; eager?: boolean }) => {
  const body = (
    <>
      <div className="overflow-hidden rounded-xl border border-hairline/[0.08] bg-surface-2">
        {item.diagram ? (
          <ProjectCover stages={item.diagram} caption={item.category} tone="panel" decorative />
        ) : (
          <img
            src={thumbOf(item.image)}
            alt=""
            width={720}
            height={450}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-large ease-out-expo group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex items-end justify-between gap-4 px-2 pb-1.5 pt-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-inter text-[17px] font-semibold leading-snug tracking-tight text-foreground">{item.title}</h3>
          <p className="mt-0.5 truncate font-inter text-sm text-muted-foreground">{item.category}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {item.year && <span className="font-inter text-sm tabular-nums text-subtle">{item.year}</span>}
          {(item.href || item.external) && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline/[0.12] text-muted-foreground transition-colors duration-standard group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const cls =
    "project-card fx-border group block h-full rounded-2xl border border-hairline/[0.1] bg-surface-1 p-2.5";

  if (item.href) {
    return (
      <Link to={item.href} className={cls}>
        {body}
      </Link>
    );
  }
  if (item.external) {
    return (
      <a href={item.external} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  }
  return <div className={cls}>{body}</div>;
};

export default WorkCard;
