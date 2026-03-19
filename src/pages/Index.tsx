import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Motto from "@/components/Motto";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const FreelancingPlatforms = lazy(() => import("@/components/FreelancingPlatforms"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const LatestBlogs = lazy(() => import("@/components/LatestBlogs"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

const Fallback = () => <div className="py-20" />;

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Motto />
      <Suspense fallback={<Fallback />}>
        <About />
        <Skills />
        <Portfolio />
        <FreelancingPlatforms />
        <Testimonials />
        <LatestBlogs />
        <Contact />
        <Footer />
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
