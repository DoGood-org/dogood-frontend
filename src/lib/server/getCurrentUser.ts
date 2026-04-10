import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { ICurrentUser } from '@/types';

export const getServerCurrentUser = cache(
  async (): Promise<ICurrentUser | null> => {
    const cookieStore = await cookies();
    let token = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const BACKEND = (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    ).replace(/\/+$/, '');

    try {
      if (!token && refreshToken) {
        const refreshRes = await fetch(`${BACKEND}/auth/refresh-token`, {
          method: 'POST',
          headers: { Cookie: `refreshToken=${refreshToken}` },
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          token = refreshData.accessToken;
        } else {
          return null;
        }
      }

      if (!token) return null;

      // 2. Робимо запит за юзером із гарантовано наявним токеном
      let res = await fetch(`${BACKEND}/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: (await headers()).get('cookie') || '',
        },
        next: { revalidate: 0 },
      });

      // 3. Підстраховка: якщо токен БУВ у куках, але бекенд все одно повернув 401
      // (наприклад, токен забанили або він протух секунду тому)
      if (res.status === 401 && refreshToken) {
        const fallbackRefresh = await fetch(`${BACKEND}/auth/refresh-token`, {
          method: 'POST',
          headers: { Cookie: `refreshToken=${refreshToken}` },
        });

        if (fallbackRefresh.ok) {
          const fallbackData = await fallbackRefresh.json();
          const fallbackToken = fallbackData.accessToken;

          res = await fetch(`${BACKEND}/auth/current-user`, {
            headers: { Authorization: `Bearer ${fallbackToken}` },
            next: { revalidate: 0 },
          });
        }
      }

      if (!res.ok) return null;
      const data = await res.json();
      return data?.user || null;
    } catch (_err) {
      return null;
    }
  }
);
