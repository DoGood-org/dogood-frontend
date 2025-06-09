import NewsItem from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/newsItemType';

type Props = {
  news: INewsItem[];
};
export const NewsList: React.FC<Props> = (props) => {
  if (!props.news || props.news.length === 0) {
    return <div>No news available</div>;
  }
  return (
    <div>
      {props.news.map((item) => (
        <NewsItem key={item.id} {...item} />
      ))}
    </div>
  );
};
