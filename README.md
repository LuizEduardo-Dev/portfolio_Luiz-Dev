# ⚡ Luiz Eduardo | Interactive Portfolio V2.026

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)

Um portfólio interativo e de alta performance construído com o ecossistema moderno do React. O foco deste projeto é unir engenharia de software robusta (Server-Side Rendering, Route Handlers) com uma experiência de usuário premium, utilizando animações imersivas e arquitetura escalável.

## 🎯 Destaques do Projeto

* **Animações de Alta Performance:** Utilização de `GSAP` e `Lenis` para Virtual Scroll e animações sincronizadas com a rolagem (ScrollTrigger), operando a 60 FPS com manipulação direta no DOM.
* **Zero FOUC (Flash of Unstyled Content):** Lógica arquitetada para evitar transições bruscas durante o carregamento do CSS e execução do JavaScript inicial.
* **i18n Nativo (Context API):** Sistema de internacionalização (PT/EN) construído do zero utilizando React Context, permitindo troca de idioma em tempo real sem recarregamento da página.
* **Segurança & Anti-Spam:** Proteção de dados sensíveis (PII). O link de contato do WhatsApp é protegido por um *Next.js Route Handler* (API dinâmica), ocultando o número do cliente de bots de *web scraping*.
* **Componentes Procedurais:** Fundo animado (Cyber Waves/Tech Grid) gerado via código (CSS/Canvas) substituindo assets pesados de imagem, reduzindo o *Largest Contentful Paint (LCP)* para perto de zero.

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS + Aceternity UI
* **Animações:** GSAP (ScrollTrigger, MatchMedia) + React Lenis (Smooth Scroll)
* **Ícones:** Lucide React

## ⚙️ Arquitetura e Decisões Técnicas

1.  **Event-Driven UI:** O fluxo de navegação (como o fechamento do menu acionando o scroll) é manipulado deterministicamente através do evento `onComplete` do GSAP associado a `useRefs`, evitando vazamentos de memória e *code smells* como `setTimeout`.
2.  **Server vs Client Components:** Divisão clara entre componentes interativos (`"use client"`) e rotas otimizadas estaticamente (`"use server"`), maximizando a entrega CDN da Vercel.

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório
```
git clone [https://github.com/SeuUsuario/myportfolio.git](https://github.com/SeuUsuario/myportfolio.git)
cd myportfolio
```

### 2. Instale as dependências
```
npm install
```

### 3. Configuração de Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto e adicione a seguinte variável (necessária para a API de redirecionamento do WhatsApp funcionar):

Code snippet
`WHATSAPP_NUMBER=5511999999999`

### 4. Execute o servidor de desenvolvimento
````Bash
npm run dev
````

### 5. Entrando no Portfólio  
Acesse `http://localhost:3000` no seu navegador para ver o resultado.

---
Architecting Digital Solutions — Desenvolvido por Luiz Eduardo.
