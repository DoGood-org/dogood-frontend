'use client';

import { OrganizationItemProps } from '@/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { OrganizationAdminMenu } from './OrgAdminMenu.';

export const OrgItem = ({
  organization,
}: OrganizationItemProps): JSX.Element => {
  const { name, email, avatar } = organization;
  const locale = useLocale();

  return (
    <div className="relative flex justify-between w-full px-3 py-5 rounded-lg outline-none md:p-3 lg:p-6 bg-card md:gap-8 focus:outline-hidden active:outline-hidden border-1 border-transparent hover:shadow-admin hover:border-[#00BC7D1A] focus:shadow-admin outline-none active:border-border">
      <Link
        href={`/${locale}/organization/${organization.id}`}
        className="flex gap-4 min-w-[90%]"
      >
        <Image
          src={avatar ? avatar : '/account/avatar.png'}
          alt={`${name} logo`}
          width={75}
          height={75}
          className="shrink-0 w-[75px] h-[75px] object-cover rounded-[10px] self-center md:self-start"
        />
        <div className="flex flex-col justify-center w-full gap-1">
          <h3 className="text-reg lg:text-h3">{name}</h3>
          <p className="text-xs text-placeholder">{email}</p>
        </div>
      </Link>
      <OrganizationAdminMenu orgId={organization.id} />
    </div>
  );
};
