import { useMemo } from 'react';
import { NavItem } from '@/types';

export const useSortedMobileNav = (nav: NavItem[]): NavItem[] => {
  return useMemo(() => {
    const accountIndex = nav.findIndex((item) => item.id === 'Account');
    const accountItem = nav[accountIndex];

    const navWithoutAccount = [...nav];
    if (accountIndex !== -1) {
      navWithoutAccount.splice(accountIndex, 1);
    }

    const homeIndex = nav.findIndex((item) => item.id === 'Home');
    const homeItem = nav[homeIndex];

    const navWithoutHome = [...navWithoutAccount];
    if (homeIndex !== -1) {
      navWithoutHome.splice(homeIndex, 1);
    }

    return [homeItem, accountItem, ...navWithoutHome.filter(Boolean)];
  }, [nav]);
};
