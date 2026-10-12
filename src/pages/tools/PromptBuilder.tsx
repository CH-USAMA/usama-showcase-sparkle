import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";
import ToolPage from "@/components/tools/ToolPage";
import CopyButton from "@/components/CopyButton";
import { Check, Choices, Field, fieldCls } from "@/components/tools/fields";
import { getTool } from "@/data/tools";
import {
  EMPTY_FORM,
  EXTRAS,
  FORMATS,
  LANGUAGES,
  LENGTHS,
  TEMPLATES,
  TONES,
  buildPrompt,
  promptParts,
  type PromptForm,
} from "@/data/tools/promptBuilder";

const tool = getTool("prompt-builder")!;

const fromTemplate = (id: string): PromptForm => ({ ...EMPTY_FORM, ...TEMPLATES.find((t) => t.id === id)?.form });

const PromptBuilder = () => {
  const [template, setTemplate] = useState("email");
  const [form, setForm] = useState<PromptForm>(() => fromTemplate("email"));
  const set = <K extends keyof PromptForm>(key: K) => (value: PromptForm[K]) => setForm((f) => ({ ...f, [key]: value }));
  const toggleExtra = (id: string, on: boolean) =>
    setForm((f) => ({ ...f, extras: on ? [...f.extras, id] : f.extras.filter((x) => x !== id) }));

  const prompt = useMemo(() => buildPrompt(form), [form]);
  const parts = promptParts(form);
  const done = parts.filter((p) => p.done).length;
  const nextTip = parts.find((p) => !p.done)?.tip;

  return (
    <ToolPage
      tool={tool}
      next={{
        title: "Learn the habits behind good prompts",
        text: "The free guide covers how to ask, twenty-one everyday prompts, and what never to paste into an AI tool.",
        to: "/learn-ai",
        label: "Read the free guide",
      }}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- form ---- */}
        <div className="card-surface space-y-6 p-5 sm:p-6">
          <div>
            <p className="font-inter text-sm font-medium text-foreground">Start from</p>
            <div className="mt-2">
              <Choices
                label="Starting point"
                options={TEMPLATES.map((t) => ({ value: t.id, label: t.label }))}
                value={template}
                onChange={(id) => {
                  setTemplate(id);
                  setForm(fromTemplate(id));
                }}
              />
            </div>
          </div>

          <Field id="pb-task" label="What do you want?" hint="One or two sentences. Replace anything in [brackets].">
            <textarea id="pb-task" rows={3} className={fieldCls} value={form.task} onChange={(e) => set("task")(e.target.value)} placeholder="e.g. Write a polite reminder to a client about an unpaid invoice." />
          </Field>

          <Field id="pb-context" label="Background" hint="What the assistant cannot know: the situation, the text to work on, your constraints.">
            <textarea id="pb-context" rows={4} className={fieldCls} value={form.context} onChange={(e) => set("context")(e.target.value)} placeholder="e.g. The invoice was due on 1 October. They are a good client and usually pay on time." />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="pb-audience" label="Who is it for?">
              <input id="pb-audience" className={fieldCls} value={form.audience} onChange={(e) => set("audience")(e.target.value)} placeholder="e.g. a busy client" />
            </Field>
            <Field id="pb-tone" label="Tone">
              <select id="pb-tone" className={fieldCls} value={form.tone} onChange={(e) => set("tone")(e.target.value)}>
                <option value="">Any</option>
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="pb-length" label="Length">
              <select id="pb-length" className={fieldCls} value={form.length} onChange={(e) => set("length")(e.target.value)}>
                <option value="">Any</option>
                {LENGTHS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="pb-format" label="Format">
              <select id="pb-format" className={fieldCls} value={form.format} onChange={(e) => set("format")(e.target.value)}>
                <option value="">Any</option>
                {FORMATS.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="pb-language" label="Answer language" hint="Write in English and get the answer in another language.">
            <select id="pb-language" className={fieldCls} value={form.language} onChange={(e) => set("language")(e.target.value)}>
              <option value="">Same as my prompt</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>

          <fieldset>
            <legend className="font-inter text-sm font-medium text-foreground">Extras</legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {EXTRAS.map((x) => (
                <Check key={x.id} id={`pb-extra-${x.id}`} checked={form.extras.includes(x.id)} onChange={(on) => toggleExtra(x.id, on)}>
                  {x.label}
                </Check>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ---- result ---- */}
        <div className="card-surface p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-inter text-[15px] font-medium text-foreground">Your prompt</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTemplate("blank");
                  setForm(EMPTY_FORM);
                }}
                className="inline-flex min-h-9 items-center rounded-md px-2.5 font-inter text-xs font-medium text-muted-foreground transition-colors duration-standard hover:text-foreground"
              >
                Clear
              </button>
              <CopyButton text={prompt} label="Copy prompt" event="prompt_builder_copy">
                Copy prompt
              </CopyButton>
            </div>
          </div>

          <pre className="mt-4 min-h-[12rem] whitespace-pre-wrap break-words rounded-lg bg-surface-2 p-4 font-mono text-[13px] leading-relaxed text-foreground" aria-live="polite">
            {prompt || "Your prompt appears here as you fill in the form."}
          </pre>

          <div className="mt-5">
            <p className="font-inter text-xs text-subtle">
              {done} of 4 parts{nextTip ? ` · ${nextTip}` : " · a complete prompt"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {parts.map((p) => (
                <li key={p.label} className={`flex items-center gap-1.5 font-inter text-xs ${p.done ? "text-foreground" : "text-subtle"}`}>
                  {p.done ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : <Circle className="h-3.5 w-3.5" aria-hidden="true" />}
                  {p.label}
                  <span className="sr-only">{p.done ? "done" : "missing"}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 border-t border-hairline/[0.08] pt-4 font-inter text-xs leading-relaxed text-subtle">
            Paste it into ChatGPT, Claude, Gemini or any assistant. Nothing you type here leaves your browser. Keep
            passwords and ID numbers out of prompts; see{" "}
            <Link to="/learn-ai#safety" className="underline underline-offset-2 hover:text-foreground">
              staying safe with AI
            </Link>
            .
          </p>
        </div>
      </div>
    </ToolPage>
  );
};

export default PromptBuilder;
