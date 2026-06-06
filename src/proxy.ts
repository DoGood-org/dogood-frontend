import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const NO_REFRESH_PATHS = [
  'auth/login',
  'auth/signup',
  'auth/refresh-token',
  'auth/logout',
];

interface ExtendedRequestInit extends RequestInit {
  duplex?: 'half';
}

type RefreshResult = {
  accessToken: string | null;
  setCookies: string[];
};

const refreshPromises = new Map<string, Promise<RefreshResult>>();

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname, search } = req.nextUrl;

  const targetPath = pathname.replace('/api/proxy/', '').replace(/^\/+/, '');

  const targetUrl = new URL(`${targetPath}${search}`, BACKEND);

  const cookieHeader = req.headers.get('cookie') || '';

  const getCookie = (name: string): string | undefined =>
    req.cookies.get(name)?.value ||
    cookieHeader
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`))
      ?.split('=')[1];

  let accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const baseHeaders = new Headers(req.headers);
  baseHeaders.delete('host');

  const bodyBuffer =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await req.arrayBuffer()
      : null;

  const buildCookie = (newAccess?: string): string => {
    const cookies = cookieHeader
      ? cookieHeader.split(';').map((c) => c.trim())
      : [];

    const filtered = cookies.filter((c) => !c.startsWith('accessToken='));

    if (newAccess) {
      filtered.push(`accessToken=${newAccess}`);
    } else if (accessToken) {
      filtered.push(`accessToken=${accessToken}`);
    }

    return filtered.join('; ');
  };

  const executeFetch = async (token?: string): Promise<Response> => {
    const headers = new Headers(baseHeaders);

    const cookie = buildCookie(token);
    if (cookie) headers.set('cookie', cookie);

    return fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body: bodyBuffer,
      duplex: 'half',
    } as ExtendedRequestInit);
  };

  const doRefresh = async (): Promise<RefreshResult> => {
    const key = refreshToken ?? '__none__';
    if (refreshPromises.has(key)) return refreshPromises.get(key)!;

    const promise = (async (): Promise<RefreshResult> => {
      try {
        const cleanCookies = (cookieHeader || '')
          .split(';')
          .map((c) => c.trim())
          .filter((c) => !c.startsWith('accessToken='))
          .join('; ');

        const res = await fetch(`${BACKEND}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            ...(cleanCookies ? { cookie: cleanCookies } : {}),
          },
        });
        if (!res.ok) return { accessToken: null, setCookies: [] };
        const setCookies =
          res.headers.getSetCookie?.() ??
          (res.headers.get('set-cookie')
            ? [res.headers.get('set-cookie')!]
            : []);
        const newAT =
          setCookies
            .find((c) => c.startsWith('accessToken='))
            ?.split(';')[0]
            ?.split('=')[1] ?? null;

        return { accessToken: newAT, setCookies };
      } catch {
        return { accessToken: null, setCookies: [] };
      } finally {
        refreshPromises.delete(key);
      }
    })();

    refreshPromises.set(key, promise);
    return promise;
  };

  try {
    let backendRes = await executeFetch(accessToken);

    const shouldRefresh =
      backendRes.status === 401 &&
      refreshToken &&
      !NO_REFRESH_PATHS.some((p) => targetPath.startsWith(p));

    if (shouldRefresh) {
      const { accessToken: newAT, setCookies } = await doRefresh();
      if (newAT) {
        accessToken = newAT;

        backendRes = await executeFetch(newAT);

        const response = new NextResponse(backendRes.body, backendRes);

        for (const c of setCookies) {
          response.headers.append('set-cookie', c);
        }

        return response;
      }
    }

    return new NextResponse(backendRes.body, backendRes);
  } catch (error) {
    console.error('Proxy error:', error);

    return NextResponse.json(
      { error: 'Backend Bridge Error' },
      { status: 502 }
    );
  }
}
