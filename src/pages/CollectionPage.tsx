import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Filter, Grid, List } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  whatsappText: string;
}

const CollectionPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products: Product[] = [
    {
      id: 1,
      name: "Artisan Sneakers",
      price: "$189.99",
      image: "jour (1).jpeg",
      category: "footwear",
      description: "Handcrafted sneakers with premium materials and timeless design.",
      whatsappText: "I'm interested in Artisan Sneakers"
    },
    {
      id: 2,
      name: "Signature Perfume",
      price: "$129.99",
      image: "jour (2).jpeg",
      category: "fragrance",
      description: "An exclusive fragrance that captures the essence of elegance.",
      whatsappText: "I'm interested in Signature Perfume"
    },
    {
      id: 3,
      name: "Leather Pouch",
      price: "$89.99",
      image: "jour (3).jpeg",
      category: "accessories",
      description: "Genuine leather pouch with minimalist design and superior craftsmanship.",
      whatsappText: "I'm interested in Leather Pouch"
    },
    {
      id: 4,
      name: "Silk Scarf",
      price: "$79.99",
      image: "jour (4).jpeg",
      category: "accessories",
      description: "Luxurious silk scarf with intricate patterns and vibrant colors.",
      whatsappText: "I'm interested in Silk Scarf"
    },
    {
      id: 5,
      name: "Classic Watch",
      price: "$299.99",
      image: "cally1.png",
      category: "accessories",
      description: "Timeless watch design with precision movement and elegant aesthetics.",
      whatsappText: "I'm interested in Classic Watch"
    },
    {
      id: 6,
      name: "Designer Handbag",
      price: "$249.99",
      image: "cally2.jpeg",
      category: "accessories",
      description: "Sophisticated handbag crafted from premium materials.",
      whatsappText: "I'm interested in Designer Handbag"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'fragrance', name: 'Fragrance' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-20 md:pt-24">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-maroon-50 to-terracotta-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Our
              <span className="gradient-text block mt-2">Collection</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of timeless pieces, each crafted with passion and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-maroon-800 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-maroon-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-maroon-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            layout
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8'
                : 'space-y-6'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' 
                    ? 'h-48 md:h-64 md:w-80 flex-shrink-0' 
                    : 'h-32 sm:h-48 md:h-64'
                }`}>
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
                <div className={`p-2 sm:p-4 md:p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <h3 className="text-sm sm:text-lg md:text-xl font-playfair font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed hidden sm:block">
                      {product.description}
                    </p>
                    <p className="text-base sm:text-xl md:text-2xl font-bold text-maroon-800 mb-2 sm:mb-4">
                      {product.price}
                    </p>
                  </div>

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

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-gray-600 mb-4">No products found in this category.</p>
              <motion.button
                onClick={() => setSelectedCategory('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-maroon-800 text-white px-6 py-3 rounded-full font-medium hover:bg-maroon-700 transition-colors duration-200"
              >
                View All Products
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;