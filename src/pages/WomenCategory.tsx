import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ecommerce/ProductCard';
import SearchBar from '../components/ecommerce/SearchBar';
import { useCart } from '@/components/ecommerce/CartContext';
import CartDrawer from '../components/ecommerce/CartDrawer';
import Header from '@/components/ecommerce/Header';
import FloatingCartButton, { CartDrawerProvider } from '@/components/ecommerce/FloatingCartButton';
import ProductQuickView from '@/components/ecommerce/ProductQuickView';
import { useAdmin, AdminProduct } from '@/contexts/AdminContext';
import EnhancedFooter from '@/components/ecommerce/EnhancedFooter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const WomenCategory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<AdminProduct | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const { products } = useAdmin();
  const { addToCart } = useCart();

  // Filter products for women's category
  const womenProducts = products.filter(product => 
    product.isActive && (
      product.category.toLowerCase() === 'women' ||
      product.category.toLowerCase() === 'female'
    )
  );

  // Sort products
  const sortedProducts = [...womenProducts].sort((a, b) => {
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
      gsap.from('.category-hero', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
      });
      gsap.from('.product-card', {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, [sortedProducts.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuickView = (product: AdminProduct) => {
    setQuickViewProduct(product);
  };

  return (
    <CartDrawerProvider>
      <div className="min-h-screen bg-white font-inter overflow-x-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-32">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-pink-100 z-30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-pink-600 hover:text-pink-700 transition-colors">
                  <ArrowLeft size={20} />
                  <span className="font-semibold">Back to Home</span>
                </Link>
                <div className="flex items-center gap-4">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="category-hero relative overflow-hidden bg-gradient-to-r from-pink-600 via-pink-400 to-rose-400 text-white py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                WOMEN
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                Explore our elegant collection of women's fashion. From sophisticated office wear to chic casual pieces, discover timeless styles that celebrate your individuality and confidence.
              </p>
              <div className="text-lg font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                {sortedProducts.length} Products Available
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-pink-50 to-transparent"></div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/70 backdrop-blur-sm border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <SearchBar onSearch={handleSearch} placeholder="Search women's fashion..." />
            </div>
          </div>

          {/* Advanced Filter/Sort Bar (from original WomenCategory) */}
          <div className="bg-white border-b border-gray-200 sticky top-24 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <p className="text-gray-900 font-medium text-sm sm:text-base mb-2 sm:mb-0">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                  </p>
                  <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Updated daily with new arrivals
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 sm:w-48 border-gray-300 focus:border-gray-900 focus:ring-0 text-sm">
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
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
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
        <CartDrawer />
        <EnhancedFooter />
      </div>
    </CartDrawerProvider>
  );
};

export default WomenCategory;
