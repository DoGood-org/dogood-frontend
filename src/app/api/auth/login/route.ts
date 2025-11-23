import { NextResponse } from 'next/server';
const API = process.env.NEXT_PUBLIC_API_URL; // BACKEND

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    // Forward login request to backend API in env the route ends with / so here no slash before auth
    const backendRes = await fetch(`${API}auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
      credentials: 'include',
    });

    const buf = await backendRes.arrayBuffer();
    const response = new NextResponse(buf, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: {
        'content-type':
          backendRes.headers.get('content-type') ?? 'application/json',
      },
    });
    const raw = (backendRes.headers as any).raw?.();
    const setCookies: string[] | undefined = raw?.['set-cookie'];

    if (setCookies?.length) {
      for (const c of setCookies) response.headers.append('set-cookie', c);
    } else {
      const singleCookie = backendRes.headers.get('set-cookie');
      if (singleCookie) response.headers.append('set-cookie', singleCookie);
    }

    if (response.status === 200) {
      console.log('Login successful from proxy');
      const fullUser = await fetch(`${API}auth/current-user`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          cookie: response.headers.get('set-cookie') || '',
        },
        cache: 'no-store',
        credentials: 'include',
      });
      if (fullUser.ok) {
        const userData = await fullUser.json();
        console.log('Fetched current user after login:', userData);
      } else {
        console.warn(
          'Failed to fetch current user after login:',
          fullUser.status
        );
      }
    }

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: 'Login failed', error: String(err) },
      { status: 500 }
    );
  }
}
