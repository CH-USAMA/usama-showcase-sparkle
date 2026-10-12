import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import CTA from "@/components/system/CTA";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import { SITE_URL } from "@/data/site";
import { toolsPath } from "@/lib/locale";
import {
  APP_TYPES,
  FEATURES,
  FEATURE_GROUPS,
  PLATFORMS,
  makePlan,
  stagesFor,
  type AppTypeId,
  type FeatureId,
  type PlatformId,
  type Stage,
} from "@/data/tools/mvpPlanner";
import { trackEvent } from "@/lib/analytics";

const MvpPlanner = () => {
  const { locale, t: all } = useToolsText();
  const t = all.mvp;
  const [idea, setIdea] = useState("");
  const [typeId, setTypeId] = useState<AppTypeId>("saas");
  const type = APP_TYPES.find((x) => x.id === typeId)!;
  const [platforms, setPlatforms] = useState<PlatformId[]>(type.platforms);
  const [stages, setStages] = useState<Record<FeatureId, Stage>>(() => stagesFor(type));

  const chooseType = (id: AppTypeId) => {
    const next = APP_TYPES.find((x) => x.id === id)!;
    setTypeId(id);
    setPlatforms(next.platforms);
    setStages(stagesFor(next));
  };
  const togglePlatform = (id: PlatformId, on: boolean) => setPlatforms((p) => (on ? [...p, id] : p.filter((x) => x !== id)));

  const plan = useMemo(
    () => makePlan({ idea, type, platforms, stages }, t, `${SITE_URL}${toolsPath(locale, "mvp-planner")}`),
    [idea, type, platforms, stages, t, locale]
  );
  const stageOptions: { value: Stage; label: string }[] = [
    { value: "skip", label: t.stages.skip },
    { value: "later", label: t.stages.later },
    { value: "now", label: t.stages.now },
  ];

  return (
    <ToolPage slug="mvp-planner">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* ---- choices ---- */}
        <div className="card-surface space-y-8 p-5 sm:p-6">
          <Field id="mvp-idea" label={t.ideaLabel} hint={t.ideaHint}>
            <input id="mvp-idea" className={fieldCls} value={idea} maxLength={200} onChange={(e) => setIdea(e.target.value)} placeholder={t.ideaPlaceholder} />
          </Field>

          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.typeLabel}</p>
            <div className="mt-2">
              <Choices<AppTypeId>
                label={t.appTypeGroup}
                options={APP_TYPES.map((x) => ({ value: x.id, label: t.appTypes[x.id] }))}
                value={typeId}
                onChange={chooseType}
              />
            </div>
          </div>

          <fieldset>
            <legend className="font-inter text-sm font-medium text-foreground">{t.platformsLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
              {PLATFORMS.map((p) => (
                <Check key={p} id={`mvp-platform-${p}`} checked={platforms.includes(p)} onChange={(on) => togglePlatform(p, on)}>
                  {t.platforms[p]}
                </Check>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.featuresLabel}</p>
            <p className="mt-1 font-inter text-xs leading-relaxed text-subtle">{t.featuresHint}</p>
            <div className="mt-4 space-y-6">
              {FEATURE_GROUPS.map((g) => (
                <div key={g}>
                  <p className="mono-tiny text-subtle">{t.groups[g]}</p>
                  <ul className="mt-2 border-t border-hairline/[0.08]">
                    {FEATURES.filter((f) => f.group === g).map((f) => (
                      <li key={f.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-hairline/[0.08] py-2.5">
                        <span className={`font-inter text-sm ${stages[f.id] === "skip" ? "text-muted-foreground" : "text-foreground"}`}>{t.features[f.id].label}</span>
                        <Choices<Stage>
                          label={t.features[f.id].label}
                          options={stageOptions}
                          quiet={["skip"]}
                          value={stages[f.id]}
                          onChange={(v) => setStages((s) => ({ ...s, [f.id]: v }))}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- plan ---- */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="card-surface p-5 sm:p-6" aria-live="polite">
            <h2 className="mono-tiny text-subtle">{t.planHeading}</h2>
            <p className="mt-3 font-inter text-2xl font-semibold tracking-tight text-foreground">{t.levelTitle(plan.level.label)}</p>
            <p className="mt-1 font-inter text-sm text-muted-foreground">{t.typicalBuild(plan.level.weeks)}</p>
            {plan.overSized && (
              <p className="mt-3 rounded-md bg-primary/10 px-3 py-2 font-inter text-xs leading-relaxed text-foreground">{t.tooBig}</p>
            )}

            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline/[0.1] bg-hairline/[0.08] text-center">
              <div className="bg-surface-1 p-3">
                <dt className="font-inter text-xs text-subtle">{t.firstVersion}</dt>
                <dd className="mt-1 font-inter text-lg font-semibold text-foreground">{t.featureCount(plan.nowLabels.length)}</dd>
              </div>
              <div className="bg-surface-1 p-3">
                <dt className="font-inter text-xs text-subtle">{t.later}</dt>
                <dd className="mt-1 font-inter text-lg font-semibold text-foreground">{t.featureCount(plan.laterLabels.length)}</dd>
              </div>
            </dl>

            <h3 className="mt-5 font-inter text-sm font-medium text-foreground">{t.stackHeading}</h3>
            <ul className="mt-2 space-y-1.5 font-inter text-xs leading-relaxed text-muted-foreground">
              {plan.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h3 className="mt-5 font-inter text-sm font-medium text-foreground">{t.questionsHeading}</h3>
            <ul className="mt-2 list-disc space-y-1.5 ps-4 font-inter text-xs leading-relaxed text-muted-foreground">
              {plan.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline/[0.08] pt-5">
              <CopyButton text={plan.text} label={t.copyPlan} event="mvp_plan_copy" copiedText={all.common.copied}>
                {t.copyPlan}
              </CopyButton>
              <span className="font-inter text-xs text-subtle">{t.copyPlanHint}</span>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <h2 className="font-inter text-[15px] font-medium text-foreground">{t.secondOpinionTitle}</h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">{t.secondOpinionText}</p>
            <form
              action="https://formspree.io/f/mkgzjlde"
              method="POST"
              className="mt-4 space-y-3"
              onSubmit={() => trackEvent("lead_magnet_submit", { resource: "mvp-planner", level: plan.levelId, locale })}
            >
              <input type="hidden" name="_subject" value={`MVP plan from the planner (${locale})`} />
              <input type="hidden" name="resource" value="mvp-planner" />
              <input type="hidden" name="language" value={locale} />
              <input type="hidden" name="plan" value={plan.text} />
              <label htmlFor="mvp-email" className="sr-only">
                {all.common.emailLabel}
              </label>
              <input
                id="mvp-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                dir="ltr"
                placeholder={all.common.emailPlaceholder}
                className={fieldCls}
              />
              <CTA type="submit" size="md" className="w-full justify-center">
                {t.send}
              </CTA>
            </form>
            <p className="mt-3 flex items-center gap-2 font-inter text-xs text-subtle">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {t.privacy}
            </p>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};

export default MvpPlanner;
