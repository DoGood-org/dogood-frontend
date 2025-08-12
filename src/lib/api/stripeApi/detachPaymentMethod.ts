export async function detachPaymentMethod(
  paymentMethodId: string
): Promise<void> {
  const res = await fetch(`/api/payment-method/${paymentMethodId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'Failed to detach payment method');
  }
}
