/* Number formats for the calculators under /tools. One fixed locale, so the
   server-rendered page and the browser print the same digits in every
   language (the Arabic pages use Western digits, as the text does). */

const money0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const rate = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 });
const int = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const one = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

/** Whole dollars from $100 up, cents below. */
export const usd = (v: number) => (Math.abs(v) >= 100 ? money0 : money2).format(v);
/** Per-minute rates: up to four decimals ($0.0085). */
export const usdRate = (v: number) => rate.format(v);
export const num = (v: number) => int.format(v);
/** One decimal under 10 (3.5 months), whole numbers above. */
export const amount = (v: number) => (Math.abs(v) < 10 ? one : int).format(v);
