import { CALENDLY_HEIGHT } from "@/data/site";

/**
 * The booking card before the Calendly embed has mounted: the same box as
 * CalendlyEmbed's card (white, at most 720 px wide, CALENDLY_HEIGHT tall), so
 * nothing moves when it arrives. Used for the build-time HTML of /book and as
 * the Suspense fallback on /book and the home contact section.
 */
const CalendarPlaceholder = () => (
  <div
    className="mx-auto flex w-full max-w-[720px] items-center justify-center rounded-xl bg-white"
    style={{ height: CALENDLY_HEIGHT }}
    aria-hidden="true"
  >
    <span className="animate-pulse font-inter text-sm text-neutral-500">Loading calendar…</span>
  </div>
);

export default CalendarPlaceholder;
