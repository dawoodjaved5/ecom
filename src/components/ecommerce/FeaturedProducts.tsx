
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: "Minimalist Blazer",
      category: "Women",
      price: "$89",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Classic White Shirt",
      category: "Unisex",
      price: "$45",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Denim Jacket",
      category: "Men",
      price: "$75",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Silk Dress",
      category: "Women",
      price: "$120",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Casual Hoodie",
      category: "Unisex",
      price: "$55",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Tailored Pants",
      category: "Men",
      price: "$95",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of trending pieces that define modern elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center fade-in">
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
