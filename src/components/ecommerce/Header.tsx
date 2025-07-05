import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
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
      console.log("Searching for:", searchQuery);
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
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row - Mobile Menu, Brand, Cart */}
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* Brand Name - Always centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide hover:text-gray-700 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(false);
                }}
              >
                OUTLAW
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Icon */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Search size={20} />
              </Button>

              {/* Account Icon - Hidden on small screens */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex p-2 hover:bg-gray-100"
                onClick={() => navigate("/admin")}
              >
                <User size={20} />
              </Button>

              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Expandable on mobile and desktop */}
          {isSearchOpen && (
            <div className="pb-4 border-t border-gray-100">
              <form onSubmit={handleSearch} className="max-w-md mx-auto pt-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 text-base border-gray-300 focus:border-gray-900 focus:ring-0"
                  autoFocus
                />
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-4 border-t border-gray-100">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 tracking-wide px-2 py-1"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-6 space-y-1 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              {/* Mobile-only links */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  to="/admin"
                  className="block text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-lg transition-colors duration-200"
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