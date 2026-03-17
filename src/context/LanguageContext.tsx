'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  pt: {
    systemBoot: "[SISTEMA]: INICIALIZANDO_NÚCLEO_V2.026...",
    systemStatus: "Status: Conectado / Porta: 3000",
    loading: "Carregando Ativos...",
    heroSubtitle: "Arquitetando Soluções Digitais",
    systemOnline: "Sistema Online // 2026",
    nav: { projects: "Projetos", about: "Sobre", contact: "Contato" },

    // ABOUT SECTION
    aboutSubtitle: "02. ORIGEM_DO_SISTEMA",
    aboutTitle: "Arquitetura & Evolução",
    aboutBio: "Desenvolvedor Full Stack apaixonado por resolver problemas complexos com código limpo. Foco na criação de sistemas escaláveis e interfaces de alta performance que conectam criatividade com engenharia.",
    timeline: [
      { year: "2026", title: "Arquitetura & Projetos Complexos", desc: "Desenvolvimento de projetos robustos como o SaaS HelpDesk e arquiteturas modulares orientadas a servidor. Explorando mensageria com Kafka e conteinerização com Docker." },
      { year: "2025", title: "Imersão Full Stack", desc: "Atuando como PJ e aprofundando conhecimentos no ecossistema Java (Spring Boot, Hibernate) no back-end, aliado a frameworks modernos como React, Next.js e Angular no front-end." },
      { year: "2024", title: "Fundamentos & Lógica", desc: "Ingressei na faculdade para cursar Análise e Desenvolvimento de Sistemas (ADS). Foco na consolidação de estruturas de dados, algoritmos e fundamentos da computação." },
      { year: "2023", title: "Fundamentos Web", desc: "Aprofundamento em desenvolvimento Front-end estrutural. Domínio de HTML, CSS e JavaScript puro para a construção das primeiras interfaces estáticas." },
      { year: "2022", title: "Primeiro Contato", desc: "O início da jornada. Primeiros contatos com lógica de programação e fundamentos de algoritmos." }
    ],

    // CONTACT SECTION
    contactSubtitle: "SYSTEM_CONNECT",
    contactTitle: "Vamos Construir Algo?",
    contactDesc: "Tem uma ideia inovadora, uma oportunidade de projeto ou precisa escalar seu sistema? Meu terminal está aberto para novas conexões.",
    btnWhatsapp: "Iniciar Conexão Direta",
    waMessage: "Olá Luiz! Vi seu portfólio e gostaria de conversar sobre uma oportunidade/projeto.",
    btnEmail: "E-mail",


  },
  en: {
    systemBoot: "[SYSTEM]: INITIALIZING_CORE_V2.026...",
    systemStatus: "Status: Connected / Port: 3000",
    loading: "Loading Assets...",
    heroSubtitle: "Architecting Digital Solutions",
    systemOnline: "System Online // 2026",
    nav: { projects: "Projects", about: "About", contact: "Contact" },

    // ABOUT SECTION
    aboutSubtitle: "02. SYSTEM_ORIGIN",
    aboutTitle: "Architecture & Evolution",
    aboutBio: "Full Stack Developer passionate about solving complex problems with clean code. Focused on creating scalable systems and high-performance interfaces that bridge creativity and engineering.",
    timeline: [
      { year: "2026", title: "Architecture & Complex Projects", desc: "Developing robust projects like a SaaS HelpDesk and server-driven modular architectures. Exploring message brokering with Kafka and containerization with Docker." },
      { year: "2025", title: "Full Stack Immersion", desc: "Working as a contractor (PJ) and deepening knowledge in the Java ecosystem (Spring Boot, Hibernate) on the backend, paired with modern frameworks like React, Next.js, and Angular on the frontend." },
      { year: "2024", title: "Fundamentals & Logic", desc: "Started my degree in Systems Analysis and Development (ADS). Focused on consolidating data structures, algorithms, and computer science fundamentals." },
      { year: "2023", title: "Web Fundamentals", desc: "Deep dive into structural Front-end development. Mastering HTML, CSS, and vanilla JavaScript to build early static interfaces." },
      { year: "2022", title: "First Contact", desc: "The beginning of the journey. First interactions with programming logic and core algorithm fundamentals." }
    ],
    // CONTACT SECTION
    contactSubtitle: "SYSTEM_CONNECT",
    contactTitle: "Let's Build Something?",
    contactDesc: "Have an innovative idea, a project opportunity, or need to scale your system? My terminal is open for new connections.",
    btnWhatsapp: "Initialize Direct Link",
    waMessage: "Hi Luiz! I saw your portfolio and would like to chat about an opportunity/project.",
    btnEmail: "E-mail",

  }
};

type Language = 'pt' | 'en';

interface LanguageContextType {
  lang: Language;
  t: typeof translations.pt;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('pt');

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 1. O site carregou. Vamos olhar o Local Storage primeiro.
    const storedLang = localStorage.getItem('portfolio_lang') as Language;

    if (storedLang && (storedLang === 'pt' || storedLang === 'en')) {
      // Se o usuário já escolheu antes, respeitamos a escolha dele
      setLang(storedLang);
    } else {
      // 2. Se é a primeira vez, olhamos o idioma do navegador
      const browserLang = navigator.language.toLowerCase();
      // Se o navegador estiver em inglês (en-US, en-GB, etc), mudamos para 'en'
      if (browserLang.startsWith('en')) {
        setLang('en');
        localStorage.setItem('portfolio_lang', 'en'); // Já salva a decisão
      } else {
        localStorage.setItem('portfolio_lang', 'pt'); // Salva PT como default
      }
    }

    // Libera a renderização do site agora que sabemos a língua certa
    setIsMounted(true);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === 'pt' ? 'en' : 'pt';
      localStorage.setItem('portfolio_lang', newLang);
      return newLang;
    });
  };

  const t = translations[lang];

  // Enquanto não descobre a língua (fração de segundo), mostra uma tela preta 
  // que se mistura perfeitamente com o começo do seu Boot System.
  if (!isMounted) {
    return <div className="min-h-screen w-full bg-black" />;
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};