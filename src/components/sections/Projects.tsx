'use client'

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import PROJECTS from '@/lib/constants'

export const Projects = () => {

    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.project-card');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",      // Começa quando o topo da seção encosta no topo da tela
                end: `+=${cards.length * 100}%`, // Duração baseada no número de cards
                pin: true,             // "Trava" a seção na tela
                scrub: 1,              // Suavidade no movimento (1s de atraso para o efeito premium)
                // markers: true,      //guias de debug
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
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative h-screen bg-black overflow-hidden px-4">
            <div className="absolute top-10 left-10 z-50">
                <h2 className="text-white text-5xl font-bold tracking-tighter">MEUS TRABALHOS</h2>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
                {PROJECTS.map((project, i) => (
                    <div
                        key={i}
                        className={`project-card absolute w-[85%] h-[65%] md:w-[70%] md:h-[70%] 
             rounded-[40px] p-10 border border-white/5 
             flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.5)] 
             ${project.color}`}
                        style={{ zIndex: i }}
                    >
                        {/* Adicione um overlay de brilho no topo para parecer metal/vidro */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none rounded-[40px]" />

                        <div className="relative z-10">
                            <span className="text-zinc-500 font-mono text-xl">/ 0{i + 1}</span>
                            <h3 className="text-white text-5xl md:text-7xl font-black mt-4 leading-none">{project.title}</h3>
                        </div>

                        <div className="relative z-10 flex justify-between items-end">
                            <p className="text-zinc-400 text-lg max-w-sm uppercase tracking-widest font-semibold">{project.desc}</p>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white transition-all duration-500">
                                <span className="group-hover:text-black transition-colors">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}