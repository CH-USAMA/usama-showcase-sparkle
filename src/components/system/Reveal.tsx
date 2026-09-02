import { motion } from "framer-motion";
import { createElement } from "react";
import type { ReactNode } from "react";
import { VIEWPORT, revealUp, revealFade } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePointerField";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied by 60ms. Keep under ~6 or the last item feels late. */
  index?: number;
  /** `fade` for large blocks where translation would fight the layout. */
  variant?: "up" | "fade";
  as?: "div" | "section" | "li" | "article" | "header";
}

/**
 * The single scroll-reveal primitive. Every section uses this so the whole page
 * shares one cadence — the alternative is a dozen slightly-different fades,
 * which is what makes a page feel assembled rather than designed.
 *
 * Under prefers-reduced-motion it renders a plain element with no animation
 * library involved at all. That matters: framer-motion writes inline styles,
 * which a CSS `prefers-reduced-motion` block cannot override, so honouring the
 * preference has to happen here rather than in the stylesheet.
 */
const Reveal = ({
  children,
  className = "",
  index = 0,
  variant = "up",
  as = "div",
}: RevealProps) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return createElement(as, { className, "data-reveal": "" }, children);
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      data-reveal=""
      className={className}
      custom={index}
      variants={variant === "up" ? revealUp : revealFade}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
