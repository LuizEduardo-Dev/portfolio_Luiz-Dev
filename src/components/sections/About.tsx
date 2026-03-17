'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

export const About = () => {
  const container = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
    <section id="about" ref={container} className="relative min-h-screen w-full bg-zinc-950 py-32 px-6 md:px-20 overflow-hidden">

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
          {t.timeline.map((item, index) => (
            <div key={index} className="timeline-item relative pl-10 md:pl-16 group cursor-pointer active:scale-[0.98] transition-transform md:active:scale-100">

              <div className="absolute left-[-5px] md:left-[-1px] top-2 w-3 h-3">

                <div className="absolute inset-0 rounded-full bg-zinc-900 border-2 border-orange-500 group-hover:bg-orange-500 transition-colors duration-300" />

                <div className="absolute inset-[-4px] rounded-full bg-orange-500 blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-orange-500 font-mono text-xl md:text-2xl font-bold">
                  {item.year}
                </span>
                <h4 className="text-white text-xl md:text-2xl font-anton uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h4>
              </div>


              <div className="max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 transition-all duration-500 ease-out will-change-[max-height,opacity] overflow-hidden">
                <p className="text-zinc-400 font-inter mt-4 leading-relaxed max-w-2xl border-l border-white/10 pl-4 py-2">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};