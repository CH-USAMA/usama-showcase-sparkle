import { useMemo, useState } from "react";
import ToolPage from "@/components/tools/ToolPage";
import { Check, Choices, Field, NumberField } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import {
  CALL_PRESETS,
  RATES_CHECKED,
  RATE_SOURCES,
  SELF_HOSTED_DEFAULTS,
  TRUNK,
  callCostOf,
  type CallInput,
  type CallPresetId,
  type CallSide,
} from "@/data/tools/callCost";
import { amount, num, usd, usdRate } from "@/lib/toolFormat";

const START: CallInput = (() => {
  const { id: _id, ...volume } = CALL_PRESETS[0];
  return { ...volume, daysPerMonth: 22, softphone: true, ...SELF_HOSTED_DEFAULTS };
})();

const linkCls = "underline underline-offset-2 hover:text-foreground";

const CallCenterCostCalculator = () => {
  const { t: all } = useToolsText();
  const t = all.calls;
  const [preset, setPreset] = useState<CallPresetId | "">("office");
  const [input, setInput] = useState<CallInput>(START);

  /* Toll-free numbers have their own inbound trunk rate. Swap the default
     with the switch, but leave a rate the reader typed alone. */
  const withTollFree = (i: CallInput, tollFree: boolean): CallInput => {
    const from = tollFree ? TRUNK.inboundLocal : TRUNK.inboundTollFree;
    const to = tollFree ? TRUNK.inboundTollFree : TRUNK.inboundLocal;
    return { ...i, tollFree, trunkInbound: i.trunkInbound === from ? to : i.trunkInbound };
  };
  const applyPreset = (id: CallPresetId) => {
    const { id: _id, tollFree, ...volume } = CALL_PRESETS.find((p) => p.id === id)!;
    setPreset(id);
    setInput((i) => withTollFree({ ...i, ...volume }, tollFree));
  };
  const set =
    <K extends keyof CallInput>(key: K, clearsPreset = true) =>
    (v: CallInput[K]) => {
      setInput((i) => (key === "tollFree" ? withTollFree(i, v as boolean) : { ...i, [key]: v }));
      if (clearsPreset) setPreset("");
    };

  const r = useMemo(() => callCostOf(input), [input]);
  const cheaper = r.savingPerMonth >= 0 ? "asterisk" : "twilio";
  const checkedOn = new Date(`${RATES_CHECKED}T00:00:00Z`).toLocaleDateString(t.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const side = (key: "twilio" | "asterisk", s: CallSide) => (
    <div className={`rounded-xl border p-4 sm:p-5 ${cheaper === key ? "border-primary/50 bg-primary/[0.06]" : "border-hairline/[0.12]"}`}>
      <p className="font-inter text-sm font-medium text-foreground">{t[key]}</p>
      <p className="mt-2 font-inter text-3xl font-semibold tabular-nums tracking-tight text-foreground" dir="ltr">
        {usd(s.perMonth)}
      </p>
      <p className="font-inter text-xs text-subtle">
        {t.perMonth} · <span dir="ltr">{t.perMinute(usdRate(s.perMinute))}</span>
      </p>
      <dl className="mt-4 space-y-1.5 font-inter text-xs">
        {s.lines.map((l) => (
          <div key={l.id} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t.lines[l.id]}</dt>
            <dd className="tabular-nums text-foreground" dir="ltr">
              {usd(l.cost)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <ToolPage slug="call-center-cost-calculator">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
        {/* ---- inputs ---- */}
        <div className="card-surface space-y-8 p-5 sm:p-6">
          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.examples}</p>
            <div className="mt-2">
              <Choices<CallPresetId>
                label={t.examplesGroup}
                options={CALL_PRESETS.map((p) => ({ value: p.id, label: t.presets[p.id] }))}
                value={preset as CallPresetId}
                onChange={applyPreset}
              />
            </div>
          </div>

          <fieldset>
            <legend className="font-inter text-base font-semibold text-foreground">{t.volume}</legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <NumberField id="cc-calls" label={t.callsLabel} value={input.callsPerDay} onChange={set("callsPerDay")} max={1000000} />
              <NumberField id="cc-minutes" label={t.minutesLabel} value={input.avgMinutes} onChange={set("avgMinutes")} max={600} step={0.5} />
              <NumberField id="cc-days" label={t.daysLabel} value={input.daysPerMonth} onChange={set("daysPerMonth")} max={31} />
              <NumberField id="cc-numbers" label={t.numbersLabel} value={input.numbers} onChange={set("numbers")} max={100000} />
            </div>
            <div className="mt-5">
              <Field id="cc-outbound" label={t.outboundLabel(input.outboundPct)}>
                <input
                  id="cc-outbound"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={input.outboundPct}
                  onChange={(e) => set("outboundPct")(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </Field>
            </div>
            <div className="mt-5 space-y-2.5">
              <Check id="cc-tollfree" checked={input.tollFree} onChange={set("tollFree")}>
                {t.tollFree}
              </Check>
              <Check id="cc-record" checked={input.record} onChange={set("record")}>
                {t.record}
              </Check>
              <Check id="cc-softphone" checked={input.softphone} onChange={set("softphone", false)}>
                {t.softphone}
              </Check>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-inter text-base font-semibold text-foreground">{t.selfHosted}</legend>
            <p className="mt-1 font-inter text-xs leading-relaxed text-subtle">{t.trunkHint}</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <NumberField id="cc-trunk-out" label={t.trunkOutLabel} value={input.trunkOutbound} onChange={set("trunkOutbound", false)} max={10} step={0.0005} />
              <NumberField id="cc-trunk-in" label={t.trunkInLabel} value={input.trunkInbound} onChange={set("trunkInbound", false)} max={10} step={0.0005} />
              <NumberField id="cc-trunk-number" label={t.trunkNumberLabel} value={input.trunkNumber} onChange={set("trunkNumber", false)} max={1000} step={0.25} />
              <NumberField id="cc-server" label={t.serverLabel} value={input.serverMonthly} onChange={set("serverMonthly", false)} step={10} />
              <NumberField id="cc-upkeep" label={t.upkeepLabel} value={input.upkeepMonthly} onChange={set("upkeepMonthly", false)} step={50} />
              <NumberField id="cc-setup" label={t.setupLabel} hint={t.setupHint} value={input.setupCost} onChange={set("setupCost", false)} step={250} />
            </div>
          </fieldset>
        </div>

        {/* ---- result ---- */}
        <div className="card-surface min-w-0 p-5 sm:p-6 lg:sticky lg:top-28">
          <p className="font-inter text-sm text-muted-foreground" aria-live="polite">
            {t.summary(num(r.minutes))}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {side("twilio", r.twilio)}
            {side("asterisk", r.selfHosted)}
          </div>

          <dl className="mt-5 border-t border-hairline/[0.08] font-inter text-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline/[0.08] py-3">
              <dt className="text-muted-foreground">{r.savingPerMonth >= 0 ? t.saving : t.moreExpensive}</dt>
              <dd className={`font-medium tabular-nums ${r.savingPerMonth >= 0 ? "text-foreground" : "text-amber-300"}`} dir="ltr">
                {usd(Math.abs(r.savingPerMonth))}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline/[0.08] py-3">
              <dt className="text-muted-foreground">{t.payback}</dt>
              <dd className="text-end font-medium tabular-nums text-foreground">
                {r.paybackMonths === null ? t.noPayback : t.months(amount(Math.max(0.1, r.paybackMonths)))}
              </dd>
            </div>
          </dl>
          <p className="mt-4 font-inter text-sm leading-relaxed text-foreground">
            {r.breakEvenMinutes === null ? t.breakEvenNever : t.breakEven(num(Math.round(r.breakEvenMinutes / 1000) * 1000 || r.breakEvenMinutes))}
          </p>

          <p className="mt-5 font-inter text-xs leading-relaxed text-subtle">
            {t.sourcesBefore}{" "}
            <a href={RATE_SOURCES.twilio} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t.twilioSource}
            </a>
            {t.sourcesMiddle}{" "}
            <a href={RATE_SOURCES.telnyx} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t.telnyxSource}
            </a>
            {t.checkedOn(checkedOn)} {t.sourcesAfter}
          </p>
        </div>
      </div>
    </ToolPage>
  );
};

export default CallCenterCostCalculator;
