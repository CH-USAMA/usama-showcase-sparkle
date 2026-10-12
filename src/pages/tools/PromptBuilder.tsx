import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { useToolsText } from "@/i18n/tools";
import {
  EMPTY_FORM,
  EXTRAS,
  FORMATS,
  LANGUAGES,
  LENGTHS,
  TEMPLATE_IDS,
  TONES,
  buildPrompt,
  fromTemplate,
  promptParts,
  type PromptForm,
  type TemplateId,
} from "@/data/tools/promptBuilder";

const PromptBuilder = () => {
  const { t: all } = useToolsText();
  const t = all.prompt;
  const [template, setTemplate] = useState<TemplateId>("email");
  const [form, setForm] = useState<PromptForm>(() => fromTemplate("email", t));
  const set = <K extends keyof PromptForm>(key: K) => (value: PromptForm[K]) => setForm((f) => ({ ...f, [key]: value }));
  const toggleExtra = (id: string, on: boolean) =>
    setForm((f) => ({ ...f, extras: on ? [...f.extras, id] : f.extras.filter((x) => x !== id) }));

  const prompt = useMemo(() => buildPrompt(form, t), [form, t]);
  const parts = promptParts(form, t);
  const done = parts.filter((p) => p.done).length;
  const nextTip = parts.find((p) => !p.done)?.tip;

  return (
    <ToolPage slug="prompt-builder">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- form ---- */}
        <div className="card-surface space-y-6 p-5 sm:p-6">
          <div>
            <p className="font-inter text-sm font-medium text-foreground">{t.startFrom}</p>
            <div className="mt-2">
              <Choices<TemplateId>
                label={t.startingPoint}
                options={TEMPLATE_IDS.map((id) => ({ value: id, label: t.templates[id].label }))}
                value={template}
                onChange={(id) => {
                  setTemplate(id);
                  setForm(fromTemplate(id, t));
                }}
              />
            </div>
          </div>

          <Field id="pb-task" label={t.taskLabel} hint={t.taskHint}>
            <textarea id="pb-task" rows={3} className={fieldCls} value={form.task} onChange={(e) => set("task")(e.target.value)} placeholder={t.taskPlaceholder} />
          </Field>

          <Field id="pb-context" label={t.contextLabel} hint={t.contextHint}>
            <textarea id="pb-context" rows={4} className={fieldCls} value={form.context} onChange={(e) => set("context")(e.target.value)} placeholder={t.contextPlaceholder} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="pb-audience" label={t.audienceLabel}>
              <input id="pb-audience" className={fieldCls} value={form.audience} onChange={(e) => set("audience")(e.target.value)} placeholder={t.audiencePlaceholder} />
            </Field>
            <Field id="pb-tone" label={t.toneLabel}>
              <select id="pb-tone" className={fieldCls} value={form.tone} onChange={(e) => set("tone")(e.target.value)}>
                <option value="">{t.any}</option>
                {TONES.map((id) => (
                  <option key={id} value={id}>
                    {t.tones[id].label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="pb-length" label={t.lengthLabel}>
              <select id="pb-length" className={fieldCls} value={form.length} onChange={(e) => set("length")(e.target.value)}>
                <option value="">{t.any}</option>
                {LENGTHS.map((id) => (
                  <option key={id} value={id}>
                    {t.lengths[id].label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="pb-format" label={t.formatLabel}>
              <select id="pb-format" className={fieldCls} value={form.format} onChange={(e) => set("format")(e.target.value)}>
                <option value="">{t.any}</option>
                {FORMATS.map((id) => (
                  <option key={id} value={id}>
                    {t.formats[id].label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="pb-language" label={t.languageLabel} hint={t.languageHint}>
            <select id="pb-language" className={fieldCls} value={form.language} onChange={(e) => set("language")(e.target.value)}>
              <option value="">{t.sameLanguage}</option>
              {LANGUAGES.map((id) => (
                <option key={id} value={id}>
                  {t.languages[id].label}
                </option>
              ))}
            </select>
          </Field>

          <fieldset>
            <legend className="font-inter text-sm font-medium text-foreground">{t.extrasLabel}</legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {EXTRAS.map((id) => (
                <Check key={id} id={`pb-extra-${id}`} checked={form.extras.includes(id)} onChange={(on) => toggleExtra(id, on)}>
                  {t.extras[id].label}
                </Check>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ---- result ---- */}
        <div className="card-surface p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-inter text-[15px] font-medium text-foreground">{t.yourPrompt}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTemplate("blank");
                  setForm(EMPTY_FORM);
                }}
                className="inline-flex min-h-9 items-center rounded-md px-2.5 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:text-foreground"
              >
                {t.clear}
              </button>
              <CopyButton text={prompt} label={t.copyPrompt} event="prompt_builder_copy" copiedText={all.common.copied}>
                {t.copyPrompt}
              </CopyButton>
            </div>
          </div>

          <pre
            dir="auto"
            className="mt-4 min-h-[12rem] whitespace-pre-wrap break-words rounded-lg bg-surface-2 p-4 font-mono text-[13px] leading-relaxed text-foreground"
            aria-live="polite"
          >
            {prompt || t.empty}
          </pre>

          <div className="mt-5">
            <p className="font-inter text-xs text-subtle">
              {t.partsOf(done)} · {nextTip ?? t.complete}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {parts.map((p) => (
                <li key={p.label} className={`flex items-center gap-1.5 font-inter text-xs ${p.done ? "text-foreground" : "text-subtle"}`}>
                  {p.done ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : <Circle className="h-3.5 w-3.5" aria-hidden="true" />}
                  {p.label}
                  <span className="sr-only">{p.done ? t.done : t.missing}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 border-t border-hairline/[0.08] pt-4 font-inter text-xs leading-relaxed text-subtle">
            {t.footerBefore}{" "}
            <Link to="/learn-ai#safety" className="underline underline-offset-2 hover:text-foreground">
              {t.footerLink}
            </Link>
            {t.footerAfter}
          </p>
        </div>
      </div>
    </ToolPage>
  );
};

export default PromptBuilder;
