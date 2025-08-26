import { fetchNews, NewsItem } from '@/components';

const NewsPage: React.FC = async () => {
  const news = await fetchNews();
  return (
    <div
      className=" 
      bg-background
      px-[4px]
      pt-[168px]
      pb-[64px]
      my-container
      w-full
      min-h-[calc(100dvh-188px)]
      text-foreground  
  "
    >
      {' '}
      <div
        className="
          grid 
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6 
        "
      >
        {news.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
