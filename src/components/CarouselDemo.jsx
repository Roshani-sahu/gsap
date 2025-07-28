import React from 'react';
import VerticalCarousel from './VerticalCarousel';

const CarouselDemo = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Minimal */}
      <section className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            Gallery
          </h1>
          <p className="text-sm md:text-base opacity-60 max-w-md mx-auto tracking-wider">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* Vertical Carousel */}
      <VerticalCarousel />

      {/* Footer Section - Minimal */}
      <section className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-light mb-4 tracking-wide">
            End
          </h2>
          <p className="text-sm opacity-40 tracking-wider">
            Gallery complete
          </p>
        </div>
      </section>
    </div>
  );
};

export default CarouselDemo;
