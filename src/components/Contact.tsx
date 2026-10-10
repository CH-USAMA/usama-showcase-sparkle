import type { CSSProperties } from "react";
import { lazy, Suspense, useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import Telemetry from "@/components/system/Telemetry";
import { trackEvent } from "@/lib/analytics";
import { FORMSPREE_URL, OWNER, WHATSAPP_URL } from "@/data/site";

const CalendlyEmbed = lazy(() => import("@/components/CalendlyEmbed"));

const PROJECT_TYPES = [
  "Laravel / backend system",
  "SaaS platform or API",
  "Automation infrastructure",
  "VoIP / call centre",
  "AI or RAG integration",
  "Rescue an existing codebase",
  "Something else",
];

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Retainer / ongoing",
  "Not sure yet",
];

const CHANNELS = [
  { icon: Mail, label: "Email", value: OWNER.email, href: `mailto:${OWNER.email}` },
  { icon: Phone, label: "WhatsApp", value: OWNER.phone, href: WHATSAPP_URL },
  { icon: MapPin, label: "Based in", value: OWNER.location },
];

const field =
  "w-full rounded-lg border border-hairline/[0.1] bg-surface-1/70 px-3.5 py-3 font-inter text-[14px] " +
  "text-foreground placeholder:text-subtle transition-colors duration-standard " +
  "hover:border-hairline/[0.18] focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * CONTACT.
 *
 * Submits over fetch rather than a native form POST. The old form navigated the
 * visitor to Formspree's own confirmation page — losing the session, the design,
 * and any analytics event that fired into an unloading document.
 */
