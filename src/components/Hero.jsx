import gsap from  'gsap';
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

function Hero() {

useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' })
    const paraSplit = new SplitText('.subtitle', { type: 'lines' })

    // Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});

    gsap.from(paraSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});

}, []);           //[] = it will run on the start



  return (
    <section id='hero' className='noisy'>
      <h1 className='title font-guy' >MOJITo</h1>
       <img className='left-leaf' src="/images/hero-left-leaf.png" alt="leaf" />
       <img className='right-leaf' src="/images/hero-right-leaf.png" alt="leaf" />


<div className='body'>
<div className='content'>
    <div className='space-y-5 hidden md:block'>
     <p>Cool. Crisp. Classic.</p>
			 <p className="subtitle">
				Sip the Spirit <br /> of Summer
			 </p>
    </div>


    <div className='view-cocktails'>
       <p className="subtitle">
				Every cocktail on our menu is a blend of premium ingredients,
				creative flair, and timeless recipes — designed to delight your
				senses.
			 </p>
			 <a href="#cocktails">View cocktails</a>
    </div>
</div>
</div>

    </section>
  )
}

export default Hero
