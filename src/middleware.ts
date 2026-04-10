// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'de'],
//   defaultLocale: 'en',
//   localePrefix: 'as-needed',
//   // Add this to prevent redirect loops
//   alternateLinks: false,
// });

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
// };
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { proxy } from './proxy';

const intlMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  alternateLinks: false,
});

const publicPages = ['/login', '/register', '/'];

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/proxy/')) {
    return await proxy(req);
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPublicPage = publicPages.some(
    (page) =>
      pathname === page ||
      pathname.startsWith(`/${page}/`) ||
      pathname.match(/^\/(en|de)(\/.*)?$/)?.[0].includes(page)
  );

  // 2. ЗАХИСТ: Якщо токенів немає взагалі — на логін
  if (!accessToken && !refreshToken && !isPublicPage) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/api/proxy/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
