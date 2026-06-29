import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Motto from "@/components/Motto";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const ProcessTimeline = lazy(() => import("@/components/ProcessTimeline"));
const ExperienceStats = lazy(() => import("@/components/ExperienceStats"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const FreelancingPlatforms = lazy(() => import("@/components/FreelancingPlatforms"));
const WhoIWorkWith = lazy(() => import("@/components/WhoIWorkWith"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const LatestBlogs = lazy(() => import("@/components/LatestBlogs"));
const Packages = lazy(() => import("@/components/Packages"));
const SEOFaq = lazy(() => import("@/components/SEOFaq"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));
const FloatingHireMe = lazy(() => import("@/components/FloatingHireMe"));

const Fallback = () => <div className="py-20" />;

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://dev-usama-portfolio.vercel.app/#webpage",
      "url": "https://dev-usama-portfolio.vercel.app/",
      "name": "Backend Systems Engineer | Laravel, Automation, VoIP & AI, Usama Munawar",
      "description": "Senior Backend Systems Engineer building scalable Laravel apps, automation infrastructure, VoIP platforms, and AI integrations.",
      "inLanguage": "en",
      "primaryImageOfPage": "https://dev-usama-portfolio.vercel.app/og-image.png"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dev-usama-portfolio.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://dev-usama-portfolio.vercel.app/projects" },
        { "@type": "ListItem", "position": 3, "name": "Blog", "item": "https://dev-usama-portfolio.vercel.app/blog" }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Backend Engineering & Laravel Development",
      "provider": { "@type": "Person", "name": "Usama Munawar", "url": "https://dev-usama-portfolio.vercel.app" },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Engagement Packages",
        "itemListElement": [
          { "@type": "Offer", "name": "Sprint", "description": "Focused 1–2 week Laravel feature build, API hardening, or automation setup.", "price": "1500", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Build", "description": "3–6 week full Laravel SaaS or backend platform with CI/CD and handover.", "price": "4500", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Scale", "description": "Senior engineer on monthly retainer for ongoing architecture and delivery.", "price": "3500", "priceCurrency": "USD" }
        ]
      }
    }
  ]
};

const Index = () => {
  return (
    <div id="top" className="min-h-screen">
      <SEOHead
        canonical="https://dev-usama-portfolio.vercel.app/"
        title="Usama Munawar — Laravel, VoIP & AI Backend Engineer"
        description="Senior backend engineer building scalable Laravel apps, n8n automation, VoIP/Asterisk platforms, and AI integrations. 180+ projects, $145K+ delivered."
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <Hero />
      <Motto />
      <Suspense fallback={<Fallback />}>
        <section id="about" className="scroll-mt-24"><About /></section>
        <section id="skills" className="scroll-mt-24"><Skills /></section>
        <section id="process" className="scroll-mt-24"><ProcessTimeline /></section>
        <section id="experience" className="scroll-mt-24"><ExperienceStats /></section>
        <section id="portfolio" className="scroll-mt-24"><Portfolio /></section>
        <WhoIWorkWith />
        <FreelancingPlatforms />
        <section id="testimonials" className="scroll-mt-24"><Testimonials /></section>
        <section id="blog" className="scroll-mt-24"><LatestBlogs /></section>
        <Packages />
        <SEOFaq />
        <section id="contact" className="scroll-mt-24"><Contact /></section>
        <Footer />
        <AIChatbot />
        <FloatingHireMe />
      </Suspense>
    </div>
  );
};

export default Index;
