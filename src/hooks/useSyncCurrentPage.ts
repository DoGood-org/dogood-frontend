'use client';

import { useEffect, useMemo } from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { usePathname } from '@/i18n/navigation';
import { Page } from '@/types/navigationType';
import { navigationPages } from '@/constants/navigationPages';

export function useSyncCurrentPage(): void {
  const pathname = usePathname();

  const currentPage = navigationStore((state) => state.currentPage);
  const setCurrentPage = navigationStore((state) => state.setCurrentPage);

  const sortedPathToPageMap = useMemo(() => {
    const pathToPageMap = Object.fromEntries(
      navigationPages.map(({ path, label }) => [path, label as Page])
    );

    return Object.entries(pathToPageMap).sort(
      (a, b) => b[0].length - a[0].length
    );
  }, []);

  useEffect(() => {
    const page =
      sortedPathToPageMap.find(([path]) => pathname.startsWith(path))?.[1] ||
      'Account';

    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [pathname, currentPage, setCurrentPage, sortedPathToPageMap]);
}
