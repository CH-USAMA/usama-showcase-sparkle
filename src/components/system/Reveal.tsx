import { createElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index, multiplied by 60ms. Keep under ~6 or the last item feels late. */
  index?: number;
  /** `fade` for large blocks where translation would fight the layout. */
  variant?: "up" | "fade";
  as?: "div" | "section" | "li" | "article" | "header" | "dl";
}

/**
 * The single scroll-reveal primitive. Every section uses this so the whole page
 * shares one cadence: the alternative is a dozen slightly-different fades,
 * which is what makes a page feel assembled rather than designed.
 *
 * This used to be a framer-motion `whileInView`. The visual contract is
 * unchanged, but the implementation is now an IntersectionObserver toggling
 * the `enter` / `enter-soft` classes that already exist in the stylesheet and
 * already drive the hero.
 *
 * The reason is measured, not stylistic. framer-motion was 135 kB of the
 * critical path and Lighthouse attributed 1,021ms of main-thread time and the
 * single longest task on the page (483ms) to it, for a fade and a 12px rise
 * that two CSS keyframes and eleven lines of observer do identically. It is
 * still used by the sections that genuinely need layout animation; it is no
 * longer required to paint the first screen.
 *
 * Under prefers-reduced-motion the element is shown immediately and the global
 * reduced-motion rule collapses the animation, so nothing moves.
 */
const Reveal = ({
  children,
  className = "",
  index = 0,
  variant = "up",
  as = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      // Matches the old framer-motion viewport margin.
      { rootMargin: "-12% 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const anim = shown ? (variant === "up" ? "enter" : "enter-soft") : "reveal-idle";

  return createElement(
    as,
    {
      ref,
      "data-reveal": "",
      className: `${anim} ${className}`.trim(),
      style: { "--enter-delay": `${index * 60}ms` } as CSSProperties,
    },
    children
  );
};

export default Reveal;
