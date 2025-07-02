'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components';
import React from 'react';


export const ReviewsSection: React.FC = () => {
  const t = useTranslations('reviews');
  const listItems = t.raw('rev') as any[];

  return (
    <Section>

      <div className="flex bg-no-repeat flex-col sm:relative sm:min-w-[394px] sm:h-[1691px] sm:bg-top sm:bg-[length:394px_219px] sm:bg-[url('../../assets/images/reviews/bg-reviews-dark-m.png')] md:relative md:min-w-[648px] md:h-[1189px] md:bg-top md:bg-[length:647.67px_360px] md:bg-[url('../../assets/images/reviews/bg-reviews-dark-t.png')] lg:relative lg:max-w-[1440px] lg:h-[1020px] lg:bg-cover lg:bg-center lg:bg-[url('../../assets/images/reviews/bg-reviews-dark-d.png')]">

        <h2 className="absolute flex font-normal font-montserrat tracking-normal text-white sm:w-[353px] sm:h-[96px] sm:justify-end sm:flex-wrap sm:inset-x-[20px] sm:inset-y-[12px] sm:text-h1 sm:leading-h1 md:w-[353px] md:h-fit md:inset-x-[295px] md:inset-y-[24px] md:justify-end md:flex-wrap md:text-h1 md:leading-h1' lg:w-[625px] lg:h-[64px] lg:inset-x-[525px] lg:inset-y-[52px] lg:text-h3-d lg:leading-h2-d' ">People say about<div className="flex w-fit"><span className="flex indent-2 text-border">Do</span><span>Good</span></div></h2>
        <ul className="absolute flex flex-row-reverse flex-wrap sm:inset-x-[30px] sm:inset-y-[223px] sm:w-[353px] sm:max-h-[1448px] sm:gap-[24px] sm:scale-95 md:gap-[20px] md:inset-x-[10px] md:inset-y-[213px] md:w-[648px] md:max-h-[976px] md:scale-95 lg:inset-x-[480px] lg:inset-y-[100px] lg:w-[720px] lg:h-[840px] lg:gap-[24px] lg:scale-85">
          {listItems.map((item, index) => (
            <li key={`${index}-${item.background}`} className=
              {`flex flex-col sm:w-[353px] sm:min-h-[256px] md:w-[312px] md:min-h-[280px] lg:w-[347px] lg:min-h-[256px] rounded-[12px] p-[32px] shadow-[0px 4px 4px 0px #00000040] ${index === 0 && 'sm:order-1 sm:bg-background md:bg-background md:order-2 md:relative md:inset-y-[160px] lg:relative lg:inset-y-0 lg:order-1 lg:bg-header-bg'} ${index === 2 && 'sm:order-2 sm:bg-tag md:bg-tag md:order-3 lg:order-3 lg:bg-tag'} ${index === 4 && 'sm:order-3 sm:bg-background md:bg-background md:order-5 lg:order-5 lg:bg-header-bg'} ${index === 1 && 'sm:order-4 sm:bg-tag md:bg-tag md:order-4 md:relative md:inset-y-[160px] lg:relative lg:inset-y-[160px] lg:order-2 lg:bg-tag'} ${index === 3 && 'sm:order-5 sm:bg-background md:bg-background md:order-1 lg:relative lg:inset-y-[160px] lg:order-4 lg:bg-header-bg'}`}><p className="flex w-fit h-fit my-[10px] font-montserrat font-normal text-white text-base leading-base tracking-normal">{item.review}</p>
              <p className="flex w-fit h-fit font-montserrat font-semibold text-white text-base leading-base tracking-normal">{item.author}</p></li>
          ))}
        </ul>
      </div>

    </Section >
  );
};

