import Image from 'next/image';
import { images } from '@/assets/images/about/import';
import { AboutSectionProps } from '@/types';

const areaClasses: Record<string, string> = {
  img1: 'col-start-1 col-span-2 w-full row-start-1 lg:w-[442px] lg:h-[269px]',
  img2: 'col-start-1 row-start-2 md:col-start-3 md:row-start-1 xl:row-start-1 lg:w-[270px] lg:h-[269px]',
  img3: 'col-start-2 md:col-start-1 row-start-2 lg:w-[341px] lg:h-[347px]',
  img4: 'col-start-1 col-span-2 w-full row-start-3 md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-2 lg:w-[371px] lg:h-[347px]',
};

export const AboutImages = ({
  activeData,
}: {
  activeData: AboutSectionProps;
}): React.JSX.Element => {
  const areaKeys = ['img1', 'img2', 'img3', 'img4'];

  return (
    <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[285px_92px_194px] lg:grid-cols-[341px_77px_270px] grid-rows-[168px_159px_278px] md:grid-rows-[191px_243px] lg:grid-rows-[269px_347px] gap-4 md:gap-6 justify-center mt-8 md:mt-10">
      {activeData.img.map((imgKey, idx) => {
        const areaClass = areaClasses[areaKeys[idx]];

        return (
          <div
            key={`${idx}-${imgKey}`}
            className={`overflow-hidden rounded-xl shadow object-cover bg-image-bg ${areaClass}`}
          >
            {images[imgKey] && (
              <Image
                src={images[imgKey]}
                alt={`${activeData.title} - image ${idx + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
