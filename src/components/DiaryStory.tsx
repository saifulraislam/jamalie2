import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface StoryPage {
  id: number;
  date: string;
  title: string;
  content: string;
  images: {
    src: string;
    alt: string;
    rotation: number;
    position: { x: number; y: number };
    size: 'small' | 'medium' | 'large';
  }[];
  decorations: {
    type: 'tape' | 'sticker' | 'doodle';
    position: { x: number; y: number };
    rotation: number;
  }[];
}

const DiaryStory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const storyPages: StoryPage[] = [
    {
      id: 1,
      date: "January 15, 2018",
      title: "The First Sketch",
      content: "Today I drew my first design. It was simple, just lines on paper, but something about it felt different. The way the curves flowed together, the balance of negative space... I knew this was the beginning of something special. Mom always said I had an eye for beauty, but today I felt it in my soul.",
      images: [
        {
          src: "story (1).jpg",
          alt: "First design sketch",
          rotation: -3,
          position: { x: 15, y: 20 },
          size: 'medium'
        },
        {
          src: "story (2).jpg",
          alt: "Inspiration mood board",
          rotation: 8,
          position: { x: 60, y: 45 },
          size: 'small'
        }
      ],
      decorations: [
        { type: 'tape', position: { x: 10, y: 15 }, rotation: -5 },
        { type: 'tape', position: { x: 55, y: 40 }, rotation: 12 },
        { type: 'sticker', position: { x: 80, y: 70 }, rotation: 0 }
      ]
    },
    {
      id: 2,
      date: "March 22, 2018",
      title: "Finding Our Voice",
      content: "Spent hours at the vintage market today, touching fabrics, studying textures. Each piece told a story of craftsmanship from another era. I want Jamaliè to carry that same soul, that same attention to detail. Not just products, but pieces of art that people will treasure.",
      images: [
        {
          src: "story (3).jpg",
          alt: "Vintage market finds",
          rotation: 2,
          position: { x: 20, y: 25 },
          size: 'large'
        },
        {
          src: "story (4).jpg",
          alt: "Fabric textures",
          rotation: -7,
          position: { x: 65, y: 15 },
          size: 'small'
        }
      ],
      decorations: [
        { type: 'tape', position: { x: 15, y: 20 }, rotation: 8 },
        { type: 'tape', position: { x: 60, y: 10 }, rotation: -15 },
        { type: 'doodle', position: { x: 75, y: 65 }, rotation: 0 }
      ]
    },
    {
      id: 3,
      date: "July 8, 2018",
      title: "The Name",
      content: "Jamaliè. It came to me in a dream, whispered like a secret. It means 'beautiful' in Arabic, but it's more than that. It's the feeling you get when you see something that takes your breath away. That's what I want every piece to do - stop people in their tracks with pure, timeless beauty.",
      images: [
        {
          src: "story (5).jpg",
          alt: "Brand name sketches",
          rotation: -4,
          position: { x: 25, y: 30 },
          size: 'medium'
        },
        {
          src: "story(6).jpg",
          alt: "Logo concepts",
          rotation: 6,
          position: { x: 70, y: 50 },
          size: 'small'
        }
      ],
      decorations: [
        { type: 'tape', position: { x: 20, y: 25 }, rotation: -10 },
        { type: 'tape', position: { x: 65, y: 45 }, rotation: 18 },
        { type: 'sticker', position: { x: 85, y: 20 }, rotation: 0 }
      ]
    },
    {
      id: 4,
      date: "December 1, 2018",
      title: "Our First Collection",
      content: "The first pieces are ready. My hands are shaking as I photograph them. Each one represents months of refinement, countless late nights, and so much love. They're not just products - they're pieces of my heart, ready to find their way to people who will understand their story.",
      images: [
        {
          src: "mood (1).jpeg",
          alt: "First collection pieces",
          rotation: 1,
          position: { x: 15, y: 35 },
          size: 'large'
        },
        {
          src: "mood (2).jpeg",
          alt: "Product photography setup",
          rotation: -5,
          position: { x: 75, y: 20 },
          size: 'small'
        }
      ],
      decorations: [
        { type: 'tape', position: { x: 10, y: 30 }, rotation: 5 },
        { type: 'tape', position: { x: 70, y: 15 }, rotation: -12 },
        { type: 'doodle', position: { x: 60, y: 75 }, rotation: 0 }
      ]
    }
  ];

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < storyPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const currentStory = storyPages[currentPage];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-[#FDF9F6] to-[#F9F3F1] relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D6CFC7" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-[#6E1224] mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#1A1A1A]">
              Our Story
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turn the pages of our journey and discover the stories behind our creations
          </p>
        </motion.div>

        {/* Diary Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden diary-spread">
              {/* Binding */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-[#6E1224] to-[#8B2635] transform -translate-x-1/2 z-10">
                <div className="flex flex-col justify-evenly h-full px-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/20 rounded-full mx-auto" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 min-h-[600px]">
                {/* Left Page - Visual Collage */}
                <div className="relative p-8 bg-gradient-to-br from-[#FDF9F6] to-[#F5F0ED] overflow-hidden">
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23D6CFC7" fill-opacity="0.3"%3E%3Cpath d="M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0z"/%3E%3C/g%3E%3C/svg%3E')]" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.6 }}
                      className="relative h-full"
                    >
                      {/* Images */}
                      {currentStory.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotate: image.rotation 
                          }}
                          transition={{ 
                            duration: 0.8, 
                            delay: index * 0.2 + 0.3 
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotate: image.rotation + 2,
                            zIndex: 10
                          }}
                          className={`absolute cursor-pointer ${
                            image.size === 'small' ? 'w-24 h-32' :
                            image.size === 'medium' ? 'w-32 h-40' :
                            'w-40 h-48'
                          }`}
                          style={{
                            left: `${image.position.x}%`,
                            top: `${image.position.y}%`,
                            transform: `translate(-50%, -50%) rotate(${image.rotation}deg)`
                          }}
                        >
                          <div className="relative w-full h-full">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover rounded-sm shadow-lg"
                            />
                            {/* Polaroid effect */}
                            <div className="absolute -inset-2 bg-white rounded-sm shadow-xl -z-10" />
                          </div>
                        </motion.div>
                      ))}

                      {/* Decorations */}
                      {currentStory.decorations.map((decoration, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1 + 0.8 
                          }}
                          className="absolute"
                          style={{
                            left: `${decoration.position.x}%`,
                            top: `${decoration.position.y}%`,
                            transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`
                          }}
                        >
                          {decoration.type === 'tape' && (
                            <div className="w-16 h-6 bg-gradient-to-r from-[#F0E2D0] to-[#EAD6CD] rounded-sm opacity-80 shadow-sm" />
                          )}
                          {decoration.type === 'sticker' && (
                            <div className="w-4 h-4 bg-[#CB6843] rounded-full opacity-70" />
                          )}
                          {decoration.type === 'doodle' && (
                            <div className="w-8 h-8 border-2 border-[#6E1224] rounded-full opacity-40" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Page - Story Text */}
                <div className="relative p-8 bg-gradient-to-br from-[#FEFCFA] to-[#F8F4F1]">
                  {/* Lined paper background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="h-full bg-[url('data:image/svg+xml,%3Csvg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none"%3E%3Cpath stroke="%23D6CFC7" stroke-width="1" d="M0 29h100"/%3E%3C/g%3E%3C/svg%3E')] bg-repeat-y" />
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-[#CB6843] opacity-50" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 h-full flex flex-col"
                    >
                      {/* Date */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#CB6843] text-sm font-medium mb-4 tracking-wide"
                      >
                        {currentStory.date}
                      </motion.p>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-2xl md:text-3xl font-playfair font-bold text-[#1A1A1A] mb-6 leading-tight"
                      >
                        {currentStory.title}
                      </motion.h3>

                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex-1"
                      >
                        <p className="text-[#1A1A1A] leading-relaxed text-lg font-light">
                          {currentStory.content}
                        </p>
                      </motion.div>

                      {/* Page number */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-right mt-8"
                      >
                        <span className="text-[#CB6843] text-sm">
                          {currentPage + 1} of {storyPages.length}
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image Section */}
              <div className="relative h-80 bg-gradient-to-br from-[#FDF9F6] to-[#F5F0ED] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23D6CFC7" fill-opacity="0.3"%3E%3Cpath d="M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0z"/%3E%3C/g%3E%3C/svg%3E')]" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full p-6"
                  >
                    {currentStory.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className={`absolute ${
                          image.size === 'small' ? 'w-20 h-24' :
                          image.size === 'medium' ? 'w-24 h-32' :
                          'w-32 h-40'
                        }`}
                        style={{
                          left: `${image.position.x}%`,
                          top: `${image.position.y}%`,
                          transform: `translate(-50%, -50%) rotate(${image.rotation}deg)`
                        }}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-sm shadow-lg"
                          />
                          <div className="absolute -inset-1 bg-white rounded-sm shadow-xl -z-10" />
                        </div>
                      </motion.div>
                    ))}

                    {currentStory.decorations.map((decoration, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                        className="absolute"
                        style={{
                          left: `${decoration.position.x}%`,
                          top: `${decoration.position.y}%`,
                          transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`
                        }}
                      >
                        {decoration.type === 'tape' && (
                          <div className="w-12 h-4 bg-gradient-to-r from-[#F0E2D0] to-[#EAD6CD] rounded-sm opacity-80 shadow-sm" />
                        )}
                        {decoration.type === 'sticker' && (
                          <div className="w-3 h-3 bg-[#CB6843] rounded-full opacity-70" />
                        )}
                        {decoration.type === 'doodle' && (
                          <div className="w-6 h-6 border-2 border-[#6E1224] rounded-full opacity-40" />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text Section */}
              <div className="relative p-6 bg-gradient-to-br from-[#FEFCFA] to-[#F8F4F1]">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full bg-[url('data:image/svg+xml,%3Csvg width="100" height="25" viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none"%3E%3Cpath stroke="%23D6CFC7" stroke-width="1" d="M0 24h100"/%3E%3C/g%3E%3C/svg%3E')] bg-repeat-y" />
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-[#CB6843] opacity-50" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <p className="text-[#CB6843] text-sm font-medium mb-3">
                      {currentStory.date}
                    </p>
                    <h3 className="text-xl font-playfair font-bold text-[#1A1A1A] mb-4">
                      {currentStory.title}
                    </h3>
                    <p className="text-[#1A1A1A] leading-relaxed font-light mb-4">
                      {currentStory.content}
                    </p>
                    <div className="text-right">
                      <span className="text-[#CB6843] text-sm">
                        {currentPage + 1} of {storyPages.length}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center mt-8 gap-4"
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentPage === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#6E1224] hover:bg-[#6E1224] hover:text-white'
            }`}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-2">
            {storyPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-[#6E1224] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === storyPages.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentPage === storyPages.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#6E1224] hover:bg-[#6E1224] hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DiaryStory;