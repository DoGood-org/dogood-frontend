'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Section } from '../ui/Section';
import { ReviewsList } from './ReviewsList';
import { getPlatformReviews } from '@/services/reviewsService';
import mockData from './mock.json';
import { IReview } from '@/types/grantsType';
import ContentLoader from '@/components/ui/ContentLoader'; // Import directly

export const WhatPeopleSay = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      setLoading(true);
      const result = await getPlatformReviews();

      const reviewsData =
        result.ok && result.data?.data?.reviews?.length
          ? result.data.data.reviews
          : mockData.data.reviews;

      setReviews(reviewsData);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <Section>
      {reviews.length > 0 && (
        <>
          <h2 className="text-h2-m text-center mb-4 md:mb-10 md:text-h2 lg:mb-12">
            {t('whatPeopleSay')}
          </h2>
          <ReviewsList reviews={reviews} />
        </>
      )}
    </Section>
  );
};
