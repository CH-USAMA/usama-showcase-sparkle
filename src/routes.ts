import { lazyPreload } from "@/lib/lazyPreload";
import { BlogRecommendations, FinalCTA, Footer, TechMatrix, TrackRecord, TrendingRepos } from "@/components/lazyParts";

/*
 * Route-level pages, split into their own chunks. Index is not here: it is
 * imported eagerly by App, because it is the landing page.
 */
export const Projects = lazyPreload(() => import("./pages/Projects"));
export const ProjectDetail = lazyPreload(() => import("./pages/ProjectDetail"));
export const NotFound = lazyPreload(() => import("./pages/NotFound"));
export const Auth = lazyPreload(() => import("./pages/Auth"));
export const Blog = lazyPreload(() => import("./pages/Blog"));
export const BlogPost = lazyPreload(() => import("./pages/BlogPost"));
export const AdminDashboard = lazyPreload(() => import("./pages/AdminDashboard"));
export const PostEditor = lazyPreload(() => import("./pages/PostEditor"));
export const ProjectEditor = lazyPreload(() => import("./pages/ProjectEditor"));
export const GitHubReadme = lazyPreload(() => import("./pages/GitHubReadme"));
export const AdminScraper = lazyPreload(() => import("./pages/AdminScraper"));
export const Book = lazyPreload(() => import("./pages/Book"));
export const Services = lazyPreload(() => import("./pages/Services"));
export const ServiceDetail = lazyPreload(() => import("./pages/ServiceDetail"));
export const Checklist = lazyPreload(() => import("./pages/Checklist"));
export const LearnAI = lazyPreload(() => import("./pages/LearnAI"));
export const Tools = lazyPreload(() => import("./pages/tools/Tools"));
export const PromptBuilder = lazyPreload(() => import("./pages/tools/PromptBuilder"));
export const MvpPlanner = lazyPreload(() => import("./pages/tools/MvpPlanner"));
export const AiCostCalculator = lazyPreload(() => import("./pages/tools/AiCostCalculator"));

type Preloadable = { preload: () => Promise<unknown> };
const load = (...parts: Preloadable[]) => Promise.all(parts.map((part) => part.preload()));

/**
 * The page module for a pathname (mirrors the <Routes> table in App.tsx), with
 * the lazy parts that page renders, so its first render needs no fallback.
 */
export function preloadRoute(pathname: string): Promise<unknown> {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return Promise.resolve();
  if (p === "/projects") return load(Projects, TrackRecord, FinalCTA, Footer);
  if (/^\/project\/[^/]+$/.test(p)) return load(ProjectDetail, FinalCTA, Footer);
  if (p === "/blog") return load(Blog, TrendingRepos, Footer);
  if (/^\/blog\/[^/]+$/.test(p)) return load(BlogPost, BlogRecommendations, FinalCTA, Footer);
  if (p === "/services") return load(Services, TechMatrix, FinalCTA, Footer);
  if (/^\/services\/[^/]+$/.test(p) || p === "/virtual-assistant") return load(ServiceDetail, FinalCTA, Footer);
  if (p === "/book") return load(Book);
  if (p === "/laravel-scaling-checklist") return load(Checklist);
  if (p === "/learn-ai") return load(LearnAI);
  if (p === "/tools") return load(Tools);
  if (p === "/tools/prompt-builder") return load(PromptBuilder);
  if (p === "/tools/mvp-planner") return load(MvpPlanner);
  if (p === "/tools/ai-cost-calculator") return load(AiCostCalculator);
  if (/^\/github\/[^/]+$/.test(p)) return load(GitHubReadme, Footer);
  if (p === "/auth" || p.startsWith("/admin")) return Promise.resolve();
  return load(NotFound);
}
