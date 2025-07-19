import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface DiaryPage {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
  theme: 'light' | 'dark';
}

const VisualDiary: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const diaryRef = useRef<HTMLDivElement>(null);

  const diaryPages: DiaryPage[] = [
    {
      id: 1,
      title: "The Beginning",
      date: "January 2018",
      content: "Every great story has a beginning. Ours started with a simple sketch and a dream to create something timeless. The first design came to life on a quiet winter morning, inspired by the elegance of simplicity.",
      image: "story (1).jpg",
      theme: "light"
    },
    {
      id: 2,
      title: "Finding Our Voice",
      date: "March 2018",
      content: "Months of experimentation led us to discover our unique aesthetic. We learned that true beauty lies not in complexity, but in the careful balance of form, function, and emotion.",
      image: "story (2).jpg",
      theme: "dark"
    },
    {
      id: 3,
      title: "The First Collection",
      date: "September 2018",
      content: "Our debut collection was more than products—it was a statement. Each piece told a story of craftsmanship, passion, and the belief that luxury should be accessible to those who appreciate true artistry.",
      image: "story (3).jpg",
      theme: "light"
    },
    {
      id: 4,
      title: "Growing Community",
      date: "June 2019",
      content: "What started as a small venture grew into a community of like-minded individuals who shared our vision. Every customer became part of our story, adding their own chapter to our journey.",
      image: "story (4).jpg",
      theme: "dark"
    },
    {
      id: 5,
      title: "Innovation & Tradition",
      date: "December 2020",
      content: "The challenge was to honor traditional craftsmanship while embracing modern innovation. We found the perfect balance, creating pieces that respect the past while looking toward the future.",
      image: "story (5).jpg",
      theme: "light"
    },
    {
      id: 6,
      title: "Looking Forward",
      date: "Present Day",
      content: "Today, we continue to write our story. Each new design, each satisfied customer, each moment of inspiration adds another page to our ever-growing diary of creativity and passion.",
      image: "story(6).jpg",
      theme: "dark"
    }
  ];

  // Touch handling for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < diaryPages.length - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      prevPage();
    }
  };

  const nextPage = () => {
    if (currentPage < diaryPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };

  // Click handling for page navigation
  const handlePageClick = (e: React.MouseEvent) => {
    if (diaryRef.current) {
      const rect = diaryRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pageWidth = rect.width;
      
      // Click on right half to go forward, left half to go back
      if (clickX > pageWidth / 2) {
        nextPage();
      } else {
        prevPage();
      }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-maroon-800" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900">
              Our Visual
              <span className="gradient-text block mt-2">Diary</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Turn the pages of our journey and discover the stories behind our creations.
          </p>
        </motion.div>

        {/* Diary Book Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Book Spine and Shadow */}
          <div className="relative">
            <div className="absolute -left-2 top-4 bottom-4 w-4 bg-gradient-to-r from-maroon-800 to-maroon-700 rounded-l-lg shadow-lg hidden md:block" />
            
            {/* Main Book */}
            <div 
              ref={diaryRef}
              className="relative bg-white rounded-lg md:rounded-r-lg shadow-2xl overflow-hidden cursor-pointer"
              onClick={handlePageClick}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ aspectRatio: '16/10' }}
            >
              {/* Page Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ 
                    rotateY: isFlipping ? -90 : 0,
                    opacity: isFlipping ? 0 : 1 
                  }}
                  animate={{ 
                    rotateY: 0,
                    opacity: 1 
                  }}
                  exit={{ 
                    rotateY: 90,
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 ${
                    diaryPages[currentPage].theme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' 
                      : 'bg-gradient-to-br from-white to-gray-50 text-gray-900'
                  }`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Image Side */}
                    <div className="relative overflow-hidden lg:order-1">
                      <img
                        src={diaryPages[currentPage].image}
                        alt={diaryPages[currentPage].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 ${
                        diaryPages[currentPage].theme === 'dark' 
                          ? 'bg-black/20' 
                          : 'bg-white/10'
                      }`} />
                    </div>

                    {/* Content Side */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center lg:order-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className={`text-sm md:text-base font-medium mb-3 ${
                          diaryPages[currentPage].theme === 'dark' 
                            ? 'text-amber-300' 
                            : 'text-maroon-600'
                        }`}>
                          {diaryPages[currentPage].date}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-4 md:mb-6">
                          {diaryPages[currentPage].title}
                        </h3>
                        
                        <p className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 ${
                          diaryPages[currentPage].theme === 'dark' 
                            ? 'text-gray-300' 
                            : 'text-gray-700'
                        }`}>
                          {diaryPages[currentPage].content}
                        </p>

                        {/* Page Number */}
                        <div className={`text-sm font-medium ${
                          diaryPages[currentPage].theme === 'dark' 
                            ? 'text-gray-400' 
                            : 'text-gray-500'
                        }`}>
                          Page {currentPage + 1} of {diaryPages.length}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Navigation Hints */}
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity duration-200 hidden md:block">
                    <ChevronLeft size={24} className={
                      diaryPages[currentPage].theme === 'dark' ? 'text-white' : 'text-gray-600'
                    } />
                  </div>
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity duration-200 hidden md:block">
                    <ChevronRight size={24} className={
                      diaryPages[currentPage].theme === 'dark' ? 'text-white' : 'text-gray-600'
                    } />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Page Binding Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-400 opacity-50" />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 md:mt-12">
            {/* Previous Button */}
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-200 touch-manipulation ${
                currentPage === 0 || isFlipping
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-maroon-800 text-white hover:bg-maroon-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Previous</span>
            </motion.button>

            {/* Page Indicators */}
            <div className="flex space-x-2 md:space-x-3">
              {diaryPages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentPage
                      ? 'bg-maroon-800 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  disabled={isFlipping}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextPage}
              disabled={currentPage === diaryPages.length - 1 || isFlipping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-200 touch-manipulation ${
                currentPage === diaryPages.length - 1 || isFlipping
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-maroon-800 text-white hover:bg-maroon-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </motion.button>
          </div>

          {/* Mobile Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-6 md:hidden"
          >
            <p className="text-sm text-gray-600">
              Tap the book or swipe to turn pages
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisualDiary;