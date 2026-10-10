import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Plus } from "lucide-react";
import { AdminShell, Notice, StatusPill } from "@/components/admin/AdminUI";
import CTA from "@/components/system/CTA";
import { AdminError, adminFetch } from "@/lib/content/admin";
import type { PostEntry, ProjectEntry } from "@/data/types";

/**
 * /admin/dashboard: every post and project in the database, drafts included.
 * Reads go through /api/admin, so this page only works for allowlisted admins;
 * anyone else sees the server's refusal, not the data.
 */
type Tab = "posts" | "projects";

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("posts");

  const posts = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => adminFetch<PostEntry[]>("posts"),
    retry: false,
  });
  const projects = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => adminFetch<ProjectEntry[]>("projects"),
    retry: false,
  });

  const err = (posts.error ?? projects.error) as AdminError | null;

  return (
    <AdminShell
      title="Content"
      actions={
        <>
          <CTA to="/admin/posts/new" size="md">
            <span className="inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" aria-hidden="true" /> New post
            </span>
          </CTA>
          <CTA to="/admin/projects/new" tone="ghost" size="md">
            <span className="inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" aria-hidden="true" /> New project
            </span>
          </CTA>
        </>
      }
    >
      {err && (
        <div className="mb-6">
          <Notice>
            {err.message}
            {err.status === 403 &&
              ". Add this account's email to ADMIN_EMAILS (in .env.local, and in Vercel's environment variables), then restart the dev server."}
          </Notice>
        </div>
      )}

      <div className="flex gap-1 border-b border-hairline/[0.08]" role="tablist">
        {(["posts", "projects"] as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2.5 font-inter text-sm font-medium capitalize transition-colors ${
              tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            <span className="ml-1.5 text-subtle">
              {t === "posts" ? posts.data?.length ?? "" : projects.data?.length ?? ""}
            </span>
          </button>
        ))}
      </div>

      {tab === "posts" && (
        <ul className="mt-4 divide-y divide-hairline/[0.08] rounded-xl border border-hairline/[0.1] bg-surface-1">
          {posts.isLoading && <li className="px-5 py-6 font-inter text-sm text-subtle">Loading…</li>}
          {posts.data?.length === 0 && (
            <li className="px-5 py-6 font-inter text-sm text-subtle">No posts yet.</li>
          )}
          {posts.data?.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
              <div className="min-w-0 flex-1">
                <Link
                  to={`/admin/posts/${encodeURIComponent(p.id)}/edit`}
                  className="font-inter text-[15px] font-medium text-foreground hover:underline"
                >
                  {p.title}
                </Link>
                <p className="mt-0.5 font-inter text-xs text-subtle">
                  /blog/{p.slug} · {fmt(p.published_at)}
                  {p.tags.length > 0 && ` · ${p.tags.slice(0, 3).join(", ")}`}
                </p>
              </div>
              <StatusPill status={p.status} />
              {p.status === "published" && (
                <a
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-inter text-xs text-muted-foreground hover:text-foreground"
                >
                  View <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {tab === "projects" && (
        <ul className="mt-4 divide-y divide-hairline/[0.08] rounded-xl border border-hairline/[0.1] bg-surface-1">
          {projects.isLoading && <li className="px-5 py-6 font-inter text-sm text-subtle">Loading…</li>}
          {projects.data?.map((e) => {
            const title = e.caseStudy?.title ?? e.project?.title ?? e.slug;
            const kind = [e.project && "page", e.caseStudy && "card"].filter(Boolean).join(" + ");
            return (
              <li key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/admin/projects/${e.id}/edit`}
                    className="font-inter text-[15px] font-medium text-foreground hover:underline"
                  >
                    {title}
                  </Link>
                  <p className="mt-0.5 font-inter text-xs text-subtle">
                    #{e.id} · {kind} · order {e.sortOrder}
                    {e.featured > 0 && ` · home #${e.featured}`}
                  </p>
                </div>
                <StatusPill status={e.status} />
                {e.status === "published" && e.project && (
                  <a
                    href={`/project/${e.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-inter text-xs text-muted-foreground hover:text-foreground"
                  >
                    View <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </AdminShell>
  );
};

export default AdminDashboard;
