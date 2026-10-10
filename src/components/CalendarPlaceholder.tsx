import { CALENDLY_HEIGHT, CALENDLY_URL } from "@/data/site";

/**
 * The booking card before the Calendly embed has mounted: the same box as
 * CalendlyEmbed's card (white, at most 720 px wide, CALENDLY_HEIGHT tall), so
 * nothing moves when it arrives. Used for the build-time HTML of /book and as
 * the Suspense fallback on /book and the home contact section. The link is
 * the way to book when the embed cannot run (no JavaScript, or the app failed
 * to start and the build-time page stays as it is).
 */
const CalendarPlaceholder = () => (
  <div
    className="mx-auto flex w-full max-w-[720px] flex-col items-center justify-center gap-3 rounded-xl bg-white px-6 text-center"
    style={{ height: CALENDLY_HEIGHT }}
  >
    <span className="animate-pulse font-inter text-sm text-neutral-500" aria-hidden="true">
      Loading calendar…
    </span>
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-inter text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-800"
    >
      Or open it on Calendly
    </a>
  </div>
);

export default CalendarPlaceholder;
