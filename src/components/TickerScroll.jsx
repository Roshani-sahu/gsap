import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const TickerScroll = () => {
  const containerRef = useRef(null);
  const ticker1Ref = useRef(null);
  const ticker2Ref = useRef(null);
  const ticker3Ref = useRef(null);

  // Sample data for ticker content
  const tickerItems1 = [
    "CREATIVE DESIGN", "MODERN SOLUTIONS", "INNOVATIVE IDEAS", "DIGITAL EXPERIENCE",
    "BRAND IDENTITY", "USER INTERFACE", "VISUAL STORYTELLING", "CREATIVE DESIGN"
  ];

  const tickerItems2 = [
    "DEVELOPMENT", "ANIMATION", "INTERACTION", "RESPONSIVE DESIGN",
    "PERFORMANCE", "OPTIMIZATION", "USER EXPERIENCE", "DEVELOPMENT"
  ];

  const tickerItems3 = [
    "PORTFOLIO", "SHOWCASE", "PROJECTS", "CASE STUDIES",
    "TESTIMONIALS", "ACHIEVEMENTS", "AWARDS", "PORTFOLIO"
  ];

  useGSAP(() => {
    const container = containerRef.current;
    const ticker1 = ticker1Ref.current;
    const ticker2 = ticker2Ref.current;
    const ticker3 = ticker3Ref.current;

    if (!container || !ticker1 || !ticker2 || !ticker3) return;

    // Create infinite vertical scroll animations
    const createVerticalTickerAnimation = (element, direction = 1, speed = 1) => {
      const tickerHeight = element.scrollHeight;
      
      return gsap.to(element, {
        y: direction > 0 ? -tickerHeight / 2 : tickerHeight / 2,
        duration: speed * 15,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize(y => parseFloat(y) % (tickerHeight / 2))
        }
      });
    };

    // Create ticker animations with different speeds and directions
    const ticker1Animation = createVerticalTickerAnimation(ticker1, 1, 1);
    const ticker2Animation = createVerticalTickerAnimation(ticker2, -1, 1.2);
    const ticker3Animation = createVerticalTickerAnimation(ticker3, 1, 0.8);

    // Add scroll-triggered speed variations
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        const speedMultiplier = 1 + progress * 1.5; // Speed up as you scroll
        
        gsap.to([ticker1Animation, ticker2Animation, ticker3Animation], {
          timeScale: speedMultiplier,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderTickerItems = (items, ref) => (
    <div ref={ref} className="ticker-content flex flex-col items-center">
      {/* Duplicate items for seamless loop */}
      {[...items, ...items].map((item, index) => (
        <div
          key={index}
          className="ticker-item flex flex-col items-center py-8"
        >
          <span className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-center">
            {item}
          </span>
          <div className="w-4 h-4 bg-white rounded-full my-8 flex-shrink-0"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="ticker-scroll-container min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
            CREATIVE
          </h1>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            STUDIO
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            We craft digital experiences that push boundaries and inspire innovation
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm tracking-wider mb-4">SCROLL</span>
            <div className="w-px h-16 bg-gray-600 relative">
              <div className="w-px h-4 bg-white absolute top-0 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Ticker Section 1 */}
      <section className="ticker-section h-96 overflow-hidden flex">
        <div className="ticker-wrapper relative w-1/3 flex justify-center">
          {renderTickerItems(tickerItems1, ticker1Ref)}
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-black mb-4">DESIGN</h3>
            <p className="text-gray-400 max-w-xs">Creating visual experiences that captivate and inspire</p>
          </div>
        </div>
        <div className="ticker-wrapper relative w-1/3 flex justify-center">
          {renderTickerItems(tickerItems2, ticker2Ref)}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                DESIGN
                <br />
                MEETS
                <br />
                FUNCTION
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                We believe in creating experiences that are not only visually stunning 
                but also highly functional and user-centric.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our approach combines cutting-edge design principles with innovative 
                technology to deliver solutions that make a lasting impact.
              </p>
              <button className="inline-flex items-center px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 mt-8">
                <span className="mr-2">VIEW WORK</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Ticker Section 2 */}
      <section className="ticker-section h-96 overflow-hidden flex">
        <div className="w-1/3 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-black mb-4">DEVELOP</h3>
            <p className="text-gray-400 max-w-xs">Building robust solutions with cutting-edge technology</p>
          </div>
        </div>
        <div className="ticker-wrapper relative w-1/3 flex justify-center">
          {renderTickerItems(tickerItems2, ticker2Ref)}
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-black mb-4">DELIVER</h3>
            <p className="text-gray-400 max-w-xs">Executing projects with precision and excellence</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black mb-16 text-center">
            SERVICES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "BRANDING", desc: "Complete brand identity and visual systems" },
              { title: "WEB DESIGN", desc: "Modern, responsive website design" },
              { title: "DEVELOPMENT", desc: "Custom web and mobile applications" },
              { title: "ANIMATION", desc: "Motion graphics and interactive animations" },
              { title: "STRATEGY", desc: "Digital strategy and user experience" },
              { title: "CONSULTING", desc: "Technical consulting and optimization" }
            ].map((service, index) => (
              <div key={index} className="group p-8 border border-gray-800 hover:border-white transition-all duration-300">
                <h4 className="text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Ticker Section 3 */}
      <section className="ticker-section h-96 overflow-hidden flex">
        <div className="ticker-wrapper relative w-1/2 flex justify-center">
          {renderTickerItems(tickerItems3, ticker3Ref)}
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-black mb-6">
              SHOWCASE
            </h3>
            <p className="text-lg text-gray-400 max-w-md">
              Explore our portfolio of successful projects and creative solutions
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            LET'S
            <br />
            WORK
            <br />
            TOGETHER
          </h3>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's create something extraordinary together.
          </p>
          <button className="inline-flex items-center px-12 py-6 bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all duration-300">
            <span className="mr-3">GET IN TOUCH</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">STUDIO</h4>
              <p className="text-gray-400">
                Creating digital experiences that inspire and engage.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">CONTACT</h4>
              <p className="text-gray-400 mb-2">hello@studio.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">FOLLOW</h4>
              <div className="flex space-x-4">
                {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TickerScroll;
