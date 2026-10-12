/**
 * Options and starting points for /tools/prompt-builder, and the function
 * that turns the form into a prompt. All visible strings live here so the
 * tool can be translated without touching the page.
 */

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

export const TONES = ["friendly", "professional", "formal", "persuasive", "empathetic", "confident", "playful"];

export const LENGTHS: { value: string; label: string; text: string }[] = [
  { value: "very-short", label: "Very short (under 50 words)", text: "Keep it very short, under 50 words." },
  { value: "short", label: "Short (under 150 words)", text: "Keep it under 150 words." },
  { value: "medium", label: "Medium (about 300 words)", text: "Aim for about 300 words." },
  { value: "long", label: "Detailed", text: "Be thorough and detailed." },
];

export const FORMATS: { value: string; label: string; text: string }[] = [
  { value: "bullets", label: "Bullet points", text: "Format the answer as bullet points." },
  { value: "steps", label: "Numbered steps", text: "Format the answer as numbered steps." },
  { value: "table", label: "A table", text: "Put the answer in a table." },
  { value: "email", label: "An email", text: "Write it as a ready-to-send email with a subject line." },
  { value: "paragraphs", label: "Short paragraphs", text: "Write it in short paragraphs." },
  { value: "checklist", label: "A checklist", text: "Format it as a checklist." },
];

export const LANGUAGES = [
  "English",
  "Arabic",
  "French",
  "Spanish",
  "German",
  "Portuguese",
  "Turkish",
  "Urdu",
  "Hindi",
  "Indonesian",
  "Chinese (Simplified)",
  "Japanese",
];

export const EXTRAS: { id: string; label: string; text: string }[] = [
  { id: "ask", label: "Ask me questions first if anything is missing", text: "If anything important is missing, ask me up to three questions before you answer." },
  { id: "options", label: "Give me three options", text: "Give me three different options to choose from." },
  { id: "simple", label: "Plain language, no jargon", text: "Use plain, simple language and avoid jargon." },
  { id: "example", label: "Include an example", text: "Include a short example." },
  { id: "reasoning", label: "Explain the reasoning briefly", text: "Briefly explain how you reached the answer." },
  { id: "check", label: "Flag anything I should double-check", text: "Point out anything I should double-check or verify." },
];

export interface Template {
  id: string;
  label: string;
  form: Partial<PromptForm>;
}

/** Square brackets mark the parts the reader replaces. */
export const TEMPLATES: Template[] = [
  { id: "blank", label: "Start blank", form: {} },
  {
    id: "email",
    label: "Reply to an email",
    form: {
      task: "Write a reply to the email below. I want to [agree / say no politely / ask for more time].",
      context: "[Paste the email you received]",
      tone: "friendly",
      length: "short",
      format: "email",
    },
  },
  {
    id: "summary",
    label: "Summarise a document",
    form: {
      task: "Summarise the text below, then list any deadlines, amounts of money or actions I need to take.",
      context: "[Paste the text]",
      format: "bullets",
      extras: ["check"],
    },
  },
  {
    id: "plan",
    label: "Plan something",
    form: {
      task: "Make a realistic plan for [my week / a trip / a project], with the steps in order.",
      context: "[What you need to fit in, how much time you have, and any limits]",
      format: "steps",
      extras: ["ask"],
    },
  },
  {
    id: "learn",
    label: "Learn a topic",
    form: {
      task: "Explain [topic] to me, using one everyday analogy, then give me the three ideas that matter most.",
      audience: "a smart beginner",
      extras: ["simple", "example"],
    },
  },
  {
    id: "social",
    label: "Social media posts",
    form: {
      task: "Write social media posts for [platform] about [offer or news], each with one clear call to action.",
      context: "[Your business, who it is for, and what makes it different]",
      tone: "friendly",
      length: "very-short",
      extras: ["options"],
    },
  },
  {
    id: "compare",
    label: "Compare options",
    form: {
      task: "Compare [option A] and [option B] for [purpose] and tell me which you would choose and why.",
      format: "table",
      extras: ["ask", "reasoning"],
    },
  },
  {
    id: "code",
    label: "Explain or fix code",
    form: {
      task: "Explain what this code does, find the cause of the error, and suggest a fix.",
      context: "[Paste the code and the full error message]",
      format: "steps",
      extras: ["reasoning", "check"],
    },
  },
];

/** The four parts of a good prompt, for the strength hint. */
export function promptParts(f: PromptForm) {
  return [
    { label: "Background", done: f.context.trim() !== "", tip: "Add the background the assistant cannot know." },
    { label: "Task", done: f.task.trim() !== "", tip: "Say exactly what you want back." },
    { label: "Details", done: !!(f.audience.trim() || f.tone || f.length), tip: "Set the audience, tone or length." },
    { label: "Format", done: f.format !== "", tip: "Choose the format of the answer." },
  ];
}

export function buildPrompt(f: PromptForm): string {
  const blocks: string[] = [];
  if (f.context.trim()) blocks.push(`Background:\n${f.context.trim()}`);
  if (f.task.trim()) blocks.push(`Task:\n${f.task.trim()}`);

  const details: string[] = [];
  if (f.audience.trim()) details.push(`Write for ${f.audience.trim()}.`);
  if (f.tone) details.push(`Use a ${f.tone} tone.`);
  const length = LENGTHS.find((l) => l.value === f.length);
  if (length) details.push(length.text);
  const format = FORMATS.find((x) => x.value === f.format);
  if (format) details.push(format.text);
  for (const e of EXTRAS) if (f.extras.includes(e.id)) details.push(e.text);
  if (f.language) details.push(`Write your answer in ${f.language}.`);
  if (details.length) blocks.push(details.join("\n"));

  return blocks.join("\n\n");
}
