import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cocktails from './components/Cocktails'
import About from './components/About'
import HorizontalCarousel from './components/HorizontalCarousel'
import CarouselDemo from './components/CarouselDemo'
import TickerScroll from './components/TickerScroll'
import ImageTicker from './components/ImageTicker'

gsap.registerPlugin(ScrollTrigger, SplitText); 

const App = () => {

  

  return (
    <main>
      {/* You can choose between different design options */}
      
      {/* Option 1: Image Ticker with 4 rows (NEW) */}
      <ImageTicker />
      
      {/* Option 2: Text Ticker Scroll (comment out ImageTicker above and uncomment below) */}
      {/* <TickerScroll /> */}
      
      {/* Option 3: Original Carousel Demo (comment out above and uncomment below) */}
      {/* <CarouselDemo /> */}
      
      {/* Option 4: Integrated with existing components (comment out above and uncomment below) */}
      {/* 
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <HorizontalCarousel/>
      <About/>
      */}
    </main>
  )
}

export default App
