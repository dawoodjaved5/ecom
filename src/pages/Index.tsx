
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/ecommerce/HeroSection";
import FeaturedProducts from "../components/ecommerce/FeaturedProducts";
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

      // Enhanced stagger animation for product cards
      gsap.from(".product-card", {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      <HeroSection />
      <FeaturedProducts />
      <EmailSubscription />
      <Footer />
    </div>
  );
};

export default Index;
