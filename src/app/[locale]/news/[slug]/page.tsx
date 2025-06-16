import { mockNews } from '@/components';
import { JSX } from 'react';

export default async function IdNewsItemPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;

  const newsItem = mockNews.find((item) => item.id === slug);

  if (!newsItem) {
    return (
      <div>
        <h1>News item not found</h1>
        <p>The requested news item does not exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-amber-500">
      <div className="my-container w-full min-h-[calc(100dvh-188px)]">
        <h2>{newsItem.title}</h2>
      </div>
    </div>
  );
}
