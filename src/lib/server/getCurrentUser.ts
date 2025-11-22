// lib/server/getServerCurrentUser.ts
import { cookies, headers } from 'next/headers';

// export async function getServerCurrentUser(): Promise<any | null> {
//   const h = await headers();
//   const host = h.get('x-forwarded-host');
//   const protocol = h.get('x-forwarded-proto') || 'http';
//   const jar = await cookies();
//   const access = jar.get('accessToken')?.value;
//   const refresh = jar.get('refreshToken')?.value;

//   if (!jar) return null;
//   if (!access && !refresh) return null;
//   const r = await fetch(`${protocol}://${host}/proxy/auth/current-user`, {
//     cache: 'no-store',
//     headers: {
//       cookie: jar.toString(),
//     },
//   });
//   if (!r.ok) return null;
//   return r.json();
// }

export async function getServerCurrentUser(): Promise<any | null> {
  const h = await headers();
  const proto = h.get('x-forwarded-proto');
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';

  const url = `${proto}://${host}/api/proxy/auth/current-user`;
  const jar = await cookies();
  if (!jar) return null;

  const access = jar.get('accessToken')?.value;
  const refresh = jar.get('refreshToken')?.value;
  if (!access && !refresh) return null;
  const res = await fetch(url, {
    cache: 'no-store',
    // кукі тут автоматично а у нас костиль
    headers: {
      cookie: jar.toString(),
    },
  });

  if (!res.ok) return null;
  return res.json();
}
