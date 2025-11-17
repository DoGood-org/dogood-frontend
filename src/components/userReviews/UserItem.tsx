'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { useTranslations } from 'next-intl';
import { UserNoAvatar } from '../account/accountPage/UserNoAvatar';
import ReviewsFormModal from './ReviewsFormModal';
import { IUserItemProps } from '@/types/userReviewsType';

export const UserItem: React.FC<IUserItemProps> = ({
  user: { name, avatar, rating },
}): React.JSX.Element => {
  const t = useTranslations('reviews');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-[337px] md:flex-row md:w-[628px] lg:w-[606px] md:gap-6 bg-card rounded-xl p-8 md:p-4 lg:p-6 items-center">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={273}
          height={273}
          className="rounded-[10px] object-cover w-[273px] h-[273px] md:w-[150px] md:h-[150px] object-cover shrink-0"
        />
      ) : (
        <UserNoAvatar className="rounded-[10px] w-[273px] h-[273px] md:w-[150px] md:h-[150px] object-cover shrink-0" />
      )}
      <div className="flex flex-col gap-8 w-full md:gap-0 md:items-stretch md:h-[150px]">
        <span className="flex flex-col gap-2 justify-start md:flex-row md:justify-between lg:justify-start md:items-center w-full">
          <h2 className="text-h2-m md:text-base md:ml-1 lg:text-h3">
            <span className="block">{name}</span>
          </h2>
          <Rating rating={rating} className="p-2 block md:p-1 lg:p-2" />
        </span>
        <div className="flex justify-between md:gap-3 lg:gap-6 md:justify-end mt-auto lg:text-base">
          <Button
            variant="secondary"
            className="px-5 md:px-2 h-[38px] lg:h-12 text-xs lg:text-base lg:px-6"
          >
            {t('seeProfile')}
          </Button>
          <Button
            variant="primary"
            className="px-5 md:px-2 h-[38px] lg:h-12 text-white text-xs lg:text-base lg:px-6"
            onClick={(): void | undefined => setIsOpen(true)}
          >
            {t('sendReview')}
          </Button>
        </div>
      </div>
      {isOpen && (
        <ReviewsFormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={{ rating, name, avatar }}
        />
      )}
    </div>
  );
};
