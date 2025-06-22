
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

const MenCategory = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "men",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const menProducts = [
    {
      id: 3,
      title: "Denim Jacket",
      category: "men",
      price: "$75",
      originalPrice: "$95",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 75
    },
    {
      id: 6,
      title: "Tailored Pants",
      category: "men",
      price: "$95",
      originalPrice: "$130",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 95
    },
    {
      id: 12,
      title: "Business Shirt",
      category: "men",
      price: "$65",
      originalPrice: "$85",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 65
    },
    {
      id: 13,
      title: "Casual Polo",
      category: "men",
      price: "$45",
      originalPrice: "$60",
      image: "https://images.unsplash.com/photo-1618886614638-80e717d6eaeb?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl", "xxl"],
      priceValue: 45
    },
    {
      id: 14,
      title: "Winter Coat",
      category: "men",
      price: "$150",
      originalPrice: "$200",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 150
    },
    {
      id: 15,
      title: "Sports Jacket",
      category: "men",
      price: "$85",
      originalPrice: "$110",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 85
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="category-hero relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Men's Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Sharp, sophisticated, and stylish pieces crafted for the modern gentleman
          </p>
          <div className="text-lg font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            {menProducts.length} Products Available
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} placeholder="Search men's products..." />
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
          {menProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenCategory;
