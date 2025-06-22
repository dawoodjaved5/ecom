
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, X } from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  priceRange: string;
  size: string;
  color: string;
  sortBy: string;
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: "all",
    size: "all",
    color: "all",
    sortBy: "featured"
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (value !== "all" && !activeFilters.includes(`${key}-${value}`)) {
      setActiveFilters([...activeFilters, `${key}-${value}`]);
    }
  };

  const removeFilter = (filterKey: string) => {
    const [key, value] = filterKey.split('-');
    const newFilters = { ...filters, [key]: "all" };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilters(activeFilters.filter(f => f !== filterKey));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: "all",
      priceRange: "all",
      size: "all",
      color: "all",
      sortBy: "featured"
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-semibold text-gray-900">Filters</span>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.size} onValueChange={(value) => updateFilter('size', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
                <SelectItem value="xxl">XXL</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            {activeFilters.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {activeFilters.map((filter) => {
              const [key, value] = filter.split('-');
              return (
                <Badge 
                  key={filter} 
                  variant="secondary" 
                  className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {key}: {value}
                  <X 
                    size={12} 
                    className="cursor-pointer hover:text-blue-900" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
