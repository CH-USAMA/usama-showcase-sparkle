/**
 * The arithmetic behind /tools/automation-roi-calculator. Plain functions, no
 * words: the labels live in src/i18n/tools/<locale>.ts under `roi`.
 */

/** 52 weeks over 12 months. */
export const WEEKS_PER_MONTH = 52 / 12;

export type RoiPresetId = "leads" | "invoices" | "reports" | "onboarding";

export interface RoiInput {
  runsPerWeek: number;
  minutesPerRun: number;
  /** What an hour of the person doing it costs, wages plus overheads. */
  hourlyCost: number;
  /** Percent of the work the automation takes over (the rest stays manual). */
  automatedPct: number;
  /** Mistakes per 100 runs when done by hand, and minutes to put one right. */
  errorsPer100: number;
  minutesPerFix: number;
  buildCost: number;
  /** Subscriptions, hosting, AI API calls, upkeep. */
  monthlyCost: number;
}

/* Example figures. The build and running costs are placeholders for the
   reader's own quote, and the page says so. */
export const ROI_PRESETS: ({ id: RoiPresetId } & RoiInput)[] = [
  { id: "leads", runsPerWeek: 40, minutesPerRun: 10, hourlyCost: 25, automatedPct: 80, errorsPer100: 5, minutesPerFix: 15, buildCost: 1500, monthlyCost: 30 },
  { id: "invoices", runsPerWeek: 120, minutesPerRun: 4, hourlyCost: 20, automatedPct: 90, errorsPer100: 3, minutesPerFix: 20, buildCost: 2000, monthlyCost: 25 },
  { id: "reports", runsPerWeek: 5, minutesPerRun: 90, hourlyCost: 35, automatedPct: 85, errorsPer100: 0, minutesPerFix: 0, buildCost: 1200, monthlyCost: 10 },
  { id: "onboarding", runsPerWeek: 8, minutesPerRun: 45, hourlyCost: 30, automatedPct: 70, errorsPer100: 10, minutesPerFix: 30, buildCost: 2500, monthlyCost: 20 },
];

export interface RoiResult {
  /** Hours the task takes by hand each month, including fixing mistakes. */
  manualHours: number;
  hoursSaved: number;
  valuePerMonth: number;
  netPerMonth: number;
  /** Months until the build cost is earned back; null if it never is. */
  paybackMonths: number | null;
  firstYear: number;
  threeYears: number;
}

export function roiOf(i: RoiInput): RoiResult {
  const minutesPerRun = i.minutesPerRun + (i.errorsPer100 / 100) * i.minutesPerFix;
  const manualHours = (i.runsPerWeek * WEEKS_PER_MONTH * minutesPerRun) / 60;
  const hoursSaved = manualHours * (i.automatedPct / 100);
  const valuePerMonth = hoursSaved * i.hourlyCost;
  const netPerMonth = valuePerMonth - i.monthlyCost;
  return {
    manualHours,
    hoursSaved,
    valuePerMonth,
    netPerMonth,
    paybackMonths: netPerMonth > 0 ? i.buildCost / netPerMonth : null,
    firstYear: netPerMonth * 12 - i.buildCost,
    threeYears: netPerMonth * 36 - i.buildCost,
  };
}

/** How the result reads: pays back within a year, within two, or not worth it yet. */
export type RoiVerdict = "fast" | "slow" | "no";

export const verdictOf = (r: RoiResult): RoiVerdict =>
  r.paybackMonths === null || r.paybackMonths > 24 ? "no" : r.paybackMonths <= 12 ? "fast" : "slow";
