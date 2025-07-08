import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAdmin, AdminProduct, ProductInventory, ProductVariantInventory } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Upload,
  X,
  ArrowLeft,
  Package,
  RefreshCw
} from "lucide-react";
import VariantInventoryManager from "@/components/admin/VariantInventoryManager";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct, restockProduct } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(products.length === 0);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    quantity: "",
    sizeInventory: {} as ProductInventory,
    colorInventory: {} as ProductInventory,
    variantInventory: {} as ProductVariantInventory,
    inventoryMode: "simple" as "simple" | "size" | "color" | "both", // New inventory mode
    rating: "0",
    reviews: "0",
    isActive: true,
  });

  const categories = ["men", "women", "shoes", "accessories"];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44"];
  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Gray", "Brown"];

  // Auto-show add form if no products exist
  useEffect(() => {
    if (products.length === 0 && !showAddForm) {
      setShowAddForm(true);
    }
  }, [products.length, showAddForm]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      
      // Add new files to existing imageFiles (don't replace)
      setImageFiles(prev => [...prev, ...fileArray]);
      
      // For preview - create object URLs
      const newImages = fileArray.map(file => URL.createObjectURL(file));
      
      // Add new preview URLs to existing images
      setFormData(prev => ({ 
        ...prev, 
        images: [...(prev.images || []), ...newImages] 
      }));
    }
    
    // Reset the input value so the same files can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      price: "",
      originalPrice: "",
      description: "",
      images: [],
      sizes: [],
      colors: [],
      quantity: "",
      sizeInventory: {},
      colorInventory: {},
      variantInventory: {},
      inventoryMode: "simple",
      rating: "0",
      reviews: "0",
      isActive: true,
    });
    setImageFiles([]);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (!formData.title || !formData.category || !formData.price || !formData.quantity) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      const productData = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        images: formData.images.map(url => typeof url === 'string' ? { fileId: '', url } : url),
        sizes: formData.sizes,
        colors: formData.colors,
        quantity: parseInt(formData.quantity),
        sizeInventory: formData.sizeInventory,
        colorInventory: formData.colorInventory,
        variantInventory: formData.variantInventory,
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        isActive: formData.isActive,
        imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      resetForm();
      setShowAddForm(false);
    } catch (err) {
      setError("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    
    // Determine inventory mode based on existing data
    let inventoryMode: "simple" | "size" | "color" | "both" = "simple";
    if (product.variantInventory && Object.keys(product.variantInventory).length > 0) {
      inventoryMode = "both";
    } else if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0 && 
               product.colorInventory && Object.keys(product.colorInventory).length > 0) {
      inventoryMode = "both"; // Both size and color inventory
    } else if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0) {
      inventoryMode = "size";
    } else if (product.colorInventory && Object.keys(product.colorInventory).length > 0) {
      inventoryMode = "color";
    }
    
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      images: product.images.map(image => image.url),
      sizes: product.sizes,
      colors: product.colors,
      quantity: product.quantity.toString(),
      sizeInventory: product.sizeInventory || {},
      colorInventory: product.colorInventory || {},
      variantInventory: product.variantInventory || {},
      inventoryMode,
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      isActive: product.isActive,
    });
    // Clear any pending image files when editing
    setImageFiles([]);
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      toast.success("Product deleted successfully!");
    }
  };

  const handleRestock = (productId: string, productTitle: string) => {
    const quantity = window.prompt(`How many items would you like to add to "${productTitle}" inventory?`, "10");
    if (quantity && !isNaN(Number(quantity)) && Number(quantity) > 0) {
      restockProduct(productId, Number(quantity));
    } else if (quantity !== null) {
      toast.error("Please enter a valid positive number");
    }
  };

  // Handle inventory mode change
  const handleInventoryModeChange = (mode: "simple" | "size" | "color" | "both") => {
    setFormData(prev => ({
      ...prev,
      inventoryMode: mode,
      // Reset inventory data when changing modes
      sizeInventory: {},
      colorInventory: {},
      variantInventory: {},
      quantity: mode === "simple" ? prev.quantity : "0" // Keep simple quantity, reset others
    }));
  };

  // Handle inventory data from VariantInventoryManager
  const handleInventoryChange = useCallback((data: {
    sizeInventory: ProductInventory;
    colorInventory: ProductInventory;
    variantInventory: ProductVariantInventory;
    totalQuantity: number;
  }) => {
    setFormData(prev => ({
      ...prev,
      sizeInventory: data.sizeInventory,
      colorInventory: data.colorInventory,
      variantInventory: data.variantInventory,
      quantity: data.totalQuantity.toString()
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 mt-2">Manage your product catalog and inventory</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="text-sm text-gray-500 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {filteredProducts.length} products found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity * {formData.inventoryMode !== "simple" && "(Auto-calculated)"}
                    </label>
                    <Input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0"
                      required
                      disabled={formData.inventoryMode !== "simple"}
                      className={formData.inventoryMode !== "simple" ? "bg-gray-100" : ""}
                    />
                    {formData.inventoryMode !== "simple" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Total calculated from variant inventory below
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer text-purple-600 hover:text-purple-700">
                      {formData.images.length > 0 ? 'Add more images' : 'Click to upload images'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Select multiple files at once or add them one by one
                    </p>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {formData.images.length} image(s) selected
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, images: [] }));
                            setImageFiles([]);
                          }}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Remove all
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded-lg">
                              <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`p-2 border rounded-md text-sm ${
                          formData.sizes.includes(size)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Colors
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={`p-2 border rounded-md text-sm ${
                          formData.colors.includes(color)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inventory Management */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inventory Management
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={formData.inventoryMode === "simple" ? "default" : "outline"}
                        onClick={() => handleInventoryModeChange("simple")}
                      >
                        Simple (Total Quantity)
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={formData.inventoryMode === "size" ? "default" : "outline"}
                        onClick={() => handleInventoryModeChange("size")}
                        disabled={formData.sizes.length === 0}
                      >
                        By Size
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={formData.inventoryMode === "color" ? "default" : "outline"}
                        onClick={() => handleInventoryModeChange("color")}
                        disabled={formData.colors.length === 0}
                      >
                        By Color
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={formData.inventoryMode === "both" ? "default" : "outline"}
                        onClick={() => handleInventoryModeChange("both")}
                        disabled={formData.sizes.length === 0 || formData.colors.length === 0}
                      >
                        By Size & Color (Separate)
                      </Button>
                    </div>
                    
                    {formData.inventoryMode === "simple" && (
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-700">
                          Using simple inventory management. Set quantity in the field above.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <VariantInventoryManager
                    sizes={formData.sizes}
                    colors={formData.colors}
                    sizeInventory={formData.sizeInventory}
                    colorInventory={formData.colorInventory}
                    variantInventory={formData.variantInventory}
                    inventoryMode={formData.inventoryMode}
                    onInventoryChange={handleInventoryChange}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange("isActive", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active Product</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setShowAddForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {products.length === 0 && !error ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adding a new product.</p>
          </div>
        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.images[0]?.url || "/placeholder-product.jpg"}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(product)}
                      title="Edit Product"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestock(product.id, product.title)}
                      title="Restock Product"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                      title="Delete Product"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {!product.isActive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Inactive
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className={`text-sm font-medium ${
                      product.quantity === 0 
                        ? 'text-red-600 bg-red-100 px-2 py-1 rounded-full' 
                        : product.quantity <= 10 
                        ? 'text-orange-600 bg-orange-100 px-2 py-1 rounded-full' 
                        : 'text-green-600'
                    }`}>
                      {product.quantity === 0 ? 'OUT OF STOCK' : `${product.quantity} in stock`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ {product.rating}</span>
                    <span>•</span>
                    <span>{product.reviews} reviews</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.sizes.slice(0, 3).map(size => (
                      <span key={size} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 3 && (
                      <span className="text-xs text-gray-500">+{product.sizes.length - 3} more</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement; 