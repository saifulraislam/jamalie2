import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  whatsappText: string;
}

const ProductShowcase: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Solace Time Keep Journal",
      price: "BDT 850",
      image: "jour (1).jpeg",
      whatsappText: "I'm interested in Solace Time Keep Journal"
    },
    {
      id: 2,
      name: "Ember Time Keep Journal",
      price: "BDT 850",
      image: "jour (2).jpeg",
      whatsappText: "I'm interested in Ember Time Keep Journal"
    },
    {
      id: 3,
      name: "Écru Flower Journal",
      price: "BDT 850",
      image: "jour (3).jpeg",
      whatsappText: "I'm interested in Écru Flower Journal"
    },
    {
      id: 4,
      name: "Noir Red Heart Journal",
      price: "BDT 850",
      image: "jour (4).jpeg",
      whatsappText: "I'm interested in Noir Red Heart Journal"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="collection" className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Our Curated
            <span className="gradient-text block mt-2">Drops</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-maroon-800 mx-auto rounded-full" />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 touch-manipulation"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-32 sm:h-48 md:h-64">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-lg md:text-xl font-playfair font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-maroon-800 mb-2 sm:mb-4">
                  {product.price}
                </p>

                {/* WhatsApp Button */}
                <motion.a
                  href={`https://wa.me/8801881445154?text=${encodeURIComponent(product.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-1 sm:gap-2 w-full bg-maroon-800 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-full font-medium transition-all duration-300 hover:bg-maroon-700 hover:shadow-lg group touch-manipulation text-xs sm:text-sm md:text-base"
                >
                  <MessageCircle size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-200" />
                  <span className="hidden sm:inline">Order via WhatsApp</span>
                  <span className="sm:hidden">Order</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-base md:text-lg text-gray-600 mb-6 px-4">
            Can't find what you're looking for? Reach out for custom orders.
          </p>
          <motion.a
            href="https://wa.me/8801881445154?text=I'd like to make a custom order"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-terracotta-500 text-white px-6 py-3 md:px-8 rounded-full font-medium transition-all duration-300 hover:bg-terracotta-600 hover:shadow-lg touch-manipulation text-sm md:text-base"
          >
            <MessageCircle size={16} className="md:w-5 md:h-5" />
            Custom Orders
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;