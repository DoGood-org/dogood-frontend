import { headers } from 'next/headers';
import { cache } from 'react';

export const getServerCurrentUser = cache(async () => {
  const h = await headers();
  const cookie = h.get('cookie') ?? '';

  const cleanBackend = process.env.NEXT_PUBLIC_API_URL!.replace(/\/+$/, '');

  const res = await fetch(`${cleanBackend}/auth/current-user`, {
    headers: {
      Cookie: cookie,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
});
