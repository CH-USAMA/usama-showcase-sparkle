/**
 * /tools/mvp-planner: features with their effort weights, app types with
 * suggested defaults, and the function that turns choices into a plan. The
 * words come from the language's text (src/i18n/tools/<locale>.ts). Weights
 * are rough effort points; the timeline ranges are typical first-version
 * ranges, labelled as such on the page, not quotes.
 */
import type { ToolsText } from "../../i18n/tools/en";

type MvpText = ToolsText["mvp"];

export type Stage = "skip" | "later" | "now";
export type PlatformId = "web" | "ios" | "android";
type GroupId = keyof MvpText["groups"];
export type FeatureId = keyof MvpText["features"];

export const FEATURES: { id: FeatureId; group: GroupId; points: number }[] = [
  { id: "accounts", group: "accounts", points: 2 },
  { id: "profiles", group: "accounts", points: 1 },
  { id: "roles", group: "accounts", points: 2 },
  { id: "admin", group: "accounts", points: 3 },
  { id: "payments", group: "payments", points: 2 },
  { id: "subscriptions", group: "payments", points: 3 },
  { id: "payouts", group: "payments", points: 4 },
  { id: "listings", group: "content", points: 3 },
  { id: "uploads", group: "content", points: 1 },
  { id: "booking", group: "content", points: 3 },
  { id: "maps", group: "content", points: 2 },
  { id: "notifications", group: "communication", points: 1 },
  { id: "push", group: "communication", points: 2 },
  { id: "chat", group: "communication", points: 4 },
  { id: "reviews", group: "communication", points: 2 },
  { id: "ai-assistant", group: "ai", points: 3 },
  { id: "ai-docs", group: "ai", points: 4 },
  { id: "ai-generate", group: "ai", points: 2 },
  { id: "analytics", group: "business", points: 3 },
  { id: "integrations", group: "business", points: 3 },
  { id: "multi-language", group: "business", points: 2 },
  { id: "offline", group: "business", points: 4 },
];

export const FEATURE_GROUPS = [...new Set(FEATURES.map((f) => f.group))];
export const PLATFORMS: PlatformId[] = ["web", "ios", "android"];

export type AppTypeId = keyof MvpText["appTypes"];

export interface AppType {
  id: AppTypeId;
  platforms: PlatformId[];
  now: FeatureId[];
  later: FeatureId[];
}

export const APP_TYPES: AppType[] = [
  { id: "saas", platforms: ["web"], now: ["accounts", "roles", "subscriptions", "admin", "notifications"], later: ["analytics", "integrations"] },
  { id: "marketplace", platforms: ["web"], now: ["accounts", "profiles", "listings", "payments", "admin", "notifications"], later: ["payouts", "reviews", "chat"] },
  { id: "booking", platforms: ["web"], now: ["accounts", "booking", "payments", "notifications", "admin"], later: ["reviews", "maps"] },
  { id: "ecommerce", platforms: ["web"], now: ["listings", "payments", "accounts", "admin", "notifications"], later: ["reviews", "analytics", "multi-language"] },
  { id: "internal", platforms: ["web"], now: ["accounts", "roles", "admin", "uploads", "analytics"], later: ["integrations"] },
  { id: "ai", platforms: ["web"], now: ["accounts", "ai-assistant", "ai-docs", "admin"], later: ["subscriptions", "analytics"] },
  { id: "community", platforms: ["ios", "android"], now: ["accounts", "profiles", "uploads", "push", "notifications"], later: ["chat"] },
  { id: "custom", platforms: ["web"], now: [], later: [] },
];

export const stagesFor = (type: AppType): Record<FeatureId, Stage> =>
  Object.fromEntries(FEATURES.map((f) => [f.id, type.now.includes(f.id) ? "now" : type.later.includes(f.id) ? "later" : "skip"])) as Record<
    FeatureId,
    Stage
  >;

export interface PlanInput {
  idea: string;
  type: AppType;
  platforms: PlatformId[];
  stages: Record<FeatureId, Stage>;
}

const LEVELS = [
  { max: 8, id: "small" },
  { max: 18, id: "medium" },
  { max: Infinity, id: "large" },
] as const;

export const PLANNER_URL = "https://www.chaudharyusama.com/tools/mvp-planner";

export function makePlan({ idea, type, platforms, stages }: PlanInput, t: MvpText, url = PLANNER_URL) {
  const now = FEATURES.filter((f) => stages[f.id] === "now");
  const later = FEATURES.filter((f) => stages[f.id] === "later");
  const web = platforms.includes("web");
  const mobile = platforms.includes("ios") || platforms.includes("android");
  const points = now.reduce((n, f) => n + f.points, 0) + (mobile ? (web ? 5 : 3) : 0);
  const levelId = LEVELS.find((l) => points <= l.max)!.id;
  const level = t.levels[levelId];
  const has = (id: FeatureId) => stages[id] === "now";

  const stack: string[] = [];
  if (web) stack.push(t.stack.web);
  if (mobile) stack.push(t.stack.mobile);
  stack.push(levelId === "small" && !has("integrations") && !has("payouts") ? t.stack.backendSmall : t.stack.backendFull);
  if (has("payments") || has("subscriptions")) stack.push(has("payouts") ? t.stack.paymentsConnect : t.stack.payments);
  if (has("ai-assistant") || has("ai-docs") || has("ai-generate")) stack.push(t.stack.ai);
  if (has("chat")) stack.push(t.stack.realtime);
  if (has("maps")) stack.push(t.stack.maps);
  if (has("push") && mobile) stack.push(t.stack.push);
  stack.push(mobile ? t.stack.hostingMobile : t.stack.hostingWeb);

  const questions = [t.questions.firstUser, ...now.map((f) => t.features[f.id].question).filter(Boolean), t.questions.measure];

  const nowLabels = now.map((f) => t.features[f.id].label);
  const laterLabels = later.map((f) => t.features[f.id].label);
  const platformLabel = PLATFORMS.filter((p) => platforms.includes(p)).map((p) => t.platforms[p]).join(", ") || t.planText.notChosen;
  const list = (items: string[]) => (items.length ? items.map((i) => `- ${i}`).join("\n") : t.planText.none);
  const pt = t.planText;
  const text = [
    pt.title(t.appTypes[type.id]),
    ...(idea.trim() ? [pt.idea(idea.trim())] : []),
    pt.platforms(platformLabel),
    pt.complexity(level.label, level.weeks),
    "",
    pt.firstVersion,
    list(nowLabels),
    "",
    pt.later,
    list(laterLabels),
    "",
    pt.stack,
    list(stack),
    "",
    pt.questions,
    list(questions),
    "",
    pt.madeWith(url),
  ].join("\n");

  return { nowLabels, laterLabels, points, level, stack, questions, text, overSized: levelId === "large", levelId };
}
