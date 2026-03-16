'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import PROJECTS from '@/lib/constants';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export const ProjectCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useGSAP(() => {

    const match = gsap.matchMedia();
    
    //  ANIMAÇÃO PARA DESKTOP (Scroll Horizontal)
    match.add("(min-width: 768px)", () => {
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
    });

    //  ANIMAÇÃO PARA MOBILE (Fade In Vertical Clássico)
    match.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // O card anima quando atinge 85% da tela de baixo para cima
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    });

  }, { scope: triggerRef });

  return (
    <section id="projects" ref={triggerRef} className="relative overflow-hidden bg-black md:min-h-screen pt-24 md:pt-0">
      
      {/* TÍTULO MOBILE (Só aparece no celular para introduzir a seção) */}
      <div className="md:hidden px-6 mb-10">
         <h2 className="text-orange-500 font-mono text-sm tracking-[0.5em] uppercase mb-4 opacity-70">
             {lang === 'pt' ? 'Portfólio' : 'Portfolio'}
         </h2>
         <h3 className="text-white font-anton text-5xl uppercase italic">
            {lang === 'pt' ? 'Meus Trabalhos' : 'My Work'}
         </h3>
      </div>

      <div 
        ref={sectionRef} 
        //  O SEGREDO DO CSS: No mobile é flex-col (vertical), no md é flex-row (horizontal)
        className="flex flex-col md:flex-row md:h-screen items-center md:px-[5vw] w-full md:w-fit gap-10 md:gap-0 px-4 pb-20 md:pb-0 will-change-transform"
      >
        {PROJECTS.map((project, i) => (
          <div 
            key={project.id} 
            // AJUSTE DE LARGURA: w-full no celular, w-[45vw] no desktop
            className="project-card group relative shrink-0 w-full h-[60vh] md:w-[45vw] md:h-[65vh] md:mx-6 rounded-[30px] bg-zinc-950 border border-white/5 overflow-hidden shadow-2xl transition-[border-color,transform] duration-500 hover:border-white/20"
          >
            {/* FUNDO CONDICIONAL */}
            {project.image && !project.comingSoon ? (
               <Image
                 src={project.image}
                 alt={`Interface do projeto ${project.title}`}
                 fill
                 className="object-cover object-center opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                 quality={90}
               />
             ) : (
               <div className="absolute inset-0 tech-grid opacity-20" />
             )}

            {/* Overlay de Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

            <div className="relative z-20 h-full p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <span className="text-white/30 font-mono text-xl">0{i + 1}</span>
                      <div className="h-px w-8 md:w-12 bg-white/20" />
                  </div>
                  
                  {project.comingSoon && (
                    <span className="px-4 py-1 border border-orange-500/50 text-orange-500 text-[10px] md:text-xs font-mono uppercase tracking-widest rounded-full bg-orange-500/10 backdrop-blur-md animate-pulse">
                      {lang === 'pt' ? 'Em Breve' : 'Coming Soon'}
                    </span>
                  )}
                </div>
                
                <h3 className="text-white text-5xl md:text-7xl font-anton italic tracking-tighter uppercase mt-6 drop-shadow-lg">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="max-w-xs">
                  <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Tech Stack</p>
                  <p className="text-white font-medium text-base md:text-lg uppercase line-clamp-2">{project.desc}</p>
                </div>
                
                {/*  ACESSIBILIDADE MOBILE: Botões w-full no celular para facilitar o clique */}
                {!project.comingSoon ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black font-bold uppercase text-sm rounded-none -skew-x-12 hover:bg-orange-500 hover:text-white transition-colors duration-300 inline-block w-full md:w-auto text-center"
                  >
                    <div className="skew-x-12">Explorar</div>
                  </a>
                ) : (
                  <div className="px-6 py-4 bg-white/5 border border-white/10 text-white/30 font-bold uppercase text-xs md:text-sm rounded-none -skew-x-12 cursor-not-allowed inline-block backdrop-blur-md w-full md:w-auto text-center">
                    <div className="skew-x-12 flex items-center justify-center gap-2">
                      <span>🔒</span> 
                      {lang === 'pt' ? 'Bloqueado' : 'Locked'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-shine pointer-events-none z-30" />
          </div>
        ))}
      </div>
    </section>
  );
};