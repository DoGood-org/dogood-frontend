import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;

  const response = await fetch(
    `https://api.stripe.com/v1/payment_methods/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Не вдалося отримати картку' },
      { status: 500 }
    );
  }

  const method = await response.json();

  return NextResponse.json(method);
}
