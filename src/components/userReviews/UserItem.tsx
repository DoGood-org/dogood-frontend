'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { useLocale, useTranslations } from 'next-intl';
import { UserNoAvatar } from '../account/accountPage/UserNoAvatar';
import { IUserItemProps } from '@/types/userReviewsType';
import { ReviewsFormModal } from './ReviewsFormModal';
import { useRouter } from 'next/navigation';

export const UserItem: React.FC<IUserItemProps> = ({
  user: { id, name, avatar, rating },
}): React.JSX.Element => {
  const t = useTranslations('reviews');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleSeeProfile = (): void => {
    router.push(`${locale}/profile/${id}`);
  };
  return (
    <div className="flex flex-col w-[321px] md:flex-row md:w-[628px] lg:w-[677px] md:gap-6 bg-card rounded-xl p-4 md:p-6 lg:p-6 items-center">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={289}
          height={273}
          className="rounded-[10px] object-cover w-[289px] h-[273px] md:w-[120px] md:h-[120px] object-cover shrink-0 mb-8 md:mb-0"
        />
      ) : (
        <UserNoAvatar className="rounded-[10px] w-[289px] h-[273px] md:w-[120px] md:h-[120px] object-cover shrink-0 mb-8 md:mb-0" />
      )}
      <div className="flex flex-col gap-8 w-full md:gap-6 md:items-stretch md:h-[104px]">
        <span className="flex flex-col gap-2 justify-start md:flex-row md:justify-between lg:justify-start md:items-center w-full">
          <h3 className="text-h3 md:text-base md:ml-1 lg:text-h3">
            <span className="block">{name}</span>
          </h3>
          <Rating rating={rating} className="p-2 block md:p-1 lg:p-2" />
        </span>
        <div className="flex justify-between md:gap-3 lg:gap-6 md:justify-end mt-auto lg:text-base">
          <Button
            variant="secondary"
            className="px-5 md:px-2 h-[38px] lg:h-12 text-base lg:px-6"
            onClick={handleSeeProfile}
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
          user={{ id, rating, name, avatar }}
        />
      )}
    </div>
  );
};
