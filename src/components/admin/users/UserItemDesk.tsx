import { IAdminUser } from '@/types/admin';
import React from 'react';
import { UserAdminMenu } from './UserAdminMenu';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { HighlightText } from '@/components/supportPage/HighlightText';

export const UserItemDesk = ({
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
    <div className="flex gap-3 w-full bg-modal rounded-md p-3 justify-between items-start hover:shadow-admin hover:border-[#00BC7D1A] focus:shadow-admin focus:border-[#00BC7D1A] cursor-pointer">
      <div className="flex gap-4">
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
      <div className="flex items-center gap-3">
        <button className="flex w-25 justify-center items-center capitalize border border-foreground px-6 py-1 h-6 rounded-sm">
          <span>{user.role.toLowerCase()}</span>
        </button>
        <UserAdminMenu user={user} />
      </div>
    </div>
  );
};
