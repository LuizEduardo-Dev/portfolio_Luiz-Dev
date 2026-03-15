'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  // Esse hook dá acesso à instância do Lenis
  useLenis(() => {
    // Sincroniza o ScrollTrigger a cada frame de scroll do Lenis
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Adiciona o Lenis no Ticker do GSAP para sincronizar o tempo das animações
    const update = () => {
      // O Lenis lida com seu próprio RAF, mas o GSAP precisa saber
      // para evitar o "jittering" (trepidação) que causa CLS
      ScrollTrigger.refresh();
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Importante: evita pulos quando o FPS oscila

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};