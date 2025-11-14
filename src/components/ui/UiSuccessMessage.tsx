'use client';

import Image from 'next/image';
import { JSX } from 'react';
import Abstract from '../../assets/images/donation/abstract.png';
import { useTranslations } from 'next-intl';

export const UiSuccessMessage = ({
  className = '',
}: {
  className?: string;
}): JSX.Element => {
  const t = useTranslations('common');

  return (
    <div
      className={`relative w-[296px] h-[296px] mx-auto mb-16 mt-15
    rounded-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <Image
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src={Abstract}
        alt="Abstract circular lines decoration"
      />

      <h2
        className="absolute text-h3-d font-semibold tracking-normal text-[#00c1ac]
    flex items-center justify-center w-full h-full leading-none"
      >
        {t('thankYou')}
      </h2>
    </div>
  );
};
