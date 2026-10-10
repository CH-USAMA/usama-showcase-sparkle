import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import SEOHead from "@/components/SEOHead";
import { SITE_URL } from "@/data/site";
import { scrollToId } from "@/lib/scrollToId";
import { hasSavedScroll, MOUNT_ALL_EVENT } from "@/lib/scrollPositions";
import { isBootRender } from "@/lib/boot";
import { Footer, preloadHomeSections, SECTIONS } from "./homeSections";

/* Everything below the fold is split out: the hero and proof band are the only
   things needed for first paint.
 *
 * Two sections were removed from this page rather than rewritten. The blog
 * teaser duplicated the nav and footer links to /blog on a page that was
 * already long, and the FAQ block emitted a second FAQPage schema on a URL
 * whose index.html already carries one, while repeating answers that now live
 * on /book and on each service page. Both routes are still reachable and still
 * in the sitemap; they no longer sit between a reader and the call to action.
 */
// The sections themselves are declared in ./homeSections, with preload().
// Only the launcher button loads with the page; the chat panel is fetched on demand.
const ChatLauncher = lazy(() => import("@/components/ChatLauncher"));

const Fallback = () => <div className="py-24" aria-hidden="true" />;

const TOTAL = SECTIONS.length;

type IdleHandle = { cancel: () => void };
const whenIdle = (fn: () => void): IdleHandle => {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return { cancel: () => window.cancelIdleCallback(id) };
  }
  const id = setTimeout(fn, 200);
  return { cancel: () => clearTimeout(id) };
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Usama Munawar | Websites, Apps & Production Systems",
      description:
        "Full-stack product engineer building React web apps, React Native mobile apps, Node.js services, and Laravel/PHP backends.",
      inLanguage: "en",
      primaryImageOfPage: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "Service",
      serviceType: "Full-Stack Product Engineering",
      provider: { "@type": "Person", name: "Usama Munawar", url: SITE_URL },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagement Packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Sprint",
            description:
              "Focused 1–2 week Laravel feature build, API hardening, or automation setup.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1500",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Build",
            description:
              "3–6 week full Laravel SaaS or backend platform with CI/CD and handover.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "4500",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Scale",
            description:
              "Senior engineer on monthly retainer for ongoing architecture and delivery.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "3500",
              priceCurrency: "USD",
            },
          },
        ],
      },
    },
  ],
};

const Index = () => {
  const { hash, key } = useLocation();

  /*
   * Progressive mounting. The eight sections below the fold (and the footer)
   * used to start downloading at startup, competing with the hero for the
   * network and landing as one long React task. Now they mount one per idle
   * period after the page has loaded, so the first screen paints first and no
   * single task is long. Everything mounts at once when the reader needs it:
   * a #section link, a back/forward restore, an in-page navbar link, or
   * scrolling ahead of what has mounted. Nothing is skipped, so crawlers that
   * run scripts still get every section.
   */
  // `count` sections mounted one at a time; `rest` flips when everything
  // else is wanted at once. The rest then sits in ONE Suspense boundary, so
  // it appears together: a #services target must not render (and be scrolled
  // to) before the larger sections above it have.
  const [count, setCount] = useState(0);
  const [rest, setRest] = useState(
    () =>
      // Build-time render: the whole page, for readers and crawlers without JS.
      import.meta.env.SSR ||
      Boolean(hash || hasSavedScroll(key)) ||
      // Replacing prerendered HTML the reader has already scrolled into (main.tsx
      // has loaded the sections first, so the page keeps its height).
      (isBootRender() && window.scrollY > 0)
  );
  const all = rest || count >= TOTAL;
  const sentinel = useRef<HTMLDivElement | null>(null);

  // Replacing the prerendered page, which had every section: fetch their code
  // now, without mounting them, so a reader who scrolls on straight away gets
  // them rendered at once rather than through a loading placeholder.
  const [overPrerender] = useState(isBootRender);
  useEffect(() => {
    if (overPrerender) void preloadHomeSections().catch(() => undefined);
  }, [overPrerender]);

  useEffect(() => {
    if (hash) setRest(true);
  }, [hash]);

  useEffect(() => {
    const mountAll = () => setRest(true);
    window.addEventListener(MOUNT_ALL_EVENT, mountAll);
    return () => window.removeEventListener(MOUNT_ALL_EVENT, mountAll);
  }, []);

  useEffect(() => {
    if (all) return;
    let handle: IdleHandle | null = null;
    const next = () => {
      handle = whenIdle(() => setCount((c) => Math.min(TOTAL, c + 1)));
    };
    if (document.readyState === "complete") next();
    else window.addEventListener("load", next, { once: true });
    return () => {
      window.removeEventListener("load", next);
      handle?.cancel();
    };
  }, [count, all]);

  useEffect(() => {
    if (all) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRest(true);
      },
      { rootMargin: "0px 0px 600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [all]);

  /* React Router does not restore hash targets on navigation, so a link like
     /#work arriving from another route would otherwise land at the top. */
  useEffect(() => {
    if (!hash) return;
    // Sections are lazy: wait for the target, then jump (no long smooth
    // scroll through content that is still mounting).
    return scrollToId(hash.slice(1), { smooth: false });
  }, [hash]);

  return (
    <div id="top">
      <SEOHead
        canonical={`${SITE_URL}/`}
        title="Usama Munawar | Websites, Apps & Production Systems"
        description="Explore websites, mobile apps and production systems shipped by Usama Munawar with React, React Native, Node.js, TypeScript and Laravel/PHP."
        jsonLd={homeJsonLd}
      />

      <Navbar />

      {/* The build-time HTML carries every section; prerender-defer lets the
          browser skip laying out the ones below the first screen. */}
      <main id="main" className={import.meta.env.SSR ? "home-rhythm prerender-defer" : "home-rhythm"}>
        <Hero />
        <ProofStrip />

        {/* Order follows the questions a buyer asks, in the order they ask
            them: can you build it (the work), did it go well (clients in their
            own words), what exactly do you do (services), how (process), who
            you are, and what it costs. The stack matrix now lives on /services
            and the year-by-year log on /projects, next to what they describe. */}

        {SECTIONS.slice(0, count).map((Section, i) => (
          <Suspense key={i} fallback={<Fallback />}>
            <Section />
          </Suspense>
        ))}
        {rest && count < TOTAL && (
          <Suspense key="rest" fallback={<Fallback />}>
            {SECTIONS.slice(count).map((Section, i) => (
              <Section key={count + i} />
            ))}
          </Suspense>
        )}
        {/* Keeps the page its real height while sections are still mounting,
            and mounts the rest as soon as the reader scrolls towards it. */}
        {!all && <div ref={sentinel} aria-hidden="true" className="h-[200vh]" />}
      </main>

      {all && (
        <Suspense fallback={<Fallback />}>
          <Footer />
        </Suspense>
      )}
      {/* Not content, and it mounts late in the browser: leave it out of the build-time HTML. */}
      {!import.meta.env.SSR && (
        <Suspense fallback={null}>
          <ChatLauncher />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
