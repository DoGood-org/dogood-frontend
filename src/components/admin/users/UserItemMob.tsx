import { IAdminUser } from '@/types/admin';
import React from 'react';
import { UserAdminMenu } from './UserAdminMenu';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl'; // Import useLocale
import { HighlightText } from '@/components/supportPage/HighlightText';

export const UserItemMob = ({
  user,
  searchQuery,
}: {
  user: IAdminUser;
  searchQuery: string;
}): React.JSX.Element => {
  const locale = useLocale();
  const t = useTranslations('adminUsers');

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(new Date(user.createdAt));

  return (
    <div className="flex flex-col gap-3 w-full bg-modal rounded-md p-3">
      <div className="flex justify-between items-center w-full cursor-pointer">
        <button className="flex w-25 justify-center items-center capitalize border border-foreground px-6 py-1 h-6 rounded-sm">
          <span>{user.role.toLowerCase()}</span>
        </button>
        <UserAdminMenu user={user} />
      </div>
      <div className="flex gap-2">
        <Image
          src={user.avatar}
          alt={user.name}
          height={76}
          width={76}
          className="rounded-full w-19 h-19 object-cover"
        />
        <ul className="flex flex-col gap-1">
          <li>
            <HighlightText text={user.name} highlight={searchQuery} />
          </li>
          <li>
            {t('registrationDate')}: {formattedDate}
          </li>
          <li>
            <HighlightText text={user.email} highlight={searchQuery} />
          </li>
        </ul>
      </div>
    </div>
  );
};
