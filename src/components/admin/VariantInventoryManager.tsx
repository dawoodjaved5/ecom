import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductInventory, ProductVariantInventory } from "@/contexts/AdminContext";

interface VariantInventoryManagerProps {
  sizes: string[];
  colors: string[];
  sizeInventory: ProductInventory;
  colorInventory: ProductInventory;
  variantInventory: ProductVariantInventory;
  inventoryMode: "simple" | "size" | "color" | "both";
  onInventoryChange: (data: {
    sizeInventory: ProductInventory;
    colorInventory: ProductInventory;
    variantInventory: ProductVariantInventory;
    totalQuantity: number;
  }) => void;
}

const VariantInventoryManager = ({
  sizes,
  colors,
  sizeInventory,
  colorInventory,
  variantInventory,
  inventoryMode,
  onInventoryChange
}: VariantInventoryManagerProps) => {
  const [localSizeInventory, setLocalSizeInventory] = useState<ProductInventory>(sizeInventory);
  const [localColorInventory, setLocalColorInventory] = useState<ProductInventory>(colorInventory);
  const [localVariantInventory, setLocalVariantInventory] = useState<ProductVariantInventory>(variantInventory);

  // Sync with props when they change
  useEffect(() => {
    setLocalSizeInventory(sizeInventory);
    setLocalColorInventory(colorInventory);
    setLocalVariantInventory(variantInventory);
  }, [sizeInventory, colorInventory, variantInventory]);

  // Calculate total quantity
  const calculateTotal = () => {
    if (inventoryMode === "both") {
      // For "both" mode, take the maximum of size and color totals since they're independent
      const sizeTotal = Object.values(localSizeInventory).reduce((sum, qty) => sum + qty, 0);
      const colorTotal = Object.values(localColorInventory).reduce((sum, qty) => sum + qty, 0);
      return Math.max(sizeTotal, colorTotal);
    } else if (inventoryMode === "size") {
      return Object.values(localSizeInventory).reduce((sum, qty) => sum + qty, 0);
    } else if (inventoryMode === "color") {
      return Object.values(localColorInventory).reduce((sum, qty) => sum + qty, 0);
    }
    return 0;
  };

  // Update parent when local state changes - removed onInventoryChange from dependencies to prevent infinite loop
  useEffect(() => {
    const total = calculateTotal();
    onInventoryChange({
      sizeInventory: localSizeInventory,
      colorInventory: localColorInventory,
      variantInventory: localVariantInventory,
      totalQuantity: total
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSizeInventory, localColorInventory, localVariantInventory]);

  const updateSizeInventory = (size: string, quantity: number) => {
    setLocalSizeInventory(prev => ({
      ...prev,
      [size]: Math.max(0, quantity)
    }));
  };

  const updateColorInventory = (color: string, quantity: number) => {
    setLocalColorInventory(prev => ({
      ...prev,
      [color]: Math.max(0, quantity)
    }));
  };

  const updateVariantInventory = (size: string, color: string, quantity: number) => {
    const variant = `${size}-${color}`;
    setLocalVariantInventory(prev => ({
      ...prev,
      [variant]: Math.max(0, quantity)
    }));
  };

  const generateVariants = () => {
    const newVariantInventory: ProductVariantInventory = {};
    sizes.forEach(size => {
      colors.forEach(color => {
        const variant = `${size}-${color}`;
        newVariantInventory[variant] = localVariantInventory[variant] || 0;
      });
    });
    setLocalVariantInventory(newVariantInventory);
  };

  const setAllVariants = (quantity: number) => {
    const newVariantInventory: ProductVariantInventory = {};
    sizes.forEach(size => {
      colors.forEach(color => {
        const variant = `${size}-${color}`;
        newVariantInventory[variant] = quantity;
      });
    });
    setLocalVariantInventory(newVariantInventory);
  };

  if (inventoryMode === "simple") {
    return null; // Simple inventory is handled by regular quantity field
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Inventory Management</CardTitle>
        <p className="text-sm text-gray-600">
          Total Stock: <span className="font-bold text-purple-600">{calculateTotal()}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {inventoryMode === "size" && (
          <div>
            <h4 className="font-medium mb-3">Stock by Size</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sizes.map(size => (
                <div key={size} className="space-y-1">
                  <label className="text-sm font-medium">{size}</label>
                  <Input
                    type="number"
                    min="0"
                    value={localSizeInventory[size] || 0}
                    onChange={(e) => updateSizeInventory(size, parseInt(e.target.value) || 0)}
                    onWheel={(e) => e.currentTarget.blur()}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {inventoryMode === "color" && (
          <div>
            <h4 className="font-medium mb-3">Stock by Color</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colors.map(color => (
                <div key={color} className="space-y-1">
                  <label className="text-sm font-medium">{color}</label>
                  <Input
                    type="number"
                    min="0"
                    value={localColorInventory[color] || 0}
                    onChange={(e) => updateColorInventory(color, parseInt(e.target.value) || 0)}
                    onWheel={(e) => e.currentTarget.blur()}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {inventoryMode === "both" && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Stock by Size (Independent)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sizes.map(size => (
                  <div key={size} className="space-y-1">
                    <label className="text-sm font-medium">{size}</label>
                    <Input
                      type="number"
                      min="0"
                      value={localSizeInventory[size] || 0}
                      onChange={(e) => updateSizeInventory(size, parseInt(e.target.value) || 0)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Stock by Color (Independent)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colors.map(color => (
                  <div key={color} className="space-y-1">
                    <label className="text-sm font-medium">{color}</label>
                    <Input
                      type="number"
                      min="0"
                      value={localColorInventory[color] || 0}
                      onChange={(e) => updateColorInventory(color, parseInt(e.target.value) || 0)}
                      onWheel={(e) => e.currentTarget.blur()}
                      onFocus={(e) => e.target.select()}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VariantInventoryManager; 