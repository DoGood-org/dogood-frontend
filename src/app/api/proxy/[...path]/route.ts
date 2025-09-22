import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) throw new Error('BACKEND_URL / NEXT_PUBLIC_API_URL is not set');

const backend = API;
async function forward(req: Request, segs: string[]): Promise<NextResponse> {
  const url = new URL(req.url);
  const target = `${backend}/${segs.join('/')}${url.search}`;

  const incoming = await headers();
  const fwdHeaders = new Headers(incoming); //  copy
  fwdHeaders.delete('host');
  fwdHeaders.delete('content-length');

  const cookieStore = await cookies();
  const access = cookieStore.get('accessToken')?.value;
  const refresh = cookieStore.get('refreshToken')?.value;
  if (access) {
    console.log('Proxying with access token:');
  } else {
    console.log('No access token cookie found');
  }
  if (refresh) {
    console.log('Proxying with refresh token:');
  }

  if (access) fwdHeaders.set('authorization', `Bearer ${access}`);

  const init: RequestInit = {
    method: req.method,
    body: ['GET', 'HEAD'].includes(req.method)
      ? undefined
      : await req.arrayBuffer(),
    headers: fwdHeaders,
    cache: 'no-store',
  };

  let r = await fetch(target, init);

  //refresh 1 time if 401
  if (r.status === 401) {
    const refreshRes = await fetch(`${url.origin}/api/auth/refresh-token`, {
      method: 'POST',
      cache: 'no-store',
    });
    if (refreshRes.ok) r = await fetch(target, init);
  }

  return new NextResponse(r.body, { status: r.status, headers: r.headers });
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await ctx.params;
  return forward(req, path);
}
export async function POST(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await ctx.params;
  return forward(req, path);
}
export async function PUT(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await ctx.params;
  return forward(req, path);
}
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await ctx.params;
  return forward(req, path);
}
export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await ctx.params;
  return forward(req, path);
}
