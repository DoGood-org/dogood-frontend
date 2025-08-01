export async function attachPaymentMethod({
  customerId,
  paymentMethodId,
}: {
  customerId: string;
  paymentMethodId: string;
}): Promise<void> {
  const res = await fetch('/api/attach-payment-method', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, paymentMethodId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to attach payment method');
  }
}
