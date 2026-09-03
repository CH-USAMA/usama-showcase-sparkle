import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import SEOHead from "@/components/SEOHead";
import { SITE_URL } from "@/data/site";

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
const ServiceExplorer = lazy(() => import("@/components/ServiceExplorer"));
const CaseStudies = lazy(() => import("@/components/CaseStudies"));
const Philosophy = lazy(() => import("@/components/Philosophy"));
const TechMatrix = lazy(() => import("@/components/TechMatrix"));
const ProcessPipeline = lazy(() => import("@/components/ProcessPipeline"));
const TrackRecord = lazy(() => import("@/components/TrackRecord"));
const Audience = lazy(() => import("@/components/Audience"));
const Engagements = lazy(() => import("@/components/Engagements"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

const Fallback = () => <div className="py-24" aria-hidden="true" />;

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Backend Systems Engineer | Laravel, Automation, VoIP & AI | Usama Munawar",
      description:
        "Senior Backend Systems Engineer building scalable Laravel apps, automation infrastructure, VoIP platforms, and AI integrations.",
      inLanguage: "en",
      primaryImageOfPage: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: "Blog", item: `${SITE_URL}/blog` },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Backend Engineering & Laravel Development",
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
  const { hash } = useLocation();

  /* React Router does not restore hash targets on navigation, so a link like
     /#work arriving from another route would otherwise land at the top. */
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // sections are lazy — give the chunk a frame to mount before measuring
    const t = window.setTimeout(scroll, 120);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <div id="top">
      <SEOHead
        canonical={`${SITE_URL}/`}
        title="Usama Munawar | Laravel, VoIP & AI Backend Engineer"
        description="Senior backend engineer building scalable Laravel apps, n8n automation, VoIP/Asterisk platforms, and AI integrations. 180+ projects shipped over 5+ years in production."
        jsonLd={homeJsonLd}
      />

      <Navbar />

      <main id="main">
        <Hero />
        <ProofStrip />

        <Suspense fallback={<Fallback />}>
          <ServiceExplorer />
          <CaseStudies />
          <Philosophy />
          <TechMatrix />
          <ProcessPipeline />
          <TrackRecord />
          <Audience />
          <Engagements />
          <FinalCTA />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<Fallback />}>
        <Footer />
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
