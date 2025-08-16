import { mockUser } from '@/data/mockUser';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  // const user = await getCurrentUserFromSession();
  const user = mockUser;

  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // const paymentOptions = await getUserPaymentOptions(user.id); // [{ id, name: paymentMethodId }]
  const { paymentOptions } = user;
  if (!paymentOptions?.length) return NextResponse.json([]);

  const cards = await Promise.all(
    paymentOptions.map(async (option) => {
      try {
        const method = await stripe.paymentMethods.retrieve(option.name);
        return {
          paymentMethodId: option.name,
          brand: method.card?.brand,
          last4: method.card?.last4,
          exp_month: method.card?.exp_month,
          exp_year: method.card?.exp_year,
        };
      } catch (err) {
        console.error('Stripe retrieval error', err);
        return null;
      }
    })
  );

  return NextResponse.json(cards.filter(Boolean)); // фільтруємо null-значення
}
