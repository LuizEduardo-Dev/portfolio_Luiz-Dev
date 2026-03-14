'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { ScrollIndicator } from '../animations/ScrollIndicator';
import { TechGrid } from '../ui/TechGrid';
import { useLanguage } from '@/context/LanguageContext';
import { useLenis } from 'lenis/react';

export const ZoomExperience = () => {
  const container = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const whiteFillRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  const { t } = useLanguage();
  const lenis = useLenis();
  
  //  ESTADO PARA CONTROLAR O SCROLL
  const [isBooting, setIsBooting] = useState(true);

  //  FIX 1: O React controla o Scroll Restoration e o Lenis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Trava o Lenis se estiver no Boot, destrava quando acabar
    if (isBooting && lenis) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else if (!isBooting && lenis) {
      lenis.start();
      document.body.style.overflow = '';
    }
  }, [isBooting, lenis]);

  //  FIX 2: O GSAP roda APENAS UMA VEZ (sem dependências)
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. TELA DE BOOT
    const bootTl = gsap.timeline({
      onComplete: () => {
        setIsBooting(false); // Avisa o React que o Boot acabou (destrava o scroll)
        if (introOverlayRef.current) introOverlayRef.current.style.display = 'none';
      }
    });

    const counter = { val: 0 };

    bootTl.fromTo(introTextRef.current,
      { autoAlpha: 0, filter: "blur(10px)", y: 20 },
      { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 1 }
    )
    .to(counter, {
      val: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentRef.current) percentRef.current.innerText = `${Math.floor(counter.val)}%`;
      }
    }, "<")
    .to(".loading-bar", {
      x: "0%", 
      duration: 3.5, 
      ease: "power2.inOut"
    }, "<")
    .to(introOverlayRef.current, {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut"
    });

    // 2. TIMELINE DE SCROLL
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
        }
      });

      scrollTl.to(contentRef.current, { 
        autoAlpha: 1, 
        duration: 0.5 
      })
      .fromTo(maskRef.current,
        { scale: isMobile ? 10 : 25, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power2.inOut" }
      )
      .fromTo(whiteFillRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "power1.inOut" },
        "-=0.5"
      )
      .to(contentRef.current, {
        scale: isMobile ? 0.5 : 0.35,
        y: isMobile ? "-40vh" : "-38vh",
        duration: 1.5,
        ease: "power3.inOut"
      })
      .to(subTextRef.current, {
        autoAlpha: 1, 
        y: 0,
        duration: 2 
      }, "+=0.5");

      return () => {};
    });

  }, { scope: container }); // Removemos a dependência do Lenis daqui!

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black grainy-bg">

      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center tech-grid"
      >
        <div className="flex flex-col items-start gap-4 font-mono max-w-xs w-full">
          <div className="flex flex-col gap-1">
            <p ref={introTextRef} className="text-orange-500 text-xs md:text-sm tracking-tighter opacity-0 invisible">
              <span className="opacity-50 mr-2">{'>'}</span>
              {t.systemBoot}
            </p>
            <p className="text-white/30 text-[10px] uppercase">{t.systemStatus}</p>
          </div>

          <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
            <div className="loading-bar absolute inset-0 bg-orange-500 -translate-x-full" />
          </div>

          <div className="flex justify-between w-full text-[8px] text-white/20 uppercase font-mono">
            <span>{t.loading}</span>
            <span ref={percentRef}>0%</span>
          </div>
        </div>
      </div>

      <ScrollIndicator />

      <div
        ref={contentRef}
        className="relative w-full h-full flex items-center justify-center opacity-0 invisible will-change-transform"
      >
        <div
          ref={maskRef}
          className="relative w-[80vw] h-[40vh] flex items-center justify-center will-change-transform"
          style={{
            maskImage: 'url("/logo-mask.svg")',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: 'url("/logo-mask.svg")',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        >
          <TechGrid />
          <div ref={whiteFillRef} className="absolute inset-0 bg-white z-20" />
        </div>
      </div>

      <div ref={subTextRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-20 opacity-0 invisible">
        <p className="text-white font-anton text-2xl md:text-4xl tracking-widest uppercase mt-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {t.heroSubtitle}
        </p>
        <p className="text-orange-500 font-mono text-[10px] tracking-[0.5em] mt-4 uppercase animate-pulse">
          {t.systemOnline}
        </p>
      </div>
    </section>
  );
};