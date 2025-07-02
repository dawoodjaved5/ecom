import React, { useState } from "react";
import { useCart, OrderFormData } from "@/components/ecommerce/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">${item.price}</p>
                      {item.size && (
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 bg-gray-100 rounded-md min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.availableQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal 
          open={showCheckout} 
          onClose={() => setShowCheckout(false)} 
          total={total}
        />
      )}
    </div>
  );
};

// Checkout Modal Component
const CheckoutModal = ({ open, onClose, total }: { open: boolean; onClose: () => void; total: number }) => {
  const { placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<OrderFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    paymentMethod: "cash"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.customerEmail || !form.customerPhone || !form.customerAddress) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      const success = await placeOrder(form);
      if (success) {
        onClose();
        navigate('/');
      }
    } catch (error) {
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="customerAddress"
                value={form.customerAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 