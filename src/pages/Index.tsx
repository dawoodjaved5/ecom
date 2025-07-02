import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/ecommerce/Header';
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts';
import EnhancedFooter from '@/components/ecommerce/EnhancedFooter';
import CoverImageCarousel from '@/components/ecommerce/CoverImageCarousel';
import { useAdmin } from '@/contexts/AdminContext';

const Index = () => {
  const { products, coverImages } = useAdmin();

    return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32">
        {/* Cover Image Carousel Section */}
        <CoverImageCarousel coverImages={coverImages} />

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gray-900 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore our carefully curated collections designed for every style and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                name: 'MEN', 
                path: '/men', 
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face',
                description: 'Sharp & Sophisticated'
              },
              { 
                name: 'WOMEN', 
                path: '/women', 
                image: 'https://images.unsplash.com/photo-1494790108755-2616c2681caa?w=800&h=600&fit=crop&crop=face',
                description: 'Elegant & Timeless'
              },
              { 
                name: 'SHOES', 
                path: '/shoes', 
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
                description: 'Step in Style'
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative rounded-3xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-stretch min-h-[320px]"
              >
                <div className="relative flex-1 min-h-[220px] md:min-h-[320px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 w-full md:w-2/3">
                  <div className="backdrop-blur-md bg-white/40 rounded-2xl px-6 py-4 shadow-md">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 drop-shadow-lg">{category.name}</h3>
                    <p className="text-base md:text-lg text-gray-700 mb-4 opacity-90">{category.description}</p>
                    <Button size="icon" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg">
                      <ArrowRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Decorative elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-gray-900 opacity-5 rounded-full -translate-x-12 lg:-translate-x-16 -translate-y-12 lg:-translate-y-16"></div>
        <div className="hidden sm:block absolute bottom-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-gray-900 opacity-5 rounded-full translate-x-16 lg:translate-x-24 translate-y-16 lg:translate-y-24"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white text-gray-700 text-xs sm:text-sm font-medium rounded-full mb-4 sm:mb-6 shadow-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Handpicked Selection
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gray-900 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Discover our handpicked selection of premium fashion pieces that define modern style
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="relative">
            <FeaturedProducts 
              filters={{
                category: "all",
                priceRange: "all",
                size: "all",
                color: "all",
                sortBy: "featured"
              }}
              searchQuery=""
              products={products}
            />
          </div>
        </div>
      </section>
      </div>

      <EnhancedFooter />
    </div>
  );
};

export default Index;
