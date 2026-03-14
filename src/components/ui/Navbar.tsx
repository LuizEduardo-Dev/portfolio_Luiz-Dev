'use client';

import { useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t, toggleLang } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { 
        clipPath: "circle(150% at 95% 5%)", 
        visibility: "visible", // Força a visibilidade
        duration: 0.8, 
        ease: "expo.inOut" 
      });
      gsap.fromTo(".menu-item", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.3, ease: "power4.out" }
      );
    } else {
      gsap.to(menuRef.current, { 
        clipPath: "circle(0% at 95% 5%)", 
        duration: 0.6, 
        ease: "expo.inOut",
        onComplete: () => {
           if (!isOpen) gsap.set(menuRef.current, { visibility: "hidden" });
        }
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Botão Hambúrguer - Z-index mais alto do site */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[999] p-4 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-xl text-white shadow-2xl"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay do Menu - Z-index abaixo apenas do botão */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[998] bg-zinc-950 flex items-center justify-center invisible overflow-hidden"
        style={{ clipPath: "circle(0% at 95% 5%)" }}
      >
        {/* Camada de Grid Tech no Menu para preencher o vazio */}
        <div className="absolute inset-0 tech-grid opacity-20" />

        <nav className="relative z-10 w-full flex flex-col items-center justify-center gap-8 md:gap-12">
          {Object.entries(t.nav).map(([key, value], i) => (
            <a 
              key={key} 
              href={`#${key}`}
              onClick={() => setIsOpen(false)}
              className="menu-item group flex items-center gap-6 text-5xl md:text-8xl font-anton uppercase italic text-white hover:text-orange-500 transition-all duration-300"
            >
              <span className="text-orange-500 font-mono text-lg not-italic opacity-40 group-hover:opacity-100">0{i + 1}</span>
              {value}
            </a>
          ))}

          <button 
            onClick={toggleLang}
            className="menu-item mt-10 flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-orange-500 hover:border-orange-500 transition-all"
          >
            <Globe size={14} />
            {lang === 'pt' ? "English Version" : "Versão Português"}
          </button>
        </nav>
      </div>
    </>
  );
};