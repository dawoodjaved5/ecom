import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, Star } from 'lucide-react';
import { useAdmin, AdminProduct, isVariantAvailable, getVariantQuantity } from '@/contexts/AdminContext';
import { useCart } from '@/components/ecommerce/CartContext';
import Header from '@/components/ecommerce/Header';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useAdmin();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Auto-select first available size and color
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          const availableSize = foundProduct.sizes.find(size => isVariantAvailable(foundProduct, size));
          if (availableSize) setSelectedSize(availableSize);
        }
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      } else {
        navigate('/404');
      }
    }
  }, [id, getProductById, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product not found</h2>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCurrentImageUrl = () => {
    if (imageError || !product.images?.[currentImageIndex]) {
      return "/placeholder.svg";
    }
    return product.images[currentImageIndex];
  };

  const handleAddToCart = () => {
    // Check if product requires size selection
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    // Check if product requires color selection
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    // Check availability
    if (!isVariantAvailable(product, selectedSize, selectedColor)) {
      toast.error('This variant is out of stock');
      return;
    }

    const availableQuantity = getVariantQuantity(product, selectedSize, selectedColor);
    if (quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} items available`);
      return;
    }

    // Add to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: getCurrentImageUrl(),
        size: selectedSize,
        color: selectedColor,
        availableQuantity: availableQuantity,
      });
    }

    toast.success(`${quantity} item(s) added to cart`);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 p-2"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
              <img
                src={getCurrentImageUrl()}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      PKR {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded mt-2 sm:mt-0 inline-block">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
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
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isAvailable = isVariantAvailable(product, size, selectedColor);
                    const quantity = getVariantQuantity(product, size, selectedColor);
                    
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`p-2 sm:p-3 border text-sm font-medium transition-colors relative ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : isAvailable
                            ? 'border-gray-300 hover:border-gray-900'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                          </div>
                        )}
                        {isAvailable && quantity <= 3 && quantity > 0 && (
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

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isAvailable = isVariantAvailable(product, selectedSize, color);
                    
                    return (
                      <button
                        key={color}
                        onClick={() => isAvailable && setSelectedColor(color)}
                        disabled={!isAvailable}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                          selectedColor === color
                            ? 'border-gray-900 scale-110'
                            : isAvailable
                            ? 'border-gray-300 hover:border-gray-600'
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
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus size={16} />
                </Button>
                <span className="px-4 py-2 border border-gray-300 min-w-[3rem] text-center bg-white">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= getVariantQuantity(product, selectedSize, selectedColor)}
                  className="h-10 w-10 p-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {getVariantQuantity(product, selectedSize, selectedColor)} available
              </p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 text-base sm:text-lg font-medium"
                disabled={!isVariantAvailable(product, selectedSize, selectedColor)}
              >
                {!isVariantAvailable(product, selectedSize, selectedColor) 
                  ? 'Out of Stock' 
                  : 'ADD TO CART'
                }
              </Button>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t pt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="capitalize font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 