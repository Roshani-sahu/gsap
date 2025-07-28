import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import './HorizontalCarousel.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalCarousel = () => {
  const containerRef = useRef(null);
  const columnsRef = useRef([]);
  const progressBarRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images organized in 4 columns with 4 images each
  const imageColumns = [
    [
      { id: 1, src: '/images/abt1.png', title: 'Abstract Art 1', fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop' },
      { id: 2, src: '/images/abt2.png', title: 'Modern Design 1', fallback: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop' },
      { id: 3, src: '/images/abt3.png', title: 'Composition 1', fallback: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=800&fit=crop' },
      { id: 4, src: '/images/abt4.png', title: 'Urban Life 1', fallback: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=800&fit=crop' }
    ],
    [
      { id: 5, src: '/images/abt5.png', title: 'Nature 1', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop' },
      { id: 6, src: '/images/drink1.png', title: 'Creative Vision 1', fallback: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop' },
      { id: 7, src: '/images/drink2.png', title: 'Minimal Art 1', fallback: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=800&fit=crop' },
      { id: 8, src: '/images/drink3.png', title: 'Bold Colors 1', fallback: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop' }
    ],
    [
      { id: 9, src: '/images/cup-2.png', title: 'Abstract Art 2', fallback: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=600&h=800&fit=crop' },
      { id: 10, src: '/images/profile1.png', title: 'Modern Design 2', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop' },
      { id: 11, src: '/images/profile2.png', title: 'Composition 2', fallback: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop' },
      { id: 12, src: '/images/profile3.png', title: 'Urban Life 2', fallback: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=800&fit=crop' }
    ],
    [
      { id: 13, src: '/images/profile4.png', title: 'Nature 2', fallback: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop' },
      { id: 14, src: '/images/drink4.png', title: 'Creative Vision 2', fallback: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=600&h=800&fit=crop' },
      { id: 15, src: '/images/fav.png', title: 'Minimal Art 2', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop' },
      { id: 16, src: '/images/mask-img.png', title: 'Bold Colors 2', fallback: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop' }
    ]
  ];

  useGSAP(() => {
    const container = containerRef.current;
    const columnElements = columnsRef.current.filter(Boolean);
    const progressBar = progressBarRef.current;

    if (!container || columnElements.length === 0) return;

    // Set initial styles for columns
    gsap.set(columnElements, {
      willChange: 'transform'
    });

    // Create the horizontal scroll animation for all columns moving together
    const scrollTween = gsap.to(columnElements, {
      xPercent: -300, // Move 3 full column widths (since we have 4 columns, showing 1 at a time)
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: [0, 0.33, 0.66, 1], // Snap to each column
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: 'power2.inOut'
        },
        end: () => `+=${3 * window.innerWidth}`, // 3 full widths to show all 4 columns
        onUpdate: (self) => {
          // Update progress indicator
          const progress = self.progress;
          const newCurrentSlide = Math.floor(progress * 4); // 4 columns
          
          if (progressBar) {
            gsap.to(progressBar, {
              scaleX: progress,
              duration: 0.1,
              ease: 'none'
            });
          }
          
          setCurrentSlide(Math.min(newCurrentSlide, 3)); // Max index is 3
        }
      }
    });

    // Cleanup function
    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleImageError = (e, fallbackSrc) => {
    e.target.src = fallbackSrc;
  };

  return (
    <section 
      ref={containerRef}
      className="horizontal-carousel-section relative w-full h-screen overflow-hidden bg-gray-900"
    >
      {/* Section Title */}
      <div className="absolute top-8 left-8 z-20 text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-2">Gallery</h2>
        <p className="text-lg md:text-xl opacity-80">Scroll to explore columns</p>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
        <div className="flex justify-between items-center text-white mb-4">
          <span className="text-sm opacity-60 font-mono">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-sm opacity-60 font-mono">
            04
          </span>
        </div>
        <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-bar h-full bg-white rounded-full origin-left transform scale-x-0"
          ></div>
        </div>
      </div>

      {/* 4 Column Container */}
      <div className="carousel-wrapper flex h-full w-[400vw]">
        {imageColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            ref={el => columnsRef.current[columnIndex] = el}
            className="column flex flex-col w-screen h-full"
          >
            {column.map((image, imageIndex) => (
              <div
                key={image.id}
                className="image-container relative flex-1 overflow-hidden group"
              >
                {/* Background Image */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  onError={(e) => handleImageError(e, image.fallback)}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                      {image.title}
                    </h3>
                    <div className="text-xs md:text-sm opacity-75 font-mono">
                      {String(columnIndex + 1).padStart(2, '0')}.{String(imageIndex + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation Hint */}
      <div className="absolute bottom-24 right-8 text-white opacity-60 text-center">
        <div className="animate-bounce mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm">Scroll to navigate</span>
      </div>

      {/* Column Indicators */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {imageColumns.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalCarousel;
