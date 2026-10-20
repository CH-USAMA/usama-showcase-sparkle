import { useMemo, useState } from "react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Choices, Field, NumberField } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import { ROI_PRESETS, roiOf, verdictOf, type RoiInput, type RoiPresetId } from "@/data/tools/automationRoi";
import { amount, usd } from "@/lib/toolFormat";

const VERDICT_CLS = {
  fast: "border-primary/40 bg-primary/[0.07] text-foreground",
  slow: "border-hairline/[0.16] bg-surface-2 text-foreground",
  no: "border-amber-400/30 bg-amber-400/[0.06] text-foreground",
};

const AutomationRoiCalculator = () => {
  const { t: all } = useToolsText();
  const t = all.roi;
  const [preset, setPreset] = useState<RoiPresetId | "">("leads");
  const [input, setInput] = useState<RoiInput>(() => {
    const { id: _id, ...rest } = ROI_PRESETS[0];
    return rest;
  });

  const applyPreset = (id: RoiPresetId) => {
    const { id: _id, ...rest } = ROI_PRESETS.find((p) => p.id === id)!;
    setPreset(id);
    setInput(rest);
  };
  // Any manual edit means the numbers no longer match an example.
  const set = (key: keyof RoiInput) => (v: number) => {
    setInput((i) => ({ ...i, [key]: v }));
    setPreset("");
  };

  const r = useMemo(() => roiOf(input), [input]);
  const verdict = verdictOf(r);
  const payback = r.paybackMonths === null ? t.never : t.months(amount(Math.max(0.1, r.paybackMonths)));

  const rows: [string, string, boolean?][] = [
    [t.valueMonth, usd(r.valuePerMonth)],
    [t.netMonth, usd(r.netPerMonth), r.netPerMonth < 0],
    [t.payback, payback],
    [t.firstYear, usd(r.firstYear), r.firstYear < 0],
    [t.threeYears, usd(r.threeYears), r.threeYears < 0],
  ];
  const summary = t.summaryText([
    `${t.hoursSaved}: ${amount(r.hoursSaved)}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ]);

  return (
    <ToolPage slug="automation-roi-calculator">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* ---- inputs ---- */}
        <div className="card-surface space-y-8 p-5 sm:p-6">
          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.examples}</p>
            <div className="mt-2">
              <Choices<RoiPresetId>
                label={t.examplesGroup}
                options={ROI_PRESETS.map((p) => ({ value: p.id, label: t.presets[p.id] }))}
                value={preset as RoiPresetId}
                onChange={applyPreset}
              />
            </div>
          </div>

          <fieldset>
            <legend className="font-inter text-base font-semibold text-foreground">{t.today}</legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <NumberField id="roi-runs" label={t.runsLabel} hint={t.runsHint} value={input.runsPerWeek} onChange={set("runsPerWeek")} max={100000} />
              <NumberField id="roi-minutes" label={t.minutesLabel} value={input.minutesPerRun} onChange={set("minutesPerRun")} max={10000} />
              <NumberField id="roi-hourly" label={t.hourlyLabel} hint={t.hourlyHint} value={input.hourlyCost} onChange={set("hourlyCost")} max={10000} />
              <NumberField id="roi-errors" label={t.errorsLabel} hint={t.errorsHint} value={input.errorsPer100} onChange={set("errorsPer100")} max={100} />
              <NumberField id="roi-fix" label={t.fixLabel} value={input.minutesPerFix} onChange={set("minutesPerFix")} max={10000} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-inter text-base font-semibold text-foreground">{t.automation}</legend>
            <div className="mt-4 space-y-5">
              <Field id="roi-share" label={t.automatedLabel(input.automatedPct)} hint={t.automatedHint}>
                <input
                  id="roi-share"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={input.automatedPct}
                  onChange={(e) => set("automatedPct")(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <NumberField id="roi-build" label={t.buildLabel} hint={t.buildHint} value={input.buildCost} onChange={set("buildCost")} step={100} />
                <NumberField id="roi-monthly" label={t.monthlyLabel} hint={t.monthlyHint} value={input.monthlyCost} onChange={set("monthlyCost")} step={5} />
              </div>
            </div>
          </fieldset>
        </div>

        {/* ---- result ---- */}
        <div className="card-surface min-w-0 p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-inter text-base font-semibold text-foreground">{t.resultsHeading}</h2>
            <CopyButton text={summary} label={t.copySummary} event="roi_copy" copiedText={all.common.copied}>
              {all.common.copy}
            </CopyButton>
          </div>

          <div className="mt-5" aria-live="polite">
            <p className="font-inter text-sm text-muted-foreground">{t.hoursSaved}</p>
            <p className="mt-1 font-inter text-4xl font-semibold tabular-nums tracking-tight text-foreground" dir="ltr">
              {amount(r.hoursSaved)}
            </p>
            <p className="mt-1 font-inter text-xs text-subtle">{t.hoursOf(amount(r.manualHours))}</p>
          </div>

          <dl className="mt-6 border-t border-hairline/[0.08]">
            {rows.map(([label, value, negative]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-hairline/[0.08] py-3 font-inter text-sm">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className={`text-end font-medium tabular-nums ${negative ? "text-amber-300" : "text-foreground"}`} dir="ltr">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className={`mt-5 rounded-lg border p-3.5 font-inter text-sm leading-relaxed ${VERDICT_CLS[verdict]}`}>{t.verdicts[verdict]}</p>
          <p className="mt-4 font-inter text-xs leading-relaxed text-subtle">{t.note}</p>
        </div>
      </div>
    </ToolPage>
  );
};

export default AutomationRoiCalculator;
