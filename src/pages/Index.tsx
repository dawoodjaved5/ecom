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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'MEN',
                path: '/men',
                description: 'Sharp & Sophisticated',
              },
              {
                name: 'WOMEN',
                path: '/women',
                description: 'Elegant & Timeless',
              },
              {
                name: 'SHOES',
                path: '/shoes',
                description: 'Step in Style',
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative rounded-3xl overflow-hidden shadow-xl bg-white border-0 hover:shadow-2xl transition-all duration-300 flex flex-col items-stretch min-h-[340px]"
              >
                {/* Image Placeholder - replace with actual image link */}
                <div className="relative h-56 w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* TODO: Add image link here */}
                  <span className="text-gray-400 text-5xl font-bold opacity-30 select-none">IMAGE</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center p-8">
                  <div className="backdrop-blur-md bg-white/60 rounded-2xl px-6 py-4 shadow-md">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 drop-shadow-lg group-hover:text-purple-600 transition-colors duration-300">{category.name}</h3>
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
