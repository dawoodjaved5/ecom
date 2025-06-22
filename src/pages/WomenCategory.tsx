
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

const WomenCategory = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "women",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const womenProducts = [
    {
      id: 1,
      title: "Minimalist Blazer",
      category: "women",
      price: "$89",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l"],
      priceValue: 89
    },
    {
      id: 4,
      title: "Silk Dress",
      category: "women",
      price: "$120",
      originalPrice: "$160",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m"],
      priceValue: 120
    },
    {
      id: 7,
      title: "Summer Dress",
      category: "women",
      price: "$65",
      originalPrice: "$85",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l"],
      priceValue: 65
    },
    {
      id: 9,
      title: "Elegant Blouse",
      category: "women",
      price: "$75",
      originalPrice: "$95",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l"],
      priceValue: 75
    },
    {
      id: 10,
      title: "Casual Sweater",
      category: "women",
      price: "$55",
      originalPrice: "$70",
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f4a16?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l", "xl"],
      priceValue: 55
    },
    {
      id: 11,
      title: "Designer Skirt",
      category: "women",
      price: "$95",
      originalPrice: "$125",
      image: "https://images.unsplash.com/photo-1560831027-8b7afc0dbb2a?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m"],
      priceValue: 95
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-rose-600 hover:text-rose-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-rose-500 hover:bg-rose-600"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-rose-500 hover:bg-rose-600"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="category-hero relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Women's Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discover elegance, style, and comfort in our curated women's fashion collection
          </p>
          <div className="text-lg font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            {womenProducts.length} Products Available
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} placeholder="Search women's products..." />
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
          {womenProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenCategory;
