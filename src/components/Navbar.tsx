import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import CTA from "@/components/system/CTA";
import ThemeSwitch from "@/components/system/ThemeSwitch";
import { transition } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import logoUsama from "@/assets/logo-usama.webp";

/** `hash` entries scroll within the home page; `to` entries are routes. */
const LINKS = [
  { id: "about", label: "About", hash: "#about" },
  { id: "services", label: "Services", hash: "#services" },
  { id: "work", label: "Work", hash: "#work" },
  { id: "process", label: "Process", hash: "#process" },
  { id: "experience", label: "Experience", hash: "#experience" },
  { id: "blog", label: "Blog", hash: "#blog" },
  { id: "pricing", label: "Pricing", hash: "#pricing" },
  { id: "contact", label: "Contact", hash: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
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
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
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
              className={`w-auto transition-[height] duration-large ease-out-expo ${
                scrolled ? "h-7" : "h-8 sm:h-9"
              }`}
            />
          </Link>

          {/* desktop links */}
          <ul className="hidden items-center xl:flex">
            {LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={l.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(l.hash);
                    }}
                    className={`relative inline-flex min-h-[24px] items-center px-3 py-2 font-inter text-[13.5px] transition-colors duration-standard ${
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {on && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
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
              aria-label="Open command menu"
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
              <span className="hidden lg:inline">Book an Architecture Call</span>
              <span className="lg:hidden">Architecture Call</span>
            </CTA>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline/[0.1] text-foreground transition-colors duration-standard hover:border-hairline/[0.2] xl:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ---- mobile sheet ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.standard}
            className="fixed inset-0 z-40 bg-background/95 xl:hidden"
          >
            <div className="container mx-auto flex h-full flex-col pb-10 pt-24">
              <ul className="flex-1 overflow-y-auto">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transition.standard, delay: 0.03 + i * 0.035 }}
                    className="border-b border-hairline/[0.07]"
                  >
                    <a
                      href={l.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(l.hash);
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
                  </motion.li>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
