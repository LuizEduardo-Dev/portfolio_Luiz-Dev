'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export const ScrollIndicator = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Animação de pulsação infinita
    gsap.to(".mouse-wheel", {
      y: 10,
      opacity: 0,
      repeat: -1,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Esconde o indicador quando o usuário começa a scrollar
    gsap.to(container.current, {
      opacity: 0,
      pointerEvents: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "200px top",
        scrub: true,
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <span className="text-[10px] font-anton uppercase tracking-[0.4em] text-white/40">Scroll</span>
      <div className="w-[20px] h-[35px] border-2 border-white/20 rounded-full relative">
        <div className="mouse-wheel w-1 h-2 bg-orange-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};