import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";

const AUDIENCES = [
  {
    n: "01",
    who: "Startup founders",
    ask: "Will this architecture survive our first real traffic?",
    problem:
      "You need an MVP built correctly the first time — not something that has to be rebuilt in twelve months once it starts working.",
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
      "Hardened APIs, queue architecture that survives retries, and a slow-query pass — so feature work stops competing with maintenance.",
  },
  {
    n: "03",
    who: "Operations-heavy businesses",
    ask: "How much of this is a person copying data between tabs?",
    problem:
      "Spreadsheets, manual handoffs, and back-office work that quietly consumes hours and corrupts data quality as you grow.",
    solve:
      "Automation infrastructure that runs unattended — with retries, dead-letter queues, and observability, not a fragile happy path.",
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

/** Real, attributed feedback from named clients. Nothing here is placeholder. */
const TESTIMONIALS = [
  {
    quote:
      "Usama rebuilt our booking and dispatch flow and it simply stopped breaking. Bookings that used to fail at peak hours now go through cleanly, and the driver side is far easier to manage. He explained every decision in plain language and delivered on the dates he promised.",
    name: "Shahrukh",
    role: "Owner",
    company: "Galway Taxis",
  },
  {
    quote:
      "We came to Usama with a half-finished store and a lot of doubts. He tightened the backend, fixed the checkout and made the whole site fast. Orders now come through reliably and I can manage the catalogue myself without calling a developer every week.",
    name: "David Gregathy",
    role: "Founder",
    company: "Marian Holy Art",
  },
  {
    quote:
      "Usama is the engineer we hand the hard backend work to. Laravel systems, Asterisk call flows, automation pipelines, he takes ownership from architecture to deployment. Clean code, clear communication, and clients keep asking for him by name.",
    name: "Shehroz Kunwar",
    role: "Director",
    company: "Solutionszilla",
  },
];

/**
 * WHO I WORK WITH — framed as a diagnosis rather than a list of personas.
 * Each panel leads with the question the reader is already asking themselves.
 */
const Audience = () => (
  <section id="clients" className="relative scroll-mt-24 py-24 lg:py-32">
    <div className="container mx-auto">
      <SectionHeader
        index="07"
        eyebrow="Who I work with"
        title="Is this you?"
        lead="Four situations that account for most of the work I take on. If one of these is uncomfortably familiar, we should talk."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.08] bg-hairline/[0.06] lg:mt-20 lg:grid-cols-2">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.n} index={i} variant="fade">
            <div className="group h-full bg-background p-7 transition-colors duration-standard hover:bg-surface-1/70 lg:p-9">
              <div className="flex items-center gap-3">
                <span className="mono-tiny tabular-nums text-primary/70">{a.n}</span>
                <span className="mono-tiny text-subtle">{a.who}</span>
              </div>

              <p className="mt-5 font-display text-2xl italic leading-[1.25] text-foreground lg:text-[1.75rem]">
                “{a.ask}”
              </p>

              <dl className="mt-7 space-y-5 border-t border-hairline/[0.07] pt-6">
                <div>
                  <dt className="mono-tiny text-subtle">The problem</dt>
                  <dd className="mt-2 font-inter text-[13.5px] leading-relaxed text-muted-foreground">
                    {a.problem}
                  </dd>
                </div>
                <div>
                  <dt className="mono-tiny text-primary/70">What I do about it</dt>
                  <dd className="mt-2 font-inter text-[13.5px] leading-relaxed text-muted-foreground">
                    {a.solve}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                <CTA to="/book" tone="quiet" size="sm" arrow className="px-0">
                  Talk through this
                </CTA>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---- client feedback ---- */}
      <div className="mt-20 lg:mt-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/40" aria-hidden="true" />
            <span className="mono-label text-primary">Client feedback</span>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden bg-hairline/[0.06] lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} index={i} variant="fade">
              <figure className="flex h-full flex-col bg-background p-7 lg:p-8">
                <blockquote className="flex-1">
                  <p className="font-inter text-[14.5px] leading-[1.75] text-muted-foreground">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-7 border-t border-hairline/[0.07] pt-5">
                  <div className="font-inter text-sm font-medium text-foreground">
                    {t.name}
                  </div>
                  <div className="mono-tiny mt-2 text-subtle">
                    {t.role} · {t.company}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Audience;
