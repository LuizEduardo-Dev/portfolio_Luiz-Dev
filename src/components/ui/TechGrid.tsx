'use client';

export const TechGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
      {/* Grid de fundo */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Linhas de "Scanner" que cruzam a tela */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-20 w-full animate-scan" />
      
      {/* Partículas sutis ou pontos de conexão */}
      <div className="absolute inset-0" 
           style={{ backgroundImage: 'radial-gradient(circle, #fb923c 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }} 
      />
    </div>
  );
};