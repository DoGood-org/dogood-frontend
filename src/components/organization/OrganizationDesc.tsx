'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Email, Phone, UserLocate } from '@/components/icons';
import { OrganizationDetailedProps } from '@/types';
import { formatLocation } from '@/lib/formatLocation';
import { getUserRole } from '@/lib/getUserRole';
import { Report } from './Report';
import { UserNoDescription } from '@/components/account/accountPage/UserNoDescription';

export const OrganizationDesc = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  const t = useTranslations('organization');
  const { avatar, name, email, location, phoneNumber, description, members } =
    organization;

  const userRole = getUserRole(members);

  return (
    <div className="flex flex-col md:flex-row gap-11 lg:gap-20">
      <Image
        src={avatar ? avatar : '/account/avatar.png'}
        alt={`${name} avatar`}
        width={353}
        height={353}
        className="w-[353px] h-[353px] object-cover md:w-[192px] md:h-[192px] lg:w-[336px] lg:h-[336px] rounded-[10px]"
      />
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-h2-m md:text-h2 lg:text-h2-d">{name}</h2>
          <Report role={userRole} />
        </div>
        <p className="text-base lg:text-h3 mt-3 text-text-help lg:font-normal capitalize">
          {userRole.toLowerCase()}
        </p>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 mt-8">
          <p className="flex gap-3 text-text-help">
            <UserLocate className="size-5" />
            {location ? formatLocation(location) : t('noLocation')}
          </p>
          <p className="flex gap-3 text-text-help">
            <Phone className="size-5" />
            {phoneNumber ? phoneNumber : t('noPhone')}
          </p>
          {email && (
            <p className="flex gap-3 text-text-help">
              <Email className="size-5" />
              {email}
            </p>
          )}
        </div>
        {description ? (
          <>
            <h3 className="mt-6">{t('description')}</h3>
            <p className="whitespace-pre-line mt-6 text-base">{description}</p>
          </>
        ) : (
          <UserNoDescription />
        )}
        {/* {isPublicProfilePage && (
          <Button asChild variant="secondary" className="mt-6">
            <Link href={`/${locale}/account/chat`}>
              <ChatCircle className="size-[18px]" />
              {t('chatButton')}
            </Link>
          </Button>
        )} */}
      </div>
    </div>
  );
};
