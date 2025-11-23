import { NextRequest, NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/';

export async function GET(
  _req: NextRequest,
  ctx: { params: { token: string } }
): Promise<NextResponse> {
  const { token } = ctx.params;

  try {
    console.log(`${API}verify-email/${token}`);
    const backendRes = await fetch(`${API}verify-email/${token}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const ct = backendRes.headers.get('content-type') || '';
    const isJson = ct.includes('application/json');
    const raw = isJson ? await backendRes.json() : await backendRes.text();
    const payload = typeof raw === 'string' ? { message: raw } : raw;

    return NextResponse.json(payload, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Verification failed',
        error: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
