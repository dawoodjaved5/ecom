
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: "Minimalist Blazer",
      category: "Women",
      price: "$89",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Classic White Shirt",
      category: "Unisex",
      price: "$45",
      originalPrice: "$65",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Denim Jacket",
      category: "Men",
      price: "$75",
      originalPrice: "$95",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Silk Dress",
      category: "Women",
      price: "$120",
      originalPrice: "$160",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Casual Hoodie",
      category: "Unisex",
      price: "$55",
      originalPrice: "$75",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Tailored Pants",
      category: "Men",
      price: "$95",
      originalPrice: "$130",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase border border-gray-200 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm">
              Trending Now
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
            Featured
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of trending pieces that define modern elegance and timeless style
          </p>
        </div>

        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
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
            Explore Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
