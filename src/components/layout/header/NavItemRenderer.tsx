'use client';

import Link from 'next/link';
import { NavItem, NavItemRendererProps } from '@/types';
import { NavDropdown } from './NavDropdown';
import { SettingsList } from './SettingList';
import { Button } from '@/components/ui/Button';
import { AccountLinks } from './AccountLinks';
import { useState } from 'react';
import { ListDropdown } from './ListDropdown';
import { useLocale } from 'next-intl';
import { UserAvatar } from './UserAvatar';
import { useAuth } from '@/hooks/useAuth';

export const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  navItem,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const { isLoggedIn, user } = useAuth();
  const safeUser = user ?? undefined;

  if (navItem.type === 'link') {
    return (
      <li>
        <Button
          asChild
          variant="ghost"
          size="md"
          className={`hover:border-btn-outline-hover ${isActive && 'border-btn-outline-active'}`}
        >
          <Link
            href={`/${locale}${navItem.src}`}
            className="nav-link text-white flex items-center"
          >
            {navItem.title}
          </Link>
        </Button>
      </li>
    );
  }

  const configMap: Record<
    string,
    | {
        className: string;
        trigger: React.ReactNode;
        content: React.ReactNode;
        isIcon?: boolean;
      }
    | undefined
  > = {
    list: {
      className: 'min-w-[330px]',
      trigger: navItem.title,
      content: (
        <ListDropdown
          listItem={navItem as Extract<NavItem, { type: 'list' }>}
          setIsOpen={setIsOpen}
        />
      ),
    },

    settings: {
      className: 'min-w-[450px]',
      trigger: navItem.title,
      content: (
        <SettingsList
          settingItem={navItem as Extract<NavItem, { type: 'setting' }>}
        />
      ),
    },

    icon: {
      className: 'min-w-[146px]',
      trigger: (
        <UserAvatar
          isLoggedIn={isLoggedIn}
          user={safeUser}
          className="size-6 w-6 h-6"
        />
      ),
      content: (
        <AccountLinks
          accountItem={navItem as Extract<NavItem, { type: 'icon' }>}
          onClose={() => setIsOpen(false)}
        />
      ),
      isIcon: true,
    },
  };

  const config = configMap[navItem.type];

  if (!config) return null;

  return (
    <NavDropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={config.trigger}
      className={config.className}
      isIcon={config.isIcon}
    >
      {config.content}
    </NavDropdown>
  );
};
