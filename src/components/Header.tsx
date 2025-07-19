import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-maroon-800 tracking-wide"
            >
              Jamaliè
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={`relative font-medium transition-colors duration-200 group ${
                    isActiveRoute(item.href)
                      ? 'text-maroon-800'
                      : 'text-gray-700 hover:text-maroon-800'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-maroon-800 transition-all duration-300 ${
                    isActiveRoute(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Social Links & Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <motion.a
              href="https://www.instagram.com/joyfeesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-maroon-800 hover:text-maroon-600 transition-colors duration-200 p-2"
            >
              <Instagram size={20} className="md:w-6 md:h-6" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-maroon-800 p-2 mobile-toggle relative z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                className="mobile-menu fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-40 overflow-y-auto"
              >
                <div className="p-6 pt-20">
                  {/* Mobile Logo */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-playfair font-bold text-maroon-800">Jamaliè</h2>
                    <p className="text-sm text-gray-600 mt-1">Timeless Elegance</p>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-4 text-lg font-medium rounded-lg transition-all duration-200 border-b border-gray-100 last:border-b-0 min-h-[56px] flex items-center ${
                            isActiveRoute(item.href)
                              ? 'text-maroon-800 bg-maroon-50'
                              : 'text-gray-700 hover:text-maroon-800 hover:bg-maroon-50 active:bg-maroon-100'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Social Links */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">Follow us</p>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://www.instagram.com/joyfeesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-12 h-12 bg-maroon-800 text-white rounded-full hover:bg-maroon-700 transition-colors duration-200 min-w-[48px] min-h-[48px]"
                      >
                        <Instagram size={20} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Get in touch</p>
                    <p className="text-sm text-gray-800">contact@jamalie.com</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;