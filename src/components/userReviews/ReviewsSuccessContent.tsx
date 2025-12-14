'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { IReviewsSuccessContent } from '@/types/userReviewsType';

export const ReviewsSuccessContent: React.FC<IReviewsSuccessContent> = ({
  setIsOpen,
}): React.JSX.Element => {
  const t = useTranslations('reviews');
  const rout = useRouter();
  return (
    <div className="p-12 bg-card rounded-xl">
      <div className="mb-8 text-center text-lg">{t('success')}</div>
      <div className="flex gap-5 justify-center">
        <Button variant="primary" onClick={() => rout.back()}>
          {t('backBtn')}
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          {t('reviewBtn')}
        </Button>
      </div>
    </div>
  );
};
