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

gsap.registerPlugin(ScrollTrigger, SplitText); 

const App = () => {

  

  return (
    <main>
      {/* You can use either the standalone carousel or integrate it with your existing layout */}
      
      {/* Option 1: Full carousel demo */}
      <CarouselDemo />
      
      {/* Option 2: Integrated with existing components (comment out CarouselDemo above and uncomment below) */}
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
