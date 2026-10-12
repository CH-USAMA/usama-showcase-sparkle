/**
 * Options for /tools/mvp-planner and the function that turns choices into a
 * plan. Weights are rough effort points: what matters is the relative size.
 * The timeline ranges are typical first-version ranges, labelled as such on
 * the page, not quotes.
 */

export type Stage = "skip" | "later" | "now";
export type PlatformId = "web" | "ios" | "android";

export interface Feature {
  id: string;
  label: string;
  group: string;
  points: number;
  /** Asked when the feature is in the first version. */
  question?: string;
}

export const FEATURES: Feature[] = [
  { id: "accounts", label: "Sign-up and login", group: "Accounts and admin", points: 2 },
  { id: "profiles", label: "User profiles", group: "Accounts and admin", points: 1 },
  { id: "roles", label: "Roles and permissions", group: "Accounts and admin", points: 2, question: "Which roles exist, and what can each one see and change?" },
  { id: "admin", label: "Admin dashboard", group: "Accounts and admin", points: 3 },
  { id: "payments", label: "One-off payments", group: "Payments", points: 2, question: "Who pays, how much, and when?" },
  { id: "subscriptions", label: "Subscriptions and billing", group: "Payments", points: 3, question: "Which plans will you offer, and what happens when a payment fails?" },
  { id: "payouts", label: "Payouts to sellers", group: "Payments", points: 4, question: "How and when do sellers get paid, and who handles refunds?" },
  { id: "listings", label: "Listings or catalogue with search", group: "Content and data", points: 3, question: "Who creates listings, and does anyone approve them?" },
  { id: "uploads", label: "File and image uploads", group: "Content and data", points: 1 },
  { id: "booking", label: "Booking and calendar", group: "Content and data", points: 3, question: "How are availability, cancellations and time zones handled?" },
  { id: "maps", label: "Maps and location", group: "Content and data", points: 2, question: "Do you need live location, or only addresses on a map?" },
  { id: "notifications", label: "Email notifications", group: "Communication", points: 1 },
  { id: "push", label: "Push notifications", group: "Communication", points: 2 },
  { id: "chat", label: "In-app chat", group: "Communication", points: 4, question: "Does chat need to be real-time, and who moderates it?" },
  { id: "reviews", label: "Ratings and reviews", group: "Communication", points: 2 },
  { id: "ai-assistant", label: "AI assistant or chatbot", group: "AI", points: 3, question: "What should the AI answer from, and what should it never answer?" },
  { id: "ai-docs", label: "AI answers from your documents", group: "AI", points: 4, question: "Which documents, how often do they change, and who may see which ones?" },
  { id: "ai-generate", label: "AI content generation", group: "AI", points: 2 },
  { id: "analytics", label: "Reports and analytics", group: "Business", points: 3 },
  { id: "integrations", label: "Integrations with other systems", group: "Business", points: 3, question: "Which systems must it connect to, and do they have an API?" },
  { id: "multi-language", label: "Multiple languages", group: "Business", points: 2, question: "Which languages, and who writes the translations?" },
  { id: "offline", label: "Offline mode", group: "Business", points: 4, question: "What must work without a connection, and how are conflicts resolved?" },
];

export const FEATURE_GROUPS = [...new Set(FEATURES.map((f) => f.group))];

export const PLATFORMS: { id: PlatformId; label: string }[] = [
  { id: "web", label: "Web app" },
  { id: "ios", label: "iPhone (iOS)" },
  { id: "android", label: "Android" },
];

export interface AppType {
  id: string;
  label: string;
  platforms: PlatformId[];
  now: string[];
  later: string[];
}

