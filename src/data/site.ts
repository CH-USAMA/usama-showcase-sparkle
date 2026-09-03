import { projectsData } from "@/data/projects";
/**
 * Single source of truth for site-wide constants.
 *
 * The canonical origin used to be hardcoded in ~8 files, which made moving to a
 * custom domain a find-and-replace exercise. Import from here instead.
 */

export const SITE_URL = "https://dev-usama-portfolio.vercel.app";

export const OWNER = {
  name: "Usama Munawar",
  role: "Backend Systems Engineer",
  email: "devusamaworks@gmail.com",
  phone: "+92 303 8004684",
  phoneE164: "+92-303-8004684",
  location: "Lahore, Pakistan",
} as const;

export const WHATSAPP_URL =
  "https://wa.me/923038004684?text=Hi%20Usama%2C%20I%27d%20like%20to%20discuss%20a%20project";

export const CALENDLY_URL = "https://calendly.com/usamaresume30/30min";

/** Served from /public — a real file, not a build-time asset reference. */
export const CV_URL = "/usama-munawar-cv.pdf";
export const CV_FILENAME = "Usama-Munawar-CV.pdf";

export const FORMSPREE_URL = "https://formspree.io/f/mkgzjlde";

export const SOCIALS = {
  github: "https://github.com/CH-USAMA",
  linkedin: "https://www.linkedin.com/in/usama-works/",
  upwork: "https://www.upwork.com/freelancers/~01007bf0a0286da654",
  fiverr: "https://www.fiverr.com/ch_usama_",
  x: "https://x.com/usloopsama",
} as const;

/**
 * Headline numbers. Every one is published on a linked platform profile below —
 * nothing here is estimated or invented.
 *
 * "95+ / Clients served" was removed alongside it for the same reason: a client
 * count on a marketplace answers how much work has been sold, not whether the
 * architecture was any good. What is left is the two figures that describe the
 * work itself, with the platform links below as the evidence.
 *
 * "$145K+ / Lifetime earnings" used to sit here and was removed on two grounds.
 * It did not reconcile with the figures this same file publishes (PLATFORM_PROOF
 * totals $80,000+), and lifetime marketplace earnings is a freelancer metric: it
 * answers "how much has he billed on a platform", not "can he architect my
 * system". The platform links below remain the evidence for what is left.
 */
export const METRICS = [
  {
    /**
     * Derived from projects.ts rather than typed in. This tile used to read
     * "180+ projects shipped", which nothing in the repository or on the
     * linked profiles substantiated: Upwork and Fiverr together publish 136
     * reviews, reviews are not projects, and there was no source for the
     * remainder. A number a reader can verify by counting the index is worth
     * more than a larger one they cannot.
     */
    value: `${Object.keys(projectsData).length}`,
    label: "Systems documented",
    note: "Case studies and archive",
  },
  { value: "5+", label: "Years senior backend", note: "Production systems" },
] as const;

export const PLATFORM_PROOF = [
  {
    name: "Upwork",
    status: "Top Rated Plus",
    rating: "5.0",
    reviews: "47 reviews",
    earned: "$50,000+",
    url: SOCIALS.upwork,
  },
  {
    name: "Fiverr",
    status: "Level 2 Seller",
    rating: "4.9",
    reviews: "89 reviews",
    earned: "$30,000+",
    url: SOCIALS.fiverr,
  },
] as const;
