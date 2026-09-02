import type { Transition, Variants } from "framer-motion";

/**
 * Motion system.
 *
 * Every animation in the app resolves to one of these four tiers. If a new
 * animation doesn't fit a tier, the animation is probably wrong — not the tier.
 *
 *   micro     150–250ms   state feedback (hover, press, toggle)
 *   standard  300–500ms   element enters/leaves, expands, reorders
 *   large     600–1000ms  section reveals, hero composition
 *   scroll    800–1500ms  scroll-linked storytelling, path draws
 */
export const DUR = {
  micro: 0.18,
  standard: 0.38,
  large: 0.72,
  scroll: 1.1,
} as const;

/** Easings. Nothing overshoots; premium motion decelerates, it doesn't bounce. */
export const EASE = {
  /** Fast start, long tail. The default for anything entering. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric. For things that move between two known states. */
  inOut: [0.65, 0, 0.35, 1],
  /** Slightly softer entrance, used for large composition reveals. */
  entrance: [0.22, 1, 0.36, 1],
} as const;

export const transition = {
  micro: { duration: DUR.micro, ease: EASE.out } as Transition,
  standard: { duration: DUR.standard, ease: EASE.out } as Transition,
  large: { duration: DUR.large, ease: EASE.entrance } as Transition,
  scroll: { duration: DUR.scroll, ease: EASE.entrance } as Transition,
};

/** Viewport config shared by every scroll reveal, so cadence is consistent. */
export const VIEWPORT = { once: true, margin: "-12% 0px -8% 0px" } as const;

/**
 * Standard reveal. `custom` is the stagger index.
 * Distance is deliberately small — 16px reads as intentional, 60px reads as a template.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...transition.large, delay: i * 0.06 },
  }),
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { ...transition.large, delay: i * 0.06 },
  }),
};

/** For rows/lists that should feel like they're being enumerated, not popped in. */
export const revealStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

export const revealChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: transition.large },
};

/** Character-level headline reveal — used once, on the hero. */
export const revealLine: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.large, ease: EASE.entrance, delay: 0.06 + i * 0.08 },
  }),
};
