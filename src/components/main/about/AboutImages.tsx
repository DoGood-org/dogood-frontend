import Image from 'next/image';
import { images } from '@/assets/images/about/import';
import { AboutSectionProps } from '@/types';

function getAreaClass(area: string): string {
  switch (area) {
    case 'img1':
      return 'col-start-1 col-span-2 w-full row-start-1 xl:w-[565px] xl:h-[269px]';
    case 'img2':
      return 'col-start-1 row-start-2 xl:col-start-3 xl:row-start-1 xl:w-[274px] xl:h-[269px]';
    case 'img3':
      return 'col-start-2 xl:col-start-1 row-start-2 xl:w-[402px] xl:h-[347px]';
    case 'img4':
      return 'col-start-1 col-span-2 w-full row-start-3 xl:col-start-2 xl:row-start-2 xl:w-[441px] xl:h-[347px]';
    default:
      return '';
  }
}

export const AboutImages = ({
  activeData,
}: {
  activeData: AboutSectionProps;
}): React.JSX.Element => {
  const areas = ['img1', 'img2', 'img3', 'img4'];

  return (
    <div className="grid grid-cols-[1fr_1fr] xl:grid-cols-[402px_143px_274px]  grid-rows-[168px_159px_278px] xl:grid-rows-[269px_347px] gap-4 xl:gap-6">
      {activeData.img.map((imgKey, idx) => {
        const area = areas[idx] || 'img1';

        return (
          <div
            key={idx}
            className={`overflow-hidden rounded-xl shadow object-cover ${getAreaClass(area)}`}
          >
            <Image
              src={images[imgKey]}
              alt={`${activeData.title} - image ${idx + 1}`}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};
