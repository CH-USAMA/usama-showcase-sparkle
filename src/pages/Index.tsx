import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Motto from "@/components/Motto";
import SEOHead from "@/components/SEOHead";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const ExperienceStats = lazy(() => import("@/components/ExperienceStats"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const FreelancingPlatforms = lazy(() => import("@/components/FreelancingPlatforms"));
const WhoIWorkWith = lazy(() => import("@/components/WhoIWorkWith"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const LatestBlogs = lazy(() => import("@/components/LatestBlogs"));
const SEOFaq = lazy(() => import("@/components/SEOFaq"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));
const FloatingHireMe = lazy(() => import("@/components/FloatingHireMe"));

const Fallback = () => <div className="py-20" />;

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        canonical="https://dev-usama-portfolio.vercel.app/"
        title="Hire Laravel PHP MySQL Developer | AI Engineer & Vibe Coding Expert — Usama Munawar"
        description="Hire Usama Munawar — expert Laravel, PHP & MySQL developer with 5+ years experience. AI engineer specializing in Claude, vibe coding, React, n8n automation & business digitization. Top-rated on Upwork & Fiverr."
      />
      <Hero />
      <Motto />
      <Suspense fallback={<Fallback />}>
        <About />
        <Skills />
        <ExperienceStats />
        <Portfolio />
        <WhoIWorkWith />
        <FreelancingPlatforms />
        <Testimonials />
        <LatestBlogs />
        <SEOFaq />
        <Contact />
        <Footer />
        <AIChatbot />
        <FloatingHireMe />
      </Suspense>
    </div>
  );
};

export default Index;
