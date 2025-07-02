import React, { useState } from "react";
import { useAdmin, AdminOrder } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

const OrderManagement = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const statusOptions = [
    { value: "all", label: "All Orders", icon: Package },
    { value: "pending", label: "Pending", icon: Clock },
    { value: "processing", label: "Processing", icon: Package },
    { value: "shipped", label: "Shipped", icon: Truck },
    { value: "delivered", label: "Delivered", icon: CheckCircle },
    { value: "cancelled", label: "Cancelled", icon: XCircle },
  ];

  const getStatusColor = (status: AdminOrder['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: AdminOrder['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Package;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: AdminOrder['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">View and manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(order => order.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(order => order.status === 'delivered').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="text-sm text-gray-500 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {filteredOrders.length} orders found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.id.slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Customer</h4>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                          <p className="text-sm text-gray-600">{order.customerPhone}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Shipping Address</h4>
                          <p className="text-sm text-gray-600">{order.customerAddress}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div className="flex-1">
                                <span className="font-medium">{item.productTitle}</span>
                                {item.size && <span className="text-gray-500 ml-2">Size: {item.size}</span>}
                                {item.color && <span className="text-gray-500 ml-2">Color: {item.color}</span>}
                              </div>
                              <div className="text-right">
                                <span className="text-gray-600">Qty: {item.quantity}</span>
                                <span className="ml-4 font-medium">${item.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="lg:ml-8 lg:min-w-[200px]">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="text-lg font-bold text-gray-900">${order.total}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>Payment:</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">Update Status</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {statusOptions.slice(1).map((status) => (
                            <Button
                              key={status.value}
                              size="sm"
                              variant={order.status === status.value ? "default" : "outline"}
                              onClick={() => handleStatusUpdate(order.id, status.value as AdminOrder['status'])}
                              disabled={order.status === status.value}
                              className="text-xs"
                            >
                              {status.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement; 