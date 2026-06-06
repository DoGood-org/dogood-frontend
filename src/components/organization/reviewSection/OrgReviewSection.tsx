import { ReviewProps, Role } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';
import { EmptyContent } from '@/components/organization/EmptyContent';
import { Slider } from '@/components/ui/Slider';
import { ReviewItem } from '@/components/account/accountPage/ReviewItem';

export const OrgReviewSection = ({
  reviews,
  role,
}: {
  reviews?: ReviewProps[];
  role: Role;
}): JSX.Element => {
  const t = useTranslations('organization');

  const title = useOrgSectionTitle(role, 'reviews');

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{title}</h2>

      {!reviews || !reviews.length ? (
        <EmptyContent>{t('noReview')}</EmptyContent>
      ) : (
        <Slider
          items={reviews}
          itemsPerSlide={3}
          listClassName="gap-5"
          itemClassName="p-0"
          renderItem={(review, idx) => (
            <ReviewItem key={`${idx}-${review.id}`} review={review} />
          )}
        />
      )}
    </>
  );
};
