import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Substitua pelo seu método real de ler o token de autenticação (ex: cookies)
  const token = request.cookies.get('auth_token')?.value;

  console.log("Token:", token);

  // Se o usuário não tiver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se estiver autenticado, permite continuar para a rota desejada
  return NextResponse.next();
}

// Configuração das rotas que serão interceptadas por este middleware
export const config = {
  matcher: [
    '/veiculos/:path*',
    '/tipoVeiculos/:path*'
  ],
}