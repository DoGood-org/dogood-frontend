import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;

  try {
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
        { error: 'Failed to fetch the payment method from Stripe.' },
        { status: response.status }
      );
    }

    const method = await response.json();
    return NextResponse.json(method);
  } catch (error) {
    console.error('Error fetching payment method from Stripe:', error);
    return NextResponse.json(
      {
        error:
          'An unexpected error occurred while retrieving the payment method.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    const body = await req.json();
    // body.billing_details expected
    const updated = await stripe.paymentMethods.update(id, {
      billing_details: body.billing_details,
    });
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('Update payment method error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    // Detach
    await stripe.paymentMethods.detach(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete payment method error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
