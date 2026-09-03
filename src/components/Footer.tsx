import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react";
import { OWNER, SOCIALS } from "@/data/site";

const SITEMAP = [
  { label: "Work", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Architecture call", to: "/book" },
  { label: "Laravel scaling checklist", to: "/laravel-scaling-checklist" },
];

const SERVICES = [
  { label: "Laravel development", to: "/services/laravel-development" },
  { label: "VoIP & Asterisk", to: "/services/voip-asterisk" },
  { label: "Automation infrastructure", to: "/services/automation-n8n" },
  { label: "AI integration", to: "/services/ai-integration" },
];

const SOCIAL_LINKS = [
  { href: SOCIALS.github, icon: Github, label: "GitHub" },
  { href: SOCIALS.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: SOCIALS.x, icon: Twitter, label: "X" },
  { href: `mailto:${OWNER.email}`, icon: Mail, label: "Email" },
];

const Footer = () => (
  <footer className="relative border-t border-hairline/[0.08] bg-surface-1/30">
    <div className="container mx-auto py-14 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="font-inter text-lg font-medium tracking-tight text-foreground">
            {OWNER.name}
          </div>
          <p className="mt-3 max-w-sm font-inter text-[13.5px] leading-relaxed text-muted-foreground">
            Backend systems engineer. Laravel, automation infrastructure,
            VoIP platforms, and AI integrations, built to run in production.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline/[0.1] text-muted-foreground transition-colors duration-standard hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav className="lg:col-span-3" aria-label="Site">
          <h2 className="mono-tiny text-subtle">Site</h2>
          <ul className="mt-5 space-y-2.5">
            {SITEMAP.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-[24px] items-center font-inter text-[13.5px] text-muted-foreground transition-colors duration-standard hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-4" aria-label="Services">
          <h2 className="mono-tiny text-subtle">Services</h2>
          <ul className="mt-5 space-y-2.5">
            {SERVICES.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-[24px] items-center font-inter text-[13.5px] text-muted-foreground transition-colors duration-standard hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-hairline/[0.07] pt-6 sm:flex-row sm:items-center">
        <p className="mono-tiny text-subtle">
          © {new Date().getFullYear()} {OWNER.name} · {OWNER.location}
        </p>
        <div className="flex items-center gap-5">
          <a
            href="/rss.xml"
            className="mono-tiny inline-flex min-h-[24px] items-center gap-1.5 text-subtle transition-colors duration-standard hover:text-muted-foreground"
          >
            <Rss className="h-3 w-3" aria-hidden="true" />
            RSS
          </a>
          <a
            href="/sitemap.xml"
            className="mono-tiny inline-flex min-h-[24px] items-center text-subtle transition-colors duration-standard hover:text-muted-foreground"
          >
            Sitemap
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
