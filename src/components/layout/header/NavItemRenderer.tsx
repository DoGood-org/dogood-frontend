'use client';

import Link from 'next/link';
import { NavItem, NavItemRendererProps } from '@/types';
import { NavDropdown } from './NavDropdown';
import { SettingsList } from './SettingList';
import { Button } from '@/components/ui/Button';
import { User } from '@/components/icons';
import { AccountLinks } from './AccountLinks';
import { useState } from 'react';
import { ListDropdown } from './ListDropdown';

export const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  navItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (navItem.type === 'link') {
    return (
      <li>
        <Button
          asChild
          variant="ghost"
          size="md"
          className="hover:border-btn-outline-hover"
        >
          <Link
            href={navItem.src}
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
          isOpen={isOpen}
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
      trigger: <User className="size-6" />,
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
