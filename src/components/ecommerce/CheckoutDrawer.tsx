import React, { useState } from "react";
import { useCart } from "@/components/ecommerce/CartContext";
import { useAdmin } from "@/contexts/AdminContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, ShoppingBag } from "lucide-react";

const CheckoutDrawer = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { cart, clearCart, getCartTotal } = useCart();
  const { addOrder } = useAdmin();
  const total = getCartTotal();
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "", payment: "cash" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (value: string) => {
    setForm({ ...form, payment: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.address || !form.phone) {
      setError("Please fill in all fields.");
      return;
    }
    
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      // Create order object
      const orderData = {
        id: `order_${Date.now()}`, // Temporary ID, will be replaced by Appwrite
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerAddress: form.address,
        items: cart.map(item => ({
          productId: item.id,
          productTitle: item.title,
          quantity: item.quantity,
          price: item.price,
          size: item.size || undefined,
          color: item.color || undefined,
        })),
        total: total,
        status: 'pending' as const,
        paymentMethod: form.payment === 'cash' ? 'Cash on Delivery' : 'Credit Card',
        createdAt: new Date(),
      };

      // Save order to database
      await addOrder(orderData);
      
      // Show success and clear cart
      setSubmitted(true);
      clearCart();
      
      // Show enhanced success toast
      toast.success("🎉 Order Placed Successfully!", {
        description: `Thank you for your order! Your order total was $${total.toFixed(2)}. We'll send you a confirmation email shortly.`,
        duration: 5000,
        action: {
          label: "Continue Shopping",
          onClick: () => window.location.href = "/"
        }
      });
      
      // Reset form after delay
      setTimeout(() => {
        onOpenChange(false);
        setSubmitted(false);
        setForm({ name: "", email: "", address: "", phone: "", payment: "cash" });
      }, 3000);
      
    } catch (err: any) {
      setError('Failed to place order. Please try again.');
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md p-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          {submitted ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</div>
              <div className="text-gray-600 mb-6">Thank you for shopping with us.</div>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-green-800">
                  <div className="font-semibold mb-2">Order Details:</div>
                  <div>Total: ${total.toFixed(2)}</div>
                  <div>Items: {cart.length}</div>
                  <div className="mt-2 text-xs">We'll send you a confirmation email shortly.</div>
                </div>
              </div>
              <Button 
                onClick={() => window.location.href = "/"}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <Input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name"
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <Input 
                  name="email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Shipping Address</label>
                <Input 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange} 
                  placeholder="Enter your complete address"
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <Input 
                  name="phone" 
                  type="tel"
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="Enter your phone number"
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Payment Method</label>
                <Select value={form.payment} onValueChange={handlePaymentChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                    <SelectItem value="card">Credit Card (Demo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items ({cart.length}):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700" 
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? "Placing Order..." : `Place Order - $${total.toFixed(2)}`}
              </Button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutDrawer; 