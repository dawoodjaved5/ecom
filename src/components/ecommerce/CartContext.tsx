import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  availableQuantity: number;
}

export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (formData: OrderFormData) => Promise<boolean>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    // Check if item is out of stock
    if (item.availableQuantity <= 0) {
      toast.error(`${item.title} is out of stock`);
      return;
    }

    setCart(prev => {
      // Create unique identifier that includes size and color
      const itemKey = `${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`;
      const existingKey = (ci: CartItem) => `${ci.id}-${ci.size || 'no-size'}-${ci.color || 'no-color'}`;
      
      const existing = prev.find(ci => existingKey(ci) === itemKey);
      if (existing) {
        const newQuantity = existing.quantity + 1;
        if (newQuantity > item.availableQuantity) {
          toast.error(`Only ${item.availableQuantity} items available in stock`);
          return prev;
        }
        return prev.map(ci => existingKey(ci) === itemKey ? { ...ci, quantity: newQuantity } : ci);
      }
      
      // Don't add if out of stock
      if (item.availableQuantity <= 0) {
        toast.error(`${item.title} is out of stock`);
        return prev;
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.title} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(ci => ci.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => {
      const item = prev.find(ci => ci.id === id);
      if (!item) return prev;
      
      if (quantity > item.availableQuantity) {
        toast.error(`Only ${item.availableQuantity} items available in stock`);
        return prev;
      }
      
      if (quantity <= 0) {
        return prev.filter(ci => ci.id !== id);
      }
      
      return prev.map(ci => ci.id === id ? { ...ci, quantity } : ci);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const placeOrder = async (formData: OrderFormData): Promise<boolean> => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return false;
    }

    try {
      // For now, just clear the cart and show success
      // TODO: Integrate with AdminContext to properly create orders and update inventory
      console.log('Order data:', {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        items: cart.map(item => ({
          productId: item.id,
          productTitle: item.title,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        total: getCartTotal(),
        paymentMethod: formData.paymentMethod,
      });
      
      // Clear cart after successful order
      clearCart();
      toast.success("Order placed successfully!");
      
      return true;
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error("Failed to place order. Please try again.");
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      placeOrder,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}; 