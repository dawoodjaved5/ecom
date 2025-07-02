import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { FilterState } from "./ProductFilters";
import { AdminProduct } from "@/contexts/AdminContext";

interface FeaturedProductsProps {
  filters: FilterState;
  searchQuery: string;
  onQuickView?: (product: AdminProduct) => void;
  products: AdminProduct[];
}

const FeaturedProducts = ({ filters, searchQuery, onQuickView, products }: FeaturedProductsProps) => {
  // Filter products based on current filters and search query
  const filteredProducts = products.filter(product => {
    // Only show active products
    if (!product.isActive) return false;

    // Category filter
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const price = product.price;
      switch (filters.priceRange) {
        case "under-50":
          if (price >= 50) return false;
          break;
        case "50-100":
          if (price < 50 || price > 100) return false;
          break;
        case "100-200":
          if (price < 100 || price > 200) return false;
          break;
        case "over-200":
          if (price <= 200) return false;
          break;
      }
    }

    // Size filter
    if (filters.size !== "all" && !product.sizes.includes(filters.size)) {
      return false;
    }

    // Color filter
    if (filters.color !== "all" && !product.colors.includes(filters.color)) {
      return false;
    }

    // Search query filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort products based on sortBy filter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "popular":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Show only first 8 products for homepage
  const displayProducts = sortedProducts.slice(0, 8);

  return (
    <>
      {displayProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? "Try adjusting your search terms or filters"
              : "Check back soon for new arrivals"
            }
          </p>
          {searchQuery && (
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gray-900 hover:bg-gray-800"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      {displayProducts.length > 0 && displayProducts.length < sortedProducts.length && (
        <div className="text-center mt-12">
          <Button 
            onClick={() => window.location.href = '/men'} 
            variant="outline" 
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            View All Products
          </Button>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
