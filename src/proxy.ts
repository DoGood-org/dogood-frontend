// pages/api/proxy.ts (Next.js API Route)
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');
let refreshPromise: Promise<string | null> | null = null;

// Список маршрутів, де **не робимо refresh**
const NO_REFRESH_PATHS = [
  'auth/login',
  'auth/signup',
  'auth/refresh-token',
  'auth/logout',
];

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname, search } = req.nextUrl;
  const targetPath = pathname.replace('/api/proxy/', '').replace(/^\/+/, '');
  const targetUrl = new URL(`${targetPath}${search}`, BACKEND);

  const refreshToken = req.cookies.get('refreshToken')?.value;
  const accessToken = req.cookies.get('accessToken')?.value;

  const headers = new Headers(req.headers);
  headers.delete('host');

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await req.arrayBuffer()
      : null;

  const executeFetch = async (token?: string): Promise<Response> => {
    const newHeaders = new Headers(headers);

    if (token) {
      newHeaders.set('Authorization', `Bearer ${token}`);
    }

    return fetch(targetUrl.toString(), {
      method: req.method,
      headers: newHeaders,
      body,
      duplex: 'half',
    } as RequestInit & { duplex: 'half' });
  };
  try {
    let backendRes = await executeFetch(accessToken);

    if (
      backendRes.status === 401 &&
      refreshToken &&
      !NO_REFRESH_PATHS.some((p) => targetPath.startsWith(p))
    ) {
      if (!refreshPromise) {
        refreshPromise = (async (): Promise<string | null> => {
          try {
            const res = await fetch(`${BACKEND}/auth/refresh-token`, {
              method: 'POST',
              headers: { Cookie: `refreshToken=${refreshToken}` },
            });
            if (!res.ok) return null;
            const data: { accessToken?: string } = await res.json();
            return data.accessToken || null;
          } catch {
            return null;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newAT = await refreshPromise;
      if (newAT) {
        backendRes = await executeFetch(newAT);
        const response = new NextResponse(backendRes.body, backendRes);
        response.cookies.set('accessToken', newAT, {
          httpOnly: true,
          path: '/',
          maxAge: 900,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
        return response;
      }
    }

    return new NextResponse(backendRes.body, backendRes);
  } catch {
    return NextResponse.json(
      { error: 'Backend Bridge Error' },
      { status: 502 }
    );
  }
}
