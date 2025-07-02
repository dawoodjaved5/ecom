import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/ecommerce/CartContext";
import { AdminProduct, isVariantAvailable, getVariantQuantity } from "@/contexts/AdminContext";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: AdminProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    // Check if out of stock
    if (product.quantity <= 0) {
      toast.error("This item is out of stock");
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    // Check variant availability
    if (!isVariantAvailable(product, selectedSize, selectedColor)) {
      toast.error("This size/color combination is out of stock");
      return;
    }

    const variantQuantity = getVariantQuantity(product, selectedSize, selectedColor);
    if (quantity > variantQuantity) {
      toast.error(`Only ${variantQuantity} items available for this variant`);
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "/placeholder-product.jpg",
      size: selectedSize,
      color: selectedColor,
      availableQuantity: getVariantQuantity(product, selectedSize, selectedColor),
    });
    
    toast.success("Added to cart!");
    onOpenChange(false);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={handleWishlist}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              {/* Stock indicator */}
              {product.quantity <= 10 && product.quantity > 0 && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full">
                    Only {product.quantity} left
                  </span>
                </div>
              )}
              
              {product.quantity === 0 && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs font-semibold text-white bg-red-500 px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Color: {selectedColor || 'Select Color'}</h4>
                <div className="flex gap-2">
                  {product.colors.map((color) => {
                    const isAvailable = isVariantAvailable(product, selectedSize, color);
                    
                    return (
                      <button
                        key={color}
                        onClick={() => isAvailable && setSelectedColor(color)}
                        disabled={!isAvailable}
                        className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                          selectedColor === color
                            ? 'border-purple-500 scale-110'
                            : isAvailable
                            ? 'border-gray-300 hover:border-purple-300'
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
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Size: {selectedSize || 'Select Size'}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isAvailable = isVariantAvailable(product, size, selectedColor);
                    const quantity = getVariantQuantity(product, size, selectedColor);
                    
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`p-3 border rounded-md transition-colors relative ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : isAvailable
                            ? 'border-gray-300 hover:border-purple-300'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                          </div>
                        )}
                        {isAvailable && quantity <= 3 && (
                          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {quantity}
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
              <h4 className="font-medium mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 bg-gray-100 rounded-md min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.quantity || product.quantity === 0}
                >
                  +
                </Button>
              </div>
              <p className={`text-sm mt-1 ${product.quantity === 0 ? 'text-red-500' : product.quantity <= 10 ? 'text-orange-500' : 'text-gray-500'}`}>
                {product.quantity === 0 ? 'Out of stock' : `${product.quantity} available in stock`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>SKU:</span>
                <span>{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView; 