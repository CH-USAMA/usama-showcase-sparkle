/**
 * Content types shared by the seed files, the build snapshot, the API
 * (`api/`) and the UI. Keep this file free of imports: the Vercel functions
 * and the build scripts import it by relative path.
 */

export interface FlowStage {
  label: string;
  /** Optional sub-label, e.g. the concrete technology at that stage. */
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  /**
   * The <title> for search results when the headline is longer than they
   * show (about 60 characters). Falls back to `title`.
   */
  seo_title?: string;
  slug: string;
  excerpt: string;
  /** Markdown. Omitted from list responses; present on single-post reads. */
  content: string;
  featured_image: string | null;
  published_at: string;
  /** Last edit, for sitemap lastmod and dateModified. */
  updated_at?: string;
  author: string;
  tags: string[];
  /** Set only on posts merged in from the trending feed. */
  is_auto?: boolean;
  source_url?: string;
}

/** A project's full case-study page (/project/:id). */
export interface Project {
  id: number;
  title: string;
  description: string;
  /** Paragraphs separated by blank lines; "THE PROBLEM: ..." labels allowed. */
  fullDescription: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  category: string;
  client?: string;
  duration?: string;
  teamSize?: string;
  completionDate?: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges: { title: string; description: string }[];
  results: string[];
}

/** The card a project shows in the work grids. */
export interface CaseStudy {
  id: string;
  n: string;
  category: string;
  /** Retained for compatibility; the palette collapses all hues to the accent. */
  hue: string;
  title: string;
  metric?: { value: string; label: string };
  image: string;
  /**
   * "diagram" when `image` is an illustration rather than the real product.
   * Those cards render the system's own request path instead (ProjectCover).
   */
  cover?: "screenshot" | "diagram";
  client?: string;
  year?: string;
  role: string;
  problem: string;
  approach: string;
  result: string;
  flow: FlowStage[];
  stack: string[];
  liveUrl?: string;
  /** Route into the detail page where one exists. */
  detailPath?: string;
}

export type ContentStatus = "draft" | "published";

/**
 * One row of the `projects` table, as the API returns it. A project can have a
 * detail page (`project`), a card (`caseStudy`), or both.
 */
export interface ProjectEntry {
  id: number;
  slug: string;
  status: ContentStatus;
  /** 0 = not on the home page; 1..n = position in "Selected work". */
  featured: number;
  sortOrder: number;
  project: Project | null;
  caseStudy: CaseStudy | null;
  updatedAt?: string;
}

export interface PostEntry extends BlogPost {
  status: ContentStatus;
  updated_at?: string;
}

export interface ContentSnapshot {
  generatedAt: string;
  source: "database" | "seed";
  posts: BlogPost[];
  projects: ProjectEntry[];
}
