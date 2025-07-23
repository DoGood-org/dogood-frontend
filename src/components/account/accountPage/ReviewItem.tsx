import { Rating } from '@/components';
import { More } from '@/components/icons';
import { ReviewItemProps } from '@/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

// const formatDate = (dateString: string, locale: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat(locale, {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   }).format(date);
// };

const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const ReviewItem = ({ review }: ReviewItemProps): JSX.Element => {
  const { rating, comment, createdAt, owner } = review;
  //   console.log(owner);

  const locale = useLocale();

  const formattedDate = formatDate(createdAt, locale);

  return (
    <div className="bg-card p-8 rounded-lg flex flex-col md:flex-row md:gap-8">
      {owner.avatar && (
        <Image
          src={owner.avatar}
          alt={`${owner.name} ${owner.avatar}`}
          width={263}
          height={263}
          className="w-[263p] h-[263px] md:w-[160px] md:h-[160px] rounded-lg self-center md:self-start"
        />
      )}
      <div className="w-full">
        <div className="flex items-start mt-8 md:mt-0 justify-between">
          <div className="flex flex-col md:flex-row gap-[10px] items-start md:items-center justify-start">
            <h3 className="text-h3">{owner.name}</h3>
            <Rating rating={rating} />
          </div>
          <button className="cursor-pointer">
            <More className="w-[34px]" />
          </button>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-5 md:gap-[26px] lg:gap-2 lg:justify-between">
          <p className="text-base">{comment}</p>
          <span className="text-text-gray self-end ">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
