
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

const AccessoriesCategory = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "accessories",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const accessoryProducts = [
    {
      id: 16,
      title: "Leather Handbag",
      category: "accessories",
      price: "$120",
      originalPrice: "$150",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=center",
      size: ["one-size"],
      priceValue: 120
    },
    {
      id: 17,
      title: "Designer Watch",
      category: "accessories",
      price: "$200",
      originalPrice: "$250",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=600&fit=crop&crop=center",
      size: ["adjustable"],
      priceValue: 200
    },
    {
      id: 18,
      title: "Silk Scarf",
      category: "accessories",
      price: "$45",
      originalPrice: "$60",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=600&fit=crop&crop=center",
      size: ["one-size"],
      priceValue: 45
    },
    {
      id: 19,
      title: "Sunglasses",
      category: "accessories",
      price: "$85",
      originalPrice: "$110",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop&crop=center",
      size: ["one-size"],
      priceValue: 85
    },
    {
      id: 20,
      title: "Pearl Necklace",
      category: "accessories",
      price: "$150",
      originalPrice: "$190",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop&crop=center",
      size: ["adjustable"],
      priceValue: 150
    },
    {
      id: 21,
      title: "Leather Belt",
      category: "accessories",
      price: "$65",
      originalPrice: "$80",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 65
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="category-hero relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Accessories
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Complete your look with our curated selection of premium accessories
          </p>
          <div className="text-lg font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            {accessoryProducts.length} Products Available
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-emerald-50 to-transparent"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} placeholder="Search accessories..." />
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
          {accessoryProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesCategory;
