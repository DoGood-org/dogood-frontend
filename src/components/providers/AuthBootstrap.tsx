'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';

export function AuthBootstrap(): null {
  useEffect(() => {
    const refreshSilently = (): void => {
      const { isLoggedIn } = authStore.getState();

      if (!isLoggedIn) {
        return;
      }

      void authStore.getState().currentUser({ silent: true });
    };

    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') {
        refreshSilently();
      }
    };

    refreshSilently();

    window.addEventListener('focus', refreshSilently);
    document.addEventListener('visibilitychange', onVisibility);

    return (): void => {
      window.removeEventListener('focus', refreshSilently);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return null;
}
