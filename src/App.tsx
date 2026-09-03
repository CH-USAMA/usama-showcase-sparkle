import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Analytics from "./components/Analytics";
import Cursor from "@/components/system/Cursor";

/* Deferred because none of it is needed to paint the landing page.
 *
 * - AuthGate is the lazy boundary around AuthProvider, which was dragging
 *   @supabase/supabase-js into the entry chunk on every route.
 * - The two toasters render nothing until a toast fires, and every caller
 *   (BlogComments, AdminScraper, Auth) is itself on a lazy route.
 * - TooltipProvider was removed outright: no component in the app renders a
 *   Tooltip, so it was pure weight at the root.
 */
const CommandMenu = lazy(() => import("@/components/CommandMenu"));
const AuthGate = lazy(() => import("@/components/system/AuthGate"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PostEditor = lazy(() => import("./pages/PostEditor"));
const GitHubReadme = lazy(() => import("./pages/GitHubReadme"));
const AdminScraper = lazy(() => import("./pages/AdminScraper"));
const Book = lazy(() => import("./pages/Book"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Checklist = lazy(() => import("./pages/Checklist"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Analytics />
    <Cursor />
    <Suspense fallback={null}>
      <CommandMenu />
      <Toaster />
      <Sonner />
    </Suspense>
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
  </QueryClientProvider>
);

export default App;
