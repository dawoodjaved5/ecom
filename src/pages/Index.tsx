
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/ecommerce/HeroSection";
import FeaturedProducts from "../components/ecommerce/FeaturedProducts";
import AboutBrand from "../components/ecommerce/AboutBrand";
import CollectionsPreview from "../components/ecommerce/CollectionsPreview";
import CustomerTestimonials from "../components/ecommerce/CustomerTestimonials";
import EmailSubscription from "../components/ecommerce/EmailSubscription";
import Footer from "../components/ecommerce/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize GSAP scroll animations
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <HeroSection />
      <FeaturedProducts />
      <AboutBrand />
      <CollectionsPreview />
      <CustomerTestimonials />
      <EmailSubscription />
      <Footer />
    </div>
  );
};

export default Index;
