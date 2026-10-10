import { blogsData } from "../../src/data/blogs";
import { projectsData } from "../../src/data/projects";
import { caseStudies } from "../../src/data/caseStudies";
import type { PostEntry, ProjectEntry } from "../../src/data/types";

/**
 * Turns the original TypeScript content files into database-shaped entries.
 * Used to seed an empty database, and as the snapshot when no database is
 * configured (a fresh clone, or a Lovable build without the env vars).
 */

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

/** Home page "Selected work", in display order. */
const FEATURED = [6, 18, 19, 20, 5, 15];

export function seedPosts(): PostEntry[] {
  return blogsData
    .map((p) => ({ ...p, status: "published" as const }))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export function seedProjects(): ProjectEntry[] {
  const entries = new Map<number, ProjectEntry>();

  for (const p of Object.values(projectsData)) {
    entries.set(p.id, {
      id: p.id,
      slug: slugify(p.title),
      status: "published",
      featured: 0,
      sortOrder: 200 + p.id,
      project: p,
      caseStudy: null,
    });
  }

  let nextId = Math.max(...entries.keys()) + 1;
  caseStudies.forEach((c, i) => {
    const pageId = c.detailPath ? Number(c.detailPath.replace("/project/", "")) : null;
    const existing = pageId != null ? entries.get(pageId) : undefined;
    if (existing) {
      existing.caseStudy = c;
      existing.slug = c.id;
      existing.sortOrder = i * 10;
    } else {
      const id = nextId++;
      entries.set(id, {
        id,
        slug: c.id,
        status: "published",
        featured: 0,
        sortOrder: i * 10,
        project: null,
        caseStudy: { ...c, detailPath: undefined },
      });
    }
  });

  FEATURED.forEach((id, i) => {
    const e = entries.get(id);
    if (e) e.featured = i + 1;
  });

  return [...entries.values()].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}
