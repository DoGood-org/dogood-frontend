'use client';

import { ChatSearch } from '@/components/icons';
import { UserSearchListProps } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

export const UserSearchList = <T,>({
  query,
  onQueryChange,
  users,
  isLoading = false,
  isError = false,
  onSelect,
  getId,
  getName,
  getAvatar,
  disabled = false,
  minSearchLength = 3,
}: UserSearchListProps<T>): JSX.Element => {
  const t = useTranslations('organization');
  return (
    <div>
      <div className="flex w-full gap-2 px-2 py-3 mb-6 border-b border-foreground border-solid relative">
        <ChatSearch className="rotate-90 stroke-current size-6" />

        <input
          name="userName"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t('members.search')}
          className="w-full outline-none"
        />

        {query.length > 0 && query.length < minSearchLength && (
          <p className="text-sm text-gray-400 absolute -bottom-5">
            {t('members.leastSearch', { minSearchLength })}
          </p>
        )}
      </div>

      {/* {isLoading && <p>Loading...</p>} */}

      {isError && <p className="text-error">{t('memberModals.error')}</p>}

      {query.length >= minSearchLength && !isLoading && !users.length && (
        <p className="mt-2">{t('memberModals.noFound')}</p>
      )}

      <ul className="flex flex-col gap-2 max-h-[296px] overflow-y-auto custom-scrollbar review-scrollbar">
        {users.map((user) => (
          <li
            key={getId(user)}
            className="bg-admin-background p-2 rounded-lg focus:outline-hidden active:outline-hidden border-1 border-transparent  hover:border-border  focus-within:border-border active:border-border"
          >
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(user)}
              className="flex items-center gap-4 w-full cursor-pointer focus:outline-hidden"
            >
              <Image
                src={getAvatar(user) || '/account/avatar.png'}
                width={60}
                height={60}
                alt={getName(user)}
                className="object-cover rounded-[10px]"
              />

              {getName(user)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
