import { NewsItem } from '@/components';
import { fetchNews } from '@/services/newsFacade';
import { Tlocale } from '@/types';

type Props = {
  params: Promise<{ locale: Tlocale }>;
};

const NewsPage = async ({ params }: Props): Promise<React.ReactElement> => {
  const { locale } = await params;
  const news = await fetchNews(locale);
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
