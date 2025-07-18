'use client';

import { authStore } from '@/zustand/stores/authStore';
import { useLocale } from 'next-intl';
import { AccountContentProps } from '@/types';
import { LinkWithArrow } from '@/components';
import { useIconComponents } from '@/hooks';

export const AccountLinks: React.FC<AccountContentProps> = ({
  accountItem,
  onClose,
}) => {
  const { logged = [], noLogged = [] } = accountItem.content || {};
  const locale = useLocale();

  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const logout = authStore((state) => state.logout);
  const icons = useIconComponents();

  const activeList = isLoggedIn ? logged : noLogged;

  if (!activeList.length) return null;

  return (
    <ul className="flex gap-4 items-center flex-col pt-2 pr-10 lg:p-0">
      {activeList.map(({ name, src, icon }, index) => {
        return (
          <li key={`${index}-${name}`} className="flex w-full">
            {src === '/logout' ? (
              <button
                onClick={() => {
                  logout();
                  onClose?.();
                }}
                className="flex items-center gap-3 cursor-pointer hover:text-btn-hover w-full justify-between"
              >
                {name}
                {icons[icon]}
              </button>
            ) : (
              <LinkWithArrow
                text={name}
                href={`/${locale}${src}`}
                icon={icons[icon]}
                onClick={onClose}
                className="flex items-center gap-3 w-full justify-between"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
