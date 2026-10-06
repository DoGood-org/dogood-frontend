'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import mocks from './mock.json';
import { useMediaQuery } from '@/hooks';
import { ReviewsListDesk } from './ReviewsListDesk';
import { ReviewsListMob } from './ReviewsListMob';
import { IReviewsItem } from '@/types';

export const ReviewsPage = (): JSX.Element => {
  const reviews: IReviewsItem[] = mocks.data.reviews as IReviewsItem[];
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-[627px] md:min-h-[756px] mb-[63px] md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      {isMobile ? (
        <ReviewsListMob reviews={reviews} />
      ) : (
        <ReviewsListDesk reviews={reviews} />
      )}
    </Section>
  );
};
