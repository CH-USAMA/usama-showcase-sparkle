import { useMemo, useState } from "react";
import ToolPage from "@/components/tools/ToolPage";
import { Check, Choices, Field, fieldCls, inlineFieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import { MODELS, PRICES_CHECKED, SOURCES, costOf, type Provider } from "@/data/tools/aiPricing";

type Period = "day" | "month";
type PresetId = "chatbot" | "summaries" | "writing" | "classify";

const PRESETS: { id: PresetId; requests: number; period: Period; input: number; output: number; cached: number }[] = [
  { id: "chatbot", requests: 1000, period: "day", input: 2000, output: 300, cached: 50 },
  { id: "summaries", requests: 200, period: "day", input: 8000, output: 600, cached: 0 },
  { id: "writing", requests: 100, period: "day", input: 500, output: 1200, cached: 0 },
  { id: "classify", requests: 10000, period: "day", input: 800, output: 50, cached: 70 },
];

const PROVIDERS: Provider[] = ["OpenAI", "Anthropic", "Google"];

/* Numbers use one fixed locale, so the server-rendered page and the browser
   print the same digits in every language. */
const usd = (v: number) => {
  if (v === 0) return "$0";
  if (v < 0.0001) return "<$0.0001";
  if (v < 1) return `$${Number(v.toPrecision(2))}`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v < 100 ? 2 : 0 }).format(v);
};
/** Per-1M prices: always cents, a third decimal only where the price has one ($0.075). */
const price = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(v);
const num = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v));
const toInt = (s: string) => Math.max(0, Math.min(1e9, Math.round(Number(s) || 0)));

