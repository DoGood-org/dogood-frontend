import { NextResponse } from 'next/server';
export async function POST(): Promise<NextResponse> {
  const res = NextResponse.json({ ok: true });
  ['accessToken'].forEach((n) =>
    res.cookies.set(n, '', { httpOnly: true, path: '/', maxAge: 0 })
  );
  ['refreshToken'].forEach((n) =>
    res.cookies.set(n, '', { httpOnly: true, path: '/', maxAge: 0 })
  );
  return res;
}
