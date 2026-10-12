/**
 * Standard pay-as-you-go text prices, USD per 1M tokens, read from each
 * provider's official pricing page on PRICES_CHECKED. Update the date with
 * the numbers. Cache-write charges, fast/priority tiers and tool fees are
 * left out on purpose; the page says so. Notes about a model (preview,
 * announced price changes) are in each language's text, under cost.notes.
 */

export const PRICES_CHECKED = "2026-10-12";

export type Provider = "OpenAI" | "Anthropic" | "Google";

export interface Rate {
  input: number;
  cached: number;
  output: number;
}

export interface ModelPrice extends Rate {
  id: string;
  name: string;
  provider: Provider;
  /** Higher rates for every token once a request's prompt is longer than `above` tokens. */
  long?: Rate & { above: number };
}

/** All three providers price batch jobs at half the standard rate. */
export const BATCH_DISCOUNT = 0.5;

export const SOURCES: Record<Provider, string> = {
  OpenAI: "https://developers.openai.com/api/docs/pricing",
  Anthropic: "https://platform.claude.com/docs/en/about-claude/pricing",
  Google: "https://ai.google.dev/gemini-api/docs/pricing",
};

export const MODELS: ModelPrice[] = [
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    provider: "OpenAI",
    input: 10,
    cached: 1,
    output: 50,
    long: { above: 272_000, input: 20, cached: 2, output: 75 },
  },
  {
    id: "gpt-6.1-sol",
    name: "GPT-6.1 Sol",
    provider: "OpenAI",
    input: 2,
    cached: 0.1,
    output: 10,
    long: { above: 272_000, input: 4, cached: 0.2, output: 15 },
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    provider: "OpenAI",
    input: 0.1,
    cached: 0.01,
    output: 0.5,
    long: { above: 272_000, input: 0.2, cached: 0.02, output: 0.75 },
  },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", provider: "Anthropic", input: 10, cached: 0.25, output: 50 },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", provider: "Anthropic", input: 4, cached: 0.2, output: 20 },
  { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5", provider: "Anthropic", input: 2, cached: 0.1, output: 10 },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    input: 0.1,
    cached: 0.01,
    output: 0.5,
    long: { above: 100_000, input: 0.5, cached: 0.05, output: 2.5 },
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro (preview)",
    provider: "Google",
    input: 2,
    cached: 0.2,
    output: 12,
    long: { above: 200_000, input: 4, cached: 0.4, output: 18 },
  },
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash",
    provider: "Google",
    input: 0.75,
    cached: 0.075,
    output: 3.75,
  },
  { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite", provider: "Google", input: 0.3, cached: 0.03, output: 2.5 },
  { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash-Lite", provider: "Google", input: 0.25, cached: 0.025, output: 1.5 },
];

export interface Usage {
  /** Requests per month. */
  requests: number;
  inputTokens: number;
  outputTokens: number;
  /** Share of each prompt billed at the cached rate, 0 to 1. */
  cachedShare: number;
  batch: boolean;
}

/** Cost of one request and of a month, in USD. */
export function costOf(m: ModelPrice, u: Usage) {
  const rate: Rate = m.long && u.inputTokens > m.long.above ? m.long : m;
  const cachedTokens = u.inputTokens * u.cachedShare;
  const perRequest =
    ((u.inputTokens - cachedTokens) * rate.input + cachedTokens * rate.cached + u.outputTokens * rate.output) / 1_000_000 *
    (u.batch ? BATCH_DISCOUNT : 1);
  return { perRequest, perMonth: perRequest * u.requests, rate };
}
