import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/components/ecommerce/CartContext";
import Index from "./pages/Index";
import WomenCategory from "./pages/WomenCategory";
import MenCategory from "./pages/MenCategory";
import AccessoriesCategory from "./pages/AccessoriesCategory";
import ShoesCategory from "./pages/ShoesCategory";
import NotFound from "./pages/NotFound";
import { AdminProvider } from "@/contexts/AdminContext";
import CartPage from "./pages/CartPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import CoverImagesManagement from "./pages/admin/CoverImagesManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/women" element={<WomenCategory />} />
              <Route path="/men" element={<MenCategory />} />
              <Route path="/accessories" element={<AccessoriesCategory />} />
              <Route path="/shoes" element={<ShoesCategory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="cover-images" element={<CoverImagesManagement />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
