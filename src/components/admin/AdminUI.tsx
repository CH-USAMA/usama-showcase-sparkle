import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";

/** Shared chrome and form primitives for the /admin pages. */

export const inputCls =
  "w-full rounded-lg border border-hairline/[0.14] bg-surface-1 px-3 font-inter text-sm text-foreground " +
  "placeholder:text-subtle transition-colors focus-visible:border-primary focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-primary/30";

export const Field = ({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) => (
  <label className={`block ${className}`}>
    <span className="font-inter text-sm font-medium text-foreground">{label}</span>
    {hint && <span className="ml-2 font-inter text-xs text-subtle">{hint}</span>}
    <div className="mt-1.5">{children}</div>
  </label>
);

export const Panel = ({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) => (
  <section className="card-surface p-5 sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-inter text-base font-semibold text-foreground">{title}</h2>
      {aside}
    </div>
    <div className="mt-5 space-y-4">{children}</div>
  </section>
);

export const StatusPill = ({ status }: { status: "draft" | "published" }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-inter text-xs font-medium ${
      status === "published" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-surface-2 text-muted-foreground"
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-subtle"}`} />
    {status === "published" ? "Published" : "Draft"}
  </span>
);

/**
 * Page shell: sends signed-out visitors to /auth, keeps the admin out of
 * search results, and gives every admin page the same header.
 */
export const AdminShell = ({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) return <div className="min-h-screen bg-background" aria-busy="true" />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${title} | Admin`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="sticky top-0 z-40 border-b border-hairline/[0.08] bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link to="/" className="font-display text-[22px] leading-none text-foreground">
              Usama<span className="text-primary">.</span>
            </Link>
            <nav className="flex items-center gap-1 font-inter text-sm">
              <Link to="/admin/dashboard" className="rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground">
                Content
              </Link>
              <Link to="/blog" className="rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground">
                View blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 font-inter text-sm">
            <span className="hidden text-subtle sm:inline">{user.email}</span>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="rounded-full border border-hairline/[0.14] px-3 py-1.5 text-foreground hover:border-hairline/[0.3]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-inter text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
};

/** Inline error/notice box. */
export const Notice = ({ tone = "error", children }: { tone?: "error" | "ok"; children: ReactNode }) => (
  <div
    role={tone === "error" ? "alert" : "status"}
    className={`rounded-lg border px-4 py-3 font-inter text-sm ${
      tone === "error"
        ? "border-destructive/30 bg-destructive/5 text-destructive"
        : "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
    }`}
  >
    {children}
  </div>
);
