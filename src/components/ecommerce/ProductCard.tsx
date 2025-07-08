import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/components/ecommerce/CartContext";
import { isVariantAvailable, getVariantQuantity } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
}

interface ProductCardProps {
  product: AdminProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Calculate discount percentage
  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const hasDiscount = originalPrice > price;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Get current image URL
  const getCurrentImageUrl = () => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder-product.jpg";
    }
    const currentImage = product.images[currentImageIndex];
    return typeof currentImage === 'string' ? currentImage : currentImage.url;
  };

  // Navigation functions
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.images || product.images.length <= 1) return;
    setCurrentImageIndex(currentIndex => 
      currentIndex === 0 ? product.images.length - 1 : currentIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.images || product.images.length <= 1) return;
    setCurrentImageIndex(currentIndex => 
      currentIndex === product.images.length - 1 ? 0 : currentIndex + 1
    );
  };

  // Quick Add functionality
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if product is out of stock
    if (product.quantity <= 0) {
      toast.error(`${product.title} is out of stock`);
      return;
    }

    // Reset selections when opening modal
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setShowQuickAddModal(true);
  };

  const handleAddToCart = () => {
    // Check if size is required and selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    // Check if color is required and selected
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    // Check variant availability
    if (!isVariantAvailable(product, selectedSize, selectedColor)) {
      toast.error("This variant is out of stock");
      return;
    }

    const availableQuantity = getVariantQuantity(product, selectedSize, selectedColor);
    if (quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} items available for this variant`);
      return;
    }

    // Add to cart
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: getCurrentImageUrl(),
      size: selectedSize,
      color: selectedColor,
      availableQuantity: availableQuantity,
    });

    toast.success(`${product.title} added to cart!`);
    setShowQuickAddModal(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <>
      <Card
        className="group cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] rounded-3xl backdrop-blur-sm relative"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>

        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Main Image Container */}
          <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={getCurrentImageUrl()}
              alt={product.title}
              className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-product.jpg"; }}
            />
            
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Navigation Arrows - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-2.5 transition-all duration-300 text-gray-800 z-20 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 shadow-lg hover:shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-2.5 transition-all duration-300 text-gray-800 z-20 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 shadow-lg hover:shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter - Only show if multiple images */}
          {hasMultipleImages && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full z-20 font-medium">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          )}
          
          {/* Floating action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
            <Button 
              size="icon"
              className="bg-white/90 hover:bg-white text-gray-800 hover:text-red-500 rounded-full shadow-lg backdrop-blur-md h-11 w-11 border border-gray-200/50 transition-all duration-300 hover:scale-110"
              onClick={handleWishlist}
            >
              <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
            </Button>
            <Button 
              size="icon"
              className="bg-white/90 hover:bg-white text-gray-800 hover:text-purple-600 rounded-full shadow-lg backdrop-blur-md h-11 w-11 border border-gray-200/50 transition-all duration-300 hover:scale-110"
              onClick={e => e.stopPropagation()}
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
              {product.category.toUpperCase()}
            </span>
          </div>

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-20">
              <span className="text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles size={12} />
                {discountPercent}% OFF
              </span>
            </div>
          )}
          
          {/* Quick add button */}
          <Button 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl border-0"
            onClick={handleQuickAdd}
            disabled={product.quantity <= 0}
          >
            {product.quantity <= 0 ? 'Out of Stock' : 'Quick Add'}
          </Button>
        </div>
        
        <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50/50 relative">
          {/* Content glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-3xl"></div>
          
          <div className="relative mb-3">
            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-medium">{product.originalPrice}</span>
              )}
            </div>
            
            {/* Rating and stock info */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                product.quantity === 0 
                  ? 'bg-red-100 text-red-600' 
                  : product.quantity <= 10 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {product.quantity === 0 ? 'Out of Stock' : `${product.quantity} in stock`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Modal */}
      <Dialog open={showQuickAddModal} onOpenChange={setShowQuickAddModal}>
        <DialogContent className="max-w-md bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              <span>Quick Add to Cart</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQuickAddModal(false)}
                className="h-8 w-8 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Product Info */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl">
              <img
                src={getCurrentImageUrl()}
                alt={product.title}
                className="w-20 h-20 object-contain bg-white rounded-xl shadow-lg"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  ${product.price}
                </p>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="font-bold mb-3 text-gray-900">Select Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const isAvailable = isVariantAvailable(product, size, selectedColor);
                    const quantity = getVariantQuantity(product, size, selectedColor);
                    
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`p-3 border-2 rounded-xl transition-all duration-300 relative font-medium ${
                          selectedSize === size
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 shadow-lg'
                            : isAvailable
                            ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45 rounded"></div>
                          </div>
                        )}
                        {isAvailable && quantity <= 3 && (
                          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {quantity}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="font-bold mb-3 text-gray-900">Select Color</h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isAvailable = isVariantAvailable(product, selectedSize, color);
                    
                    return (
                      <button
                        key={color}
                        onClick={() => isAvailable && setSelectedColor(color)}
                        disabled={!isAvailable}
                        className={`w-12 h-12 rounded-full border-3 transition-all duration-300 relative shadow-lg ${
                          selectedColor === color
                            ? 'border-purple-500 scale-110 shadow-xl'
                            : isAvailable
                            ? 'border-gray-300 hover:border-purple-400 hover:scale-105'
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      >
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45 rounded"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="font-bold mb-3 text-gray-900">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-xl border-2 hover:bg-purple-50 hover:border-purple-300"
                >
                  -
                </Button>
                <span className="px-6 py-2 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl min-w-[4rem] text-center font-bold text-gray-900 border-2 border-purple-200">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= getVariantQuantity(product, selectedSize, selectedColor)}
                  className="h-10 w-10 rounded-xl border-2 hover:bg-purple-50 hover:border-purple-300"
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                {getVariantQuantity(product, selectedSize, selectedColor)} available
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isVariantAvailable(product, selectedSize, selectedColor)}
            >
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
