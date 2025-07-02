import React from "react";
import { useCart } from "@/components/ecommerce/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button 
      variant="outline" 
      className="relative"
      onClick={() => navigate('/cart')}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 text-xs font-bold">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton; 