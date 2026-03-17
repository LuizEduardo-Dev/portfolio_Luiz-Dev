'use client';

import { useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLenis } from 'lenis/react';
import { translations } from '@/context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Guarda o destino do scroll sem causar re-renders
  const pendingScroll = useRef<string | null>(null);

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
          gsap.set(menuRef.current, { visibility: "hidden" });

          // Se houver um scroll pendente, dispara o Lenis exatamente após o fechamento
          if (pendingScroll.current && lenis) {
            lenis.scrollTo(`#${pendingScroll.current}`, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
            pendingScroll.current = null; // Limpa o estado
          }
        }
      });
    }
  }, [isOpen, lenis]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); // Impede o pulo brusco padrão do HTML
    pendingScroll.current = targetId; // Salva o destino
    setIsOpen(false);   // Fecha o menu
  };

  return (
    <>
      {/* Botão Hambúrguer - Z-index mais alto do site */}
      <button
        id='nav-toggle'
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[999] p-4 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-xl text-white shadow-2xl opacity-0 invisible"
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
          {(Object.keys(translations.pt.nav) as Array<keyof typeof translations.pt.nav>).map((key, i) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={(e) => handleNavClick(e, key)}
              className="menu-item group flex items-center gap-3 md:gap-6 text-[11vw] sm:text-5xl md:text-7xl lg:text-8xl font-anton uppercase italic text-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="text-orange-500 font-mono text-sm md:text-lg not-italic opacity-40 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </span>

              <span className="relative inline-grid overflow-hidden pb-2">
                {/* Texto em Português */}
                <span
                  className={`col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${lang === 'pt' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                >
                  {translations.pt.nav[key]}
                </span>

                {/* Texto em Inglês */}
                <span
                  className={`col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${lang === 'en' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                >
                  {translations.en.nav[key]}
                </span>
              </span>
            </a>
          ))}

          <button
            onClick={toggleLang}

            className="menu-item mt-8 md:mt-10 flex items-center justify-center gap-3 w-[260px] md:w-[280px] py-4 md:py-3 bg-white/5 border border-white/10 rounded-full text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] hover:bg-orange-500 hover:border-orange-500 transition-all active:scale-95"
          >
            <Globe size={16} className="shrink-0" />

            <div className="relative w-[180px] md:w-[200px] h-[16px] overflow-hidden flex items-center">

              <span
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${lang === 'pt' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                  }`}
              >
                English Version
              </span>

              <span
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${lang === 'en' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
              >
                Versão Português
              </span>

            </div>
          </button>
        </nav>
      </div>
    </>
  );
};