import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminProduct, isVariantAvailable } from "@/contexts/AdminContext";

interface ProductCardProps {
  product: AdminProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Get current image URL
  const getCurrentImageUrl = () => {
    if (imageError || !product.images?.[0]) {
      return "/placeholder.svg";
    }
    return product.images[0];
  };

  // Check if any size is available
  const hasAvailableStock = () => {
    if (!product.sizes || product.sizes.length === 0) {
      return product.quantity > 0;
    }
    return product.sizes.some(size => isVariantAvailable(product, size));
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Don't render if product is not active
  if (!product.isActive) return null;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-lg"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={getCurrentImageUrl()}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
        
        {/* Out of stock overlay */}
        {!hasAvailableStock() && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">OUT OF STOCK</span>
          </div>
        )}

        {/* Sale badge if original price exists */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3">
            <span className="bg-black text-white text-sm font-medium px-3 py-1">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-3">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors leading-relaxed">
          {product.title}
        </h3>
        
        <div className="flex items-center space-x-3">
          <span className="text-xl font-semibold text-gray-900">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-base text-gray-500 line-through">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
