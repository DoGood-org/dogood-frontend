import { mockUser } from '@/data/mockUser'; //імітація бека

export async function getOrCreateCustomer(): Promise<string> {
  // const userRes = await fetch('/api/current-user');
  // if (!userRes.ok) throw new Error('Failed to fetch user');
  // const user = await userRes.json(); // { name, email }
  const user = mockUser;

  const res = await fetch('/api/create-customer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  });

  const { customerId } = await res.json();
  return customerId;
}
