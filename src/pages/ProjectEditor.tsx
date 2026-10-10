import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell, Field, Notice, Panel, inputCls } from "@/components/admin/AdminUI";
import CTA from "@/components/system/CTA";
import { adminFetch, fromCsv, fromLines, slugify, slugTyping, toCsv, toLines, useUnsavedGuard } from "@/lib/content/admin";
import type { CaseStudy, Project, ProjectEntry } from "@/data/types";

/**
 * /admin/projects/new and /admin/projects/:id/edit.
 *
 * A project has up to two faces, each optional:
 *  - Card: the tile in the work grids (home "Selected work", /projects).
 *  - Page: the full case study at /project/:id.
 * List fields take one item per line; "Label | note" lines split on the bar.
 */

interface Form {
  id?: number;
  slug: string;
  status: "draft" | "published";
  featured: string;
  sortOrder: string;
  hasCard: boolean;
  hasPage: boolean;
  // card
  cTitle: string;
  cCategory: string;
  cImage: string;
  cCover: "screenshot" | "diagram";
  cYear: string;
  cMetricValue: string;
  cMetricLabel: string;
  cClient: string;
  cRole: string;
  cProblem: string;
  cApproach: string;
  cResult: string;
  cFlow: string;
  cStack: string;
  cLiveUrl: string;
  // page
  pTitle: string;
  pCategory: string;
  pDescription: string;
  pFull: string;
  pImage: string;
  pTech: string;
  pClient: string;
  pDuration: string;
  pTeam: string;
  pDate: string;
  pLiveUrl: string;
  pGithubUrl: string;
  pFeatures: string;
  pChallenges: string;
  pResults: string;
}

const EMPTY: Form = {
  slug: "",
  status: "draft",
  featured: "0",
  sortOrder: "100",
  hasCard: true,
  hasPage: true,
  cTitle: "",
  cCategory: "",
  cImage: "",
  cCover: "screenshot",
  cYear: String(new Date().getFullYear()),
  cMetricValue: "",
  cMetricLabel: "",
  cClient: "",
  cRole: "",
  cProblem: "",
  cApproach: "",
  cResult: "",
  cFlow: "",
  cStack: "",
  cLiveUrl: "",
  pTitle: "",
  pCategory: "",
  pDescription: "",
  pFull: "THE PROBLEM: \n\nTHE APPROACH: \n\nRESULTS: ",
  pImage: "",
  pTech: "",
  pClient: "",
  pDuration: "",
  pTeam: "Solo engineer",
  pDate: "",
  pLiveUrl: "",
  pGithubUrl: "",
  pFeatures: "",
  pChallenges: "",
  pResults: "",
};

const pairLines = (items: { a: string; b?: string }[]) => items.map((i) => (i.b ? `${i.a} | ${i.b}` : i.a)).join("\n");
const splitPairs = (s: string) =>
  fromLines(s).map((l) => {
    const [a, ...rest] = l.split("|");
    return { a: a.trim(), b: rest.join("|").trim() || undefined };
  });

function fromEntry(e: ProjectEntry): Form {
  const c = e.caseStudy;
  const p = e.project;
  return {
    ...EMPTY,
    id: e.id,
    slug: e.slug,
    status: e.status,
    featured: String(e.featured),
    sortOrder: String(e.sortOrder),
    hasCard: Boolean(c),
    hasPage: Boolean(p),
    ...(c && {
      cTitle: c.title,
      cCategory: c.category,
      cImage: c.image,
      cCover: c.cover ?? "screenshot",
      cYear: c.year ?? "",
      cMetricValue: c.metric?.value ?? "",
      cMetricLabel: c.metric?.label ?? "",
      cClient: c.client ?? "",
      cRole: c.role,
      cProblem: c.problem,
      cApproach: c.approach,
      cResult: c.result,
      cFlow: pairLines(c.flow.map((f) => ({ a: f.label, b: f.note }))),
      cStack: toCsv(c.stack),
      cLiveUrl: c.liveUrl ?? "",
    }),
    ...(p && {
      pTitle: p.title,
      pCategory: p.category,
      pDescription: p.description,
      pFull: p.fullDescription,
      pImage: p.image,
      pTech: toCsv(p.technologies),
      pClient: p.client ?? "",
      pDuration: p.duration ?? "",
      pTeam: p.teamSize ?? "",
      pDate: p.completionDate ?? "",
      pLiveUrl: p.liveUrl ?? "",
      pGithubUrl: p.githubUrl ?? "",
      pFeatures: toLines(p.features),
      pChallenges: pairLines(p.challenges.map((ch) => ({ a: ch.title, b: ch.description }))),
      pResults: toLines(p.results),
    }),
  };
}

