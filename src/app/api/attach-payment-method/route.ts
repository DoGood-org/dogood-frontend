import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { customerId, paymentMethodId } = await req.json();

    // Привʼязка карти до кастомера
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // (Не обов’язково) Зробити цю карту дефолтною
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
