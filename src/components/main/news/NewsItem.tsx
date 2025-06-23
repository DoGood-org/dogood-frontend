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
    return <div className="text-center text-gray-500">{t('noNewsItem')}</div>;
  }

  const navigateToNewsItem = (): void => {
    router.push(`/news/${props.item.id}`);
  };

  return (
    <div
 
      tabIndex={0}
      onClick={navigateToNewsItem}
      key={props.item.id}
      className="mx-auto news-item w-[300px] flex flex-col  p-[20px] border-1 border-[var(--text-gray)] rounded-lg shadow-md cursor-pointer"
    >
      <div className="mx-auto mb-[24px] relative rounded-lg w-[260px] h-[198px] overflow-hidden">
        {props.item.img && (
          <Image
            src={props.item.img}
            alt={props.item.title}
            width={260}
            height={198}
          />
        )}
      </div>
      <h2 className=" mb-[48px] roboto text-[20px] font-normal leading-6 line-clamp-2">
        {props.item.title}
      </h2>
      <p className="text-left mb-1">{props.item.category}</p>
      <div className="flex text-[14px] items-center">
        <span>
          {props.item.date
            ? new Date(props.item.date).toLocaleDateString('en-US', {
                month: 'short', 
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })
            : ''}
        </span>
        <span className="w-[4px] h-[4px] bg-white rounded-full line-clamp-1 mx-1" />
        {props.item.tags && props.item.tags.length > 0 && (
          <span className="line-clamp-1"> #{props.item.tags.join(' #')}</span>
        )}
      </div>
    </div>
  );
};
