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
  const { name, avatar } = organization;
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/organization/${organization.id}`}
      className="flex justify-between w-full p-3 rounded-lg outline-none lg:p-6 bg-card md:gap-8 focus:outline-hidden active:outline-hidden"
    >
      <div className="flex gap-4">
        <Image
          src={avatar ? avatar : '/account/avatar.png'}
          alt={`${name} logo`}
          width={75}
          height={75}
          className="shrink-0 w-[75px] h-[75px] object-cover rounded-[10px] self-center md:self-start"
        />
        <div className="flex flex-col w-full mt-8 md:mt-0">
          <h3 className="text-h3">{name}</h3>
          {/* <p>{email}</p> */}
        </div>
      </div>
      <OrganizationAdminMenu orgId={organization.id} />
    </Link>
  );
};
