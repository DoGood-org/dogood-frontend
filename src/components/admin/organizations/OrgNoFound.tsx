import Image from 'next/image';
import { JSX } from 'react';
import NotFound from '@/assets/images/notFound/adminOrgNotFound.png';
import { useTranslations } from 'next-intl';

export const OrgNoFound = (): JSX.Element => {
  const t = useTranslations('adminOrg');

  return (
    <div>
      <Image
        src={NotFound}
        alt="Error image"
        width={213}
        height={217}
        className="lg:flex-1/2 lg:order-last lg:w-[254px] lg:h-[259px]"
        priority
      />
      <p>{t('noFound')}</p>
    </div>
  );
};
