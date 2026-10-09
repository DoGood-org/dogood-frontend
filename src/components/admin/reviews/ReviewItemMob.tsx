import { IReviewsItem } from '@/types';
import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';
import { RenderField } from '../report/RenderField';
import { RenderRow } from '../report/RenderRow';
import { TargetTypeBadge } from './TargetTypeBadge';
import { ReviewAdminMenu } from './ReviewAdminMenu';
import { EditFormModal } from './EditFormModal';

export const ReviewItemMob = ({
  review,
}: {
  review: IReviewsItem;
}): JSX.Element => {
  const t = useTranslations('adminReviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;

    if (target.closest('[data-radix-dropdown-menu-trigger]')) {
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        <div
          tabIndex={0}
          className="bg-modal flex flex-col gap-3 mb-2 rounded-sm py-2.5 px-4.5 w-full cursor-pointer"
          onClick={handleRowClick}
        >
          <RenderRow className="items-center justify-between">
            <TargetTypeBadge
              targetType={review.targetType}
              isTargetType={false}
            />
            <RenderField
              label={t('id')}
              value={<span>{review.id}</span>}
              className="flex-row items-center gap-2 !flex-none"
              labelClassName="font-medium"
              valueClassName="min-w-0"
            />
            <span className="w-10 h-10 shrink-0" aria-hidden="true" />
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
          <div className="border-t border-text-gray w-full" />
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
        <div
          className="absolute right-4.5 top-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          <ReviewAdminMenu review={review} />
        </div>
      </div>
      {isModalOpen && (
        <EditFormModal
          review={review}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
