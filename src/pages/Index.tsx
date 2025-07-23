import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import FreelancingPlatforms from "@/components/FreelancingPlatforms";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <FreelancingPlatforms />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