const opt = (s: string) => (s.trim() ? s.trim() : undefined);

function toBody(f: Form, status: Form["status"], prev?: ProjectEntry) {
  // Spread the stored objects first so fields this form does not edit (the
  // card's n and hue, the page's gallery) survive a save.
  const caseStudy: CaseStudy | null = f.hasCard
    ? {
        n: "",
        hue: "var(--hue-backend)",
        ...prev?.caseStudy,
        id: f.slug,
        title: f.cTitle,
        category: f.cCategory,
        image: f.cImage,
        cover: f.cCover,
        year: opt(f.cYear),
        metric: f.cMetricValue.trim() ? { value: f.cMetricValue.trim(), label: f.cMetricLabel.trim() } : undefined,
        client: opt(f.cClient),
        role: f.cRole,
        problem: f.cProblem,
        approach: f.cApproach,
        result: f.cResult,
        flow: splitPairs(f.cFlow).map((x) => ({ label: x.a, note: x.b })),
        stack: fromCsv(f.cStack),
        liveUrl: opt(f.cLiveUrl),
      }
    : null;
  const project: Project | null = f.hasPage
    ? {
        ...prev?.project,
        id: f.id ?? 0,
        title: f.pTitle,
        category: f.pCategory,
        description: f.pDescription,
        fullDescription: f.pFull,
        image: f.pImage,
        technologies: fromCsv(f.pTech),
        client: opt(f.pClient),
        duration: opt(f.pDuration),
        teamSize: opt(f.pTeam),
        completionDate: opt(f.pDate),
        liveUrl: opt(f.pLiveUrl),
        githubUrl: opt(f.pGithubUrl),
        features: fromLines(f.pFeatures),
        challenges: splitPairs(f.pChallenges).map((x) => ({ title: x.a, description: x.b ?? "" })),
        results: fromLines(f.pResults),
      }
    : null;
  return {
    ...(f.id ? { id: f.id } : {}),
    slug: f.slug,
    status,
    featured: Number(f.featured) || 0,
    sortOrder: Number(f.sortOrder) || 0,
    caseStudy,
    project,
  };
}

