
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  route: string;
}

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "women",
      name: "Women's Wear",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9a2c8d4?w=300&h=300&fit=crop&crop=center",
      productCount: 150,
      route: "/women"
    },
    {
      id: "men",
      name: "Men's Wear",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=center",
      productCount: 120,
      route: "/men"
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
      productCount: 80,
      route: "/accessories"
    },
    {
      id: "shoes",
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
      productCount: 95,
      route: "/shoes"
    }
  ];

  const handleCategoryClick = (category: Category) => {
    navigate(category.route);
  };

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Shop by Category</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm font-medium">{category.productCount} products</p>
              </div>
            </div>
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {category.name}
              </h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
