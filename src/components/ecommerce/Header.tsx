import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ecommerce/CartContext";
import CartDrawer from "./CartDrawer";
import { Input } from "@/components/ui/input";

const Header = () => {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "SHOES", path: "/shoes" },
    { name: "ACCESSORIES", path: "/accessories" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Top Row - Mobile Menu, Brand, Cart */}
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* Brand Name - Always centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 via-purple-800 to-cyan-600 bg-clip-text text-transparent tracking-wider hover:scale-105 transition-all duration-300 flex items-center gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(false);
                }}
              >
                <Sparkles size={20} className="text-purple-600" />
                OUTLAW
                <Sparkles size={20} className="text-cyan-600" />
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Icon */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 rounded-xl transition-all duration-300 hover:scale-110"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Search size={20} className="text-gray-700" />
              </Button>

              {/* Account Icon - Hidden on small screens */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex p-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 rounded-xl transition-all duration-300 hover:scale-110"
                onClick={() => navigate("/admin")}
              >
                <User size={20} className="text-gray-700" />
              </Button>

              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 rounded-xl transition-all duration-300 hover:scale-110"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag size={20} className="text-gray-700" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Expandable on mobile and desktop */}
          {isSearchOpen && (
            <div className="pb-4 border-t border-gray-200/50">
              <form onSubmit={handleSearch} className="max-w-md mx-auto pt-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 text-base border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300"
                    autoFocus
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-4 border-t border-gray-200/50">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-bold text-gray-700 hover:text-purple-600 transition-all duration-300 tracking-wider px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 relative group"
              >
                {category.name}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
            <nav className="px-4 py-6 space-y-1 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 px-4 py-3 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              {/* Mobile-only links */}
              <div className="border-t border-gray-200/50 pt-4 mt-4">
                <Link
                  to="/admin"
                  className="block text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 px-4 py-3 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ACCOUNT
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header; 