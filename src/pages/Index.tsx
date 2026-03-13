import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import FreelancingPlatforms from "@/components/FreelancingPlatforms";
import Testimonials from "@/components/Testimonials";
import LatestBlogs from "@/components/LatestBlogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <FreelancingPlatforms />
      <Testimonials />
      <LatestBlogs />
      <Contact />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
