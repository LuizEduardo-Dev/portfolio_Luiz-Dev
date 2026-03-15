'use client'

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import PROJECTS from '@/lib/constants'

export const Projects = () => {

    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.project-card');
        const match = gsap.matchMedia();

        match.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            // A mágica: se for mobile, o scrub é quase instantâneo (0.2). No PC, é 1.
            const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };
            const scrubValue = isMobile ? 0.2 : 1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    pin: true,
                    scrub: scrubValue, // <-- Variável injetada aqui
                }
            });
            cards.forEach((card, index) => {
                if (index === 0) return;

                // Criado um sub-timeline para cada card que entra
                // para que possa mover os cards anteriores simultaneamente
                tl.to(cards.slice(0, index), {
                    // Move os cards anteriores para cima (ex: -20px, -40px...)
                    y: (i) => -25 * (index - i),
                    // Diminui levemente a escala dos anteriores
                    scale: (i) => 1 - (0.05 * (index - i)),
                    // Escurece um pouco os cards de trás para dar profundidade
                    filter: "brightness(0.6)",
                    duration: 1,
                    ease: "power2.out"
                }, `card-${index}`) // Label para sincronizar

                tl.from(card, {
                    yPercent: 100,
                    opacity: 0,
                    rotate: 5,
                    duration: 1,
                    ease: "power2.out"
                }, `card-${index}`); // Entra ao mesmo tempo que os outros sobem

                return () => { };
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative h-screen bg-black overflow-hidden px-4">
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter">
                    MEUS TRABALHOS
                </h2>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
                {PROJECTS.map((project, i) => (
                    <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className={`project-card absolute w-[85%] h-[65%] md:w-[70%] md:h-[70%]
             rounded-[40px] p-10 border border-white/5 
             flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.5)]
             will-change-transform ${project.color}`}
                        style={{ zIndex: i }}
                    >
                        {/* Adicione um overlay de brilho no topo para parecer metal/vidro */}
                        <div className="relative z-10">
                            <span className="text-zinc-500 font-mono text-base md:text-xl">/ 0{i + 1}</span>
                            <h3 className="text-white text-3xl md:text-7xl font-black mt-2 md:mt-4 leading-none">
                                {project.title}
                            </h3>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                            <p className="text-zinc-400 text-sm md:text-lg max-w-sm uppercase tracking-widest font-semibold line-clamp-3">
                                {project.desc}
                            </p>
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white transition-all duration-500" aria-hidden="true">
                                <span className="group-hover:text-black transition-colors text-sm md:text-base">→</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )

}