'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components';
import React from 'react';


export const ReviewsSection: React.FC = () => {
  const t = useTranslations('reviews');
  const listItems = t.raw('rev') as any[];
  return (
    <Section>

      <div className="relative flex bg-no-repeat flex-col sm:h-[1691px] sm:bg-top sm:bg-size-[394px_219px] sm:bg-[url('../../assets/images/reviews/bg-reviews-dark-m.png')] md:h-[1189px] md:bg-top md:bg-size-[648px_360px] md:bg-[url('../../assets/images/reviews/bg-reviews-dark-t.png')] lg:h-[1020px] lg:bg-left lg:bg-cover lg:bg-[url('../../assets/images/reviews/bg-reviews-dark-d.png')]">
        <div className="flex flex-col sm:w-[353px] sm:h-[1691px] sm:mt-[12px] md:w-[648px] md:h-[1189px] md:mt-[24px] lg:justify-end lg:w-[720px] lg:h-[1020px] lg:ml-[530px] lg:mt-[52px]">
          <h2 className="flex font-normal font-montserrat tracking-normal text-white sm:w-fit sm:h-fit sm:justify-end sm:flex-wrap sm:text-h1 sm:leading-h1 md:w-[353px] md:h-fit md:flex-wrap md:justify-end md:ml-[280px] md:text-h1 md:leading-h1 lg:w-[625px] lg:h-[64px] lg:ml-0 lg:text-h3-d lg:leading-h2-d">People say about<span className="flex indent-2 text-border">Do</span>Good</h2>
          <ul className="relative flex flex-row-reverse flex-wrap sm:mt-[147px] sm:w-[353px] sm:max-h-[1448px] sm:gap-[24px] sm:scale-95 md:gap-[20px] md:mt-[63px] md:w-[648px] md:max-h-[976px] md:scale-95 lg:w-[720px] lg:h-[840px] lg:gap-[24px] lg:scale-70">
            {listItems.map((item, index) => (
              <li key={`${index}-${item.author}`} className=
                {`flex flex-col shadow-[0px_4px_4px_0px_#00000040] sm:w-[353px] sm:min-h-[256px] md:w-[312px] md:min-h-[280px] lg:w-[347px] lg:min-h-[256px] rounded-[12px] p-[32px] ${index === 0 && 'sm:order-1 sm:bg-background sm:text-text_tag md:order-2 md:relative md:inset-y-[150px] md:bg-post md:text-white lg:relative lg:inset-y-0 lg:order-1 lg:text-white lg:bg-header-bg'} ${index === 2 && 'sm:order-2 sm:bg-tag sm:text-white md:bg-post_gray md:text-text_tag md:order-3 lg:order-3 lg:text-white lg:bg-tag'} ${index === 4 && 'sm:order-3 sm:bg-background sm:text-text_tag md:order-5 md:bg-post md:text-white lg:order-5 lg:text-white lg:bg-header-bg'} ${index === 1 && 'sm:order-4 sm:bg-tag sm:text-white md:order-4 md:relative md:bg-post_gray md:text-text_tag md:inset-y-[150px] lg:relative lg:inset-y-[160px] lg:order-2 lg:text-white lg:bg-tag'} ${index === 3 && 'sm:order-5 sm:bg-background sm:text-text_tag md:order-1 md:bg-post md:text-white lg:relative lg:inset-y-[160px] lg:order-4 lg:text-white lg:bg-header-bg'}`}><p className="flex w-fit h-fit mb-[10px] font-montserrat font-normal text-base leading-base tracking-normal">{item.review}</p>
                <p className="flex w-fit h-fit font-montserrat font-semibold text-base leading-base tracking-normal">{item.author}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </Section >
  );
};

