import React, { createContext, useContext, useState } from "react";
import { useCart } from "@/components/ecommerce/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Create a context to manage cart drawer state
const CartDrawerContext = createContext<{
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}>({
  isCartOpen: false,
  setCartOpen: () => {}
});

export const useCartDrawer = () => useContext(CartDrawerContext);

export const CartDrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const setCartOpen = (open: boolean) => {
    console.log('🛒 Cart drawer state changing to:', open);
    setIsCartOpen(open);
  };

  return (
    <CartDrawerContext.Provider value={{ isCartOpen, setCartOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

const FloatingCartButton = () => {
  const { cart } = useCart();
  const { setCartOpen } = useCartDrawer();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="lg"
        className="relative h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        onClick={() => {
          console.log('🛒 Floating cart button clicked!');
          setCartOpen(true);
        }}
      >
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs font-bold min-w-[20px] flex items-center justify-center animate-pulse">
            {itemCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default FloatingCartButton; 