import { NextResponse } from 'next/server';

export async function GET() {
  // Lê a variável de ambiente diretamente do servidor Node.js
  const phoneNumber = process.env.WHATSAPP_NUMBER;
  
  // Mensagem padrão (pode ser genérica aqui, já que não temos o i18n no backend de forma fácil)
  const message = encodeURIComponent("Olá Luiz! Vi seu portfólio e gostaria de conversar.");

  if (!phoneNumber) {
    return NextResponse.json({ error: "Número não configurado" }, { status: 500 });
  }

  // Faz um redirecionamento 307 (Temporary Redirect) para a URL real
  return NextResponse.redirect(`https://wa.me/${phoneNumber}?text=${message}`);
}