const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  // Calendly's widget is ~5 MB of third-party script; it loads when asked for,
  // not because the reader scrolled past the bottom of the home page.
  const [calendar, setCalendar] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never fills a field they cannot see.
    if (data.get("_gotcha")) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      trackEvent("contact_form_submit", {
        project_type: String(data.get("project_type") ?? ""),
      });
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="wash fx-glow-top relative scroll-mt-24 py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-backend)",
        "--hue-2": "var(--hue-ai)",
        "--wash-x": "26%",
        "--wash-y": "4%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="09"
          eyebrow="Contact"
          title={<>Tell me what&apos;s <em>breaking.</em></>}
          lead="Share the architecture, automation, or VoIP problem you're facing. You'll get an honest assessment back, including if the answer is that you do not need me."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* ---- channels + availability ---- */}
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Telemetry
                columns={2}
                items={[
                  { label: "Availability", value: "Taking new work", status: "on" },
                  { label: "Response time", value: "Within 4 hours" },
                  { label: "Working hours", value: "09:00–19:00 PKT" },
                  { label: "Timezone", value: "UTC+5" },
                ]}
              />
            </Reveal>

            <Reveal variant="fade" index={1}>
              <ul className="mt-8 space-y-px overflow-hidden rounded-lg border border-hairline/[0.09] bg-hairline/[0.06]">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline/[0.09] bg-surface-2/60">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="mono-tiny block text-subtle">{c.label}</span>
                        <span className="mt-1.5 block truncate font-inter text-[13.5px] text-foreground">
                          {c.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label} className="bg-surface-1/80">
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3.5 px-4 py-3.5 transition-colors duration-standard hover:bg-surface-2/70"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3.5 px-4 py-3.5">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* No CTA pair here. FinalCTA makes the argument immediately
                above, the scheduler is embedded below, and WhatsApp is already
                one row up in the contact list — three ways to say the same
                thing inside one section is what diluted the primary action. */}
          </div>

          {/* ---- form ---- */}
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <div className="panel rounded-xl p-6 lg:p-8">
                {status === "sent" ? (
                  <div className="flex min-h-[22rem] flex-col items-start justify-center" role="status">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                      <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <h3 className="type-h3 mt-6 text-foreground">Message received.</h3>
                    <p className="type-body mt-4 max-w-md text-muted-foreground">
                      I read every one personally and reply within about four hours during
                      working hours. If it's urgent, WhatsApp is faster.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <CTA to="/book" tone="ghost" size="sm" arrow>
                        Book a free call
                      </CTA>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="px-1 font-inter text-sm text-muted-foreground transition-colors duration-standard hover:text-foreground"
                      >
                        Send another
                      </button>
                    </div>
                  </div>
                ) : (
                  // action/method: a send before the app has loaded (or without
                  // JavaScript) still reaches Formspree, as a POST.
                  <form action={FORMSPREE_URL} method="POST" onSubmit={onSubmit} className="space-y-5" noValidate={false}>
                    {/* honeypot */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute h-0 w-0 overflow-hidden opacity-0"
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="block font-inter text-sm font-medium text-foreground">
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="c-name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Jane Cooper"
                          className={`${field} mt-2.5`}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-company" className="block font-inter text-sm font-medium text-foreground">
                          Company
                        </label>
                        <input
                          id="c-company"
                          name="company"
                          autoComplete="organization"
                          placeholder="Acme Inc."
                          className={`${field} mt-2.5`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-email" className="block font-inter text-sm font-medium text-foreground">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="you@company.com"
                        className={`${field} mt-2.5`}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-type" className="block font-inter text-sm font-medium text-foreground">
                          Project type
                        </label>
                        <select id="c-type" name="project_type" className={`${field} mt-2.5`} defaultValue={PROJECT_TYPES[0]}>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-surface-2">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="block font-inter text-sm font-medium text-foreground">
                          Budget range
                        </label>
                        <select id="c-budget" name="budget" className={`${field} mt-2.5`} defaultValue={BUDGETS[5]}>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b} className="bg-surface-2">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="block font-inter text-sm font-medium text-foreground">
                        What are you building? <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="The system, what's going wrong, and roughly when you need it working."
                        className={`${field} mt-2.5 resize-y`}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 font-inter text-sm font-medium text-background transition-colors duration-standard hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send project brief
                            <span aria-hidden="true" className="transition-transform duration-standard group-hover:translate-x-1">
                              →
                            </span>
                          </>
                        )}
                      </button>

                      <p className="font-inter text-sm text-subtle">Reply within 4 hours</p>
                    </div>

                    <p aria-live="polite" className="min-h-[1.25rem]">
                      {status === "error" && (
                        <span className="font-inter text-[13px] text-destructive">
                          That didn't send. Email{" "}
                          <a className="underline" href={`mailto:${OWNER.email}`}>
                            {OWNER.email}
                          </a>{" "}
                          directly and it'll reach me.
                        </span>
                      )}
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---- booking ---- */}
        <Reveal variant="fade">
          <div className="mt-20 border-t border-hairline/[0.08] pt-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="chip-hue">
                  <span className="mono-label">Or book directly</span>
                </span>
                <h3 className="type-h3 mt-4 max-w-lg text-foreground">
                  Pick a slot for a free 30-minute call.
                </h3>
              </div>
            </div>

            <div className="mt-9 overflow-hidden rounded-xl border border-hairline/[0.09]">
              {calendar ? (
                // A dark stage around Calendly's light card (see CalendlyEmbed).
                <div className="bg-surface-1/60 p-2 sm:p-6 lg:p-10">
                  <Suspense
                    fallback={<div className="mx-auto h-[680px] w-full max-w-[720px] animate-pulse rounded-xl bg-white" />}
                  >
                    <CalendlyEmbed height={680} lazy={false} />
                  </Suspense>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-5 bg-surface-1/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex items-start gap-3.5">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <p className="max-w-md font-inter text-sm leading-relaxed text-muted-foreground">
                      Open times are shown in your own time zone. Booking takes two clicks, and
                      the scheduler is provided by Calendly.
                    </p>
                  </div>
                  <CTA
                    tone="ghost"
                    arrow
                    className="shrink-0"
                    onClick={() => {
                      setCalendar(true);
                      trackEvent("calendar_open", { location: "contact" });
                    }}
                  >
                    Show available times
                  </CTA>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
