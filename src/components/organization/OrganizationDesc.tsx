'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChatCircle, Email, Phone, UserLocate } from '@/components/icons';
import { UserNoDescription } from '@/components/account/accountPage/UserNoDescription';
// import { Report } fro@/components/organization/ReportOrgort';
import { Button } from '@/components/ui/Button';
import { OrganizationDetailedProps } from '@/types';
import { formatLocation } from '@/lib/formatLocation';
import { getUserRole, isAdminOrModerator } from '@/lib/getUserRole';
import { ReportOrg } from './dotMenu/ReportOrg';

export const OrganizationDesc = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  const t = useTranslations('organization');
  const { avatar, name, email, location, phoneNumber, description, members } =
    organization;

  const locale = useLocale();
  const userRole = getUserRole(members);
  const adminRole = isAdminOrModerator(userRole);

  return (
    <div
      className={`flex flex-col gap-10 md:grid md:grid-cols-[192px_auto] md:grid-rows-[192px_auto] md:gap-x-8 md:gap-y-10  lg:grid-rows-[auto_auto] lg:gap-x-20 ${adminRole ? 'lg:grid-cols-[336px_auto]' : 'lg:grid-cols-[424px_auto]'}`}
    >
      {/* IMAGE */}
      <div className="lg:row-span-full">
        <Image
          src={avatar ? avatar : '/account/avatar.png'}
          alt={`${name} avatar`}
          width={424}
          height={424}
          className={`w-[336px] h-[336px] object-cover md:w-[192px] md:h-[192px] rounded-[10px] ${adminRole ? 'lg:w-[336px] lg:h-[336px]' : 'lg:w-[424px] lg:h-[424px]'}`}
        />
      </div>

      {/* TEXT BLOCK (title, subtitle, contact-list) */}
      <div className="w-full lg:col-start-2 lg:row-start-1 ">
        <div className="flex justify-between">
          <h2 className="text-h2-m lg:text-h2-d">{name}</h2>
          <ReportOrg role={userRole} />
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
          <p className="flex gap-3 text-text-help">
            <Email className="size-5" />
            {email ? email : t('noEmail')}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:row-start-2 md:col-span-full gap-10 lg:col-start-2 lg:flex-col">
        {/* DESCRIPTION */}
        <div className="flex flex-col shrink-0 md:w-[421px] lg:flex-col">
          {description ? (
            <>
              <h3>{t('description')}</h3>
              <p className="whitespace-pre-line text-base">{description}</p>
            </>
          ) : (
            <UserNoDescription />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 md:w-[187px] md:flex-col lg:flex-row lg:w-full justify-end">
          {!adminRole && (
            <Button asChild variant="secondary" className="px-6">
              <Link href={`/${locale}/account/chat`}>
                <ChatCircle className="size-[18px]" />
                {t('chatButton')}
              </Link>
            </Button>
          )}
          {userRole === 'USER' && (
            <Button className="text-white px-6">{t('joinButton')}</Button>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
