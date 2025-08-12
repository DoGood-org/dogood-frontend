import { CardData } from '@/types';

export async function updatePaymentMethod(
  paymentMethodId: string,
  billingDetails: {
    name?: string;
    address?: { city?: string; country?: string };
  }
): Promise<CardData> {
  const res = await fetch(`/api/payment-method/${paymentMethodId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ billing_details: billingDetails }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'Failed to update payment method');
  }
  return res.json();
}
