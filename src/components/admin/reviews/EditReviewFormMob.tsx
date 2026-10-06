'use client';
import { EditModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';
import { RenderField } from '../report/RenderField';
import CloseIcon from '@/components/icons/CloseIcon';
import { RenderRow } from '../report/RenderRow';
import { TargetTypeBadge } from './TargetTypeBadge';
import { FilterSelect } from './FilterSelect';
import { RenderUser } from '../report/RenderUser';
import { Rating } from '@/components/ui/Rating';
import { ButtonControls } from '../report/ButtonControls';
import { getStatusOptions } from './StatusOptions';

export const EditReviewFormMob: React.FC<EditModalControls> = ({
  review,
  setIsOpen,
}): JSX.Element => {
  const t = useTranslations('adminReviews');
  const statusOptions = getStatusOptions(t);

  const [selectedStatus, setSelectedStatus] = useState<string>(review.status);

  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
  };

  const handleReject = (): void => {
    //TODO: Add Reject Logic
    console.log('Rejected report:', review.id);
    setIsOpen(false);
  };

  const handleApprove = (): void => {
    // TODO: Add Approve Logic
    console.log('Approved report:', review.id);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-sm p-4 md:p-10 w-full ">
      <RenderRow className="justify-between items-center">
        <TargetTypeBadge
          targetType={review.targetType}
          className="truncate block flex gap-1 items-center capitalize"
        />
        <RenderField
          label={t('id')}
          value={<span>{review.id}</span>}
          className="flex-none flex-row items-center gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <CloseIcon
          className="w-6 h-6 cursor-pointer flex-shrink-0"
          onClick={() => setIsOpen(false)}
        />
      </RenderRow>
      <RenderRow className="justify-between ">
        <FilterSelect
          key={'status'}
          value={selectedStatus}
          options={statusOptions}
          onValueChange={handleStatusChange}
          triggerClassName="w-full"
          contentClassName="w-full"
        />
      </RenderRow>
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('rating')}
          value={<Rating rating={review.rating} />}
          className="flex-row items-center gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <RenderField
          value={
            <span>
              {' '}
              {new Date(review.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          }
          className="w-full flex-row justify-end"
          labelClassName="font-medium"
        />
      </RenderRow>
      <div className="border-t border-text-gray w-full"></div>

      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('author')}
          value={
            <RenderUser user={review.author} imgClassName="w-[38px] h-[38px]" />
          }
        />
      </RenderRow>
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('relatedTo')}
          value={
            <span>
              {review.targetType === 'USER' && (
                <RenderUser
                  user={review.targetName || 'N/A'}
                  imgClassName="w-[20px] h-[20px]"
                />
              )}
              {review.targetType} | {review.targetName?.name || 'N/A'}
            </span>
          }
          className="flex-none items-start gap-2 w-[230px]"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
      </RenderRow>
      <div className="border-t border-text-gray w-full"></div>

      <RenderRow className="mb-5">
        <RenderField
          label={t('review')}
          value={
            <span className="block" title={review.comment}>
              {review.comment}
            </span>
          }
          className="flex-col items-start gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
      </RenderRow>
      <ButtonControls
        onReject={handleReject}
        onApprove={handleApprove}
        buttonClassName="md:w-[260px] lg:w-[290px]"
        rejectLabel={t('reject')}
        approveLabel={t('approve')}
      />
    </div>
  );
};
