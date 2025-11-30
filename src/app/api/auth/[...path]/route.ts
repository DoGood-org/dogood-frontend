// app/api/auth/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const RAW_BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/';
const BACKEND = RAW_BACKEND.replace(/\/+$/, ''); // strip trailing slash

async function handler(
  req: NextRequest,
  { params }: { params: { path?: string[] } | Promise<{ path?: string[] }> }
): Promise<NextResponse> {
  const resolvedParams =
    typeof (params as any)?.then === 'function'
      ? await (params as any)
      : params;

  const pathSegments = resolvedParams?.path ?? []; // ['signup']
  const subPath = ['auth', ...pathSegments].join('/'); // auth/signup

  const incomingUrl = new URL(req.url);
  const target = new URL(`/${subPath}`, BACKEND);
  target.search = incomingUrl.search; // ?lang=en, etc.

  console.log(`Proxying request to: ${target.toString()}`);

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');

  const rawBody =
    req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : await req.text();

  const backendRes = await fetch(target.toString(), {
    method: req.method,
    headers,
    body: rawBody,
    cache: 'no-store',
    redirect: 'manual',
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

  // copy cookies
  const raw = (backendRes.headers as any).raw?.();
  const setCookies: string[] | undefined = raw?.['set-cookie'];

  if (setCookies?.length) {
    for (const c of setCookies) response.headers.append('set-cookie', c);
  } else {
    const singleCookie = backendRes.headers.get('set-cookie');
    if (singleCookie) response.headers.append('set-cookie', singleCookie);
  }

  return response;
}

export async function GET(req: NextRequest, ctx: any): Promise<NextResponse> {
  return handler(req, ctx);
}
export async function POST(req: NextRequest, ctx: any): Promise<NextResponse> {
  return handler(req, ctx);
}
export async function PUT(req: NextRequest, ctx: any): Promise<NextResponse> {
  return handler(req, ctx);
}
export async function PATCH(req: NextRequest, ctx: any): Promise<NextResponse> {
  return handler(req, ctx);
}
export async function DELETE(
  req: NextRequest,
  ctx: any
): Promise<NextResponse> {
  return handler(req, ctx);
}