const AiCostCalculator = () => {
  const { t: all } = useToolsText();
  const t = all.cost;
  const [preset, setPreset] = useState<PresetId | "">("chatbot");
  const [requests, setRequests] = useState(1000);
  const [period, setPeriod] = useState<Period>("day");
  const [input, setInput] = useState(2000);
  const [output, setOutput] = useState(300);
  const [cached, setCached] = useState(50);
  const [batch, setBatch] = useState(false);
  const [provider, setProvider] = useState<"all" | Provider>("all");

  const applyPreset = (id: PresetId) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPreset(id);
    setRequests(p.requests);
    setPeriod(p.period);
    setInput(p.input);
    setOutput(p.output);
    setCached(p.cached);
  };
  // Any manual edit means the numbers no longer match a preset.
  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setPreset("");
  };

  const monthly = period === "day" ? requests * 30 : requests;
  const rows = useMemo(() => {
    const usage = { requests: monthly, inputTokens: input, outputTokens: output, cachedShare: cached / 100, batch };
    return MODELS.filter((m) => provider === "all" || m.provider === provider)
      .map((m) => ({ m, ...costOf(m, usage) }))
      .sort((a, b) => a.perMonth - b.perMonth);
  }, [monthly, input, output, cached, batch, provider]);
  const notes = rows.filter((r) => t.notes[r.m.id]);
  const checkedOn = new Date(`${PRICES_CHECKED}T00:00:00Z`).toLocaleDateString(t.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <ToolPage slug="ai-cost-calculator">
      <div className="grid items-start gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        {/* ---- inputs ---- */}
        <div className="card-surface space-y-6 p-5 sm:p-6">
          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.examples}</p>
            <div className="mt-2">
              <Choices<PresetId>
                label={t.examplesGroup}
                options={PRESETS.map((p) => ({ value: p.id, label: t.presets[p.id] }))}
                value={preset as PresetId}
                onChange={applyPreset}
              />
            </div>
          </div>

          <Field id="calc-requests" label={t.requests}>
            <div className="flex gap-2">
              <input
                id="calc-requests"
                type="number"
                min={0}
                dir="ltr"
                className={`${inlineFieldCls} min-w-0 flex-1`}
                value={requests}
                onChange={(e) => edit(setRequests)(toInt(e.target.value))}
              />
              <select aria-label={t.per} className={`${inlineFieldCls} w-32 shrink-0`} value={period} onChange={(e) => edit(setPeriod)(e.target.value as Period)}>
                <option value="day">{t.perDay}</option>
                <option value="month">{t.perMonth}</option>
              </select>
            </div>
          </Field>

          <Field id="calc-input" label={t.inputLabel} hint={t.inputHint(num(input * 0.75))}>
            <input id="calc-input" type="number" min={0} dir="ltr" className={fieldCls} value={input} onChange={(e) => edit(setInput)(toInt(e.target.value))} />
          </Field>

          <Field id="calc-output" label={t.outputLabel} hint={t.outputHint(num(output * 0.75))}>
            <input id="calc-output" type="number" min={0} dir="ltr" className={fieldCls} value={output} onChange={(e) => edit(setOutput)(toInt(e.target.value))} />
          </Field>

          <Field id="calc-cached" label={t.cachedLabel(cached)} hint={t.cachedHint}>
            <input
              id="calc-cached"
              type="range"
              min={0}
              max={90}
              step={5}
              value={cached}
              onChange={(e) => edit(setCached)(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </Field>

          <Check id="calc-batch" checked={batch} onChange={setBatch}>
            {t.batch}
          </Check>
        </div>

        {/* ---- results ---- */}
        <div className="card-surface min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-inter text-sm text-muted-foreground" aria-live="polite">
              {t.summary(num(monthly), num(monthly * (input + output)))}
            </p>
            <Choices<"all" | Provider>
              label={t.providerGroup}
              options={[{ value: "all", label: t.allProviders }, ...PROVIDERS.map((p) => ({ value: p, label: p }))]}
              value={provider}
              onChange={setProvider}
            />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse font-inter text-sm">
              <caption className="sr-only">{t.caption}</caption>
              <thead>
                <tr className="border-b border-hairline/[0.12] text-start text-xs text-subtle">
                  <th scope="col" className="py-2.5 pe-3 text-start font-medium">{t.colModel}</th>
                  <th scope="col" className="py-2.5 pe-3 text-end font-medium">{t.colPrices}</th>
                  <th scope="col" className="py-2.5 pe-3 text-end font-medium">{t.colRequest}</th>
                  <th scope="col" className="py-2.5 text-end font-medium">{t.colMonth}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ m, perRequest, perMonth, rate }, i) => (
                  <tr key={m.id} className={`border-b border-hairline/[0.08] ${i === 0 ? "bg-primary/[0.06]" : ""}`}>
                    <th scope="row" className="py-3 pe-3 text-start font-normal">
                      <span className="block font-medium text-foreground" dir="ltr">
                        {m.name}
                        {t.notes[m.id] && <span className="text-primary" aria-hidden="true"> *</span>}
                      </span>
                      <span className="block text-xs text-subtle">
                        {m.provider}
                        {i === 0 && ` · ${t.cheapest}`}
                      </span>
                    </th>
                    <td className="py-3 pe-3 text-end tabular-nums text-muted-foreground" dir="ltr">
                      {price(rate.input)} / {price(rate.output)}
                    </td>
                    <td className="py-3 pe-3 text-end tabular-nums text-muted-foreground" dir="ltr">
                      {usd(perRequest)}
                    </td>
                    <td className="py-3 text-end font-medium tabular-nums text-foreground" dir="ltr">
                      {usd(perMonth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-2 font-inter text-xs leading-relaxed text-subtle">
            {notes.map(({ m }) => (
              <p key={m.id}>
                <span className="text-primary">*</span> {m.name}: {t.notes[m.id]}
              </p>
            ))}
            <p>
              {t.sourcesBefore}{" "}
              {PROVIDERS.map((p, i) => (
                <span key={p}>
                  <a href={SOURCES[p]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                    {p}
                  </a>
                  {i < PROVIDERS.length - 2 ? t.comma : i === PROVIDERS.length - 2 ? t.and : ""}
                </span>
              ))}
              {t.checkedOn(checkedOn)} {t.sourcesAfter}
            </p>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};

export default AiCostCalculator;
