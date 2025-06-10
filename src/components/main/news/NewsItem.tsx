import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  id: string;
  title: string;
  img: string | StaticImageData;
  date: string;
};
export const NewsItem: React.FC<Props> = (props) => {
  return (
    <div className="news-item flex flex-col items-center p-4 border-1 border-[var(--text-gray)] rounded-lg shadow-md">
      <h2>{props.title}</h2>
      <Image src={props.img} alt={props.title} width={260} height={198} />
      <span>{new Date(props.date).toLocaleDateString()}</span>
    </div>
  );
};
export default NewsItem;
