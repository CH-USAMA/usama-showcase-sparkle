import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, MessageCircle, Rss, Twitter } from "lucide-react";
import { OWNER, SOCIALS, WHATSAPP_URL } from "@/data/site";

const SITEMAP = [
  { label: "Work", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Book a call", to: "/book" },
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
  { href: SOCIALS.x, icon: Twitter, label: "X / Twitter" },
  { href: WHATSAPP_URL, icon: MessageCircle, label: "WhatsApp" },
];

const linkCls =
  "inline-flex min-h-[24px] items-center font-inter text-sm text-foreground/85 transition-colors duration-standard hover:text-primary";

/**
 * Footer: an oversized wordmark sinks behind a blurred row of social links,
 * then four plain columns. The blur is the row's own backdrop-filter, so the
 * wordmark softens exactly where the footer begins.
 */
const Footer = () => (
  <footer className="relative overflow-hidden">
    <div aria-hidden="true" className="fx-wordmark pointer-events-none -mb-[0.1em] select-none text-center">
      Usama<span className="text-primary">.</span>
    </div>

    <div className="relative border-y border-hairline/[0.08] bg-background/40 backdrop-blur-2xl">
      <ul className="container mx-auto grid grid-cols-2 lg:grid-cols-4">
        {SOCIAL_LINKS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.label}
              className={`border-hairline/[0.08] ${i % 2 ? "border-l" : ""} ${i === 2 ? "lg:border-l" : ""} ${
                i > 1 ? "border-t lg:border-t-0" : ""
              }`}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-16 items-center justify-between gap-3 px-4 font-inter text-sm text-foreground sm:px-6"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {s.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-subtle transition-transform duration-standard group-hover:translate-x-1 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>

    {/* Same grid and cell padding as the social row, so the columns line up under it. */}
    <div className="container mx-auto grid gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16 [&>*]:px-4 sm:[&>*]:px-6">
      <div>
        <p className="font-inter text-sm text-subtle">About</p>
        <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-foreground/85">
          {OWNER.name}. Full-stack product engineer building React, React Native, Node.js and Laravel
          products that run in production.
        </p>
      </div>

      <nav aria-label="Site">
        <p className="font-inter text-sm text-subtle">Site</p>
        <ul className="mt-4 space-y-2">
          {SITEMAP.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Services">
        <p className="font-inter text-sm text-subtle">Services</p>
        <ul className="mt-4 space-y-2">
          {SERVICES.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="font-inter text-sm text-subtle">Contact</p>
        <ul className="mt-4 space-y-2 font-inter text-sm text-foreground/85">
          <li>
            <a href={`mailto:${OWNER.email}`} className={linkCls}>
              <Mail className="mr-2 h-3.5 w-3.5 text-subtle" aria-hidden="true" />
              {OWNER.email}
            </a>
          </li>
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <MessageCircle className="mr-2 h-3.5 w-3.5 text-subtle" aria-hidden="true" />
              {OWNER.phone}
            </a>
          </li>
          <li>Based in {OWNER.location}</li>
          <li className="text-muted-foreground">Working with clients worldwide</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-hairline/[0.08]">
      {/* Bottom padding (and right padding on wide screens) keeps these links
          clear of the fixed "Ask my AI" launcher. */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 pb-24 pt-6 sm:flex-row sm:pb-6 sm:pr-56">
        <p className="font-inter text-[13px] text-subtle">
          © {new Date().getFullYear()} {OWNER.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5 font-inter text-[13px] text-subtle">
          <a href="/rss.xml" className="inline-flex min-h-[24px] items-center gap-1.5 hover:text-foreground">
            <Rss className="h-3.5 w-3.5" aria-hidden="true" />
            RSS
          </a>
          <a href="/sitemap.xml" className="inline-flex min-h-[24px] items-center hover:text-foreground">
            Sitemap
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
