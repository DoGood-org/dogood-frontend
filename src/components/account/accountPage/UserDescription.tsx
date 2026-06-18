'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { UserDetailedProps } from '@/types';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { formatLocation } from '@/lib/formatLocation';
import { ChatCircle, Email, Phone, UserLocate } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { ReportUser } from '@/components/publicAccount/ReportUser';
import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { UserNoDescription } from '@/components/account/accountPage/UserNoDescription';

export const UserDescription = ({
  user,
}: {
  user: UserDetailedProps;
}): JSX.Element => {
  const t = useTranslations('account');
  const { profile, name, email, siteRole, location } = user;
  const isPublicProfilePage = useRouteMatch('/profile');
  const locale = useLocale();
  const roleStyles =
    'text-base lg:text-h3 mt-3 font-semibold lg:font-normal capitalize';

  return (
    <div className="flex flex-col md:flex-row gap-11 lg:gap-20">
      {profile?.avatar ? (
        <Image
          src={profile?.avatar}
          alt={`${name} avatar`}
          width={353}
          height={352}
          className="w-[353px] h-[352px] object-cover md:w-[270px] md:h-[323px] lg:w-[511px] lg:h-[611px] rounded-[10px]"
        />
      ) : (
        <UserNoAvatar />
      )}

      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-h2-m md:text-h2 lg:text-h2-d">{name}</h2>
          {isPublicProfilePage && <ReportUser />}
        </div>
        {siteRole == 'ADMIN' ? (
          <Link
            href={`/${locale}/admin`}
            className={`${roleStyles} hover:text-btn-hover focus:text-btn-hover block`}
          >
            {(siteRole ?? '').toLowerCase()}
          </Link>
        ) : (
          <p className={roleStyles}>{(siteRole ?? '').toLowerCase()}</p>
        )}
        {location && (
          <p className="flex gap-2 text-text-help mt-6">
            <UserLocate />
            {formatLocation(location)}
          </p>
        )}
        {profile?.phoneNumber && (
          <p className="flex gap-2 text-text-help mt-6">
            <Phone />
            {profile?.phoneNumber}
          </p>
        )}
        {email && (
          <p className="flex gap-2 text-text-help mt-6">
            <Email />
            {email}
          </p>
        )}
        {profile?.bio ? (
          <>
            <h3 className="mt-6">{t('description')}</h3>
            <p className="whitespace-pre-line mt-6 text-base">{profile?.bio}</p>
          </>
        ) : (
          <UserNoDescription />
        )}
        {isPublicProfilePage && (
          <Button asChild variant="secondary" className="mt-6">
            <Link href={`/${locale}/account/chat`}>
              <ChatCircle className="size-[18px]" />
              {t('chatButton')}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
