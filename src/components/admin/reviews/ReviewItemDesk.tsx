import React, { JSX, useState } from 'react';
import { Approved, Pending, Star, Rejected } from '@/components/icons';
import { IReviewsItem } from '@/types/reviewType';
import { TargetTypeBadge } from './TargetTypeBadge';
import { ReviewAdminMenu } from './ReviewAdminMenu';
import { EditFormModal } from './EditFormModal';

export const ReviewItemDesk = ({
  review,
}: {
  review: IReviewsItem;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      key: 'id',
      content: (
        <span className="truncate" title={review.id}>
          {review.id}
        </span>
      ),
    },
    {
      key: 'targetType',
      content: (
        <span
          className="truncate block flex gap-1 items-center capitalize"
          title={review.targetType.toLowerCase()}
        >
          <TargetTypeBadge
            targetType={review.targetType}
            className="truncate block flex gap-1 items-center capitalize"
          />
        </span>
      ),
    },
    {
      key: 'author',
      content: (
        <span className="truncate block" title={review.author.name}>
          {review.author.name}
        </span>
      ),
    },
    {
      key: 'comment',
      content: (
        <span className="truncate block" title={review.comment}>
          {review.comment}
        </span>
      ),
    },
    {
      key: 'rating',
      content: (
        <span
          className="truncate block flex gap-1 items-center"
          title={review.rating.toString()}
        >
          {review.rating} <Star className="fill-transparent h-5 w-5" />
        </span>
      ),
    },
    {
      key: 'status',
      content: (
        <>
          {review.status === 'Under consideration' && (
            <Pending className="h-5 w-5" />
          )}
          {review.status === 'Confirmed' && <Approved className="h-5 w-5" />}
          {review.status === 'Rejected' && <Rejected className="h-5 w-5" />}
        </>
      ),
    },
    {
      key: 'date',
      content: (
        <span className="whitespace-nowrap flex w-full items-center justify-between">
          {new Date(review.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
          <span className="w-10 h-10 shrink-0" aria-hidden="true" />
        </span>
      ),
    },
  ];

  const handleRowClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const target = e.target as HTMLElement;

    if (target.closest('[data-radix-dropdown-menu-trigger]')) {
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        <ul
          tabIndex={0}
          className="lg:w-[1018px] overflow-hidden grid grid-cols-7 gap-2 lg:gap-4 bg-modal px-6 py-3 rounded-sm list-none w-full md:grid-cols-[60px_80px_80px_110px_60px_60px_80px] lg:grid-cols-[100px_150px_150px_250px_80px_80px_80px] hover:shadow-admin hover:border-[#00BC7D1A] focus:shadow-admin focus:border-[#00BC7D1A] cursor-pointer"
        >
          {columns.map((column) => (
            <li
              key={column.key}
              className="text-left overflow-hidden flex items-center lg:justify-start"
              onClick={handleRowClick}
            >
              {column.content}
            </li>
          ))}
        </ul>
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2"
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
