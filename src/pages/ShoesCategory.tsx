
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ecommerce/ProductCard";
import ProductFilters, { FilterState } from "../components/ecommerce/ProductFilters";
import SearchBar from "../components/ecommerce/SearchBar";

gsap.registerPlugin(ScrollTrigger);

const ShoesCategory = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "shoes",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const shoeProducts = [
    {
      id: 8,
      title: "Leather Sneakers",
      category: "unisex",
      price: "$110",
      originalPrice: "$140",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 110
    },
    {
      id: 22,
      title: "Running Shoes",
      category: "unisex",
      price: "$95",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 95
    },
    {
      id: 23,
      title: "High Heels",
      category: "women",
      price: "$125",
      originalPrice: "$160",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l"],
      priceValue: 125
    },
    {
      id: 24,
      title: "Dress Shoes",
      category: "men",
      price: "$150",
      originalPrice: "$190",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 150
    },
    {
      id: 25,
      title: "Casual Loafers",
      category: "unisex",
      price: "$85",
      originalPrice: "$110",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 85
    },
    {
      id: 26,
      title: "Ankle Boots",
      category: "women",
      price: "$140",
      originalPrice: "$180",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l"],
      priceValue: 140
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-hero", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(".product-card", {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-amber-600 hover:text-amber-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="category-hero relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Footwear
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Step into style with our premium collection of shoes for every occasion
          </p>
          <div className="text-lg font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            {shoeProducts.length} Products Available
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} placeholder="Search footwear..." />
        </div>
      </div>

      <ProductFilters onFilterChange={handleFilterChange} />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {shoeProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoesCategory;
