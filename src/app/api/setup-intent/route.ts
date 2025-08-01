import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(): Promise<NextResponse> {
  try {
    const setupIntent = await stripe.setupIntents.create();
    return NextResponse.json({ client_secret: setupIntent.client_secret });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Не вдалося створити SetupIntent' },
      { status: 500 }
    );
  }
}
