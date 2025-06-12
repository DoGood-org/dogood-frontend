import Image from 'next/image';
import { images } from '@/assets/images/about/import';
import { AboutSectionProps } from '@/types';

function getAreaClass(area: string): string {
  switch (area) {
    case 'img1':
      return 'col-start-1 row-start-1 w-[565px] h-[269px]';
    case 'img2':
      return 'col-start-3 row-start-1 w-[274px] h-[269px]';
    case 'img3':
      return 'col-start-1 row-start-2 w-[402px] h-[347px]';
    case 'img4':
      return 'col-start-2 row-start-2 w-[441px] h-[347px]';
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
    <div className="grid grid-cols-[402px_143px_274px] grid-rows-[269px_347px] gap-6">
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
