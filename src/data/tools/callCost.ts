/**
 * Rates and arithmetic behind /tools/call-center-cost-calculator: Twilio
 * Programmable Voice against a self-hosted Asterisk server on a SIP trunk.
 * US pay-as-you-go prices, USD, read from the official pages on
 * RATES_CHECKED; update the date with the numbers. The trunk rates are only
 * defaults: the reader can type their own carrier's.
 */

export const RATES_CHECKED = "2026-10-21";

export const RATE_SOURCES = {
  twilio: "https://www.twilio.com/en-us/voice/pricing/us",
  telnyx: "https://telnyx.com/pricing/elastic-sip",
} as const;

/** Twilio Programmable Voice, United States. */
export const TWILIO = {
  outbound: 0.014,
  inboundLocal: 0.0085,
  inboundTollFree: 0.022,
  numberLocal: 1.15,
  numberTollFree: 2.15,
  recording: 0.0025,
  /** Voice SDK leg, when the agent talks through a browser or app. */
  client: 0.004,
};

/** Telnyx Elastic SIP published starting rates, United States. */
export const TRUNK = {
  outbound: 0.005,
  inboundLocal: 0.0032,
  inboundTollFree: 0.015,
  number: 1,
};

export type CallPresetId = "office" | "sales" | "support";

/** Example volumes; the self-hosted costs keep whatever the reader typed. */
export const CALL_PRESETS: {
  id: CallPresetId;
  callsPerDay: number;
  avgMinutes: number;
  outboundPct: number;
  numbers: number;
  tollFree: boolean;
  record: boolean;
}[] = [
  { id: "office", callsPerDay: 80, avgMinutes: 4, outboundPct: 50, numbers: 2, tollFree: false, record: false },
  { id: "sales", callsPerDay: 1500, avgMinutes: 3, outboundPct: 95, numbers: 10, tollFree: false, record: true },
  { id: "support", callsPerDay: 600, avgMinutes: 5, outboundPct: 10, numbers: 3, tollFree: true, record: true },
];

/** Starting point for the self-hosted side: the reader replaces these with real quotes. */
export const SELF_HOSTED_DEFAULTS = {
  trunkOutbound: TRUNK.outbound,
  trunkInbound: TRUNK.inboundLocal,
  trunkNumber: TRUNK.number,
  serverMonthly: 60,
  upkeepMonthly: 300,
  setupCost: 3000,
};

export interface CallInput {
  callsPerDay: number;
  avgMinutes: number;
  /** Percent of minutes that are outbound. */
  outboundPct: number;
  daysPerMonth: number;
  numbers: number;
  tollFree: boolean;
  record: boolean;
  /** Agents answer in a browser or app (adds a Voice SDK leg on Twilio). */
  softphone: boolean;
  trunkOutbound: number;
  trunkInbound: number;
  trunkNumber: number;
  serverMonthly: number;
  upkeepMonthly: number;
  setupCost: number;
}

export type CallLine = "minutes" | "numbers" | "recording" | "softphone" | "server" | "upkeep";

export interface CallSide {
  minutes: number;
  perMonth: number;
  /** What the monthly total is made of; zero lines are left out. */
  lines: { id: CallLine; cost: number }[];
  /** Cost of one more minute, at this outbound/inbound mix. */
  perMinute: number;
  /** What it costs before any call is made. */
  fixed: number;
}

export interface CallResult {
  minutes: number;
  twilio: CallSide;
  selfHosted: CallSide;
  savingPerMonth: number;
  /** Months for the saving to repay the setup cost; null if there is no saving. */
  paybackMonths: number | null;
  /** Monthly minutes at which the running costs are equal; null if self-hosting never catches up. */
  breakEvenMinutes: number | null;
}

export function callCostOf(i: CallInput): CallResult {
  const minutes = i.callsPerDay * i.avgMinutes * i.daysPerMonth;
  const out = i.outboundPct / 100;
  const inn = 1 - out;

  const twCall = out * TWILIO.outbound + inn * (i.tollFree ? TWILIO.inboundTollFree : TWILIO.inboundLocal);
  const twRecording = i.record ? TWILIO.recording : 0;
  const twClient = i.softphone ? TWILIO.client : 0;
  const twMinute = twCall + twRecording + twClient;
  const twFixed = i.numbers * (i.tollFree ? TWILIO.numberTollFree : TWILIO.numberLocal);

  // Recordings stay on the server's own disk, so they add nothing per minute.
  const shMinute = out * i.trunkOutbound + inn * i.trunkInbound;
  const shNumbers = i.numbers * i.trunkNumber;
  const shFixed = shNumbers + i.serverMonthly + i.upkeepMonthly;

  const keep = (lines: CallSide["lines"]) => lines.filter((l, n) => n < 2 || l.cost > 0);
  const twilio: CallSide = {
    minutes,
    perMinute: twMinute,
    fixed: twFixed,
    perMonth: twFixed + minutes * twMinute,
    lines: keep([
      { id: "minutes", cost: minutes * twCall },
      { id: "numbers", cost: twFixed },
      { id: "recording", cost: minutes * twRecording },
      { id: "softphone", cost: minutes * twClient },
    ]),
  };
  const selfHosted: CallSide = {
    minutes,
    perMinute: shMinute,
    fixed: shFixed,
    perMonth: shFixed + minutes * shMinute,
    lines: keep([
      { id: "minutes", cost: minutes * shMinute },
      { id: "numbers", cost: shNumbers },
      { id: "server", cost: i.serverMonthly },
      { id: "upkeep", cost: i.upkeepMonthly },
    ]),
  };
  const savingPerMonth = twilio.perMonth - selfHosted.perMonth;
  const perMinuteGap = twMinute - shMinute;

  return {
    minutes,
    twilio,
    selfHosted,
    savingPerMonth,
    paybackMonths: savingPerMonth > 0 ? i.setupCost / savingPerMonth : null,
    breakEvenMinutes: perMinuteGap > 0 ? Math.max(0, (shFixed - twFixed) / perMinuteGap) : null,
  };
}
