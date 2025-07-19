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
      content: "Every great story has a beginning. Ours started with a simple sketch and a dream to create something timeless.\n\nThe first design came to life on a quiet winter morning, inspired by the elegance of simplicity.\n\nWe knew from that moment that we were onto something special - a brand that would celebrate the art of thoughtful creation.",
      image: "story (1).jpg",
      theme: "light"
    },
    {
      id: 2,
      title: "Finding Our Voice",
      date: "March 2018",
      content: "Months of experimentation led us to discover our unique aesthetic.\n\nWe learned that true beauty lies not in complexity, but in the careful balance of form, function, and emotion.\n\nEach prototype taught us something new about our vision and values.",
      image: "story (2).jpg",
      theme: "light"
    },
    {
      id: 3,
      title: "The First Collection",
      date: "September 2018",
      content: "Our debut collection was more than products—it was a statement.\n\nEach piece told a story of craftsmanship, passion, and the belief that luxury should be accessible to those who appreciate true artistry.\n\nThe response was overwhelming and humbling.",
      image: "story (3).jpg",
      theme: "light"
    },
    {
      id: 4,
      title: "Growing Community",
      date: "June 2019",
      content: "What started as a small venture grew into a community of like-minded individuals who shared our vision.\n\nEvery customer became part of our story, adding their own chapter to our journey.\n\nWe realized we weren't just selling products - we were building relationships.",
      image: "story (4).jpg",
      theme: "light"
    },
    {
      id: 5,
      title: "Innovation & Tradition",
      date: "December 2020",
      content: "The challenge was to honor traditional craftsmanship while embracing modern innovation.\n\nWe found the perfect balance, creating pieces that respect the past while looking toward the future.\n\nThis harmony became our signature approach.",
      image: "story (5).jpg",
      theme: "light"
    },
    {
      id: 6,
      title: "Looking Forward",
      date: "Present Day",
      content: "Today, we continue to write our story.\n\nEach new design, each satisfied customer, each moment of inspiration adds another page to our ever-growing diary of creativity and passion.\n\nThe best is yet to come.",
      image: "story(6).jpg",
      theme: "light"
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

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50 diary-section">
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
          className="max-w-7xl mx-auto"
        >
          {/* Book with Realistic Diary Layout */}
          <div className="relative diary-book">
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-black/10 rounded-lg transform translate-x-2 translate-y-2 blur-sm" />
            
            {/* Main Diary */}
            <div 
              ref={diaryRef}
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden diary-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Diary Binding */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-maroon-800 to-maroon-700 diary-binding">
                {/* Spiral holes */}
                <div className="flex flex-col justify-evenly h-full py-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-black/20 rounded-full mx-auto" />
                  ))}
                </div>
              </div>

              {/* Page Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="ml-8 min-h-[600px] md:min-h-[700px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Left Page - Visual Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative p-6 md:p-8 lg:p-12 bg-paper-texture diary-left-page"
                    >
                      {/* Paper texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/30 pointer-events-none" />
                      
                      {/* Photo with realistic attachment */}
                      <div className="relative z-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="relative photo-container"
                        >
                          {/* Photo corners/tape */}
                          <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-100 opacity-80 transform rotate-45 z-20 photo-tape" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-100 opacity-80 transform rotate-45 z-20 photo-tape" />
                          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-100 opacity-80 transform rotate-45 z-20 photo-tape" />
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-100 opacity-80 transform rotate-45 z-20 photo-tape" />
                          
                          {/* Main photo */}
                          <div className="relative overflow-hidden rounded-sm shadow-lg photo-frame">
                            <img
                              src={diaryPages[currentPage].image}
                              alt={diaryPages[currentPage].title}
                              className="w-full h-64 md:h-80 lg:h-96 object-cover"
                              loading="lazy"
                            />
                            {/* Photo border */}
                            <div className="absolute inset-0 border-4 border-white shadow-inner" />
                          </div>
                        </motion.div>

                        {/* Handwritten-style date */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="mt-6 text-maroon-600 font-handwriting text-lg md:text-xl transform -rotate-1"
                        >
                          {diaryPages[currentPage].date}
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-maroon-300 rounded-full opacity-30" />
                        <div className="absolute bottom-8 left-4 w-4 h-4 bg-maroon-200 rounded-full opacity-40" />
                      </div>
                    </motion.div>

                    {/* Right Page - Lined Paper with Text */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative p-6 md:p-8 lg:p-12 diary-right-page lined-paper"
                    >
                      {/* Lined paper background */}
                      <div className="absolute inset-0 lined-paper-bg" />
                      
                      {/* Margin line */}
                      <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300 opacity-60" />

                      {/* Content */}
                      <div className="relative z-10 pt-8">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="text-2xl md:text-3xl font-handwriting text-gray-800 mb-6 leading-relaxed"
                        >
                          {diaryPages[currentPage].title}
                        </motion.h3>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="space-y-4"
                        >
                          {diaryPages[currentPage].content.split('\n\n').map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-gray-700 leading-relaxed font-handwriting text-base md:text-lg diary-text"
                              style={{ lineHeight: '2rem' }}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </motion.div>

                        {/* Page number */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1 }}
                          className="absolute bottom-6 right-6 text-sm text-gray-500 font-handwriting"
                        >
                          {currentPage + 1}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Click areas for navigation */}
              <div 
                className="absolute left-8 top-0 bottom-0 w-1/2 cursor-pointer z-30"
                onClick={prevPage}
              />
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer z-30"
                onClick={nextPage}
              />
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
              Tap left or right side of the diary to navigate • Swipe to turn pages
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisualDiary;