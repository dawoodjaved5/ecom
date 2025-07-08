import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAdmin } from '@/contexts/AdminContext';

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
  const { addOrder } = useAdmin();

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
      const order = {
        id: Date.now().toString(),
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
        status: 'pending' as const,
        paymentMethod: formData.paymentMethod === 'cash' ? 'Cash on Delivery' : formData.paymentMethod,
        createdAt: new Date(),
      };
      
      // Save order to database
      await addOrder(order);
      
      // Clear the cart
      clearCart();
      
      // Show prominent success message
      toast.success("🎉 Order Placed Successfully!", {
        description: `Thank you for your order! Your order total was $${getCartTotal().toFixed(2)}. We'll send you a confirmation email shortly.`,
        duration: 5000,
        action: {
          label: "Continue Shopping",
          onClick: () => window.location.href = "/"
        }
      });
      
      return true;
    } catch (error) {
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