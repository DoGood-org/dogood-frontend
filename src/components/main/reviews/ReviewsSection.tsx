'use client';

import EarthBgDesktop from '@/assets/images/reviews/bg-reviews-dark-d.png';
import EarthBgMobile from '@/assets/images/reviews/bg-reviews-dark-m.png';
import EarthBgTablet from '@/assets/images/reviews/bg-reviews-dark-t.png';
import { Section } from '@/components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const ReviewsSection: React.FC = () => {
  const t = useTranslations('reviews');
  const listItems = t.raw('rev') as any[];
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');
  const bgImage = isMobile
    ? EarthBgMobile
    : isTablet
      ? EarthBgTablet
      : EarthBgDesktop;

  return (
    <Section>
      <div className="relative flex flex-col sm:h-[1691px] md:h-[1189px] lg:h-[1020px]">
        <Image
          src={bgImage}
          alt="Earth"
          className="relative object-top object-cover sm:w-[394px] sm:h-[219px] md:w-[648px] md:h-[360.19px] lg:w-full lg:h-[1020px] lg:object-[-250px]"
          priority
        />
        <h2 className="absolute flex font-montserrat text-white w-auto h-auto justify-end flex-wrap text-h1 text-line-h1 md:ml-[280px] md:w-[353px] md:h-[96px] md:inset-y-[24px] lg:mt-[22px] lg:ml-0 lg:w-[625px] lg:inset-x-[525px] lg:text-h3-d lg:leading-h3-d">
          People say about<span className="flex indent-2 text-border">Do</span>
          Good
        </h2>
        <div className="absolute gap-[24px] grid sm:grid-cols-[353px] sm:mt-[220px] md:grid-cols-[312px] md:gap-[20px] md:mt-[200px] lg:grid-cols-[312px] lg:w-[650px] lg:min-h-[840px] lg:ml-[600px] lg:mt-0 lg:scale-70">
          {listItems.map((item, index) => (
            <div
              key={`${index}-${item.author}`}
              className={`relative flex flex-col rounded-[12px] p-[32px] shadow-[0px_4px_4px_0px_#00000040] ${index % 2 === 0 ? `${item.styles}` : `${item.styles}`}`}
            >
              <p className="flex w-fit h-fit mb-[10px] font-montserrat leading-base">
                {item.review}
              </p>
              <p className="flex w-fit h-fit font-montserrat font-semibold leading-base">
                {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
