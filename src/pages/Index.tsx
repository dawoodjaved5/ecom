
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/ecommerce/HeroSection";
import FeaturedProducts from "../components/ecommerce/FeaturedProducts";
import ProductFilters, { FilterState } from "../components/ecommerce/ProductFilters";
import SearchBar from "../components/ecommerce/SearchBar";
import CategoryGrid from "../components/ecommerce/CategoryGrid";
import Footer from "../components/ecommerce/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters applied:", newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleCategorySelect = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    console.log("Category selected:", category);
  };

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      <HeroSection />
      
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar onSearch={handleSearch} />
          <CategoryGrid onCategorySelect={handleCategorySelect} />
        </div>
      </section>

      <ProductFilters onFilterChange={handleFilterChange} />
      
      <FeaturedProducts filters={filters} searchQuery={searchQuery} />
      
      <Footer />
    </div>
  );
};

export default Index;
