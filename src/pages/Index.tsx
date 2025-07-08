import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import Header from '@/components/ecommerce/Header';
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts';
import EnhancedFooter from '@/components/ecommerce/EnhancedFooter';
import CoverImageCarousel from '@/components/ecommerce/CoverImageCarousel';
import { useAdmin } from '@/contexts/AdminContext';

const Index = () => {
  const { products, coverImages } = useAdmin();

    return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <Header />
      <div className="pt-32">
        {/* Cover Image Carousel Section */}
        <CoverImageCarousel coverImages={coverImages} />

      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 text-sm font-bold rounded-full mb-6 shadow-lg">
              <Sparkles size={16} className="text-purple-600" />
              Explore Collections
              <Star size={16} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 font-medium leading-relaxed">
              Explore our carefully curated collections designed for every style and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'MEN',
                path: '/men',
                description: 'Sharp & Sophisticated',
                gradient: 'from-blue-500 to-purple-600',
                hoverGradient: 'from-blue-600 to-purple-700',
                icon: '👔'
              },
              {
                name: 'WOMEN',
                path: '/women',
                description: 'Elegant & Timeless',
                gradient: 'from-pink-500 to-rose-600',
                hoverGradient: 'from-pink-600 to-rose-700',
                icon: '👗'
              },
              {
                name: 'SHOES',
                path: '/shoes',
                description: 'Step in Style',
                gradient: 'from-cyan-500 to-blue-600',
                hoverGradient: 'from-cyan-600 to-blue-700',
                icon: '👟'
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white border-0 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image Placeholder with enhanced styling */}
                <div className="relative h-64 w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="text-6xl font-bold opacity-20 select-none group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                </div>
                
                <div className="relative p-8 bg-gradient-to-br from-white to-gray-50/50">
                  <div className="backdrop-blur-md bg-white/80 rounded-2xl px-6 py-6 shadow-xl border border-gray-100/50">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {category.name}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-6 opacity-90 font-medium">{category.description}</p>
                    <Button 
                      size="icon" 
                      className={`bg-gradient-to-r ${category.gradient} hover:${category.hoverGradient} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                    >
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-sm font-bold rounded-full mb-6 shadow-lg">
              <Star size={16} className="text-yellow-500" />
              Handpicked Selection
              <Zap size={16} className="text-orange-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 font-medium">
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
