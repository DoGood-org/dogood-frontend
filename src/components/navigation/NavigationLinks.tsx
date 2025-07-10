'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserIcon from '@/components/icons/User';
import MessageIcon from '@/components/icons/MessageIcon';
import HouseIcon from '@/components/icons/House';
import HeartIcon from '@/components/icons/Heart';
import GearIcon from '@/components/icons/Gear';

const links = [
  { href: 'account', label: 'Account', Icon: UserIcon },
  { href: 'account/chat', label: 'Chat', Icon: MessageIcon },
  { href: 'account/map', label: 'Map', Icon: HouseIcon },
  { href: 'account/goals', label: 'Goals', Icon: HeartIcon },
  { href: 'account/settings', label: 'Settings', Icon: GearIcon },
];

interface NavigationLinksProps {
  showLabels?: boolean;
  linkClassName?: string;
  iconClassName?: string;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
}) => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const filteredLinks = links;

  return (
    <>
      {filteredLinks.map(({ href, label, Icon }) => {
        const expectedPath = `/${locale}/${href}`;

        return (
          <Link key={href} href={expectedPath} className={linkClassName}>
            <Icon className={iconClassName} />
            {showLabels && <span>{label}</span>}
          </Link>
        );
      })}
    </>
  );
};
