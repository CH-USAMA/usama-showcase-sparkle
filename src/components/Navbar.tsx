import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoUsama from "@/assets/logo-usama.png";


const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#process", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Work" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#packages", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active section detection
      const offsets = links
        .map((l) => {
          const el = document.getElementById(l.href.slice(1));
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: l.href, top: rect.top };
        })
        .filter(Boolean) as { id: string; top: number }[];
      const current = offsets
        .filter((o) => o.top <= 120)
        .sort((a, b) => b.top - a.top)[0];
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between" aria-label="Primary">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          className="flex items-center gap-2"
          aria-label="Usama Munawar — Home"
        >
          <img
            src={logoUsama}
            alt="Usama Munawar logo"
            width={1280}
            height={512}
            className="h-8 sm:h-9 w-auto dark:invert dark:brightness-0 dark:contrast-100"
            style={{ filter: "var(--logo-filter, none)" }}
          />
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`relative px-3 py-2 text-sm font-inter transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>
            <Button variant="hero" size="sm" className="rounded-full px-5">
              Hire me
            </Button>
          </a>
        </div>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted/40"
        >
          {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <ul className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-inter text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={(e) => handleClick(e, "#contact")} aria-label="Hire Usama, jump to contact section">
                  <Button variant="hero" size="sm" className="w-full mt-2 rounded-full">
                    Hire me
                  </Button>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
