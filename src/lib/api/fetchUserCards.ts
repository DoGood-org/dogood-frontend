export async function fetchUserCards(): Promise<any[]> {
  const res = await fetch('/api/user-payment-methods');
  if (!res.ok) throw new Error('Failed to load cards');
  return res.json(); // масив з [{ paymentMethodId, brand, last4, exp_month, exp_year }]
}
