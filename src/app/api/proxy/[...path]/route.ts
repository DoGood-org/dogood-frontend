import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/';

export const runtime = 'nodejs';

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;

  const incomingUrl = new URL(req.url);
  const subPath = (path ?? []).join('/'); // 'auth/current-user', 'task', etc.

  const target = new URL(subPath, BACKEND);
  target.search = incomingUrl.search;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');

  // ---- read cookies from Next side ----
  const cookieStore = await cookies();
  const access = cookieStore.get('accessToken')?.value;
  const refresh = cookieStore.get('refreshToken')?.value;

  if (access) {
    console.log('Proxying with access token');
    headers.set('authorization', `Bearer ${access}`);
  } else {
    console.log('No access token cookie found');
  }

  if (refresh) {
    console.log('Proxying with refresh token ');
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual',
    credentials: 'include',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  const callBackend = () => fetch(target.toString(), init);

  // ---- 1st attempt ----
  let backendRes = await callBackend();

  // ---- refresh ----
  if (backendRes.status === 401 && refresh) {
    const reqUrlObj = new URL(req.url);

    const refreshRes = await fetch(`${reqUrlObj.origin}/auth/refresh-token`, {
      method: 'POST',
      cache: 'no-store',
    });

    if (refreshRes.ok) {
      backendRes = await callBackend();
    }
  }

  // ---- build response ----
  const body = await backendRes.arrayBuffer();

  const res = new NextResponse(body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
  });

  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'content-length') return;
    res.headers.set(key, value);
  });

  return res;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
