// lib/server/getServerCurrentUser.ts
import { cookies } from 'next/headers';

export async function getServerCurrentUser(): Promise<any | null> {
  const jar = await cookies();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const r = await fetch(`${origin}/api/proxy/auth/current-user`, {
    cache: 'no-store',
    headers: {
      // forward the user’s cookies to the proxy so it can read accessToken
      cookie: jar.toString(),
    },
  });

  if (r.status === 401) return null;
  if (!r.ok) throw new Error('Failed to load current user');
  return r.json();
}
