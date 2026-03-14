'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { ScrollIndicator } from '../animations/ScrollIndicator';
import { TechGrid } from '../ui/TechGrid';

export const ZoomExperience = () => {
  const container = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const whiteFillRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  // Referências para a introdução
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // 1. Animação inicial de entrada (apenas para aparecer no Load)
    gsap.fromTo(introTextRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power4.out", delay: 0.2 }
    );

    // 1.5. Controle de Sumir/Aparecer via Scroll (Texto e Overlay)
    gsap.to(introTextRef.current, {
      opacity: 0,
      y: -50,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",      // Começou a scrollar
        end: "15% top",        // Sumiu rápido
        scrub: true,           // Segue o scroll (vai e volta)
      }
    });

    gsap.to(introOverlayRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "15% top",
        scrub: true,
      }
    });

    // 2. Animação de Scroll (O Zoom da Logo)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
      }
    });

    // 1. Zoom Out da Máscara (Revelando a logo através do Grid Tech)
    tl.fromTo(maskRef.current,
      { scale: 20, opacity: 0 }, // Começa gigantesco ("dentro" do grid) e invisível
      { scale: 1, opacity: 1, duration: 2, ease: "power2.inOut" }
    )
      // 2. O branco "preenche" os circuitos da Logo
      .fromTo(whiteFillRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "power1.inOut" },
        "-=0.5"
      )
      // 3. Compactação Final (Vira o Header no topo da página)
      .to(contentRef.current, {
        scale: 0.4,
        y: "-35vh",
        duration: 1.5,
        ease: "power2.inOut"
      })
      // 4. Revela os Textos Subliminares
      .fromTo(subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

  }, { scope: container });

  const maskStyles: React.CSSProperties = {
    maskImage: 'url("/logo-mask.svg")',
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: 'url("/logo-mask.svg")',
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
  };

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black grainy-bg">

      {/* TELA DE INTRODUÇÃO (UX FIX) */}
      <div 
  ref={introOverlayRef} 
  className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center pointer-events-none tech-grid"
>
  <div className="flex flex-col items-start gap-4 font-mono max-w-xs w-full">
    <div className="flex flex-col gap-1">
       <p ref={introTextRef} className="text-orange-500 text-xs md:text-sm tracking-tighter">
         <span className="opacity-50 mr-2">{'>'}</span>
         [SYSTEM]: INITIALIZING_CORE_V2.026...
       </p>
       <p className="text-white/30 text-[10px] uppercase">Status: Connected / Port: 3000</p>
    </div>

    {/* Barra de Carregamento Tech */}
    <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
        <div className="loading-bar absolute inset-0 bg-orange-500 -translate-x-full" />
    </div>
    
    <div className="flex justify-between w-full text-[8px] text-white/20 uppercase font-mono">
        <span>Loading Assets...</span>
        <span>85%</span>
    </div>
  </div>
</div>

      <ScrollIndicator />

      {/* Conteúdo Principal */}
      <div ref={contentRef} className="relative w-full h-full flex flex-col items-center justify-center">
        
        {/* A MÁGICA: A máscara agora "corta" o Grid Tecnológico */}
        <div
          ref={maskRef}
          className="relative w-[80vw] h-[40vh] flex items-center justify-center will-change-transform"
          style={maskStyles}
        >
          {/* Fundo Tech em vez da Imagem Estática */}
          <TechGrid />
          
          {/* Preenchimento Branco (vibe de sistema carregado final) */}
          <div ref={whiteFillRef} className="absolute inset-0 bg-white z-20" />
        </div>
      </div>

      {/* Subtextos que aparecem após o boot */}
      <div ref={subTextRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-20">
        <p className="text-white font-anton text-2xl md:text-4xl tracking-widest uppercase mt-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Architecting Digital Solutions
        </p>
        <p className="text-orange-500 font-mono text-[10px] tracking-[0.5em] mt-4 uppercase animate-pulse">
          System Online // 2026
        </p>
      </div>
    </section>
  );
};