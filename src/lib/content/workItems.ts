import type { CaseStudy, FlowStage, Project } from "@/data/types";
import { safeHref } from "@/lib/url";

/** The shape WorkCard renders, built from either a card or a page entry. */
export interface WorkItem {
  key: string;
  title: string;
  category: string;
  year?: string;
  image: string;
  /** Drawn instead of the image when set. */
  diagram?: FlowStage[];
  /** Internal case study route. */
  href?: string;
  /** Live site, used when there is no case study page. */
  external?: string;
}

const isStock = (src: string) => src.includes("images.unsplash.com");

export const fromCaseStudy = (c: CaseStudy): WorkItem => ({
  key: c.id,
  title: c.title,
  category: c.category,
  year: c.year,
  image: c.image,
  diagram: c.cover === "diagram" ? c.flow : undefined,
  href: c.detailPath,
  external: c.detailPath ? undefined : safeHref(c.liveUrl),
});

export const fromProject = (p: Project): WorkItem => ({
  key: `p${p.id}`,
  title: p.title,
  category: p.category,
  year: p.completionDate?.match(/\d{4}/)?.[0],
  image: p.image,
  diagram: isStock(p.image) ? p.technologies.slice(0, 5).map((label) => ({ label })) : undefined,
  href: `/project/${p.id}`,
});
