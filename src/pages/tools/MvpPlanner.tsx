import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import CTA from "@/components/system/CTA";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { getTool } from "@/data/tools";
import {
  APP_TYPES,
  FEATURES,
  FEATURE_GROUPS,
  PLATFORMS,
  makePlan,
  stagesFor,
  type PlatformId,
  type Stage,
} from "@/data/tools/mvpPlanner";
import { trackEvent } from "@/lib/analytics";

const tool = getTool("mvp-planner")!;

const STAGES: { value: Stage; label: string }[] = [
  { value: "skip", label: "Skip" },
  { value: "later", label: "Later" },
  { value: "now", label: "First version" },
];

const MvpPlanner = () => {
  const [idea, setIdea] = useState("");
  const [typeId, setTypeId] = useState("saas");
  const type = APP_TYPES.find((t) => t.id === typeId)!;
  const [platforms, setPlatforms] = useState<PlatformId[]>(type.platforms);
  const [stages, setStages] = useState<Record<string, Stage>>(() => stagesFor(type));

  const chooseType = (id: string) => {
    const t = APP_TYPES.find((x) => x.id === id)!;
    setTypeId(id);
    setPlatforms(t.platforms);
    setStages(stagesFor(t));
  };
  const togglePlatform = (id: PlatformId, on: boolean) =>
    setPlatforms((p) => (on ? [...p, id] : p.filter((x) => x !== id)));

  const plan = useMemo(() => makePlan({ idea, type, platforms, stages }), [idea, type, platforms, stages]);

  return (
    <ToolPage
      tool={tool}
      next={{
        title: "Want it built, not just planned?",
        text: "Idea to launch: a first version in front of real users in weeks, built with AI-assisted development and reviewed by a senior engineer.",
        to: "/services/mvp-development",
        label: "Idea to launch",
      }}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* ---- choices ---- */}
        <div className="card-surface space-y-8 p-5 sm:p-6">
          <Field id="mvp-idea" label="Your idea in one line" hint="Optional. It goes at the top of the plan.">
            <input
              id="mvp-idea"
              className={fieldCls}
              value={idea}
              maxLength={200}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. A booking app for independent driving instructors"
            />
          </Field>

          <div>
            <p className="font-inter text-sm font-medium text-foreground">What are you building?</p>
            <div className="mt-2">
              <Choices label="App type" options={APP_TYPES.map((t) => ({ value: t.id, label: t.label }))} value={typeId} onChange={chooseType} />
            </div>
          </div>

          <fieldset>
            <legend className="font-inter text-sm font-medium text-foreground">Platforms</legend>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
              {PLATFORMS.map((p) => (
                <Check key={p.id} id={`mvp-platform-${p.id}`} checked={platforms.includes(p.id)} onChange={(on) => togglePlatform(p.id, on)}>
                  {p.label}
                </Check>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="font-inter text-sm font-medium text-foreground">Features</p>
            <p className="mt-1 font-inter text-xs leading-relaxed text-subtle">
              Suggested for this type of app. Move anything that is not essential to Later: it is the fastest way to launch sooner.
            </p>
            <div className="mt-4 space-y-6">
              {FEATURE_GROUPS.map((g) => (
                <div key={g}>
                  <p className="mono-tiny text-subtle">{g}</p>
                  <ul className="mt-2 border-t border-hairline/[0.08]">
                    {FEATURES.filter((f) => f.group === g).map((f) => (
                      <li key={f.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-hairline/[0.08] py-2.5">
                        <span className={`font-inter text-sm ${stages[f.id] === "skip" ? "text-muted-foreground" : "text-foreground"}`}>{f.label}</span>
                        <Choices
                          label={f.label}
                          options={STAGES}
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
            <h2 className="mono-tiny text-subtle">Your MVP plan</h2>
            <p className="mt-3 font-inter text-2xl font-semibold tracking-tight text-foreground">{plan.level.label} first version</p>
            <p className="mt-1 font-inter text-sm text-muted-foreground">Typical build time: {plan.level.weeks}</p>
            {plan.overSized && (
              <p className="mt-3 rounded-md bg-primary/10 px-3 py-2 font-inter text-xs leading-relaxed text-foreground">
                That is a lot for a first version. Moving two or three features to Later is usually the quickest way to launch.
              </p>
            )}

            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline/[0.1] bg-hairline/[0.08] text-center">
              <div className="bg-surface-1 p-3">
                <dt className="font-inter text-xs text-subtle">First version</dt>
                <dd className="mt-1 font-inter text-lg font-semibold text-foreground">{plan.now.length} features</dd>
              </div>
              <div className="bg-surface-1 p-3">
                <dt className="font-inter text-xs text-subtle">Later</dt>
                <dd className="mt-1 font-inter text-lg font-semibold text-foreground">{plan.later.length} features</dd>
              </div>
            </dl>

            <h3 className="mt-5 font-inter text-sm font-medium text-foreground">Suggested stack</h3>
            <ul className="mt-2 space-y-1.5 font-inter text-xs leading-relaxed text-muted-foreground">
              {plan.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h3 className="mt-5 font-inter text-sm font-medium text-foreground">Answer these before building</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 font-inter text-xs leading-relaxed text-muted-foreground">
              {plan.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline/[0.08] pt-5">
              <CopyButton text={plan.text} label="Copy the plan" event="mvp_plan_copy">
                Copy the plan
              </CopyButton>
              <span className="font-inter text-xs text-subtle">As text, ready to paste into a doc or email.</span>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <h2 className="font-inter text-[15px] font-medium text-foreground">Get a second opinion on this plan</h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-muted-foreground">
              Send it to me and I will reply with what I would cut, what I would add, and what it would take. Free.
            </p>
            <form
              action="https://formspree.io/f/mkgzjlde"
              method="POST"
              className="mt-4 space-y-3"
              onSubmit={() => trackEvent("lead_magnet_submit", { resource: "mvp-planner", level: plan.level.label })}
            >
              <input type="hidden" name="_subject" value="MVP plan from the planner" />
              <input type="hidden" name="resource" value="mvp-planner" />
              <input type="hidden" name="plan" value={plan.text} />
              <label htmlFor="mvp-email" className="sr-only">
                Email address
              </label>
              <input id="mvp-email" type="email" name="email" required autoComplete="email" placeholder="you@example.com" className={fieldCls} />
              <CTA type="submit" size="md" className="w-full justify-center">
                Send me feedback
              </CTA>
            </form>
            <p className="mt-3 flex items-center gap-2 font-inter text-xs text-subtle">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Only used to reply to you. Never shared.
            </p>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};

export default MvpPlanner;
