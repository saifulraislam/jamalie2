import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Target, Eye, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Passionate Craftsmanship",
      description: "Every piece is created with love and attention to detail, ensuring the highest quality."
    },
    {
      icon: Award,
      title: "Timeless Quality",
      description: "We believe in creating products that stand the test of time, both in style and durability."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building relationships with our customers and creating a community around shared values."
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "Jamaliè was born from a vision of timeless elegance" },
    { year: "2020", title: "First Collection", description: "Launched our signature line of artisan products" },
    { year: "2022", title: "International Recognition", description: "Featured in major fashion publications worldwide" },
    { year: "2024", title: "Sustainable Future", description: "Committed to eco-friendly practices and materials" }
  ];

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-maroon-50 to-terracotta-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
              About
              <span className="gradient-text block mt-2">Jamaliè</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              A story of passion, craftsmanship, and timeless elegance that began with a simple belief: 
              true beauty lies in the details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Jamaliè was born from a vision to create something truly special in a world of mass production. 
                  Founded in 2018, our journey began with a simple question: "What if we could bring back the 
                  art of thoughtful design and meticulous craftsmanship?"
                </p>
                <p>
                  Our founder, inspired by travels across artisan communities worldwide, discovered that the 
                  most beautiful creations came from those who poured their heart and soul into their work. 
                  This revelation became the cornerstone of our philosophy.
                </p>
                <p>
                  Today, Jamaliè stands as a testament to the power of passion-driven creation. Every product 
                  in our collection tells a story of dedication, quality, and the pursuit of timeless elegance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Our Story"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-maroon-800 rounded-full opacity-20" />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-terracotta-500 rounded-full opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-maroon-800 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To create exceptional products that inspire confidence and celebrate individual style. 
                We are committed to sustainable practices, ethical sourcing, and supporting artisan 
                communities worldwide while delivering uncompromising quality to our customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become the world's most trusted name in luxury craftsmanship, where every product 
                represents the perfect harmony of tradition and innovation. We envision a future where 
                quality triumphs over quantity, and every purchase makes a positive impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape who we are as a brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-800 text-white rounded-full mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-maroon-50 to-terracotta-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped our story and defined our path forward.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-playfair font-bold text-maroon-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-16 h-16 bg-maroon-800 rounded-full flex items-center justify-center text-white font-bold text-lg relative">
                  {milestone.year}
                  {index < milestones.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-maroon-300" />
                  )}
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-maroon-800 to-terracotta-600 text-white p-12 rounded-3xl"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Join Our Story
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Become part of the Jamaliè family and experience the difference that passion and 
              craftsmanship can make in your life.
            </p>
            <motion.a
              href="/collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-maroon-800 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Collection
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;