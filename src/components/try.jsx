import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText); 

const App = () => {

  useGSAP(() =>{
    // gsap.to('#box', {
    //   x:250,
    //   duration:1,
    //   repeat: -1,
    //   yoyo: true,
    //   rotation:360,
    // })
    gsap.from('#box2', {
      x:250,
      duration:1,
      repeat: -1,
      yoyo: true,
      // rotation:360,
    })
}, []);

  return (
    <main>

      <h1 className='flex-center'>hi</h1>
       {/* <div className='mt-20 g-10 flex-center'>
<div id='box'  className='w-20 h-20 bg-blue-500 rounded-lg'></div>
<div id='box2' className='w-20 h-20 bg-blue-500 rounded-lg'></div>
      </div> */}


    </main>
  )
}

export default App
