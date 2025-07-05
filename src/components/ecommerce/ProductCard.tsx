import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  // Calculate discount percentage
  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const hasDiscount = originalPrice > price;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 bg-white rounded-3xl"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden rounded-t-3xl bg-gray-100">
        <img
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-product.jpg"; }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
          <Button 
            size="icon"
            className="bg-white/90 text-gray-800 hover:bg-white rounded-full shadow-lg backdrop-blur-sm h-10 w-10"
            onClick={e => e.stopPropagation()}
          >
            <Heart size={18} />
          </Button>
          <Button 
            size="icon"
            className="bg-white/90 text-gray-800 hover:bg-white rounded-full shadow-lg backdrop-blur-sm h-10 w-10"
            onClick={e => e.stopPropagation()}
          >
            <ShoppingBag size={18} />
          </Button>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {/* Quick add button */}
        <Button 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-all duration-500 bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2 rounded-full shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          Quick Add
        </Button>
      </div>
      
      <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
            )}
            {/* Discount percentage */}
            {hasDiscount && (
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
