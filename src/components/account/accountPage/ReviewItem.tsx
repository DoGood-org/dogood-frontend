import { Rating, UserNoAvatar } from '@/components';
import { More } from '@/components/icons';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { formatDate } from '@/lib/formateDate';
import { ReviewItemProps } from '@/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

export const ReviewItem = ({ review }: ReviewItemProps): JSX.Element => {
  const { rating, comment, createdAt, owner } = review;
  const locale = useLocale();
  const isAccountPage = useRouteMatch('/account');

  const formattedDate = formatDate(createdAt, locale);

  return (
    <div className="bg-card p-8 rounded-lg flex flex-col md:flex-row md:gap-8">
      <div className="shrink-0 w-[263px] h-[263px] md:w-[160px] md:h-[160px] self-center md:self-start">
        {owner?.avatar ? (
          <Image
            src={owner.avatar}
            alt={`${owner.name} ${owner.avatar}`}
            width={263}
            height={263}
            className="w-[263px] h-[263px] md:w-[160px] md:h-[160px] object-cover rounded-lg self-center md:self-start"
          />
        ) : (
          <UserNoAvatar className="w-[263px] h-[263px] md:w-[160px] md:h-[160px] lg:w-[160px] lg:h-[160px]" />
        )}
      </div>
      <div className="grow-1">
        <div className="flex items-start h-[70px] md:h-8 mt-8 md:mt-0 justify-between">
          <div className="flex flex-col  md:flex-row gap-[10px] items-start md:items-center justify-start">
            <h3 className="text-h3">{owner?.name}</h3>
            <Rating rating={rating} />
          </div>
          {isAccountPage && (
            <button className="cursor-pointer text-foreground">
              <More className="w-[34px]" />
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-5 md:gap-[26px] lg:gap-2 lg:justify-between">
          <p className="whitespace-pre-line max-h-[96px] overflow-y-auto custom-scrollbar review-scrollbar text-base">
            {comment}
          </p>
          <span className="text-text-gray self-end text-nowrap">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
