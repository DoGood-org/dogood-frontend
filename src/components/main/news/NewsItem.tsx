import { INewsItem } from '@/types/news.interface';
import Image from 'next/image';
import React from 'react';

type Props = {
  item: INewsItem;
};
export const NewsItem: React.FC<Props> = (props) => {
  const { id, title, img, date, tags, category } = props.item;
  if (!props.item || !props.item.id || !props.item.title) {
    return null;
  }

  return (
    <li
      key={props.item.id}
      className="news-item max-w-[300px] flex flex-col  p-[20px] border-1 border-[var(--text-gray)] rounded-lg shadow-md"
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
      <h2 className=" mb-[48px] roboto text-[20px] font-normal leading-6">
        {props.item.title}
      </h2>
      <p className="text-left mb-1">{props.item.category}</p>
      <p className="flex text-[14px] items-center gap-1 line-clamp-1 ">
        <span>
          {props.item.date
            ? new Date(props.item.date).toLocaleDateString()
            : ''}
        </span>
        <span className="w-[4px] h-[4px] bg-white rounded-full line-clamp-1 mx-2" />
        {props.item.tags && props.item.tags.length > 0 && (
          <span className="line-clamp-1"> #{props.item.tags.join(' #')}</span>
        )}
      </p>
    </li>
  );
};
export default NewsItem;
