/**
 * The four situations that account for most of the work.
 *
 * One source, three readers: the home page renders the client feedback beside
 * them, /services renders the full panels, and /book renders just the question
 * each one asks. They used to be typed out separately in Book.tsx, which meant
 * two copies of the same four questions that could drift apart.
 */
export interface Audience {
  n: string;
  who: string;
  /** The question this reader is already asking themselves. */
  ask: string;
  problem: string;
  solve: string;
}

export const AUDIENCES: Audience[] = [
  {
    n: "01",
    who: "Startup founders",
    ask: "Will this architecture survive our first real traffic?",
    problem:
      "You need an MVP built correctly the first time, not something that has to be rebuilt in twelve months once it starts working.",
    solve:
      "Architecture that fits the stage you're actually at, with the expensive decisions made deliberately and the rest deferred on purpose.",
  },
  {
    n: "02",
    who: "SaaS teams",
    ask: "Why does every feature take three weeks now?",
    problem:
      "A multi-tenant Laravel product that's growing faster than its foundations. The team is firefighting queues, billing edge cases, and API contracts instead of shipping.",
    solve:
      "Hardened APIs, queue architecture that survives retries, and a slow-query pass, so that feature work stops competing with maintenance.",
  },
  {
    n: "03",
    who: "Operations-heavy businesses",
    ask: "How much of this is a person copying data between tabs?",
    problem:
      "Spreadsheets, manual handoffs, and back-office work that quietly consumes hours and corrupts data quality as you grow.",
    solve:
      "Automation infrastructure that runs unattended, with retries, dead-letter queues, and observability, not a fragile happy path.",
  },
  {
    n: "04",
    who: "Communication platforms",
    ask: "Can anyone here actually debug the dialplan?",
    problem:
      "You're building VoIP, call-centre, or real-time products and need someone who has run Asterisk, SIP trunking, and WebSocket infrastructure in production.",
    solve:
      "Dialplan and dispatch engineering, trunk failover, live agent state, and CRM integration that closes the loop on every call.",
  },
];
