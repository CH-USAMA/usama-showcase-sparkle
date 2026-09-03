import type { CSSProperties } from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CTA from "@/components/system/CTA";
import ThemeSwitch from "@/components/system/ThemeSwitch";
import { trackEvent } from "@/lib/analytics";
import logoUsama from "@/assets/logo-usama.webp";

/**
 * Five items, in the order the page argues.
 *
 * Experience, Pricing and Contact came off: all three are passed on the way
 * down the page, and eight items made the bar compete with the one action it
 * exists to carry. Insights is a route rather than an anchor, because the blog
 * teaser no longer sits on the home page.
 *
 * `hash` entries scroll within the home page; `to` entries are routes.
 */
interface NavLink {
  id: string;
  label: string;
  hash?: string;
  to?: string;
}

const LINKS: NavLink[] = [
  { id: "about", label: "About", hash: "#about" },
  { id: "work", label: "Work", hash: "#work" },
  { id: "services", label: "Services", hash: "#services" },
  { id: "process", label: "Process", hash: "#process" },
  { id: "blog", label: "Insights", to: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  /* compact-on-scroll */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 32);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* active section — IntersectionObserver rather than measuring on every scroll */
  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const sections = LINKS.filter((l) => l.hash)
      .map((l) => document.getElementById(l.id))
      .filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length) return;

    // Track which sections are inside the detection band. Keeping a set rather
    // than reading each callback in isolation means that when the band empties
    // — scrolled back into the hero — the indicator clears instead of leaving
    // whichever section happened to be last.
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        });
        if (inBand.size === 0) {
          setActive("");
          return;
        }
        // pick the earliest section in nav order that is currently in the band
        const first = LINKS.find((l) => inBand.has(l.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome, location.pathname]);

  /* lock scroll behind the mobile sheet */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Position the underline over the active item. Reads layout only when the
  // active section or the viewport changes, never per frame.
  useEffect(() => {
    const place = () => {
      const list = listRef.current;
      if (!list) return;
      const item = active
        ? list.querySelector<HTMLElement>(`[data-nav="${active}"]`)
        : null;
      if (!item) {
        setUnderline((u) => (u.width ? { ...u, width: 0 } : u));
        return;
      }
      const l = list.getBoundingClientRect();
      const r = item.getBoundingClientRect();
      // A zero width means layout has not settled yet (the row is display:none
      // below lg, and web fonts change the measurement when they land). Leave
      // the previous value rather than collapsing the rule to nothing.
      if (r.width === 0) return;
      setUnderline({ left: r.left - l.left + 12, width: r.width - 24 });
    };

    // rAF so the first measurement happens after layout, not during commit.
    const raf = requestAnimationFrame(place);
    window.addEventListener("resize", place);

    // Re-measure when the row itself changes size: font swap, breakpoint
    // change, or the row appearing at lg.
    const list = listRef.current;
    const ro = list ? new ResizeObserver(place) : null;
    if (list && ro) ro.observe(list);

    // Web fonts change label widths after first paint.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(place).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", place);
      ro?.disconnect();
    };
  }, [active]);

  const goTo = useCallback(
    (hash: string) => {
      setOpen(false);
      const id = hash.slice(1);
      if (!onHome) {
        navigate(`/${hash}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", hash);
      }
    },
    [onHome, navigate]
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-inter focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-large ease-out-expo ${
          scrolled
            ? "border-b border-hairline/[0.08] bg-background/80 py-2.5 backdrop-blur-md"
            : "border-b border-transparent py-4 lg:py-6"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between gap-6" aria-label="Primary">
          <Link
            to="/"
            aria-label="Usama Munawar, home page"
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src={logoUsama}
              alt=""
              width={1280}
              height={512}
              /* The mark is white on transparent, so it disappears against the
                 light palette. Inverting it there keeps one asset instead of
                 shipping and maintaining a second, light-mode logo file. */
              className={`w-auto transition-[height] duration-large ease-out-expo [html.light_&]:invert ${
                scrolled ? "h-7" : "h-8 sm:h-9"
              }`}
            />
          </Link>

          {/* desktop links */}
          {/* One underline for the whole row, positioned over the active item
              and transitioned in CSS. This was a framer-motion layoutId, which
              meant the whole library sat on the critical path for a 1px rule.
              Same slide, measured from the item's own box. */}
          <ul ref={listRef} className="relative hidden items-center lg:flex">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 h-px bg-primary transition-[left,width,opacity] duration-standard ease-out-expo"
              style={{
                left: underline.left,
                width: underline.width,
                opacity: underline.width ? 1 : 0,
              }}
            />
            {LINKS.map((l) => {
              const on = active === l.id;
              const cls = `relative inline-flex min-h-[24px] items-center px-3 py-2 font-inter text-[13.5px] transition-colors duration-standard ${
                on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`;
              if (l.to) {
                return (
                  <li key={l.id}>
                    <Link to={l.to} data-nav={l.id} className={cls}>
                      {l.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={l.id}>
                  <a
                    href={l.hash}
                    data-nav={l.id}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(l.hash!);
                    }}
                    className={cls}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* command-menu affordance, the shortcut exists, so advertise it */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-command-menu"))
              }
              className="hidden items-center gap-2 rounded-full border border-hairline/[0.1] px-3 py-1.5 font-mono text-[11px] text-subtle transition-colors duration-standard hover:border-hairline/[0.2] hover:text-muted-foreground lg:inline-flex"
              aria-label="Open command menu (⌘K)"
            >
              <span>⌘K</span>
            </button>

            <ThemeSwitch />

            <CTA
              to="/book"
              size="sm"
              arrow
              className="hidden sm:inline-flex"
              onClick={() => trackEvent("book_call_click", { location: "navbar" })}
            >
              Architecture Call
            </CTA>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline/[0.1] text-foreground transition-colors duration-standard hover:border-hairline/[0.2] lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ---- mobile sheet ---- */}
      {/* Kept mounted and toggled with opacity so it can fade out as well as
          in without AnimatePresence. `hidden` is driven by the same state, so
          it is removed from the accessibility tree when closed. */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-background/95 transition-opacity duration-standard ease-out-expo lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {open && (
          <div>
            <div className="container mx-auto flex h-full flex-col pb-10 pt-24">
              <ul className="flex-1 overflow-y-auto">
                {LINKS.map((l, i) => (
                  <li
                    key={l.id}
                    className="enter border-b border-hairline/[0.07]"
                    style={{ "--enter-delay": `${30 + i * 35}ms` } as CSSProperties}
                  >
                    {l.to ? (
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="mono-tiny tabular-nums text-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-inter text-xl tracking-tight text-foreground">
                          {l.label}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={l.hash}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(l.hash!);
                        }}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="mono-tiny tabular-nums text-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-inter text-xl tracking-tight text-foreground">
                          {l.label}
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <CTA to="/book" size="lg" arrow className="w-full" onClick={() => setOpen(false)}>
                  Book an Architecture Call
                </CTA>
                <CTA to="/projects" tone="ghost" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  View all projects
                </CTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
