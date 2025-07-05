import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CoverImage {
  id: string;
  imageUrl: string;
  category: 'men' | 'women' | 'kids' | 'shoes';
  title?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

interface CoverImageCarouselProps {
  coverImages: CoverImage[];
}

const CoverImageCarousel: React.FC<CoverImageCarouselProps> = ({ coverImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Filter only active cover images
  const activeCoverImages = coverImages.filter(img => img.isActive);

  // Auto-scroll functionality
  useEffect(() => {
    if (activeCoverImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === activeCoverImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [activeCoverImages.length]);

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeCoverImages.length <= 1) return;
      
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeCoverImages.length]);

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? activeCoverImages.length - 1 : currentIndex - 1);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(currentIndex === activeCoverImages.length - 1 ? 0 : currentIndex + 1);
  };

  const handleImageClick = (category: string) => {
    navigate(`/${category}`);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
  };

  if (activeCoverImages.length === 0) {
    // Fallback when no cover images are available - Breakout style
    return (
      <section className="relative w-full min-h-[500px] max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-end justify-start">
        <div className="text-left text-white px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded text-xs sm:text-sm font-medium mb-4">
            PREMIUM COLLECTION
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">OUTLAW</h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">Premium Fashion Collection</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full min-h-[500px] max-h-[70vh] overflow-hidden bg-gray-100 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div 
        className="relative w-full h-auto cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={() => handleImageClick(activeCoverImages[currentIndex].category)}
      >
        <img
          src={activeCoverImages[currentIndex].imageUrl}
          alt={`${activeCoverImages[currentIndex].category} collection`}
          className="w-full h-auto max-h-[100vh] object-contain transition-opacity duration-300"
          onLoad={handleImageLoad}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        
        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
        
        {/* Gradient Overlay - Similar to Breakout style */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
        
        {/* Content Overlay - Breakout style positioning */}
        <div className="absolute inset-0 flex items-end justify-start text-left text-white z-10">
          <div className="max-w-4xl px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded text-xs sm:text-sm font-medium mb-4">
              {activeCoverImages[currentIndex].category.toUpperCase()} COLLECTION
            </div>
            {activeCoverImages[currentIndex].title && (
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                {activeCoverImages[currentIndex].title}
              </h2>
            )}
            {activeCoverImages[currentIndex].description && (
              <p className="text-base sm:text-lg lg:text-xl mb-6 drop-shadow-lg max-w-2xl leading-relaxed">
                {activeCoverImages[currentIndex].description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeCoverImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white z-20 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white z-20 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeCoverImages.length > 1 && (
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 transition-all duration-300 z-20 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
        }`}>
          {activeCoverImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CoverImageCarousel;