import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const EnhancedFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Mobile: Single column, Desktop: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">OUTLAW</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs mx-auto sm:mx-0">
              Premium fashion for men, women, and kids. Quality meets style in every piece.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/men" className="text-gray-400 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/women" className="text-gray-400 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/kids" className="text-gray-400 hover:text-white transition-colors">Kids</Link></li>
              <li><Link to="/shoes" className="text-gray-400 hover:text-white transition-colors">Shoes</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Store Login</Link></li>
            </ul>
          </div>

          {/* Company - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-4 lg:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-0 text-center sm:text-left">
            © 2024 Outlaw. All rights reserved.
          </p>
          <div className="flex space-x-4 lg:space-x-6 text-xs sm:text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter; 