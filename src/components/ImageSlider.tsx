import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideData {
  id: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  title: string;
  subtitle: string;
}

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: SlideData[] = [
    {
      id: 1,
      image: {
        desktop: "mood (2).jpeg",
        tablet: "mood (2).jpeg",
        mobile: "mood (2).jpeg"
      },
      title: "Artisan Craftsmanship",
      subtitle: "Handcrafted with precision and passion"
    },
    {
      id: 2,
      image: {
        desktop: "mood (3).jpeg",
        tablet: "mood (3).jpeg",
        mobile: "mood (3).jpeg"
      },
      title: "Premium Materials",
      subtitle: "Only the finest materials make the cut"
    },
    {
      id: 3,
      image: {
        desktop: "mood(4).jpeg",
        tablet: "mood(4).jpeg",
        mobile: "mood(4).jpeg"
      },
      title: "Timeless Design",
      subtitle: "Elegance that transcends trends"
    },
    {
      id: 4,
      image: {
        desktop: "mood (1).jpeg",
        tablet: "mood (1).jpeg",
        mobile: "mood (1).jpeg"
      },
      title: "Luxury Collection",
      subtitle: "Discover our signature pieces"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      {/* Image Slider */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Responsive Images */}
            <picture>
              <source 
                media="(min-width: 1200px)" 
                srcSet={slides[currentSlide].image.desktop}
              />
              <source 
                media="(min-width: 768px)" 
                srcSet={slides[currentSlide].image.tablet}
              />
              <img
                src={slides[currentSlide].image.mobile}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-3 md:mb-4">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brand Section Below Slider */}
      <div className="bg-white py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          {/* Brand Logo/Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-maroon-800 mb-3 md:mb-4">
              Jamaliè
            </h1>
            <p className="text-sm md:text-base text-gray-600 tracking-widest uppercase mb-2">
              Timeless Elegance
            </p>
            <p className="text-xs md:text-sm text-gray-500 tracking-wide">
              EST. 2018
            </p>
          </motion.div>

          {/* Collection Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center max-w-2xl mx-auto"
          >
            <Link to="/collection" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-maroon-800 text-white px-8 py-4 text-base md:text-lg font-medium hover:bg-maroon-700 transition-all duration-300 hover:shadow-xl touch-manipulation"
              >
                SHOP COLLECTION
              </motion.button>
            </Link>
            
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto border-2 border-maroon-800 text-maroon-800 px-8 py-4 text-base md:text-lg font-medium hover:bg-maroon-800 hover:text-white transition-all duration-300 touch-manipulation"
              >
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center mt-8 md:mt-12 space-x-4">
            <div className="w-8 md:w-12 h-0.5 bg-maroon-800 opacity-60" />
            <div className="w-2 h-2 bg-maroon-800 rounded-full opacity-60" />
            <div className="w-8 md:w-12 h-0.5 bg-maroon-800 opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;