'use client';
import React from 'react';
import mocks from './mock.json';
import { Section } from '../ui/Section';
import HeroReviewsDesck from '@/assets/images/reviews/hero-reviews-desck.png';
import HeroReviewsMob from '@/assets/images/reviews/hero-reviews-mob.png';
import { useMediaQuery } from '@/hooks';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UserItem } from './UserItem';
import bgMobile from '@/assets/images/reviews/bgMob.png';
import bgTablet from '@/assets/images/reviews/bgTabl.png';
import bgDesktop from '@/assets/images/reviews/bgDesck.png';

export const UsersList = (): React.JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const t = useTranslations('reviews');

  const heroImage = isMobile ? HeroReviewsMob : HeroReviewsDesck;

  const backgroundImage = isMobile ? bgMobile : isTablet ? bgTablet : bgDesktop;
  return (
    <Section>
      <div className="fixed inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 bg-transparent">
        <h1 className="mb-2 text-h2 md:text-[40px] lg:text-h2-d">
          {t('taskMembers')}
        </h1>

        <div className="lg:flex justify-between lg:gap-6 ">
          <div className="lg:flex-1/2 lg:order-2">
            <Image
              src={heroImage}
              alt={t('imageHeroAlt')}
              width={isMobile ? 353 : isTablet ? 648 : 628}
              height={isMobile ? 219 : isTablet ? 442 : 642}
              className="rounded-xl object-fill mb-8"
            />
          </div>
          <div className="lg:flex-1/2 lg:order-1 md:mb-4 h-dvh reviews-scrollbar">
            <div className="pl-4 md:pl-5">
              <ul className="flex flex-col gap-6">
                {mocks.map((user) => (
                  <li key={user.id} className="flex pointer-events-auto">
                    <UserItem user={user} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
