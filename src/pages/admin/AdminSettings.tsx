import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Settings, 
  Store, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const { logout } = useAdmin();
  const [settings, setSettings] = useState({
    storeName: "Fashion Store",
    storeEmail: "admin@fashionstore.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Street, Style City, SC 12345",
    currency: "USD",
    taxRate: "8.5",
    shippingCost: "0",
    freeShippingThreshold: "50",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Settings saved successfully!");
    setIsLoading(false);
  };

  const handleReset = () => {
    setSettings({
      storeName: "Fashion Store",
      storeEmail: "admin@fashionstore.com",
      storePhone: "+1 (555) 123-4567",
      storeAddress: "123 Fashion Street, Style City, SC 12345",
      currency: "USD",
      taxRate: "8.5",
      shippingCost: "0",
      freeShippingThreshold: "50",
    });
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-600 mt-2">Configure your store preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <Input
                  value={settings.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  placeholder="Enter store name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                    placeholder="admin@store.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={settings.storePhone}
                    onChange={(e) => handleInputChange("storePhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={settings.storeAddress}
                    onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                    placeholder="Enter store address"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Business Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange("taxRate", e.target.value)}
                  placeholder="8.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Cost ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={settings.shippingCost}
                  onChange={(e) => handleInputChange("shippingCost", e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Threshold ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange("freeShippingThreshold", e.target.value)}
                  placeholder="50.00"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Security & Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Admin Password</h4>
                <p className="text-sm text-gray-600">Change your admin access password</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Session Management</h4>
                <p className="text-sm text-gray-600">Manage active admin sessions</p>
              </div>
              <Button variant="outline">View Sessions</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900">Danger Zone</h4>
                <p className="text-sm text-red-600">Irreversible actions</p>
              </div>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 