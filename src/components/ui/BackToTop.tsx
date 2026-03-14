'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export const BackToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    // O botão começa invisível e menor
    gsap.fromTo(buttonRef.current, 
      { autoAlpha: 0, scale: 0.5, y: 20 },
      {
        autoAlpha: 1, // Torna visível e clicável
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: document.body,
          start: "100vh top", // Dispara quando o topo da página sobe 100vh (1 tela)
          toggleActions: "play none none reverse", // Mostra ao descer, esconde ao voltar pro topo
        }
      }
    );
  });

  const handleScrollToTop = () => {
    if (lenis) {
      // O Lenis assume o controle e faz uma subida suave de 1.5 segundos
      lenis.scrollTo(0, { 
        duration: 1.5, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing tech/exponencial
      });
    } else {
      // Fallback de segurança caso o Lenis falhe
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleScrollToTop}
      className="fixed bottom-10 right-10 z-[200] p-4 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-full backdrop-blur-md hover:bg-orange-500 hover:text-black transition-all duration-300 group shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] invisible"
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};