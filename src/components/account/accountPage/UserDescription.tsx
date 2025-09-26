import Image from 'next/image';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Email, Phone, UserLocate } from '@/components/icons';
import { UserNoAvatar, UserNoDescription } from '@/components';
import { UserDetailedProps } from '@/types';

export const UserDescription = ({
  user,
}: {
  user: UserDetailedProps;
}): JSX.Element => {
  const t = useTranslations('account');
  const { avatar, name, email, siteRole, bio, location, phoneNumber } = user;

  return (
    <div className="flex flex-col md:flex-row gap-11 lg:gap-20">
      {avatar ? (
        <Image
          src={avatar}
          alt={`${name} avatar`}
          width={353}
          height={352}
          className="w-[353px] h-[352px] object-cover md:w-[270px] md:h-[323px] lg:w-[511px] lg:h-[611px] rounded-[10px]"
        />
      ) : (
        <UserNoAvatar />
      )}

      <div>
        <h2 className="text-h2-m md:text-h2 lg:text-h2-d">{name}</h2>
        <p className="text-base lg:text-h3 mt-3 font-semibold lg:font-normal capitalize">
          {siteRole.toLowerCase()}
        </p>
        {location && (
          <p className="flex gap-2 text-text-help mt-6">
            <UserLocate />
            {location?.city}
          </p>
        )}
        {phoneNumber && (
          <p className="flex gap-2 text-text-help mt-6">
            <Phone />
            {phoneNumber}
          </p>
        )}
        {email && (
          <p className="flex gap-2 text-text-help mt-6">
            <Email />
            {email}
          </p>
        )}
        {bio ? (
          <>
            <h3 className="mt-6">{t('description')}</h3>
            <p className="whitespace-pre-line mt-6 text-base">{bio}</p>
          </>
        ) : (
          <UserNoDescription />
        )}
      </div>
    </div>
  );
};
