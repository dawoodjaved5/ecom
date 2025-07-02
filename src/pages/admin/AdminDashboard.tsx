import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  LogOut,
  Settings,
  BarChart3,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logout, getSalesAnalytics, getLowStockProducts, restockProduct } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const analytics = getSalesAnalytics();
  const lowStockProducts = getLowStockProducts();

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const handleQuickRestock = (productId: string, productTitle: string) => {
    const quantity = window.prompt(`How many items would you like to add to "${productTitle}" inventory?`, "10");
    if (quantity && !isNaN(Number(quantity)) && Number(quantity) > 0) {
      restockProduct(productId, Number(quantity));
    } else if (quantity !== null) {
      // toast.error("Please enter a valid positive number");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "cover-images", label: "Cover Images", icon: Settings },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "overview") {
                    setActiveTab("overview");
                  } else {
                    navigate(`/admin/${tab.id}`);
                  }
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.totalSales.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Order</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lowStockProducts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Need restocking
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => navigate("/admin/products")}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Add New Product</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => navigate("/admin/orders")}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span>View Orders</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => navigate("/admin/settings")}
                  >
                    <Users className="h-6 w-6" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topSellingProducts.map((item, index) => (
                    <div key={item.product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.product.title}</h4>
                          <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.soldQuantity} sold</div>
                        <div className="text-sm text-gray-500">${item.product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Low Stock Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockProducts.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <h4 className="font-medium">{product.title}</h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${product.quantity === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                            {product.quantity === 0 ? 'OUT OF STOCK' : `${product.quantity} left`}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-1 bg-blue-500 text-white hover:bg-blue-600" 
                            onClick={() => handleQuickRestock(product.id, product.title)}
                          >
                            Restock
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Management</h3>
            <p className="text-gray-500 mb-6">Manage your product catalog, inventory, and pricing.</p>
            <Button onClick={() => navigate("/admin/products")}>
              <Plus className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
            <p className="text-gray-500 mb-6">View and manage customer orders, shipping, and returns.</p>
            <Button onClick={() => navigate("/admin/orders")}>
              View All Orders
            </Button>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Management</h3>
            <p className="text-gray-500 mb-6">View customer information, order history, and preferences.</p>
            <Button onClick={() => navigate("/admin/customers")}>
              View Customers
            </Button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-500 mb-6">Configure store settings, categories, and system preferences.</p>
            <Button onClick={() => navigate("/admin/settings")}>
              Configure Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 