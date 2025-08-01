export async function getPaymentMethod(methodId: string): Promise<any> {
  const res = await fetch(`/api/payment-method/${methodId}`);
  if (!res.ok) throw new Error('Failed to fetch payment method');
  return res.json(); // { id, card: { ... } }
}
