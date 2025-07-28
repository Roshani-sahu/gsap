import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const ImageTicker = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);

  // Image data for each row
  const imageRows = [
    // Row 1 - Portfolio/Design images
    [
      { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Abstract Art 1' },
      { id: 2, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', title: 'Modern Design 1' },
      { id: 3, src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop', title: 'Composition 1' },
      { id: 4, src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop', title: 'Urban Life 1' },
    //   { id: 5, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', title: 'Nature 1' },
    //   { id: 6, src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', title: 'Creative Vision 1' },
    //   { id: 7, src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop', title: 'Minimal Art 1' },
    //   { id: 8, src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', title: 'Bold Colors 1' }
    ],
    // Row 2 - Tech/Development images
    [
      { id: 9, src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=400&h=300&fit=crop', title: 'Technology 1' },
      { id: 10, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', title: 'Development 1' },
      { id: 11, src: 'https://images.unsplash.com/photo-1494790108755-2616c78bc495?w=400&h=300&fit=crop', title: 'Code 1' },
      { id: 12, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop', title: 'Innovation 1' },
    //   { id: 13, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop', title: 'Digital 1' },
    //   { id: 14, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop', title: 'Future 1' },
    //   { id: 15, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop', title: 'Tech Art 1' },
    //   { id: 16, src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop', title: 'Innovation 2' }
    ],
    // Row 3 - Creative/Art images
    [
      { id: 17, src: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=300&fit=crop', title: 'Creative 1' },
      { id: 18, src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop', title: 'Art 1' },
      { id: 19, src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', title: 'Design 1' },
      { id: 20, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', title: 'Visual 1' },
    //   { id: 21, src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop', title: 'Aesthetic 1' },
    //   { id: 22, src: 'https://images.unsplash.com/photo-1616627188540-2c5c7c927637?w=400&h=300&fit=crop', title: 'Modern 1' },
    //   { id: 23, src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop', title: 'Concept 1' },
    //   { id: 24, src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop', title: 'Abstract 2' }
    ],
    // Row 4 - Business/Professional images
    [
      { id: 25, src: 'https://images.unsplash.com/photo-1664447972779-316251bd8bd7?w=400&h=300&fit=crop', title: 'Business 1' },
      { id: 26, src: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=400&h=300&fit=crop', title: 'Professional 1' },
      { id: 27, src: 'https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?w=400&h=300&fit=crop', title: 'Corporate 1' },
      { id: 28, src: 'https://images.unsplash.com/photo-1676911809401-c2aca5ee0373?w=400&h=300&fit=crop', title: 'Strategy 1' },
    //   { id: 29, src: 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?w=400&h=300&fit=crop', title: 'Growth 1' },
    //   { id: 30, src: 'https://images.unsplash.com/photo-1693400646330-7b97b05bd45d?w=400&h=300&fit=crop', title: 'Success 1' },
    //   { id: 31, src: 'https://images.unsplash.com/photo-1698659448489-c761bae11d82?w=400&h=300&fit=crop', title: 'Vision 1' },
    //   { id: 32, src: 'https://images.unsplash.com/photo-1704638533012-3b3a5426be4b?w=400&h=300&fit=crop', title: 'Excellence 1' }
    ]
  ];

  useGSAP(() => {
    const container = containerRef.current;
    const rowRefs = [row1Ref.current, row2Ref.current, row3Ref.current, row4Ref.current];

    if (!container || rowRefs.some(ref => !ref)) return;

    // Create scroll-driven vertical ticker animations for each column
    rowRefs.forEach((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
      const multiplier = (index + 1) * 0.5; // Different speeds for each column
      
      gsap.to(row, {
        y: direction * window.innerHeight * 2, // Move up or down
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: multiplier, // Tied to scroll position
          invalidateOnRefresh: true
        }
      });
    });

    // Add individual image scroll effects
    rowRefs.forEach((row, rowIndex) => {
      const images = row.querySelectorAll('.ticker-image');
      images.forEach((img, imgIndex) => {
        const direction = rowIndex % 2 === 0 ? 1 : -1;
        const offset = imgIndex * 50; // Stagger effect
        
        gsap.to(img, {
          y: direction * (window.innerHeight * 0.3 + offset),
          rotation: direction * 2,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5 + (rowIndex * 0.2), // Different scrub values
          }
        });
      });
    });

    // Add hover effects for individual images
    rowRefs.forEach(row => {
      const images = row.querySelectorAll('.ticker-image');
      images.forEach(img => {
        img.addEventListener('mouseenter', () => {
          gsap.to(img, {
            scale: 1.05,
            z: 100,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        
        img.addEventListener('mouseleave', () => {
          gsap.to(img, {
            scale: 1,
            z: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderImageColumn = (images, ref, columnIndex) => (
    <div className="ticker-column h-full overflow-hidden relative">
      <div 
        ref={ref} 
        className="ticker-content flex flex-col gap-8 py-8"
      >
        {/* Duplicate images for seamless effect */}
        {[...images, ...images, ...images].map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="ticker-image relative flex-shrink-0 group cursor-pointer"
          >
            <div className="relative w-48 h-64 overflow-hidden rounded-3xl shadow-2xl transform-gpu">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl backdrop-blur-sm"></div>
              
              {/* Floating content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-lg font-bold mb-2 drop-shadow-lg">{image.title}</h4>
                  <p className="text-sm text-gray-200 opacity-80">Column {columnIndex + 1}</p>
                </div>
              </div>
              
              {/* Floating number badge */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-sm text-white font-bold border border-white/30">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{
                     background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                     animation: 'shimmer 2s infinite'
                   }}>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="image-ticker-container min-h-screen relative overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="text-center z-20">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none drop-shadow-2xl">
              SCROLL
            </h1>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none drop-shadow-2xl">
              DRIVEN
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 drop-shadow-lg">
              Experience vertical movement that responds to your scroll - no auto-play, just pure interaction
            </p>
            
            {/* Scroll indicator */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-1 h-16 bg-white/30 rounded-full overflow-hidden">
                <div className="w-full h-4 bg-white rounded-full animate-bounce"></div>
              </div>
              <div className="flex flex-col justify-center text-xs text-gray-300 ml-2">
                <span>SCROLL</span>
                <span>TO MOVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Ticker Columns */}
        <section className="min-h-[200vh] py-16 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-4 gap-8 h-full">
              {imageRows.map((column, columnIndex) => (
                <div key={columnIndex} className="relative">
                  {/* Column Label */}
                  <div className="sticky top-8 z-30 mb-8">
                    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <div className="text-sm font-mono text-gray-300 mb-2">
                        COL {String(columnIndex + 1).padStart(2, '0')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className={`w-2 h-2 rounded-full ${columnIndex % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                        {columnIndex % 2 === 0 ? 'SCROLL UP' : 'SCROLL DOWN'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Ticker Column */}
                  {renderImageColumn(column, 
                    columnIndex === 0 ? row1Ref : 
                    columnIndex === 1 ? row2Ref : 
                    columnIndex === 2 ? row3Ref : row4Ref, 
                    columnIndex
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-32 px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight drop-shadow-lg">
                PURE
                <br />
                INTERACTION
              </h3>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-12 drop-shadow-sm">
                No auto-animations here. Every movement is driven by your scroll position. 
                Watch as each column responds differently - some rise while others fall, 
                creating a dynamic dance of images that floats above the background.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-3">🎯 Scroll-Driven</h4>
                  <p className="text-gray-300 text-sm">Movement tied to scroll position for precise control</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-3">🌊 Floating Effect</h4>
                  <p className="text-gray-300 text-sm">Images appear to float above the background layer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ImageTicker;
