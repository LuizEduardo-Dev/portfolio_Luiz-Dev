'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export const ZoomExperience = () => {
  const container = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const whiteFillRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=500%", 
        pin: true,
        scrub: 1,
      }
    });

   
    tl.fromTo(maskRef.current, 
      { maskSize: "1500%", WebkitMaskSize: "1500%" }, 
      { maskSize: "100%", WebkitMaskSize: "100%", duration: 2, ease: "power2.inOut" }
    )

   
    .fromTo(whiteFillRef.current, 
      { yPercent: 100 }, 
      { yPercent: 0, duration: 1, ease: "power1.inOut" },
      "-=0.5" 
    )

  
    .to(contentRef.current, {
      scale: 0.4,
      y: "-35vh", 
      duration: 1.5,
      ease: "power2.inOut"
    })

   
    .fromTo(subTextRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );

  }, { scope: container });

  const maskStyles: React.CSSProperties = {
    maskImage: 'url("/logo-mask.svg")',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: 'url("/logo-mask.svg")',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
  };

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black grainy-bg">
      
      {/* Container que agrupa a Logo e o Preenchimento */}
      <div ref={contentRef} className="relative w-full h-full flex flex-col items-center justify-center">
        
        <div 
          ref={maskRef}
          className="relative w-full h-full flex items-center justify-center will-change-[mask-size, transform]"
          style={maskStyles}
        >
          
          <Image 
            src="/images/wallpaperflare.com_wallpaper (1).jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />


          <div 
            ref={whiteFillRef}
            className="absolute inset-0 bg-white z-20"
          />
        </div>
      </div>

     
      <div ref={subTextRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-20">
         <p className="text-white font-anton text-2xl md:text-4xl tracking-widest uppercase mt-40">
            Full Stack Developer
         </p>
         <p className="text-zinc-500 font-mono text-sm tracking-[0.5em] mt-4">
            DISPONÍVEL PARA PROJETOS • 2026
         </p>
      </div>

    </section>
  );
};