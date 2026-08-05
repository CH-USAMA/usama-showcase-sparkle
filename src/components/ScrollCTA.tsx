import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarCheck, X } from "lucide-react";

const STORAGE_KEY = "scroll-cta-dismissed";

/**
 * A single, non-intrusive prompt that appears once the visitor has read
 * ~70% of the page. Dismissed state persists for the session.
 */
const ScrollCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY + window.innerHeight;
        const total = document.documentElement.scrollHeight;
        if (total > 0 && scrolled / total >= 0.7) {
          setVisible(true);
          window.removeEventListener("scroll", onScroll);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-4 left-4 z-40 max-w-[19rem] rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-md p-5 shadow-glow"
          aria-label="Consultation offer"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss consultation offer"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck className="w-4 h-4 text-primary" />
            <span className="text-[0.65rem] font-inter font-semibold uppercase tracking-[0.2em] text-primary">
              Free 30 minutes
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-4">
            Seen enough? Bring your architecture, scaling, or VoIP question to a no-pitch consultation call.
          </p>
          <a href="/book" onClick={dismiss}>
            <Button size="sm" variant="hero" className="w-full rounded-xl">
              Book a consultation
            </Button>
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ScrollCTA;
