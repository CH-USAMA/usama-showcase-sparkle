import { lazy, Suspense, useMemo, useState, type ReactNode } from "react";
import { Download } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import {
  LICENSES,
  PROFILE_DEFAULTS,
  SKILLS,
  STATS_THEMES,
  buildProfile,
  buildProject,
  projectDefaults,
  type ProfileForm,
  type ProjectForm,
} from "@/data/tools/readmeGenerator";
import { trackEvent } from "@/lib/analytics";

// Only loaded when the reader opens the Preview tab, never in the first render.
const Markdown = lazy(() => import("@/components/Markdown"));

type Mode = "profile" | "project";
type View = "markdown" | "preview";

const SkillPicker = ({ value, onChange, label }: { value: string[]; onChange: (v: string[]) => void; label: string }) => (
  <div role="group" aria-label={label} className="flex flex-wrap gap-1.5" dir="ltr">
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
  const { locale, t: all } = useToolsText();
  const t = all.readme;
  const [mode, setMode] = useState<Mode>("profile");
  const [view, setView] = useState<View>("markdown");
  const [profile, setProfile] = useState<ProfileForm>(PROFILE_DEFAULTS);
  const [project, setProject] = useState<ProjectForm>(() => projectDefaults(t));
  const p = <K extends keyof ProfileForm>(k: K) => (v: ProfileForm[K]) => setProfile((f) => ({ ...f, [k]: v }));
  const j = <K extends keyof ProjectForm>(k: K) => (v: ProjectForm[K]) => setProject((f) => ({ ...f, [k]: v }));

  const markdown = useMemo(() => (mode === "profile" ? buildProfile(profile, t.out) : buildProject(project, t.out)), [mode, profile, project, t]);

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "README.md";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    trackEvent("readme_download", { mode, locale });
  };

  /** A text field from a [label, placeholder] pair. Links, handles and code stay left to right. */
  const text = (id: string, [label, placeholder]: string[], value: string, onChange: (v: string) => void, hint?: string, ltr = false) => (
    <Field id={id} label={label} hint={hint}>
      <input id={id} dir={ltr ? "ltr" : undefined} className={fieldCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </Field>
  );
  const area = (id: string, [label, placeholder]: string[], value: string, onChange: (v: string) => void, hint?: string, rows = 3, ltr = false) => (
    <Field id={id} label={label} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        dir={ltr ? "ltr" : undefined}
        className={`${fieldCls} font-mono text-[13px]`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  );
  const pf = t.profile;
  const pj = t.project;

  return (
    <ToolPage slug="readme-generator">
      <Choices<Mode>
        label={t.modeGroup}
        options={[
          { value: "profile", label: t.modes.profile },
          { value: "project", label: t.modes.project },
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
                {text("rg-name", pf.name, profile.name, p("name"))}
                {text("rg-user", pf.username, profile.username, p("username"), pf.usernameHint, true)}
              </Row>
              {text("rg-headline", pf.headline, profile.headline, p("headline"))}
              {area("rg-about", pf.about, profile.about, p("about"))}
              <Row>
                {text("rg-working", pf.working, profile.working, p("working"))}
                {text("rg-learning", pf.learning, profile.learning, p("learning"))}
                {text("rg-ask", pf.askMe, profile.askMe, p("askMe"))}
                {text("rg-location", pf.location, profile.location, p("location"))}
              </Row>
              <div>
                <p className="font-inter text-sm font-medium text-foreground">{pf.stackLabel}</p>
                <div className="mt-2">
                  <SkillPicker value={profile.skills} onChange={p("skills")} label={pf.skillsGroup} />
                </div>
                <div className="mt-3">
                  <Choices<"dark" | "light">
                    label={pf.iconGroup}
                    options={[
                      { value: "dark", label: pf.iconDark },
                      { value: "light", label: pf.iconLight },
                    ]}
                    value={profile.iconTheme}
                    onChange={p("iconTheme")}
                  />
                </div>
              </div>
              <fieldset>
                <legend className="font-inter text-sm font-medium text-foreground">{pf.cardsLegend}</legend>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <Check id="rg-stats" checked={profile.stats} onChange={p("stats")}>{pf.stats}</Check>
                  <Check id="rg-langs" checked={profile.topLangs} onChange={p("topLangs")}>{pf.topLangs}</Check>
                  <Check id="rg-views" checked={profile.views} onChange={p("views")}>{pf.views}</Check>
                </div>
                <div className="mt-3 max-w-xs">
                  <label htmlFor="rg-theme" className="sr-only">{pf.cardThemeLabel}</label>
                  <select id="rg-theme" className={fieldCls} value={profile.statsTheme} onChange={(e) => p("statsTheme")(e.target.value)}>
                    {STATS_THEMES.map((id) => (
                      <option key={id} value={id}>
                        {pf.cardTheme(pf.themes[id])}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <Row>
                {text("rg-linkedin", pf.linkedin, profile.linkedin, p("linkedin"), undefined, true)}
                {text("rg-x", pf.x, profile.x, p("x"), undefined, true)}
                {text("rg-site", pf.website, profile.website, p("website"), undefined, true)}
                {text("rg-email", pf.email, profile.email, p("email"), undefined, true)}
              </Row>
              <Check id="rg-credit" checked={profile.credit} onChange={p("credit")}>
                {t.credit}
              </Check>
            </>
          ) : (
            <>
              <Row>
                {text("rj-name", pj.name, project.name, j("name"))}
                {text("rj-tagline", pj.tagline, project.tagline, j("tagline"))}
              </Row>
              {area("rj-desc", pj.description, project.description, j("description"))}
              <Row>
                {text("rj-demo", pj.demo, project.demo, j("demo"), undefined, true)}
                {text("rj-shot", pj.screenshot, project.screenshot, j("screenshot"), undefined, true)}
              </Row>
              {area("rj-features", pj.features, project.features, j("features"), pj.featuresHint, 4)}
              <div>
                <p className="font-inter text-sm font-medium text-foreground">{pj.stackLabel}</p>
                <div className="mt-2">
                  <SkillPicker value={project.skills} onChange={j("skills")} label={pf.skillsGroup} />
                </div>
              </div>
              {area("rj-prereq", pj.prerequisites, project.prerequisites, j("prerequisites"))}
              {area("rj-install", pj.install, project.install, j("install"), undefined, 5, true)}
              {area("rj-usage", pj.usage, project.usage, j("usage"))}
              {area("rj-env", pj.env, project.env, j("env"), pj.envHint)}
              <Row>
                <Field id="rj-license" label={pj.license}>
                  <select id="rj-license" className={fieldCls} value={project.license} onChange={(e) => j("license")(e.target.value)}>
                    {LICENSES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                    <option value="">{pj.noLicense}</option>
                  </select>
                </Field>
                <div className="space-y-2.5 sm:pt-7">
                  <Check id="rj-toc" checked={project.toc} onChange={j("toc")}>{pj.toc}</Check>
                  <Check id="rj-contrib" checked={project.contributing} onChange={j("contributing")}>{pj.contributing}</Check>
                </div>
                {text("rj-author", pj.author, project.author, j("author"))}
                {text("rj-author-user", pj.authorUsername, project.authorUsername, j("authorUsername"), undefined, true)}
              </Row>
              <Check id="rj-credit" checked={project.credit} onChange={j("credit")}>
                {t.credit}
              </Check>
            </>
          )}
        </div>

        {/* ---- output ---- */}
        <div className="card-surface min-w-0 p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Choices<View>
              label={t.viewGroup}
              options={[
                { value: "markdown", label: t.views.markdown },
                { value: "preview", label: t.views.preview },
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
              <CopyButton text={markdown} label={t.copyLabel} event="readme_copy" copiedText={all.common.copied}>
                {all.common.copy}
              </CopyButton>
            </div>
          </div>

          {view === "markdown" ? (
            <pre
              dir="auto"
              className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-surface-2 p-4 font-mono text-[12.5px] leading-relaxed text-foreground"
            >
              {markdown}
            </pre>
          ) : (
            <div className="mt-4 max-h-[36rem] overflow-auto rounded-lg border border-hairline/[0.1] bg-background p-5 [&_img]:my-1 [&_img]:inline-block [&_img]:rounded-none [&_img]:border-0">
              <Suspense fallback={<p className="font-inter text-sm text-subtle">{t.loadingPreview}</p>}>
                <Markdown className="!prose-base">{markdown}</Markdown>
              </Suspense>
            </div>
          )}

          <p className="mt-4 font-inter text-xs leading-relaxed text-subtle">{mode === "profile" ? t.howToProfile : t.howToProject}</p>
        </div>
      </div>
    </ToolPage>
  );
};

export default ReadmeGenerator;
