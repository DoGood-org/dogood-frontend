import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { ReviewsList } from './ReviewsList';
import { IAdminReviews } from '@/types/admin';
import { getAllReviewsService } from '@/services/reviewsService';

export const ReviewsPage = async (): Promise<JSX.Element> => {
  const result = await getAllReviewsService();
  const reviews: IAdminReviews[] = result.ok ? result.data.data.reviews : [];
  console.log(reviews);
  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-[627px] md:min-h-[756px] mb-[63px] md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      <ReviewsList reviews={reviews} />
    </Section>
  );
};
