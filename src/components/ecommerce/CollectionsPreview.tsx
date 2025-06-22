
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";

const CollectionsPreview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const collections = [
    {
      title: "Men's Wear",
      description: "Sophisticated essentials for the modern gentleman",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=500&fit=crop&crop=center",
      items: "24 Items"
    },
    {
      title: "Women's Wear",
      description: "Elegant pieces that empower and inspire",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=center",
      items: "32 Items"
    },
    {
      title: "Accessories",
      description: "Perfect finishing touches for any outfit",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=center",
      items: "18 Items"
    },
    {
      title: "Seasonal",
      description: "Limited edition pieces for every season",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=500&fit=crop&crop=center",
      items: "12 Items"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".collection-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 80%"
        }
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scrollRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Card 
              key={index} 
              className="collection-card group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{collection.items}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">{collection.title}</h3>
                <p className="text-gray-600 text-sm">{collection.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsPreview;
