'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

export const About = () => {
  const container = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Dados da Timeline (Os textos reais vêm do LanguageContext)
  const timelineEvents = [
    { year: "2024", titleKey: "timeline24Title", descKey: "timeline24Desc" },
    { year: "2025", titleKey: "timeline25Title", descKey: "timeline25Desc" },
    { year: "2026", titleKey: "timeline26Title", descKey: "timeline26Desc" }
  ];

  useGSAP(() => {
    // 1. Anima a linha central "descendo" conforme o scroll
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // 2. Revela os itens da timeline um por um (Stagger)
    gsap.fromTo(".timeline-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%", // Começa quando a seção chega a 60% da tela
        }
      }
    );
  }, { scope: container });

  return (
    <section id="about" ref={container} className="relative min-h-screen w-full bg-zinc-950 py-32 px-6 md:px-20 overflow-hidden grainy-bg">
      
      {/* Título da Seção */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-orange-500 font-mono text-sm tracking-[0.5em] uppercase mb-4 opacity-70">
           {t.aboutSubtitle}
        </h2>
        <h3 className="text-white font-anton text-5xl md:text-7xl uppercase italic">
          {t.aboutTitle}
        </h3>
        <p className="text-zinc-400 mt-6 max-w-2xl font-inter text-lg leading-relaxed">
          {t.aboutBio}
        </p>
      </div>

      {/* Container da Timeline */}
      <div className="relative max-w-4xl mx-auto pl-4 md:pl-10">
        
        {/* A Linha Vertical (Fibra Ótica) */}
        <div className="absolute top-0 left-[15px] md:left-[39px] w-[2px] h-full bg-white/10 origin-top">
           {/* A linha laranja que "preenche" via GSAP */}
           <div ref={lineRef} className="w-full h-full bg-orange-500 origin-top shadow-[0_0_15px_#f97316]" />
        </div>

        {/* Itens da Timeline */}
        <div className="flex flex-col gap-12">
          {timelineEvents.map((item, index) => (
            <div key={index} className="timeline-item relative pl-10 md:pl-16 group cursor-pointer">
              
              {/* O Ponto (Dot) na linha */}
              <div className="absolute left-[-5px] md:left-[-1px] top-2 w-3 h-3 rounded-full bg-zinc-900 border-2 border-orange-500 group-hover:bg-orange-500 group-hover:shadow-[0_0_10px_#f97316] transition-all duration-300 z-10" />

              {/* Cabeçalho do Item (Ano e Título) */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-orange-500 font-mono text-xl md:text-2xl font-bold">
                  {item.year}
                </span>
                <h4 className="text-white text-xl md:text-2xl font-anton uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                  
                  {t[item.titleKey]}
                </h4>
              </div>

              {/*  O TRUQUE DE MESTRE: Descrição Expansível (Grid Transition) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                <div className="overflow-hidden">
                  <p className="text-zinc-400 font-inter mt-4 leading-relaxed max-w-2xl border-l border-white/10 pl-4 py-2">
                    
                    {t[item.descKey]}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};