import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import snapshot from "@/data/snapshot.projects.json";
import type { CaseStudy, Project, ProjectEntry } from "@/data/types";
import { CONTENT_STALE_MS, getJSON } from "./fetch";

/**
 * Projects: the build snapshot first, then the live database (see posts.ts
 * for the reasoning). Each entry can carry a detail page (`project`), a work
 * card (`caseStudy`), or both; the hooks below derive the shapes the pages
 * were built against, so no page needed to learn the database's shape.
 */
const SNAP = snapshot as unknown as { generatedAt: string; projects: ProjectEntry[] };

/** Cards from the build snapshot, for structured data built at module load. */
export const snapshotCaseStudies: CaseStudy[] = SNAP.projects
  .filter((e) => e.caseStudy)
  .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
  .map((e) => ({ ...e.caseStudy!, detailPath: e.project ? `/project/${e.id}` : undefined }));

export function useProjectEntries(): ProjectEntry[] {
  return useProjectQuery().data;
}

function useProjectQuery() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getJSON<ProjectEntry[]>("/api/projects"),
    initialData: SNAP.projects,
    initialDataUpdatedAt: 0,
    staleTime: CONTENT_STALE_MS,
    retry: 1,
  });
}

/** Card for an entry, with `detailPath` pointing at its page if it has one. */
const cardOf = (e: ProjectEntry): CaseStudy | null =>
  e.caseStudy
    ? {
        ...e.caseStudy,
        // Cards without their own year borrow it from their page's delivery date.
        year: e.caseStudy.year ?? e.project?.completionDate?.match(/\d{4}/)?.[0],
        detailPath: e.project ? `/project/${e.id}` : undefined,
      }
    : null;

export function useProjects() {
  const q = useProjectQuery();
  const entries = q.data;
  // True until the live list has answered (or failed): a project published
  // after this build is not in the snapshot yet, and must not 404 meanwhile.
  const settling = !q.isFetchedAfterMount && !q.isError;
  const derived = useMemo(() => {
    const ordered = [...entries].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);

    const projectsById: Record<number, Project> = {};
    for (const e of ordered) if (e.project) projectsById[e.id] = { ...e.project, id: e.id };

    const caseStudies = ordered.map(cardOf).filter((c): c is CaseStudy => c !== null);

    const featured = ordered
      .filter((e) => e.featured > 0)
      .sort((a, b) => a.featured - b.featured)
      .map(cardOf)
      .filter((c): c is CaseStudy => c !== null);

    /** Detail pages with no card: the "Archive" on /projects. */
    const archive = ordered.filter((e) => e.project && !e.caseStudy).map((e) => projectsById[e.id]);

    /** Detail pages in display order, for prev/next navigation. */
    const pages = ordered.filter((e) => e.project).map((e) => projectsById[e.id]);

    return { projectsById, caseStudies, featured, archive, pages };
  }, [entries]);
  return { ...derived, settling };
}
