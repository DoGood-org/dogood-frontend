'use client';

import { EditModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { RenderField } from '../report/RenderField';
import CloseIcon from '@/components/icons/CloseIcon';
import { RenderRow } from '../report/RenderRow';
import { TargetTypeBadge } from './TargetTypeBadge';
import { FilterSelect } from './FilterSelect';
import { RenderUser } from '../report/RenderUser';
import { Rating } from '@/components/ui/Rating';
import { ButtonControls } from '../report/ButtonControls';
import { getStatusOptions } from '@/utils/getStatusOptions';
import Link from 'next/link';

export const EditReviewFormDesk: React.FC<EditModalControls> = ({
  review,
  setIsOpen,
}) => {
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
    <div className="flex flex-col gap-3 rounded-sm p-4 md:p-10 pb-20 w-full">
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('id')}
          value={<span>{review.id}</span>}
          className="flex-row items-center gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <CloseIcon
          className="w-6 h-6 cursor-pointer flex-shrink-0"
          onClick={() => setIsOpen(false)}
        />
      </RenderRow>
      <RenderRow className="justify-between ">
        <TargetTypeBadge
          targetType={review.targetType}
          className="truncate block flex gap-1 items-center capitalize"
        />
        <FilterSelect
          key={'status'}
          value={selectedStatus}
          options={statusOptions}
          onValueChange={handleStatusChange}
          triggerClassName="w-[230px]"
          contentClassName="w-[200px]"
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
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('author')}
          value={
            <RenderUser user={review.author} imgClassName="w-[38px] h-[38px]" />
          }
        />
        <RenderField
          label={t('relatedTo')}
          value={
            <span>
              {review.targetType === 'USER' && (
                <RenderUser
                  user={review.targetName}
                  imgClassName="w-[20px] h-[20px]"
                  isRenderNameOnly={false}
                />
              )}
              {review.targetType === 'ORGANIZATION' && (
                <Link
                  href={`/organization/${review.targetName?.id}/profile`}
                  className="block hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
                >
                  {review.targetName?.name}
                </Link>
              )}
              {review.targetType === 'PLATFORM' && (
                <Link
                  href="/about"
                  className="block hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
                >
                  {review.targetName?.name}
                </Link>
              )}
            </span>
          }
          className="flex-none items-start gap-2 w-[230px]"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
      </RenderRow>
      <RenderRow className="mb-5">
        <RenderField
          label={t('review')}
          value={
            <span className="block" title={review.comment}>
              {review.comment}
            </span>
          }
          className="flex-col items-start gap-2 pr-4 md:max-h-[176px] overflow-y-auto"
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
