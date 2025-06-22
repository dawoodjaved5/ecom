
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { FilterState } from "./ProductFilters";

interface FeaturedProductsProps {
  filters: FilterState;
  searchQuery: string;
}

const FeaturedProducts = ({ filters, searchQuery }: FeaturedProductsProps) => {
  const allProducts = [
    {
      id: 1,
      title: "Minimalist Blazer",
      category: "women",
      price: "$89",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l"],
      priceValue: 89
    },
    {
      id: 2,
      title: "Classic White Shirt",
      category: "unisex",
      price: "$45",
      originalPrice: "$65",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l", "xl"],
      priceValue: 45
    },
    {
      id: 3,
      title: "Denim Jacket",
      category: "men",
      price: "$75",
      originalPrice: "$95",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 75
    },
    {
      id: 4,
      title: "Silk Dress",
      category: "women",
      price: "$120",
      originalPrice: "$160",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m"],
      priceValue: 120
    },
    {
      id: 5,
      title: "Casual Hoodie",
      category: "unisex",
      price: "$55",
      originalPrice: "$75",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl", "xxl"],
      priceValue: 55
    },
    {
      id: 6,
      title: "Tailored Pants",
      category: "men",
      price: "$95",
      originalPrice: "$130",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop&crop=center",
      size: ["m", "l", "xl"],
      priceValue: 95
    },
    {
      id: 7,
      title: "Summer Dress",
      category: "women",
      price: "$65",
      originalPrice: "$85",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=center",
      size: ["xs", "s", "m", "l"],
      priceValue: 65
    },
    {
      id: 8,
      title: "Leather Sneakers",
      category: "unisex",
      price: "$110",
      originalPrice: "$140",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center",
      size: ["s", "m", "l", "xl"],
      priceValue: 110
    }
  ];

  // Filter products based on current filters and search query
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const price = product.priceValue;
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
    if (filters.size !== "all" && !product.size.includes(filters.size)) {
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
        return a.priceValue - b.priceValue;
      case "price-high":
        return b.priceValue - a.priceValue;
      case "newest":
        return b.id - a.id;
      case "popular":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  return (
    <section className="py-16 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Our Products"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No products found matching your criteria</p>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <>
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {sortedProducts.map((product, index) => (
                <div key={product.id} className="product-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center fade-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Load More Products
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
