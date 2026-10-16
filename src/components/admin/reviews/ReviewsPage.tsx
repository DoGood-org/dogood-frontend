'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import mocks from './mock.json';
import { IReviewsItem } from '@/types';
import { ReviewsList } from './ReviewsList';

export const ReviewsPage = (): JSX.Element => {
  const reviews: IReviewsItem[] = mocks.data.reviews as IReviewsItem[];
  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-[627px] md:min-h-[756px] mb-[63px] md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      <ReviewsList reviews={reviews} />
    </Section>
  );
};
