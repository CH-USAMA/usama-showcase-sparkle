/**
 * The free tools under /tools (and /ar/tools, /fr/tools). Their words live in
 * src/i18n/tools/<locale>.ts; this file only holds what does not change with
 * the language. Plain data, so scripts/prerender.ts and
 * scripts/generate-sitemap.ts can read it.
 */
import type { ToolsText } from "../i18n/tools/en";

export const TOOL_SLUGS = [
  "prompt-builder",
  "mvp-planner",
  "ai-cost-calculator",
  "readme-generator",
  "automation-roi-calculator",
  "call-center-cost-calculator",
  "meta-tag-generator",
] as const;
export type ToolSlug = (typeof TOOL_SLUGS)[number];

/** Where each tool's closing card leads. These pages are English only. */
export const NEXT_LINK: Record<ToolSlug, string> = {
  "prompt-builder": "/learn-ai",
  "mvp-planner": "/services/mvp-development",
  "ai-cost-calculator": "/services/ai-integration",
  "readme-generator": "/services/mvp-development",
  "automation-roi-calculator": "/services/automation-n8n",
  "call-center-cost-calculator": "/services/voip-asterisk",
  "meta-tag-generator": "/blog/seo-ai-search-rank-google-chatgpt-2026",
};

export type ToolCopy = ToolsText["tools"][ToolSlug] & { slug: ToolSlug };

export const toolsIn = (t: ToolsText): ToolCopy[] => TOOL_SLUGS.map((slug) => ({ slug, ...t.tools[slug] }));
