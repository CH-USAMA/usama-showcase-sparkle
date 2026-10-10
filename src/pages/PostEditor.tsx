import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell, Field, Notice, Panel, inputCls } from "@/components/admin/AdminUI";
import CTA from "@/components/system/CTA";
import Markdown from "@/components/Markdown";
import { adminFetch, fromCsv, slugify, slugTyping, toCsv, useUnsavedGuard } from "@/lib/content/admin";
import type { PostEntry } from "@/data/types";

/**
 * /admin/posts/new and /admin/posts/:id/edit.
 *
 * Markdown body with a live preview rendered by the same component the blog
 * uses (components/Markdown), so what you see here is what readers get.
 *
 * Guards that matter once posts are live:
 *  - the slug only follows the title until the post is first saved; after
 *    that, changing a live post's URL needs an explicit confirmation;
 *  - a published post offers Update / Unpublish, never a "Save draft" that
 *    would quietly take it offline;
 *  - the publish timestamp is kept as stored unless the date is changed, and
 *    a draft published with its date untouched goes out dated now;
 *  - the form is locked while saving, and closing the tab with unsaved
 *    changes asks first.
 */

interface Draft {
  id?: string;
  title: string;
  /** Search-result title; empty means "use the headline". */
  seo_title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  tags: string;
  status: "draft" | "published";
  /** yyyy-mm-dd, as shown in the date input. */
  date: string;
  /** The stored ISO timestamp, kept unless the date is changed. */
  iso?: string;
}

const todayIso = () => new Date().toISOString();

const blank = (): Draft => ({
  title: "",
  seo_title: "",
  slug: "",
  excerpt: "",
  content: "## Introduction\n\nStart writing here.",
  featured_image: "",
  author: "Usama Munawar",
  tags: "",
  status: "draft",
  date: todayIso().slice(0, 10),
});

const fromEntry = (p: PostEntry): Draft => ({
  id: p.id,
  title: p.title,
  seo_title: p.seo_title ?? "",
  slug: p.slug,
  excerpt: p.excerpt,
  content: p.content,
  featured_image: p.featured_image ?? "",
  author: p.author,
  tags: toCsv(p.tags),
  status: p.status,
  date: p.published_at.slice(0, 10),
  iso: p.published_at,
});

