import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Video with same overlay effect */}
  <div className="absolute inset-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    >
      <source src="/jamalie.mp4" type="video/mp4" />
    </video>
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))'
      }}
    ></div>
  </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold leading-tight text-shadow-lg mb-4 md:mb-6">
            <p>Elegance isn't loud,<br />
  <span style={{display: 'block', marginTop: '0.25rem', color: '#D6C1A9'}}>It leaves lingers.</span>
</p>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-4 md:mb-6 leading-relaxed px-2"
          >
            The art of timeless craftsmanship.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="https://www.instagram.com/joyfeesh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 md:gap-3 bg-maroon-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg transition-all duration-300 hover:bg-maroon-700 hover:shadow-2xl group touch-manipulation"
          >
            Visit Our Instagram
            <ExternalLink size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        {/* Floating Elements - Hidden on mobile for performance */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute -top-10 left-10 w-2 h-2 bg-white/40 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden md:block absolute top-20 right-10 w-3 h-3 bg-terracotta-300/40 rounded-full"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-0.5 h-6 md:h-8 bg-white/60 rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;