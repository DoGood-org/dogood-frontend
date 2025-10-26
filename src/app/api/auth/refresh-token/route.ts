import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const API = process.env.NEXT_PUBLIC_API_URL; // BACKEND

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get('refreshToken')?.value;
  if (!refresh)
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });

  const r = await fetch(`${API}/auth/refresh-token`, {
    method: 'POST',
    headers: { authorization: `Bearer ${refresh}` },
  });

  const res = NextResponse.json(await r.json().catch(() => ({})), {
    status: r.status,
  });
  if (r.ok) {
    const data: any = await r
      .clone()
      .json()
      .catch(() => ({}));
    const secure =
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'production';
    if (data?.accessToken)
      res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure,
        path: '/',
        maxAge: 60 * 15,
      });
    if (data?.refreshToken)
      res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
  }
  return res;
}