const PostEditor = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const all = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => adminFetch<PostEntry[]>("posts"),
    enabled: !isNew,
    retry: false,
  });
  const existing = useMemo(() => all.data?.find((p) => p.id === id), [all.data, id]);

  const [d, setD] = useState<Draft>(blank);
  const [saved, setSaved] = useState<Draft>(blank);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [dateTouched, setDateTouched] = useState(false);
  const [view, setView] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);

  useEffect(() => {
    if (!existing) return;
    const loaded = fromEntry(existing);
    setD(loaded);
    setSaved(loaded);
    setSlugTouched(true);
    setDateTouched(false);
  }, [existing]);

  const dirty = JSON.stringify(d) !== JSON.stringify(saved);
  useUnsavedGuard(dirty);

  const live = saved.status === "published";
  const urlChanged = live && d.slug !== saved.slug;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((prev) => ({ ...prev, [k]: v }));

  /** Keep the stored timestamp unless the date changed; date a first publish now. */
  const publishedAt = (status: Draft["status"]) => {
    const firstPublish = status === "published" && saved.status !== "published" && !dateTouched;
    if (firstPublish) return todayIso();
    if (d.iso && d.iso.slice(0, 10) === d.date) return d.iso;
    const time = d.iso ? d.iso.slice(10) : todayIso().slice(10);
    return new Date(`${d.date}${time}`).toISOString();
  };

  const save = async (status: Draft["status"]) => {
    const slug = slugify(d.slug || d.title);
    if (urlChanged && !window.confirm(`Change this live post's URL to /blog/${slug}? Links to the old URL will stop working.`)) return;
    if (live && status === "draft" && !window.confirm("Unpublish this post? It disappears from the blog within a minute.")) return;

    setBusy(true);
    setMsg(null);
    try {
      const body = {
        ...(d.id ? { id: d.id } : {}),
        title: d.title,
        slug,
        seo_title: d.seo_title.trim(),
        excerpt: d.excerpt,
        content: d.content,
        featured_image: d.featured_image.trim() || null,
        author: d.author,
        tags: fromCsv(d.tags),
        status,
        published_at: publishedAt(status),
      };
      const result = await adminFetch<PostEntry>("posts", { method: isNew ? "POST" : "PUT", body });
      // Put the saved row in the cache before navigating, so the edit page
      // finds it immediately instead of flashing "not found".
      qc.setQueryData<PostEntry[]>(["admin", "posts"], (old) =>
        old ? [result, ...old.filter((p) => p.id !== result.id)] : [result]
      );
      void qc.invalidateQueries({ queryKey: ["posts"] });
      void qc.invalidateQueries({ queryKey: ["post", result.slug] });
      const next = fromEntry(result);
      setD(next);
      setSaved(next);
      setSlugTouched(true);
      setDateTouched(false);
      setMsg({
        tone: "ok",
        text:
          status === "published"
            ? "Published. It is live on the blog within about a minute."
            : live
              ? "Unpublished. It is now a draft."
              : "Saved as draft.",
      });
      if (isNew) navigate(`/admin/posts/${encodeURIComponent(result.id)}/edit`, { replace: true });
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!d.id) return;
    if (!window.confirm(`Delete "${d.title}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await adminFetch(`posts?id=${encodeURIComponent(d.id)}`, { method: "DELETE" });
      setSaved(d); // nothing left to lose; let the guard go
      navigate("/admin/dashboard");
      qc.setQueryData<PostEntry[]>(["admin", "posts"], (old) => old?.filter((p) => p.id !== d.id));
      void qc.invalidateQueries({ queryKey: ["posts"] });
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
      setBusy(false);
    }
  };

  if (!isNew && all.isSuccess && !existing && !busy) {
    return (
      <AdminShell title="Post not found">
        <Notice>No post with id {id}.</Notice>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title={isNew ? "New post" : d.title || "Edit post"}
      actions={
        <>
          {dirty && <span className="font-inter text-xs text-subtle">Unsaved changes</span>}
          {!isNew && (
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="h-9 rounded-full px-3 font-inter text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
            >
              Delete
            </button>
          )}
          {live ? (
            <>
              <CTA tone="ghost" size="md" onClick={() => save("draft")} disabled={busy}>
                Unpublish
              </CTA>
              <CTA size="md" onClick={() => save("published")} disabled={busy || !dirty}>
                Update
              </CTA>
            </>
          ) : (
            <>
              <CTA tone="ghost" size="md" onClick={() => save("draft")} disabled={busy}>
                Save draft
              </CTA>
              <CTA size="md" onClick={() => save("published")} disabled={busy}>
                Publish
              </CTA>
            </>
          )}
        </>
      }
    >
      {all.error && <Notice>{(all.error as Error).message}</Notice>}
      {msg && (
        <div className="mb-5">
          <Notice tone={msg.tone}>{msg.text}</Notice>
        </div>
      )}

      {/* Locked while saving, so text typed mid-save cannot be overwritten. */}
      <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-5">
            <Field label="Title">
              <input
                className={`${inputCls} h-11 text-base font-medium`}
                value={d.title}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!slugTouched) set("slug", slugify(e.target.value));
                }}
                placeholder="Laravel queues in production: what actually breaks"
              />
            </Field>

            <Field
              label="Search title"
              hint={d.seo_title ? `${d.seo_title.trim().length} of 60 characters` : "optional, for headlines over 60 characters"}
            >
              <input
                className={`${inputCls} h-10`}
                value={d.seo_title}
                onChange={(e) => set("seo_title", e.target.value)}
                maxLength={70}
                placeholder={
                  d.title.length > 60
                    ? `The headline is ${d.title.length} characters; search results show about 60`
                    : "Leave empty to use the headline"
                }
              />
            </Field>

            <Field label="Excerpt" hint="Shown on the blog index and in search results">
              <textarea
                className={`${inputCls} min-h-[72px] py-2`}
                value={d.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                maxLength={600}
              />
            </Field>

            <div>
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm font-medium text-foreground">Body</span>
                <div className="flex rounded-full border border-hairline/[0.14] p-0.5 font-inter text-xs">
                  {(["write", "preview"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setView(v)}
                      aria-pressed={view === v}
                      className={`rounded-full px-3 py-1 capitalize ${view === v ? "bg-foreground text-background" : "text-muted-foreground"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {view === "write" ? (
                <textarea
                  className={`${inputCls} mt-1.5 min-h-[520px] py-3 font-mono text-[13px] leading-relaxed`}
                  value={d.content}
                  onChange={(e) => set("content", e.target.value)}
                  spellCheck
                />
              ) : (
                <div className="mt-1.5 min-h-[520px] rounded-lg border border-hairline/[0.14] bg-surface-1 p-5">
                  <Markdown>{d.content}</Markdown>
                </div>
              )}
              <p className="mt-2 font-inter text-xs text-subtle">
                Markdown: ## heading, ### subheading, **bold**, *italic*, `code`, [link](https://…), lists, tables, and ``` fenced
                code blocks.
              </p>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20">
            <Panel title="Settings">
              <Field label="URL slug" hint={`/blog/${d.slug || "…"}`}>
                <input
                  className={`${inputCls} h-10 font-mono text-[13px]`}
                  value={d.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugTyping(e.target.value));
                  }}
                  onBlur={() => set("slug", slugify(d.slug || d.title))}
                />
              </Field>
              {urlChanged && (
                <p className="font-inter text-xs text-amber-600 dark:text-amber-400">
                  This post is live at /blog/{saved.slug}. Saving moves it, and links to the old URL will break.
                </p>
              )}
              <Field label="Publish date" hint={live ? undefined : "a draft published unchanged goes out dated now"}>
                <input
                  type="date"
                  className={`${inputCls} h-10`}
                  value={d.date}
                  onChange={(e) => {
                    setDateTouched(true);
                    set("date", e.target.value);
                  }}
                />
              </Field>
              <Field label="Tags" hint="comma separated">
                <input className={`${inputCls} h-10`} value={d.tags} onChange={(e) => set("tags", e.target.value)} />
              </Field>
              <Field label="Author">
                <input className={`${inputCls} h-10`} value={d.author} onChange={(e) => set("author", e.target.value)} />
              </Field>
            </Panel>

            <Panel title="Cover image">
              <Field label="Image URL" hint="/blog/… or https://…">
                <input
                  className={`${inputCls} h-10`}
                  value={d.featured_image}
                  onChange={(e) => set("featured_image", e.target.value)}
                  placeholder="/blog/my-cover.webp"
                />
              </Field>
              {d.featured_image && (
                <img src={d.featured_image} alt="" className="aspect-[16/9] w-full rounded-lg border border-hairline/[0.1] object-cover" />
              )}
            </Panel>
          </aside>
        </div>
      </fieldset>
    </AdminShell>
  );
};

export default PostEditor;
