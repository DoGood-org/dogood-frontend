// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Pick what you want to protect:
export const config = {
  matcher: ['/account/:path*'],
};

export function middleware(req: NextRequest) {
  const access = req.cookies.get('accessToken')?.value;
  

  if (!access) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    // keep original target so we can bounce back after login
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
