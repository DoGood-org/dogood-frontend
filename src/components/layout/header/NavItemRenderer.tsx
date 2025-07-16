'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { NavItem, NavItemRendererProps } from '@/types';
import {
  AccountLinks,
  Button,
  ListDropdown,
  MobileDropdown,
  NavDropdown,
  SettingsList,
  UserAvatar,
} from '@/components';
import { useAuth, useIconComponents } from '@/hooks';

export const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  navItem,
  isActive,
  variant,
  openItem,
  setOpenItem,
  toggleMenu,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const { isLoggedIn, user } = useAuth();
  const safeUser = user ?? undefined;
  const icons = useIconComponents();

  const handleLinkOnClick = (): void => {
    setIsOpen(false);
    if (variant === 'mobile') toggleMenu();
  };

  if (navItem.type === 'link') {
    if (variant === 'desktop' && navItem.id === 'Home') return;

    return (
      <li>
        <Button
          asChild
          variant="ghost"
          size="md"
          className={`max-lg:px-0 active:border-transparent lg:hover:border-btn-outline-hover ${isActive && 'lg:border-btn-outline-active'}`}
        >
          <Link
            href={`/${locale}${navItem.src}`}
            onClick={handleLinkOnClick}
            className="text-white flex items-center gap-5"
          >
            {variant === 'mobile' && icons[navItem.icon as keyof typeof icons]}
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
          {...(variant === 'mobile' ? { toggleMenu } : {})}
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
      trigger:
        variant === 'mobile' ? (
          navItem.title
        ) : (
          <UserAvatar
            isLoggedIn={isLoggedIn}
            user={safeUser}
            className="size-6 w-6 h-6 min-w-6"
          />
        ),
      content: (
        <AccountLinks
          accountItem={navItem as Extract<NavItem, { type: 'icon' }>}
          onClose={handleLinkOnClick}
        />
      ),
      isIcon: true,
    },
  };

  const config = configMap[navItem.type];

  if (!config) return null;

  return (
    <>
      {variant === 'desktop' && (
        <NavDropdown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={config.trigger}
          className={config.className}
          isIcon={config.isIcon}
        >
          {config.content}
        </NavDropdown>
      )}
      {variant === 'mobile' && (
        <MobileDropdown
          openItem={openItem}
          setOpenItem={setOpenItem ?? ((_: string): void => {})}
          trigger={config.trigger}
          className={config.className}
          icon={navItem.icon}
          navItem={navItem}
        >
          {config.content}
        </MobileDropdown>
      )}
    </>
  );
};
