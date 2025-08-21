import axios from 'axios';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Record<string, string> }
): Promise<NextResponse> {
  const id = context.params.id;

  try {
    const response = await axios.get(
      `https://api.stripe.com/v1/payment_methods/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      'Error fetching payment method from Stripe:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: 'Failed to fetch the payment method from Stripe.' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Record<string, string> }
): Promise<NextResponse> {
  const id = context.params.id;

  try {
    const body = await request.json();
    const updated = await stripe.paymentMethods.update(id, {
      billing_details: body.billing_details,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Update payment method error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> }
): Promise<NextResponse> {
  const id = context.params.id;

  try {
    await stripe.paymentMethods.detach(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete payment method error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
