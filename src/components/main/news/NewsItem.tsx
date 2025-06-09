import Image from 'next/image';
import React from 'react';

type Props = {
  id: string;
  title: string;
  img: string;
  date: string;
};
export const NewsItem: React.FC<Props> = (props) => {
  return (
    <div className="news-item">
      <h2>{props.title}</h2>
      <Image src={props.img} alt={props.title} width={500} height={300} />
      <span>{new Date(props.date).toLocaleDateString()}</span>
    </div>
  );
};
export default NewsItem;
