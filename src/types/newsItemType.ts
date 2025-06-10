import { StaticImageData } from 'next/image';
export interface INewsItem {
  id: string;
  title: string;
  img: string | StaticImageData;
  date: string;
}
