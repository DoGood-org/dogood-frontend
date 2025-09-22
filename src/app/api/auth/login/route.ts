import { NextResponse } from 'next/server';
const API = process.env.NEXT_PUBLIC_API_URL; // BACKEND

export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('Login route called');

    const body = await req.json();

    const r = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const ct = r.headers.get('content-type') || '';
    const raw = ct.includes('application/json')
      ? await r.json()
      : await r.text();
    const payload: any = typeof raw === 'string' ? { message: raw } : raw;

    const access =
      payload?.accessToken ??
      payload?.data?.accessToken ??
      payload?.tokens?.access ??
      null;

    const refresh =
      payload?.refreshToken ??
      payload?.data?.refreshToken ??
      payload?.tokens?.refresh ??
      null;

    const res = NextResponse.json(payload, { status: r.status });

    if (r.ok && access && refresh) {
      const secure =
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'production';
      res.cookies.set('accessToken', access, {
        httpOnly: true,
        sameSite: 'lax',
        secure,
        path: '/',
        maxAge: 60 * 15,
      });
      res.cookies.set('refreshToken', refresh, {
        httpOnly: true,
        sameSite: 'lax',
        secure,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return res;
  } catch (err: any) {
    console.error('login route error:', err);
    return NextResponse.json(
      { message: 'Login failed', error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
