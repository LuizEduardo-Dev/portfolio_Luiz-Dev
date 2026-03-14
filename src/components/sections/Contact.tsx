'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';
import { Github, Linkedin, Mail, SquareTerminal, ArrowUpRight } from 'lucide-react';

export const Contact = () => {
  const container = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // Animação de entrada dos elementos
    gsap.fromTo(".contact-reveal", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: container });

  return (
    <section id="contact" ref={container} className="relative min-h-screen w-full bg-black py-32 px-6 md:px-20 flex flex-col justify-center overflow-hidden grainy-bg">
      
      {/* Elementos de Grid de Fundo */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Lado Esquerdo: Pitch e Texto */}
        <div className="flex flex-col items-start">
          <h2 className="contact-reveal text-orange-500 font-mono text-sm tracking-[0.5em] uppercase mb-4">
             03. {t.contactSubtitle}
          </h2>
          <h3 className="contact-reveal text-white font-anton text-6xl md:text-8xl uppercase italic leading-none mb-8">
            {t.contactTitle}
          </h3>
          <p className="contact-reveal text-zinc-400 font-inter text-lg leading-relaxed max-w-md mb-12">
            {t.contactDesc}
          </p>

          {/* O Botão Anti-Spam do WhatsApp */}
          <a 
            href="/api/whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-reveal group relative flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-black font-anton uppercase text-xl tracking-wider rounded-none overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Efeito de Scan/Brilho no Hover */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            
            <SquareTerminal size={24} className="relative z-10" />
            <span className="relative z-10">{t.btnWhatsapp}</span>
          </a>
        </div>

        {/* Lado Direito: Links Profissionais */}
        <div className="flex flex-col gap-6 w-full border-l border-white/10 pl-0 md:pl-20 py-10">
          
          <SocialLink 
            href="mailto:seuemail@gmail.com" 
            icon={<Mail size={28} />} 
            label={t.btnEmail} 
            address="luizeduardo252017@gmail.com" 
          />
          <SocialLink 
            href="https://linkedin.com/in/luiz-eduardo01" 
            icon={<Linkedin size={28} />} 
            label="LinkedIn" 
            address="/in/luiz-eduardo01" 
          />
          <SocialLink 
            href="https://github.com/LuizEduardo-Dev" 
            icon={<Github size={28} />} 
            label="GitHub" 
            address="/LuizEduardo-Dev" 
          />

        </div>
      </div>

      {/* Footer Minimalista */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full">
         <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.3em]">
            © 2026 LUIZ EDUARDO. SYSTEM SECURED.
         </p>
      </div>
    </section>
  );
};

// Sub-componente para manter os links sociais limpos e padronizados
const SocialLink = ({ href, icon, label, address }: { href: string, icon: React.ReactNode, label: string, address: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="contact-reveal group flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
  >
    <div className="flex items-center gap-6">
      <div className="text-zinc-500 group-hover:text-orange-500 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-anton uppercase text-xl tracking-wider">{label}</span>
        <span className="text-zinc-500 font-mono text-xs mt-1">{address}</span>
      </div>
    </div>
    <ArrowUpRight size={24} className="text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
  </a>
);