'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import PROJECTS from '@/lib/constants';


export const ProjectCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

 useGSAP(() => {
    const totalWidth = sectionRef.current!.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = totalWidth - windowWidth;

    gsap.to(sectionRef.current, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: triggerRef });
  return (
    /* 1. Definimos uma altura mínima para o trigger para evitar o CLS */
    <section id="projects" ref={triggerRef} className="overflow-hidden bg-black min-h-screen">
      
      {/* 2. Container interno com flex-nowrap para garantir a linha única */}
      <div 
        ref={sectionRef} 
        className="flex h-screen items-center px-[5vw] w-fit will-change-transform"
      >
        {PROJECTS.map((project, i) => (
          <div 
            key={project.id} 
            className="project-card group relative shrink-0 w-[85vw] md:w-[45vw] h-[65vh] mx-6 rounded-[30px] 
                       bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl 
                       transition-[border-color,transform] duration-500 hover:border-white/20"
          >
            {/* Overlay de Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <div className="absolute inset-0 opacity-20 bg-repeat" />

            <div className="relative z-20 h-full p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4">
                    <span className="text-white/30 font-mono text-xl">{i + 1}</span>
                    <div className="h-px w-12 bg-white/20" />
                </div>
              <h3 className="text-white text-5xl md:text-7xl font-anton italic tracking-tighter uppercase">
                {project.title}
             </h3>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xs">
                  <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Tech Stack</p>
                  <p className="text-white font-medium text-lg uppercase">{project.desc}</p>
                </div>
                
                {/* Botão com correção de Skew (Un-skewing the text) */}
                <button className="px-8 py-4 bg-white text-black font-bold uppercase text-sm rounded-none -skew-x-12 hover:bg-orange-500 hover:text-white transition-colors duration-300">
                  <div className="skew-x-12">Explorar</div>
                </button>
              </div>
            </div>

            {/* Shine effect mais leve */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-shine pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};