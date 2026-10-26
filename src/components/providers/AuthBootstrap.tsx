'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';

export function AuthBootstrap(): null {
  useEffect(() => {
    // OLD:
    // const refreshSilently = (): void => {
    //   const { isLoggedIn } = authStore.getState();
    //
    //   if (!isLoggedIn) {
    //     return;
    //   }
    //
    //   void authStore.getState().currentUser({ silent: true });
    // };

    // NEW: те саме, але компактніше
    const refreshSilently = (): void => {
      if (!authStore.getState().isLoggedIn) return;
      void authStore.getState().currentUser({ silent: true });
    };

    // OLD:
    // const onVisibility = (): void => {
    //   if (document.visibilityState === 'visible') {
    //     refreshSilently();
    //   }
    // };

    // NEW:

    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') refreshSilently();
    };
    // OLD: refreshSilently();
    // NEW (з твого диффа): безумовний виклик для всіх, включно з гостями.
    // Ризик: гість -> 401 -> refresh -> 401 -> редірект на /login.
    // Перевір в інкогніто на публічній сторінці (/, /news).
    // NEW
    refreshSilently();
    // void authStore.getState().currentUser({ silent: true });
    // SAFE ALTERNATIVE (якщо в інкогніто викидає на /login, використай це
    // замість рядка вище):
    // refreshSilently();
    window.addEventListener('focus', refreshSilently);
    document.addEventListener('visibilitychange', onVisibility);

    return (): void => {
      window.removeEventListener('focus', refreshSilently);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return null;
}