const Toggle = ({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) => (
  <label className="inline-flex cursor-pointer items-center gap-2 font-inter text-sm text-muted-foreground">
    <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={on} onChange={(e) => onChange(e.target.checked)} />
    {children}
  </label>
);

const ProjectEditor = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const all = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => adminFetch<ProjectEntry[]>("projects"),
    enabled: !isNew,
    retry: false,
  });
  const existing = useMemo(() => all.data?.find((e) => e.id === Number(id)), [all.data, id]);

  const [f, setF] = useState<Form>(EMPTY);
  const [saved, setSaved] = useState<Form>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);

  useEffect(() => {
    if (!existing) return;
    const loaded = fromEntry(existing);
    setF(loaded);
    setSaved(loaded);
  }, [existing]);

  const dirty = JSON.stringify(f) !== JSON.stringify(saved);
  useUnsavedGuard(dirty);
  const live = saved.status === "published";

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const text = (k: keyof Form, props: { area?: number; mono?: boolean; placeholder?: string } = {}) =>
    props.area ? (
      <textarea
        className={`${inputCls} py-2 ${props.mono ? "font-mono text-[13px]" : ""}`}
        style={{ minHeight: props.area }}
        value={String(f[k] ?? "")}
        placeholder={props.placeholder}
        onChange={(e) => set(k, e.target.value as never)}
      />
    ) : (
      <input
        className={`${inputCls} h-10 ${props.mono ? "font-mono text-[13px]" : ""}`}
        value={String(f[k] ?? "")}
        placeholder={props.placeholder}
        onChange={(e) => set(k, e.target.value as never)}
      />
    );

  const save = async (status: Form["status"]) => {
    // Switching a face off deletes its content on save: say so first.
    const dropping = [
      existing?.caseStudy && !f.hasCard && "its card (it leaves the work grids)",
      existing?.project && !f.hasPage && `its page (/project/${existing.id} will 404)`,
    ].filter(Boolean);
    if (dropping.length && !window.confirm(`This save permanently removes ${dropping.join(" and ")}. Continue?`)) return;
    if (live && status === "draft" && !window.confirm("Unpublish this project? It disappears from the site within a minute.")) return;

    setBusy(true);
    setMsg(null);
    try {
      const result = await adminFetch<ProjectEntry>("projects", {
        method: isNew ? "POST" : "PUT",
        body: toBody({ ...f, slug: slugify(f.slug || f.cTitle || f.pTitle) }, status, existing),
      });
      // Cache the saved row before navigating so the edit page never flashes "not found".
      qc.setQueryData<ProjectEntry[]>(["admin", "projects"], (old) =>
        old ? [...old.filter((e) => e.id !== result.id), result] : [result]
      );
      void qc.invalidateQueries({ queryKey: ["projects"] });
      const next = fromEntry(result);
      setF(next);
      setSaved(next);
      setMsg({
        tone: "ok",
        text: status === "published" ? "Published. Live within about a minute." : live ? "Unpublished. It is now a draft." : "Saved as draft.",
      });
      if (isNew) navigate(`/admin/projects/${result.id}/edit`, { replace: true });
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!f.id) return;
    if (!window.confirm(`Delete project #${f.id}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await adminFetch(`projects?id=${f.id}`, { method: "DELETE" });
      setSaved(f);
      navigate("/admin/dashboard");
      qc.setQueryData<ProjectEntry[]>(["admin", "projects"], (old) => old?.filter((e) => e.id !== f.id));
      void qc.invalidateQueries({ queryKey: ["projects"] });
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
      setBusy(false);
    }
  };

  if (!isNew && all.isSuccess && !existing && !busy) {
    return (
      <AdminShell title="Project not found">
        <Notice>No project with id {id}.</Notice>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title={isNew ? "New project" : f.cTitle || f.pTitle || "Edit project"}
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
          <CTA tone="ghost" size="md" onClick={() => save("draft")} disabled={busy}>
            {live ? "Unpublish" : "Save draft"}
          </CTA>
          <CTA size="md" onClick={() => save("published")} disabled={busy || (live && !dirty)}>
            {live ? "Update" : "Publish"}
          </CTA>
        </>
      }
    >
      {all.error && <Notice>{(all.error as Error).message}</Notice>}
      {msg && (
        <div className="mb-5">
          <Notice tone={msg.tone}>{msg.text}</Notice>
        </div>
      )}

      <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <Panel title="Card" aside={<Toggle on={f.hasCard} onChange={(v) => set("hasCard", v)}>Show in work grids</Toggle>}>
            {f.hasCard ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title">{text("cTitle")}</Field>
                  <Field label="Category">{text("cCategory", { placeholder: "Commerce" })}</Field>
                  <Field label="Image" hint="/projects/… or https://…">{text("cImage")}</Field>
                  <Field label="Cover">
                    <select className={`${inputCls} h-10`} value={f.cCover} onChange={(e) => set("cCover", e.target.value as Form["cCover"])}>
                      <option value="screenshot">Screenshot (show the image)</option>
                      <option value="diagram">Diagram (draw the system path)</option>
                    </select>
                  </Field>
                  <Field label="Year">{text("cYear")}</Field>
                  <Field label="Live URL">{text("cLiveUrl", { placeholder: "https://…" })}</Field>
                  <Field label="Headline figure" hint="e.g. 35%">{text("cMetricValue")}</Field>
                  <Field label="Figure label" hint="e.g. increase in enquiries">{text("cMetricLabel")}</Field>
                </div>
                <Field label="One-line result" hint="the sentence under the title">{text("cResult", { area: 64 })}</Field>
                <Field label="System path" hint="one stage per line: Label | note">
                  {text("cFlow", { area: 120, mono: true, placeholder: "Request | Laravel\nQueue | Redis" })}
                </Field>
                <Field label="Stack" hint="comma separated">{text("cStack")}</Field>
                <details className="rounded-lg border border-hairline/[0.1] px-4 py-3">
                  <summary className="cursor-pointer font-inter text-sm text-muted-foreground">
                    Card details (used where the card has no page)
                  </summary>
                  <div className="mt-4 space-y-4">
                    <Field label="Client">{text("cClient")}</Field>
                    <Field label="Role">{text("cRole", { area: 56 })}</Field>
                    <Field label="Challenge">{text("cProblem", { area: 80 })}</Field>
                    <Field label="Build">{text("cApproach", { area: 80 })}</Field>
                  </div>
                </details>
              </>
            ) : (
              <p className="font-inter text-sm text-subtle">No card. This project only appears in the archive.</p>
            )}
          </Panel>

          <Panel title="Case study page" aside={<Toggle on={f.hasPage} onChange={(v) => set("hasPage", v)}>Has its own page</Toggle>}>
            {f.hasPage ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title">{text("pTitle")}</Field>
                  <Field label="Category">{text("pCategory")}</Field>
                </div>
                <Field label="Summary" hint="the lead under the title">{text("pDescription", { area: 64 })}</Field>
                <Field label="Story" hint='paragraphs separated by a blank line; "THE PROBLEM:" style labels become headings'>
                  {text("pFull", { area: 260 })}
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Image" hint="ignored if it is a stock photo">{text("pImage")}</Field>
                  <Field label="Technologies" hint="comma separated">{text("pTech")}</Field>
                  <Field label="Client">{text("pClient")}</Field>
                  <Field label="Duration">{text("pDuration", { placeholder: "6 weeks" })}</Field>
                  <Field label="Team">{text("pTeam")}</Field>
                  <Field label="Delivered">{text("pDate", { placeholder: "June 2025" })}</Field>
                  <Field label="Live URL">{text("pLiveUrl")}</Field>
                  <Field label="Code URL">{text("pGithubUrl")}</Field>
                </div>
                <Field label="Results" hint='one per line; a leading figure ("85% …") is set large'>
                  {text("pResults", { area: 110 })}
                </Field>
                <Field label="What it does" hint="one feature per line">{text("pFeatures", { area: 120 })}</Field>
                <Field label="What made it hard" hint="one per line: Title | description">
                  {text("pChallenges", { area: 120, mono: true })}
                </Field>
              </>
            ) : (
              <p className="font-inter text-sm text-subtle">No page. The card will not link anywhere.</p>
            )}
          </Panel>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <Panel title="Settings">
            <Field label="Slug">
              <input
                className={`${inputCls} h-10 font-mono text-[13px]`}
                value={f.slug}
                onChange={(e) => set("slug", slugTyping(e.target.value))}
                onBlur={() => set("slug", slugify(f.slug || f.cTitle || f.pTitle))}
              />
            </Field>
            {/* Only cards appear on the home page; a page-only project cannot. */}
            <Field label="Home page position" hint={f.hasCard ? "0 = not on home" : "needs a card"}>
              <input
                type="number"
                min={0}
                max={99}
                disabled={!f.hasCard}
                className={`${inputCls} h-10 disabled:opacity-50`}
                value={f.hasCard ? f.featured : "0"}
                onChange={(e) => set("featured", e.target.value)}
              />
            </Field>
            <Field label="Order on /projects" hint="lower comes first">
              <input type="number" className={`${inputCls} h-10`} value={f.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
            </Field>
            {f.id && f.hasPage && (
              <p className="font-inter text-xs text-subtle">
                Page URL: <span className="font-mono">/project/{f.id}</span>
              </p>
            )}
          </Panel>
          {f.hasCard && f.cImage && (
            <Panel title="Card image">
              <img src={f.cImage} alt="" className="aspect-[16/10] w-full rounded-lg border border-hairline/[0.1] object-cover object-top" />
            </Panel>
          )}
        </aside>
      </div>
      </fieldset>
    </AdminShell>
  );
};

export default ProjectEditor;
