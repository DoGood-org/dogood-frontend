import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { proxy } from './proxy';

const BACKEND = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

const intlMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  alternateLinks: false,
});

const PUBLIC_PAGES = new Set([
  '/',
  '/login',
  '/register',
  '/tasks',
  '/donate',
  '/about',
  '/verify',
  '/reset-password',
  '/cookies',
  '/grants',
  '/news',
  '/organization',
  '/privacy',
  '/reviews',
  '/support',
]);

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    let payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payloadBase64.length % 4) payloadBase64 += '=';

    const payloadJson = atob(payloadBase64);
    const { exp } = JSON.parse(payloadJson);
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

// OLD: будь-яка помилка (401, 5xx, мережа) давала однаковий результат
// async function refreshTokens(refreshTokenCookie: string): Promise<{
//   newAccessToken: string | null;
//   setCookies: string[];
// }> {
//   try {
//     const refreshRes = await fetch(`${BACKEND}/auth/refresh-token`, {
//       method: 'POST',
//       headers: { cookie: refreshTokenCookie },
//     });
//     if (!refreshRes.ok) return { newAccessToken: null, setCookies: [] };
//
//     const setCookies = refreshRes.headers.getSetCookie?.() ?? [];
//     const newAccessToken =
//       setCookies
//         .find((c) => c.startsWith('accessToken='))
//         ?.split(';')[0]
//         ?.split('=')[1] ?? null;
//
//     return { newAccessToken, setCookies };
//   } catch {
//     return { newAccessToken: null, setCookies: [] };
//   }
// }

// NEW: розрізняємо «токен недійсний» (denied) і «бек недоступний» (unavailable)

type RefreshOutcome =
  | { kind: 'ok'; newAccessToken: string; setCookies: string[] }
  | { kind: 'denied' }
  | { kind: 'unavailable' };

async function refreshTokens(
  refreshTokenCookie: string
): Promise<RefreshOutcome> {
  try {
    const res = await fetch(`${BACKEND}/auth/refresh-token`, {
      method: 'POST',
      headers: { cookie: refreshTokenCookie },
    });

    if (res.status === 401 || res.status === 403) return { kind: 'denied' };
    if (!res.ok) return { kind: 'unavailable' };

    const setCookies = res.headers.getSetCookie?.() ?? [];
    const newAccessToken = setCookies
      .find((c) => c.startsWith('accessToken='))
      ?.split(';')[0]
      ?.split('=')[1];

    if (!newAccessToken) return { kind: 'unavailable' };
    return { kind: 'ok', newAccessToken, setCookies };
  } catch {
    return { kind: 'unavailable' };
  }
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/proxy/')) return proxy(req);

  let accessToken = req.cookies.get('accessToken')?.value;
  let refreshToken = req.cookies.get('refreshToken')?.value;
  let refreshSetCookies: string[] = [];
  let effectiveReq = req;

  const pathnameWithoutLocale =
    pathname.replace(/^\/(en|de)(\/|$)/, '/').replace(/\/$/, '') || '/';

  const isPublicPage =
    PUBLIC_PAGES.has(pathnameWithoutLocale) ||
    [...PUBLIC_PAGES].some(
      (p) => p !== '/' && pathnameWithoutLocale.startsWith(p + '/')
    );

  const needsRefresh =
    !!refreshToken && (!accessToken || isTokenExpired(accessToken));
  // NEW: прапорець «бек недоступний»
  let backendUnavailable = false;
  // OLD:
  // if (needsRefresh) {
  //   const { newAccessToken, setCookies } = await refreshTokens(
  //     `refreshToken=${refreshToken}`
  //   );
  //
  //   if (newAccessToken) {
  //     refreshSetCookies = setCookies;
  //
  //     const newRefreshToken =
  //       setCookies
  //         .find((c) => c.startsWith('refreshToken='))
  //         ?.split(';')[0]
  //         ?.split('=')[1] ?? refreshToken;
  //
  //     accessToken = newAccessToken;
  //     refreshToken = newRefreshToken;
  //
  //     const existingCookieHeader = effectiveReq.headers.get('cookie') || '';
  //     const filteredCookies = existingCookieHeader
  //       .split(';')
  //       .map((c) => c.trim())
  //       .filter(
  //         (c) =>
  //           c && !c.startsWith('accessToken=') && !c.startsWith('refreshToken=')
  //       );
  //     filteredCookies.push(`accessToken=${accessToken}`);
  //     filteredCookies.push(`refreshToken=${refreshToken}`);
  //
  //     const newHeaders = new Headers(effectiveReq.headers);
  //     newHeaders.set('cookie', filteredCookies.join('; '));
  //     effectiveReq = new NextRequest(effectiveReq.url, { headers: newHeaders });
  //   }
  // }

  // NEW:
  if (needsRefresh) {
    const result = await refreshTokens(`refreshToken=${refreshToken}`);

    if (result.kind === 'ok') {
      const { newAccessToken, setCookies } = result;
      refreshSetCookies = setCookies;

      const newRefreshToken =
        setCookies
          .find((c) => c.startsWith('refreshToken='))
          ?.split(';')[0]
          ?.split('=')[1] ?? refreshToken;

      accessToken = newAccessToken;
      refreshToken = newRefreshToken;

      const existingCookieHeader = effectiveReq.headers.get('cookie') || '';
      const filteredCookies = existingCookieHeader
        .split(';')
        .map((c) => c.trim())
        .filter(
          (c) =>
            c && !c.startsWith('accessToken=') && !c.startsWith('refreshToken=')
        );
      filteredCookies.push(`accessToken=${accessToken}`);
      filteredCookies.push(`refreshToken=${refreshToken}`);

      const newHeaders = new Headers(effectiveReq.headers);
      newHeaders.set('cookie', filteredCookies.join('; '));
      effectiveReq = new NextRequest(effectiveReq.url, { headers: newHeaders });
    } else if (result.kind === 'unavailable') {
      backendUnavailable = true;
    }
  }

  const isAuthenticated =
    !!refreshToken && !!accessToken && !isTokenExpired(accessToken);
  // OLD: if (!isAuthenticated && !isPublicPage) {
  // NEW: не редіректимо на /login, поки бек недоступний
  if (!isAuthenticated && !isPublicPage && !backendUnavailable) {
    const loginUrl = new URL('/login', effectiveReq.url);
    loginUrl.searchParams.set('next', pathname);

    const redirectResponse = NextResponse.redirect(loginUrl);

    if (refreshSetCookies.length > 0) {
      for (const c of refreshSetCookies) {
        redirectResponse.headers.append('set-cookie', c);
      }
    }
    return redirectResponse;
  }

  const response = intlMiddleware(effectiveReq);

  for (const c of refreshSetCookies) {
    response.headers.append('set-cookie', c);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
