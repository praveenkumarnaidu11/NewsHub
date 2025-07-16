
import React, { useState, useRef } from 'react';
import { NewsCategory } from '../types/news';
import { 
  Globe, 
  Laptop, 
  Briefcase, 
  Trophy, 
  Music, 
  Heart, 
  Microscope,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const categories: { value: NewsCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'general', label: 'General', icon: <Globe size={18} /> },
  { value: 'technology', label: 'Technology', icon: <Laptop size={18} /> },
  { value: 'business', label: 'Business', icon: <Briefcase size={18} /> },
  { value: 'sports', label: 'Sports', icon: <Trophy size={18} /> },
  { value: 'entertainment', label: 'Entertainment', icon: <Music size={18} /> },
  { value: 'health', label: 'Health', icon: <Heart size={18} /> },
  { value: 'science', label: 'Science', icon: <Microscope size={18} /> },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3; // Show 3 categories at a time on mobile, more on larger screens
  const maxSlides = Math.max(0, categories.length - itemsPerView);

  const slideLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      scrollToSlide(currentSlide - 1);
    }
  };

  const slideRight = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
      scrollToSlide(currentSlide + 1);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.scrollWidth / categories.length;
      sliderRef.current.scrollTo({
        left: slideIndex * slideWidth * itemsPerView,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    scrollToSlide(slideIndex);
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl shadow-lg border border-white/60 backdrop-blur-sm p-6 mb-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-lg">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Explore Categories
            </h3>
            <p className="text-sm text-gray-500">Discover news across different topics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          <div className="relative">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs text-green-700 font-semibold">Live Feed</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={slideLeft}
          disabled={currentSlide === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border-2 border-white/40 rounded-full p-3 shadow-xl transition-all duration-300 ${
            currentSlide === 0 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-white hover:shadow-2xl hover:scale-110 active:scale-95'
          }`}
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>

        <button
          onClick={slideRight}
          disabled={currentSlide >= maxSlides}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border-2 border-white/40 rounded-full p-3 shadow-xl transition-all duration-300 ${
            currentSlide >= maxSlides 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-white hover:shadow-2xl hover:scale-110 active:scale-95'
          }`}
        >
          <ChevronRight size={18} className="text-gray-700" />
        </button>

        {/* Categories Slider */}
        <div 
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 px-12 md:px-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`group flex-shrink-0 relative flex items-center space-x-3 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl scale-105 border-2 border-blue-300/50'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 border-2 border-gray-200/60 hover:border-blue-200 hover:shadow-xl'
              }`}
              style={{
                minWidth: '140px',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Background glow for active category */}
              {selectedCategory === category.value && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
              )}
              
              <span className={`transition-all duration-300 ${
                selectedCategory === category.value 
                  ? 'scale-110 drop-shadow-sm' 
                  : 'group-hover:scale-110'
              }`}>
                {category.icon}
              </span>
              
              <span className="whitespace-nowrap font-medium">
                {category.label}
              </span>
              
              {selectedCategory === category.value && (
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  <span className="w-1 h-1 bg-white/70 rounded-full animate-pulse delay-150"></span>
                </div>
              )}
              
              {/* Hover effect indicator */}
              <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                selectedCategory === category.value 
                  ? 'w-3/4' 
                  : 'group-hover:w-1/2'
              }`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="flex justify-center items-center space-x-3 mt-6">
        {Array.from({ length: maxSlides + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 hover:scale-125'
            }`}
          >
            {currentSlide === index && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-60"></div>
            )}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default CategorySelector;
