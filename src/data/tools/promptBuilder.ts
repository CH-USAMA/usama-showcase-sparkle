/**
 * /tools/prompt-builder: the options (ids only) and the function that turns
 * the form into a prompt. All words, including the sentences of the prompt,
 * come from the language's text (src/i18n/tools/<locale>.ts).
 */
import type { ToolsText } from "../../i18n/tools/en";

type PromptText = ToolsText["prompt"];

export interface PromptForm {
  context: string;
  task: string;
  audience: string;
  tone: string;
  length: string;
  format: string;
  language: string;
  extras: string[];
}

export const EMPTY_FORM: PromptForm = {
  context: "",
  task: "",
  audience: "",
  tone: "",
  length: "",
  format: "",
  language: "",
  extras: [],
};

export const TONES = ["friendly", "professional", "formal", "persuasive", "empathetic", "confident", "playful"] as const;
export const LENGTHS = ["very-short", "short", "medium", "long"] as const;
export const FORMATS = ["bullets", "steps", "table", "email", "paragraphs", "checklist"] as const;
export const LANGUAGES = ["en", "ar", "fr", "es", "de", "pt", "tr", "ur", "hi", "id", "zh", "ja"] as const;
export const EXTRAS = ["ask", "options", "simple", "example", "reasoning", "check"] as const;
export const TEMPLATE_IDS = ["blank", "email", "summary", "plan", "learn", "social", "compare", "code"] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

/** The non-text settings each starting point comes with; its text is translated. */
const PRESETS: Record<TemplateId, Partial<PromptForm>> = {
  blank: {},
  email: { tone: "friendly", length: "short", format: "email" },
  summary: { format: "bullets", extras: ["check"] },
  plan: { format: "steps", extras: ["ask"] },
  learn: { extras: ["simple", "example"] },
  social: { tone: "friendly", length: "very-short", extras: ["options"] },
  compare: { format: "table", extras: ["ask", "reasoning"] },
  code: { format: "steps", extras: ["reasoning", "check"] },
};

export const fromTemplate = (id: TemplateId, t: PromptText): PromptForm => {
  const { task, context, audience } = t.templates[id];
  return { ...EMPTY_FORM, ...PRESETS[id], task, context, audience };
};

/** The four parts of a good prompt, for the strength hint. */
export function promptParts(f: PromptForm, t: PromptText) {
  return [
    { ...t.parts.background, done: f.context.trim() !== "" },
    { ...t.parts.task, done: f.task.trim() !== "" },
    { ...t.parts.details, done: !!(f.audience.trim() || f.tone || f.length) },
    { ...t.parts.format, done: f.format !== "" },
  ];
}

export function buildPrompt(f: PromptForm, t: PromptText): string {
  const blocks: string[] = [];
  if (f.context.trim()) blocks.push(`${t.build.background}\n${f.context.trim()}`);
  if (f.task.trim()) blocks.push(`${t.build.task}\n${f.task.trim()}`);

  const details: string[] = [];
  if (f.audience.trim()) details.push(t.build.audience(f.audience.trim()));
  if (f.tone) details.push(t.build.tone(t.tones[f.tone as (typeof TONES)[number]].word));
  if (f.length) details.push(t.lengths[f.length as (typeof LENGTHS)[number]].text);
  if (f.format) details.push(t.formats[f.format as (typeof FORMATS)[number]].text);
  for (const id of EXTRAS) if (f.extras.includes(id)) details.push(t.extras[id].text);
  if (f.language) details.push(t.build.language(t.languages[f.language as (typeof LANGUAGES)[number]].name));
  if (details.length) blocks.push(details.join("\n"));

  return blocks.join("\n\n");
}
