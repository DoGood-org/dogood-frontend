'use client';
import { INewsItem } from '@/types/news.interface';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NewsItemProps {
  item: INewsItem;
}

export const NewsItem: React.FC<NewsItemProps> = (props: NewsItemProps) => {
  const t = useTranslations('news');
  const router = useRouter();

  if (!props.item || !props.item.id || !props.item.title) {
    return (
      <div className="text-center text-gray-500">
        {t('newsItem.notFoundTitle')}
      </div>
    );
  }

  const navigateToNewsItem = (): void => {
    router.push(`/news/${props.item.id}`);
  };

  return (
    <div
      tabIndex={0}
      onClick={navigateToNewsItem}
      key={props.item.id}
      className="
      mx-auto w-[300px] h-[425px] p-5 flex flex-col justify-between rounded-lg shadow-md cursor-pointer 
      border border-text-gray hover:border-btn-hover
      transition-colors duration-200
    "
    >
      <div className="mx-auto mb-[25px] relative rounded-lg w-[260px] h-[198px] overflow-hidden">
        {props.item.image && (
          <Image
            src={props.item.image}
            alt={props.item.title}
            width={260}
            height={198}
          />
        )}
      </div>
      <h3 className=" mb-[53px] text-md font-normal line-clamp-2">
        {props.item.title}
      </h3>
      <p className="text-left mb-1 text-base  mt-auto">{props.item.category}</p>
      <div className="flex text-sm items-center gap-3">
        <span className="text-nowrap">
          {props.item.createdAt
            ? new Date(props.item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })
            : ''}
        </span>
        <span className="w-1 h-1 bg-white rounded-full line-clamp-1" />
        {props.item.tags && props.item.tags.length > 0 && (
          <span className="capitalize line-clamp-1">
            #{props.item.tags.join(' #')}
          </span>
        )}
      </div>
    </div>
  );
};
