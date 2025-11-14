'use client';
import Image from 'next/image';
import React from 'react';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { useTranslations } from 'next-intl';

interface UserItemProps {
  user: { id: string; name: string; avatar: string; rating: number };
}
export const UserItem = ({
  user: { name, avatar, rating },
}: UserItemProps): React.JSX.Element => {
  const t = useTranslations('reviews');
  return (
    <div className="w-full h-26 flex gap-2 bg-card rounded-xl p-3 items-center">
      <Image
        src={avatar}
        alt={name}
        width={95}
        height={80}
        className="rounded-[10px] w-23.75 h-20 object-cover shrink-0"
      />
      <div className="flex flex-col justify-between">
        <span className="flex gap-1 justify-start text-center">
          <h2 className="text-xs">{name}</h2>
          <Rating rating={rating} className="gap-1" />
        </span>
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" className="text-xs px-2 h-7.5">
            {t('seeProfile')}
          </Button>
          <Button variant="primary" className="text-xs px-2 h-7.5 text-white">
            {t('sendReview')}
          </Button>
        </div>
      </div>
    </div>
  );
};
