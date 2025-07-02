
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderSuccess = () => {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardContent className="p-8">
            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
            
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold mb-2">Order Details</h2>
              <p className="text-sm text-gray-600">Order Number: <span className="font-mono font-bold">{orderNumber}</span></p>
              <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Package className="text-blue-500" size={24} />
                <div className="text-left">
                  <h3 className="font-semibold">Order Processing</h3>
                  <p className="text-sm text-gray-600">We're preparing your items</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-gray-400" size={24} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-400">Shipping</h3>
                  <p className="text-sm text-gray-400">We'll notify you when shipped</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address with order details and tracking information.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
                  Track Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
