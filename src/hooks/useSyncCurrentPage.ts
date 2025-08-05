'use client';

import { useEffect } from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { usePathname } from '@/i18n/navigation';
import { Page } from '@/types/navigationType';

export function useSyncCurrentPage(): void {
  const pathname = usePathname();

  const currentPage = navigationStore((state) => state.currentPage);
  const setCurrentPage = navigationStore((state) => state.setCurrentPage);

  useEffect(() => {
    const pathToPageMap: Record<string, Page> = {
      '/chat': 'Chat',
      '/account': 'Account',
      '/map': 'Map',
      '/goals': 'Goals',
      '/settings': 'Settings',
    };

    const page =
      Object.entries(pathToPageMap).find(([path]) =>
        pathname.startsWith(path)
      )?.[1] || 'Account';

    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [pathname, currentPage, setCurrentPage]);
}
