import { lazyPreload } from "@/lib/lazyPreload";
import { FinalCTA, Footer } from "@/components/lazyParts";

/*
 * The home page's below-the-fold sections, each a lazy chunk with a preload()
 * (see Index for how they mount). Build-time rendering preloads them all so
 * the prerendered home carries the whole page; the browser mounts them
 * progressively.
 */
export const CaseStudies = lazyPreload(() => import("@/components/CaseStudies"));
export const Audience = lazyPreload(() => import("@/components/Audience"));
export const ServiceExplorer = lazyPreload(() => import("@/components/ServiceExplorer"));
export const ProcessPipeline = lazyPreload(() => import("@/components/ProcessPipeline"));
export const Philosophy = lazyPreload(() => import("@/components/Philosophy"));
export const Engagements = lazyPreload(() => import("@/components/Engagements"));
export const Contact = lazyPreload(() => import("@/components/Contact"));

/** Below-the-fold sections, in page order. */
export const SECTIONS = [
  CaseStudies,
  Audience,
  ServiceExplorer,
  ProcessPipeline,
  Philosophy,
  Engagements,
  FinalCTA,
  Contact,
];

export { Footer };

export const preloadHomeSections = () => Promise.all([...SECTIONS, Footer].map((S) => S.preload()));
