import React, { useState } from "react";
import { useCart } from "@/components/ecommerce/CartContext";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CheckoutDrawer from "@/components/ecommerce/CheckoutDrawer";
import { useCartDrawer } from "@/components/ecommerce/FloatingCartButton";

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isCartOpen, setCartOpen } = useCartDrawer();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity), 0);
  


  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full max-w-md p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
            <X />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-16">Your cart is empty.</div>
          ) : (
            <ul className="space-y-6">
              {cart.map(item => (
                <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{item.title}</div>
                    <div className="text-gray-500">{item.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}><X /></Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full mb-2" 
              onClick={() => {
                setCheckoutOpen(true);
              }}
            >
              Proceed to Checkout
            </Button>
            <Button className="w-full" variant="outline" onClick={clearCart}>Clear Cart</Button>
          </div>
        )}
      </SheetContent>
      <CheckoutDrawer open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </Sheet>
  );
};

export default CartDrawer; 