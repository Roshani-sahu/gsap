import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import './VerticalCarousel.css';

gsap.registerPlugin(ScrollTrigger);

const VerticalCarousel = () => {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  const progressBarRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images organized in 4 rows with 4 images each (16 total images)
  const imageRows = [
    [
      { id: 1, src: '/images/abt1.png', title: 'Abstract Art 1', fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
      { id: 2, src: '/images/abt2.png', title: 'Modern Design 1', fallback: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
      { id: 3, src: '/images/abt3.png', title: 'Composition 1', fallback: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop' },
      { id: 4, src: '/images/abt4.png', title: 'Urban Life 1', fallback: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop' }
    ],
    [
      { id: 5, src: '/images/abt5.png', title: 'Nature 1', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' },
      { id: 6, src: '/images/drink1.png', title: 'Creative Vision 1', fallback: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
      { id: 7, src: '/images/drink2.png', title: 'Minimal Art 1', fallback: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop' },
      { id: 8, src: '/images/drink3.png', title: 'Bold Colors 1', fallback: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop' }
    ],
    [
      { id: 9, src: '/images/cup-2.png', title: 'Abstract Art 2', fallback: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=400&h=300&fit=crop' },
      { id: 10, src: '/images/profile1.png', title: 'Modern Design 2', fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
      { id: 11, src: '/images/profile2.png', title: 'Composition 2', fallback: 'https://images.unsplash.com/photo-1494790108755-2616c78bc495?w=400&h=300&fit=crop' },
      { id: 12, src: '/images/profile3.png', title: 'Urban Life 2', fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop' }
    ],
    [
      { id: 13, src: '/images/profile4.png', title: 'Nature 2', fallback: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop' },
      { id: 14, src: '/images/drink4.png', title: 'Creative Vision 2', fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop' },
      { id: 15, src: '/images/mask-img.png', title: 'Minimal Art 2', fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop' },
      { id: 16, src: '/images/under-img.jpg', title: 'Bold Colors 2', fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop' }
    ]
  ];

  useGSAP(() => {
    const container = containerRef.current;
    const rowElements = rowsRef.current;
    const progressBar = progressBarRef.current;

    if (!container || rowElements.length === 0) return;

    // Set initial styles for the container
    gsap.set(container, {
      height: `${imageRows.length * 100}vh`,
      width: '100%',
      willChange: 'transform'
    });

    // Set initial styles for each row
    gsap.set(rowElements, {
      width: '100%',
      height: '150px',
      display: 'flex'
    });

    // Create the vertical scroll animation for all rows moving together
    const scrollTween = gsap.to(container, {
      yPercent: -((imageRows.length - 1) * 100) / imageRows.length * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.8, // Slightly faster for more responsive parallax
        snap: {
          snapTo: 1 / (imageRows.length - 1),
          duration: { min: 0.8, max: 1.5 },
          delay: 0.3,
          ease: 'power3.inOut'
        },
        end: () => `+=${(imageRows.length - 1) * window.innerHeight * 1.5}`,
        onUpdate: (self) => {
          // Update progress indicator
          const progress = self.progress;
          const newCurrentSlide = Math.round(progress * (imageRows.length - 1));
          
          if (progressBar) {
            gsap.to(progressBar, {
              scaleX: progress,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
          
          setCurrentSlide(newCurrentSlide);
          
          // Add column-based alternating movement effect
          rowElements.forEach((row, rowIndex) => {
            const images = row.querySelectorAll('.image-container');
            const distance = Math.abs(rowIndex - newCurrentSlide);
            const isActive = rowIndex === newCurrentSlide;
            
            images.forEach((img, imgIndex) => {
              // Column-based movement: 1st & 3rd columns move up, 2nd & 4th columns move down
              const columnNumber = imgIndex + 1; // 1, 2, 3, 4
              const scrollOffset = self.progress * 100; // 0 to 100 based on scroll progress
              
              // Alternating movement based on column position
              let parallaxY;
              if (columnNumber === 1 || columnNumber === 3) {
                // Columns 1 and 3 move up on scroll down
                parallaxY = -scrollOffset * 0.4;
              } else {
                // Columns 2 and 4 move down on scroll down
                parallaxY = scrollOffset * 0.4;
              }
              
              // Add slight stagger based on column position for more natural movement
              const staggerOffset = (columnNumber - 1) * 2;
              parallaxY += (columnNumber === 1 || columnNumber === 3) ? staggerOffset : -staggerOffset;
              
              // Subtle horizontal movement for enhanced parallax
              const parallaxX = (columnNumber === 1 || columnNumber === 3) 
                ? -scrollOffset * 0.05 
                : scrollOffset * 0.05;
              
              // Scale effect based on distance from active slide
              const scaleEffect = isActive ? 1 : Math.max(0.96, 1 - distance * 0.015);
              
              // Opacity effect
              const opacityEffect = isActive ? 1 : Math.max(0.75, 1 - distance * 0.12);
              
              // Subtle rotation for enhanced visual appeal
              const rotationAmount = (columnNumber === 1 || columnNumber === 3) 
                ? scrollOffset * 0.015 
                : -scrollOffset * 0.015;
              
              gsap.to(img, {
                y: parallaxY,
                x: parallaxX,
                opacity: opacityEffect,
                scale: scaleEffect,
                rotation: rotationAmount,
                duration: 1.0,
                ease: 'power2.out'
              });
            });
          });
        }
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      className="vertical-carousel-section relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Fixed UI Elements - Minimal Design */}
      <div className="fixed top-6 left-6 z-30 text-white">
        <h2 className="text-sm font-medium tracking-wide opacity-60">GALLERY</h2>
      </div>

      {/* Minimal Progress Indicator */}
      <div className="fixed top-6 right-6 z-30">
        <div className="flex items-center text-white text-xs font-mono space-x-2">
          <span className="opacity-60">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <div className="w-8 h-px bg-white/20">
            <div 
              ref={progressBarRef}
              className="progress-bar h-full bg-white origin-left transform scale-x-0"
            ></div>
          </div>
          <span className="opacity-40">
            {String(imageRows.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="carousel-wrapper flex flex-col w-full px-4 py-8"
      >
        {imageRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={el => rowsRef.current[rowIndex] = el}
            className="row relative w-full h-screen flex justify-center items-center gap-2"
          >
            {row.map((image, imgIndex) => (
              <div
                key={image.id}
                className="image-container relative w-56 h-56 overflow-hidden group cursor-pointer rounded-xl"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-105 rounded-xl"
                  style={{ 
                    backgroundImage: `url(${image.fallback})`,
                    filter: 'brightness(0.85) contrast(1.05) saturate(0.9)'
                  }}
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500 rounded-xl" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:border-white transition-colors duration-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-xs font-medium tracking-wider opacity-80">
                      {image.title.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Corner Number */}
                <div className="absolute top-3 left-3 text-white/40 text-xs font-mono">
                  {String(rowIndex * 4 + imgIndex + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-6 right-6 text-white/40 text-xs font-medium z-30">
        <div className="flex items-center space-x-2">
          <span className="tracking-wider">SCROLL</span>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;
