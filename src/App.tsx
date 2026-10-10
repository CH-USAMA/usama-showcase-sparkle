import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Analytics from "./components/Analytics";
import Cursor from "@/components/system/Cursor";
import ScrollManager from "@/components/system/ScrollManager";
import CommandMenuGate from "@/components/system/CommandMenuGate";
import { endBoot, restoreBoot, useBeforePaint } from "@/lib/boot";
import ChunkErrorBoundary from "@/components/system/ChunkErrorBoundary";

/* Deferred because none of it is needed to paint the landing page.
 *
 * - AuthGate is the lazy boundary around AuthProvider, which was dragging
 *   @supabase/supabase-js into the entry chunk on every route.
 * - The two toasters render nothing until a toast fires, and every caller
 *   (AdminScraper, Auth) is itself on a lazy route.
 * - TooltipProvider was removed outright: no component in the app renders a
 *   Tooltip, so it was pure weight at the root.
 */
const AuthGate = lazy(() => import("@/components/system/AuthGate"));

// Route pages live in src/routes.ts, each with a preload() (see main.tsx).
import {
  AdminDashboard,
  AdminScraper,
  Auth,
  Blog,
  BlogPost,
  Book,
  Checklist,
  GitHubReadme,
  NotFound,
  PostEditor,
  ProjectDetail,
  ProjectEditor,
  Projects,
  ServiceDetail,
  Services,
} from "./routes";

const queryClient = new QueryClient();

// Accent picker for comparing palettes on localhost; dropped from prod builds.
const PaletteSwitcher = import.meta.env.DEV
  ? lazy(() => import("@/components/dev/PaletteSwitcher"))
  : null;

/** Puts the reader back where they were on the prerendered page (lib/boot.ts). */
const BootRestore = () => {
  useBeforePaint(restoreBoot, []);
  return null;
};

const App = () => {
  // The first render (over prerendered HTML) has committed; see lib/boot.ts.
  useBeforePaint(endBoot, []);
  return (
  <QueryClientProvider client={queryClient}>
    {/* First child: its layout effect runs before the page's own. */}
    <BootRestore />
    <Analytics />
    <ScrollManager />
    <Cursor />
    {/* Overlays load on demand: the palette on its shortcut, toasts on the
        two pages that raise them (Auth, AdminScraper). Sonner had no callers. */}
    <CommandMenuGate />
    {PaletteSwitcher && (
      <Suspense fallback={null}>
        <PaletteSwitcher />
      </Suspense>
    )}
    <ChunkErrorBoundary>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route
          path="/auth"
          element={
            <AuthGate>
              <Auth />
            </AuthGate>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route
          path="/admin/dashboard"
          element={
            <AuthGate>
              <AdminDashboard />
            </AuthGate>
          }
        />
        <Route
          path="/admin/posts/new"
          element={
            <AuthGate>
              <PostEditor />
            </AuthGate>
          }
        />
        <Route
          path="/admin/posts/:id/edit"
          element={
            <AuthGate>
              <PostEditor />
            </AuthGate>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <AuthGate>
              <ProjectEditor />
            </AuthGate>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <AuthGate>
              <ProjectEditor />
            </AuthGate>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/scraper"
          element={
            <AuthGate>
              <AdminScraper />
            </AuthGate>
          }
        />
        <Route path="/github/:repoId" element={<GitHubReadme />} />
        <Route path="/book" element={<Book />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/laravel-scaling-checklist" element={<Checklist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </ChunkErrorBoundary>
  </QueryClientProvider>
  );
};

export default App;
