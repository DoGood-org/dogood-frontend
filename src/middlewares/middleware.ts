// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/account/:path*', '/:locale/account/:path*'],
};
function redirectToLogin(req: NextRequest): NextResponse {
  console.log('Redirecting to login from middleware');
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}
export function middleware(req: NextRequest): NextResponse | void {
  if (!req.cookies.get('accessToken')?.value) {
    return redirectToLogin(req);
  }
}
