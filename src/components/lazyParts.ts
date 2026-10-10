import { lazyPreload } from "@/lib/lazyPreload";

/*
 * Below-the-fold parts shared by several pages, each in its own chunk. A
 * route's preload (src/routes.ts) loads the ones its page renders, so neither
 * the build-time render nor the first render over that HTML falls back to an
 * empty placeholder where the prerendered part was.
 */
export const Footer = lazyPreload(() => import("@/components/Footer"));
export const FinalCTA = lazyPreload(() => import("@/components/FinalCTA"));
export const TrackRecord = lazyPreload(() => import("@/components/TrackRecord"));
export const TechMatrix = lazyPreload(() => import("@/components/TechMatrix"));
export const BlogRecommendations = lazyPreload(() => import("@/components/BlogRecommendations"));
export const TrendingRepos = lazyPreload(() => import("@/components/TrendingRepos"));
