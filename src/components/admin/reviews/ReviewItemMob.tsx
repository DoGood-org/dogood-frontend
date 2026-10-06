import { IReviewsItem } from '@/types';
import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';
import { RenderField } from '../report/RenderField';
import { RenderRow } from '../report/RenderRow';
import { TargetTypeBadge } from './TargetTypeBadge';
import { ReviewAdminMenu } from './ReviewAdminMenu';

export const ReviewItemMob = ({
  review,
}: {
  review: IReviewsItem;
}): JSX.Element => {
  const t = useTranslations('adminReviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-modal flex flex-col gap-3 mb-2 rounded-sm py-2.5 px-4.5 w-full">
      <RenderRow
        className="items-center justify-between"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <TargetTypeBadge targetType={review.targetType} isTargetType={false} />
        <RenderField
          label={t('id')}
          value={<span>{review.id}</span>}
          className="flex-row items-center gap-2 !flex-none"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <ReviewAdminMenu review={review} />
      </RenderRow>
      <RenderRow className="gap-3">
        <RenderField
          label={t('author')}
          value={<span>{review.author.name}</span>}
          className="flex-col items-start gap-1"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
      </RenderRow>
      <div className="border-t border-text-gray w-full"></div>
      <RenderRow className="gap-3">
        <RenderField
          label={t('review')}
          value={<span>{review.comment}</span>}
          className="flex-col items-start gap-1"
          labelClassName="font-medium"
          valueClassName="min-w-0 w-full truncate block"
        />
      </RenderRow>
    </div>
  );
};
