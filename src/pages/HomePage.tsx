import React from 'react';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import ImageSlider from '../components/ImageSlider';
import Gallery from '../components/Gallery';
import QuoteSection from '../components/QuoteSection';
import DiaryStory from '../components/DiaryStory';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <ImageSlider />
      <Gallery />
      <DiaryStory />
      <QuoteSection />
    </>
  );
};

export default HomePage;