export const APP_TYPES: AppType[] = [
  { id: "saas", label: "SaaS or web dashboard", platforms: ["web"], now: ["accounts", "roles", "subscriptions", "admin", "notifications"], later: ["analytics", "integrations"] },
  { id: "marketplace", label: "Marketplace", platforms: ["web"], now: ["accounts", "profiles", "listings", "payments", "admin", "notifications"], later: ["payouts", "reviews", "chat"] },
  { id: "booking", label: "Booking or appointments", platforms: ["web"], now: ["accounts", "booking", "payments", "notifications", "admin"], later: ["reviews", "maps"] },
  { id: "ecommerce", label: "Online shop", platforms: ["web"], now: ["listings", "payments", "accounts", "admin", "notifications"], later: ["reviews", "analytics", "multi-language"] },
  { id: "internal", label: "Internal business tool", platforms: ["web"], now: ["accounts", "roles", "admin", "uploads", "analytics"], later: ["integrations"] },
  { id: "ai", label: "AI assistant or AI product", platforms: ["web"], now: ["accounts", "ai-assistant", "ai-docs", "admin"], later: ["subscriptions", "analytics"] },
  { id: "community", label: "Mobile community app", platforms: ["ios", "android"], now: ["accounts", "profiles", "uploads", "push", "notifications"], later: ["chat"] },
  { id: "custom", label: "Something else", platforms: ["web"], now: [], later: [] },
];

export const stagesFor = (type: AppType): Record<string, Stage> =>
  Object.fromEntries(FEATURES.map((f) => [f.id, type.now.includes(f.id) ? "now" : type.later.includes(f.id) ? "later" : "skip"]));

export interface PlanInput {
  idea: string;
  type: AppType;
  platforms: PlatformId[];
  stages: Record<string, Stage>;
}

const LEVELS = [
  { max: 8, label: "Small", weeks: "2 to 4 weeks" },
  { max: 18, label: "Medium", weeks: "4 to 8 weeks" },
  { max: Infinity, label: "Large", weeks: "8 to 12 weeks or more" },
];

export function makePlan({ idea, type, platforms, stages }: PlanInput) {
  const now = FEATURES.filter((f) => stages[f.id] === "now");
  const later = FEATURES.filter((f) => stages[f.id] === "later");
  const web = platforms.includes("web");
  const mobile = platforms.includes("ios") || platforms.includes("android");
  const points = now.reduce((n, f) => n + f.points, 0) + (mobile ? (web ? 5 : 3) : 0);
  const level = LEVELS.find((l) => points <= l.max)!;
  const has = (id: string) => stages[id] === "now";

  const stack: string[] = [];
  if (web) stack.push("Web app: React or Next.js");
  if (mobile) stack.push("Mobile app: React Native with Expo, one codebase for iOS and Android");
  stack.push(
    level.label === "Small" && !has("integrations") && !has("payouts")
      ? "Backend: a managed backend such as Supabase for sign-in and data, to move fastest"
      : "Backend: a Laravel or Node.js API with a PostgreSQL or MySQL database"
  );
  if (has("payments") || has("subscriptions")) stack.push(has("payouts") ? "Payments: Stripe Connect" : "Payments: Stripe");
  if (has("ai-assistant") || has("ai-docs") || has("ai-generate")) stack.push("AI: OpenAI, Claude or Gemini API, called from your own backend");
  if (has("chat")) stack.push("Real-time: WebSockets for chat");
  if (has("maps")) stack.push("Maps: Google Maps or Mapbox");
  if (has("push") && mobile) stack.push("Push: Expo push notifications");
  stack.push(mobile ? "Hosting: Vercel or a VPS for the backend, EAS for app store builds" : "Hosting: Vercel or a VPS");

  const questions = [
    "Who is the first user, and what one job must they be able to finish?",
    ...now.filter((f) => f.question).map((f) => f.question!),
    "How will you know the first version worked?",
  ];

  const platformLabel = PLATFORMS.filter((p) => platforms.includes(p.id)).map((p) => p.label).join(", ") || "Not chosen yet";
  const list = (items: string[]) => (items.length ? items.map((i) => `- ${i}`).join("\n") : "- (none yet)");
  const text = [
    `# MVP plan: ${type.label}`,
    ...(idea.trim() ? [`Idea: ${idea.trim()}`] : []),
    `Platforms: ${platformLabel}`,
    `Complexity: ${level.label} (typical first version: ${level.weeks})`,
    "",
    "## First version",
    list(now.map((f) => f.label)),
    "",
    "## Later",
    list(later.map((f) => f.label)),
    "",
    "## Suggested stack",
    list(stack),
    "",
    "## Questions to answer before building",
    list(questions),
    "",
    "Made with the MVP Scope Planner: https://www.chaudharyusama.com/tools/mvp-planner",
  ].join("\n");

  return { now, later, points, level, stack, questions, text, overSized: level.label === "Large" };
}
