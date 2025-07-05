import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ecommerce/CartContext";
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => navigate('/cart')}
    >
      <ShoppingBag size={20} />
      {state.itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {state.itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
