
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.querySelector('.products-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <Sparkles className="text-yellow-400" size={20} />
          <span className="text-white font-medium">Premium Fashion Collection</span>
          <TrendingUp className="text-green-400" size={20} />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
          <span className="block">Discover</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Your Style
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Explore our curated collection of trendy, minimalist fashion. 
          Filter by category, size, and price to find your perfect match.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/20"
          >
            <ShoppingBag className="mr-3" size={24} />
            Browse Collection
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 hover:border-white/50"
          >
            View Trending
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400 text-sm md:text-base">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50k+</div>
            <div className="text-gray-400 text-sm md:text-base">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm md:text-base">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
