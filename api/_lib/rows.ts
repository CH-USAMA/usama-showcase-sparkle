import type { Row } from "@libsql/client/web";
import type { CaseStudy, PostEntry, Project, ProjectEntry } from "../../src/data/types.js";

/** Row ↔ object mapping for both tables. JSON columns are parsed here once. */

const json = <T>(v: unknown, fallback: T): T => {
  if (typeof v !== "string" || v === "") return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
};

export function toPost(r: Row, withContent = true): PostEntry {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    seo_title: r.seo_title == null || String(r.seo_title).trim() === "" ? undefined : String(r.seo_title),
    excerpt: String(r.excerpt ?? ""),
    content: withContent ? String(r.content ?? "") : "",
    featured_image: r.featured_image == null ? null : String(r.featured_image),
    author: String(r.author ?? "Usama Munawar"),
    tags: json<string[]>(r.tags, []),
    status: r.status === "published" ? "published" : "draft",
    published_at: String(r.published_at),
    updated_at: r.updated_at == null ? undefined : String(r.updated_at),
  };
}

export function toProject(r: Row): ProjectEntry {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    status: r.status === "published" ? "published" : "draft",
    featured: Number(r.featured ?? 0),
    sortOrder: Number(r.sort_order ?? 0),
    project: json<Project | null>(r.project, null),
    caseStudy: json<CaseStudy | null>(r.case_study, null),
    updatedAt: r.updated_at == null ? undefined : String(r.updated_at),
  };
}

export const POST_LIST_COLUMNS =
  "id, slug, title, seo_title, excerpt, featured_image, author, tags, status, published_at, updated_at";
