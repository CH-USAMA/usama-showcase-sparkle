import { lazy, Suspense, useMemo, useState, type ReactNode } from "react";
import { Download } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { getTool } from "@/data/tools";
import {
  LICENSES,
  PROFILE_DEFAULTS,
  PROJECT_DEFAULTS,
  SKILLS,
  STATS_THEMES,
  buildProfile,
  buildProject,
  type ProfileForm,
  type ProjectForm,
} from "@/data/tools/readmeGenerator";
import { trackEvent } from "@/lib/analytics";

// Only loaded when the reader opens the Preview tab, never in the first render.
const Markdown = lazy(() => import("@/components/Markdown"));

const tool = getTool("readme-generator")!;

type Mode = "profile" | "project";
type View = "markdown" | "preview";

const SkillPicker = ({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) => (
  <div role="group" aria-label="Skills" className="flex flex-wrap gap-1.5">
    {SKILLS.map((s) => {
      const on = value.includes(s.id);
      return (
        <button
          key={s.id}
          type="button"
          aria-pressed={on}
          onClick={() => onChange(on ? value.filter((x) => x !== s.id) : [...value, s.id])}
          className={`inline-flex min-h-8 items-center rounded-md border px-2.5 font-inter text-xs transition-colors duration-standard ${
            on ? "border-primary/60 bg-primary/10 text-foreground" : "border-hairline/[0.12] text-muted-foreground hover:text-foreground"
          }`}
        >
          {s.label}
        </button>
      );
    })}
  </div>
);

const Row = ({ children }: { children: ReactNode }) => <div className="grid gap-5 sm:grid-cols-2">{children}</div>;

const ReadmeGenerator = () => {
  const [mode, setMode] = useState<Mode>("profile");
  const [view, setView] = useState<View>("markdown");
  const [profile, setProfile] = useState<ProfileForm>(PROFILE_DEFAULTS);
  const [project, setProject] = useState<ProjectForm>(PROJECT_DEFAULTS);
  const p = <K extends keyof ProfileForm>(k: K) => (v: ProfileForm[K]) => setProfile((f) => ({ ...f, [k]: v }));
  const j = <K extends keyof ProjectForm>(k: K) => (v: ProjectForm[K]) => setProject((f) => ({ ...f, [k]: v }));

  const markdown = useMemo(() => (mode === "profile" ? buildProfile(profile) : buildProject(project)), [mode, profile, project]);

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "README.md";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    trackEvent("readme_download", { mode });
  };

  const text = (id: string, label: string, value: string, onChange: (v: string) => void, placeholder: string, hint?: string) => (
    <Field id={id} label={label} hint={hint}>
      <input id={id} className={fieldCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </Field>
  );
  const area = (id: string, label: string, value: string, onChange: (v: string) => void, placeholder: string, hint?: string, rows = 3) => (
    <Field id={id} label={label} hint={hint}>
      <textarea id={id} rows={rows} className={`${fieldCls} font-mono text-[13px]`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </Field>
  );

  return (
    <ToolPage
      tool={tool}
      next={{
        title: "Need the project behind the README?",
        text: "I build web and mobile products from idea to launch, with clean code and documentation you can hand to the next developer.",
        to: "/services/mvp-development",
        label: "Idea to launch",
      }}
    >
      <Choices<Mode>
        label="README type"
        options={[
          { value: "profile", label: "Profile README" },
          { value: "project", label: "Project README" },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- form ---- */}
        <div className="card-surface space-y-6 p-5 sm:p-6">
          {mode === "profile" ? (
            <>
              <Row>
                {text("rg-name", "Your name", profile.name, p("name"), "e.g. Sara Khan")}
                {text("rg-user", "GitHub username", profile.username, p("username"), "e.g. sarakhan", "Needed for the stats cards.")}
              </Row>
              {text("rg-headline", "Headline", profile.headline, p("headline"), "e.g. Full-stack developer building tools for small businesses")}
              {area("rg-about", "About you", profile.about, p("about"), "Two or three sentences: what you do and what you care about.")}
              <Row>
                {text("rg-working", "Currently working on", profile.working, p("working"), "e.g. an open-source invoicing app")}
                {text("rg-learning", "Learning", profile.learning, p("learning"), "e.g. Rust and system design")}
                {text("rg-ask", "Ask me about", profile.askMe, p("askMe"), "e.g. React, APIs, freelancing")}
                {text("rg-location", "Location", profile.location, p("location"), "e.g. Lahore, Pakistan")}
              </Row>
              <div>
                <p className="font-inter text-sm font-medium text-foreground">Tech stack</p>
                <div className="mt-2">
                  <SkillPicker value={profile.skills} onChange={p("skills")} />
                </div>
                <div className="mt-3">
                  <Choices<"dark" | "light">
                    label="Icon style"
                    options={[
                      { value: "dark", label: "Dark icons" },
                      { value: "light", label: "Light icons" },
                    ]}
                    value={profile.iconTheme}
                    onChange={p("iconTheme")}
                  />
                </div>
              </div>
              <fieldset>
                <legend className="font-inter text-sm font-medium text-foreground">GitHub cards</legend>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <Check id="rg-stats" checked={profile.stats} onChange={p("stats")}>Stats card</Check>
                  <Check id="rg-langs" checked={profile.topLangs} onChange={p("topLangs")}>Top languages</Check>
                  <Check id="rg-views" checked={profile.views} onChange={p("views")}>Profile views counter</Check>
                </div>
                <div className="mt-3 max-w-xs">
                  <label htmlFor="rg-theme" className="sr-only">Card theme</label>
                  <select id="rg-theme" className={fieldCls} value={profile.statsTheme} onChange={(e) => p("statsTheme")(e.target.value)}>
                    {STATS_THEMES.map((t) => (
                      <option key={t.value} value={t.value}>
                        Card theme: {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <Row>
                {text("rg-linkedin", "LinkedIn", profile.linkedin, p("linkedin"), "linkedin.com/in/…")}
                {text("rg-x", "X / Twitter", profile.x, p("x"), "x.com/…")}
                {text("rg-site", "Website", profile.website, p("website"), "yoursite.com")}
                {text("rg-email", "Email", profile.email, p("email"), "you@example.com")}
              </Row>
              <Check id="rg-credit" checked={profile.credit} onChange={p("credit")}>
                Add a small “made with” link at the end
              </Check>
            </>
          ) : (
            <>
              <Row>
                {text("rj-name", "Project name", project.name, j("name"), "e.g. Invoicely")}
                {text("rj-tagline", "One-line description", project.tagline, j("tagline"), "e.g. Simple invoicing for freelancers")}
              </Row>
              {area("rj-desc", "What it does", project.description, j("description"), "A short paragraph: the problem it solves and who it is for.")}
              <Row>
                {text("rj-demo", "Live demo URL", project.demo, j("demo"), "https://…")}
                {text("rj-shot", "Screenshot URL", project.screenshot, j("screenshot"), "https://… or docs/screenshot.png")}
              </Row>
              {area("rj-features", "Features", project.features, j("features"), "One per line", "One feature per line.", 4)}
              <div>
                <p className="font-inter text-sm font-medium text-foreground">Tech stack</p>
                <div className="mt-2">
                  <SkillPicker value={project.skills} onChange={j("skills")} />
                </div>
              </div>
              {area("rj-prereq", "Prerequisites", project.prerequisites, j("prerequisites"), "One per line")}
              {area("rj-install", "Installation commands", project.install, j("install"), "git clone …", undefined, 5)}
              {area("rj-usage", "Usage", project.usage, j("usage"), "How to use it once it runs. Markdown is fine.")}
              {area("rj-env", "Environment variables", project.env, j("env"), "KEY=What it is for", "One per line, as KEY=description.")}
              <Row>
                <Field id="rj-license" label="License">
                  <select id="rj-license" className={fieldCls} value={project.license} onChange={(e) => j("license")(e.target.value)}>
                    {LICENSES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                    <option value="">No license section</option>
                  </select>
                </Field>
                <div className="space-y-2.5 sm:pt-7">
                  <Check id="rj-toc" checked={project.toc} onChange={j("toc")}>Table of contents</Check>
                  <Check id="rj-contrib" checked={project.contributing} onChange={j("contributing")}>Contributing section</Check>
                </div>
                {text("rj-author", "Author", project.author, j("author"), "e.g. Sara Khan")}
                {text("rj-author-user", "Author's GitHub username", project.authorUsername, j("authorUsername"), "e.g. sarakhan")}
              </Row>
              <Check id="rj-credit" checked={project.credit} onChange={j("credit")}>
                Add a small “made with” link at the end
              </Check>
            </>
          )}
        </div>

        {/* ---- output ---- */}
        <div className="card-surface min-w-0 p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Choices<View>
              label="Output view"
              options={[
                { value: "markdown", label: "Markdown" },
                { value: "preview", label: "Preview" },
              ]}
              value={view}
              onChange={setView}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={download}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-hairline/[0.12] px-2.5 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:border-hairline/[0.24] hover:text-foreground"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                README.md
              </button>
              <CopyButton text={markdown} label="Copy the Markdown" event="readme_copy">
                Copy
              </CopyButton>
            </div>
          </div>

          {view === "markdown" ? (
            <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-surface-2 p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
              {markdown}
            </pre>
          ) : (
            <div className="mt-4 max-h-[36rem] overflow-auto rounded-lg border border-hairline/[0.1] bg-background p-5 [&_img]:my-1 [&_img]:inline-block [&_img]:rounded-none [&_img]:border-0">
              <Suspense fallback={<p className="font-inter text-sm text-subtle">Loading preview…</p>}>
                <Markdown className="!prose-base">{markdown}</Markdown>
              </Suspense>
            </div>
          )}

          <p className="mt-4 font-inter text-xs leading-relaxed text-subtle">
            {mode === "profile"
              ? "To show it on your profile: create a public repository named exactly like your username, add a README.md, and paste this in."
              : "Save it as README.md in the root of your repository. GitHub shows it on the repository's front page."}
          </p>
        </div>
      </div>
    </ToolPage>
  );
};

export default ReadmeGenerator;
