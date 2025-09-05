'use client';

import { usePathname } from 'next/navigation';

export const useRouteMatch = (segment: string): boolean => {
  const pathname = usePathname();
  return pathname.includes(segment);
};
