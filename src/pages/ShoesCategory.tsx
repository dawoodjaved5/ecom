import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ecommerce/ProductCard";
import SearchBar from "../components/ecommerce/SearchBar";
import { useCart } from "@/components/ecommerce/CartContext";
import CartDrawer from "../components/ecommerce/CartDrawer";
import Header from "../components/ecommerce/Header";
import FloatingCartButton, { CartDrawerProvider } from "../components/ecommerce/FloatingCartButton";
import ProductQuickView from "../components/ecommerce/ProductQuickView";
import { useAdmin, AdminProduct } from "@/contexts/AdminContext";
import EnhancedFooter from "@/components/ecommerce/EnhancedFooter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const ShoesCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<AdminProduct | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { products } = useAdmin();
  const { addToCart } = useCart();

  // Filter products to show only shoes category and active products
  const shoeProducts = products.filter(product => 
    product.category === "shoes" && product.isActive
  );

  // Sort products
  const sortedProducts = [...shoeProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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
  }, [sortedProducts.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <CartDrawerProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white font-inter overflow-x-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 pt-32">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 z-30 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105">
                  <ArrowLeft size={20} />
                  <span className="font-bold">Back to Home</span>
                </Link>
                <div className="flex items-center gap-4">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`${
                      viewMode === "grid" 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    } transition-all duration-300`}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`${
                      viewMode === "list" 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    } transition-all duration-300`}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <SearchBar onSearch={handleSearch} placeholder="Search footwear..." />
            </div>
          </div>

          {/* Filter/Sort Bar */}
          <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-24 z-40 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <p className="text-gray-900 font-bold text-sm sm:text-base mb-2 sm:mb-0">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                  </p>
                  <div className="hidden sm:block h-4 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">
                    Updated daily with new arrivals
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <span className="text-sm font-bold text-gray-700">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 sm:w-48 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm rounded-xl bg-white/80 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {sortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <ProductCard 
                    product={product} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <FloatingCartButton />
        <ProductQuickView
          product={quickViewProduct}
          open={!!quickViewProduct}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
        />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <EnhancedFooter />
      </div>
    </CartDrawerProvider>
  );
};

export default ShoesCategory;
