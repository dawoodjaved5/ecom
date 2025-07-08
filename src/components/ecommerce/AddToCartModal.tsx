import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/components/ecommerce/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  size?: string[];
  priceValue: number;
  availableQuantity?: number;
}

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const AddToCartModal = ({ isOpen, onClose, product }: AddToCartModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.size && product.size.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      ...product,
      id: String(product.id),
      price: Number(product.price),
      size: selectedSize || undefined,
      availableQuantity: product.availableQuantity ?? 1
    });

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });

    onClose();
    setSelectedSize('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-600">{product.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-lg">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
            </div>
          </div>

          {product.size && product.size.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.size.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
