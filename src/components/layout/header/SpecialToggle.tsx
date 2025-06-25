'use client';

import { Subtract } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const SpecialToggle: React.FC = () => {
  const t = useTranslations('header');
  const [onToggle, setOnToggle] = useState(false);

  const toggleSpecial = (): void => {
    setOnToggle(!onToggle);
  };

  return (
    <button
      onClick={toggleSpecial}
      className={`relative w-[65px] h-[30px] rounded-full flex items-center justify-between
        px-2 transition-colors duration-700 cursor-pointer
        ${onToggle ? 'bg-btn-hover' : 'bg-toggle'}
        `}
      aria-label={`${t('special')}`}
    >
      <Subtract className="pointer-events-none absolute size-3 right-3" />
      <span
        className={`absolute top-0 left-0 w-[30px] h-[30px] bg-white rounded-full shadow-md
          transform transition-transform duration-700
          ${onToggle ? 'translate-x-[35px]' : 'translate-x-0'}
          `}
      />
    </button>
  );
};
