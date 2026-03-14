'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
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
    timeline24Title: "Fundamentos & Lógica",
    timeline24Desc: "Ingressei na faculdade para cursar Análise e Desenvolvimento de Sistemas (ADS). Foco na consolidação de estruturas de dados, algoritmos e fundamentos da computação.",
    timeline25Title: "Imersão Full Stack",
    timeline25Desc: "Atuando como PJ e aprofundando conhecimentos no ecossistema Java (Spring Boot, Hibernate) no back-end, aliado a frameworks modernos como React, Next.js e Angular no front-end.",
    timeline26Title: "Arquitetura & Projetos Complexos",
    timeline26Desc: "Desenvolvimento de projetos robustos como o SaaS HelpDesk e arquiteturas modulares orientadas a servidor. Explorando mensageria com Kafka e conteinerização com Docker.",

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
    timeline24Title: "Fundamentals & Logic",
    timeline24Desc: "Started my degree in Systems Analysis and Development (ADS). Focused on consolidating data structures, algorithms, and computer science fundamentals.",
    timeline25Title: "Full Stack Immersion",
    timeline25Desc: "Working as a contractor (PJ) and deepening knowledge in the Java ecosystem (Spring Boot, Hibernate) on the backend, paired with modern frameworks like React, Next.js, and Angular on the frontend.",
    timeline26Title: "Architecture & Complex Projects",
    timeline26Desc: "Developing robust projects like a SaaS HelpDesk and server-driven modular architectures. Exploring message brokering with Kafka and containerization with Docker.",
  
  
  }
};

type Language = 'pt' | 'en';

interface LanguageContextType {
  lang: Language;
  t: typeof translations.pt;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('pt');

  const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  return context;
};