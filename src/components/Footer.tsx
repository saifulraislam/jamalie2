import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'Collection', href: '#collection' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    information: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Shipping & Returns', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  };

  const contactInfo = [
    { icon: MapPin, text: '123 Luxury Avenue, Paris' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'contact@jamalie.com' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/joyfeesh', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/8801881445154', label: 'WhatsApp' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer id="contact" className="bg-maroon-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-3 md:mb-4">Jamaliè</h3>
              <p className="text-white/80 text-base md:text-lg font-light mb-4 md:mb-6 italic">
                "Designed with elegance. Made to inspire."
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 touch-manipulation"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg md:text-xl font-playfair font-semibold mb-4 md:mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 md:w-12 h-0.5 bg-white/60" />
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm md:text-base touch-manipulation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg md:text-xl font-playfair font-semibold mb-4 md:mb-6 relative">
                Information
                <div className="absolute -bottom-2 left-0 w-8 md:w-12 h-0.5 bg-white/60" />
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.information.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm md:text-base touch-manipulation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg md:text-xl font-playfair font-semibold mb-4 md:mb-6 relative">
                Contact
                <div className="absolute -bottom-2 left-0 w-8 md:w-12 h-0.5 bg-white/60" />
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <info.icon size={16} className="md:w-5 md:h-5 text-white/60 mt-1 flex-shrink-0" />
                    <span className="text-white/80 text-sm md:text-base">{info.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 py-6 md:py-8 text-center"
        >
          <p className="text-white/60 text-sm md:text-base px-4">
            &copy; {currentYear} Jamaliè. All rights reserved. Crafted with passion and dedication.
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16" />
      <div className="hidden md:block absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 translate-y-12" />
    </footer>
  );
};

export default Footer;