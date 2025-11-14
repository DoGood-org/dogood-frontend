'use client';
import React, { useState } from 'react';
import mocks from './mock.json';
import { Section } from '../ui/Section';
import { ReviewsForm } from './ReviewsForm';
import HeroReviewsDesck from '@/assets/images/reviews/Hero-reviews-desck.png';
import HeroReviewsTabl1 from '@/assets/images/reviews/hero-reviews-tabl1.png';
import HeroReviewsMob from '@/assets/images/reviews/Hero-reviews-mob.png';
import { useMediaQuery } from '@/hooks';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UserItem } from './UserItem';
import bgMobile from '@/assets/images/reviews/bgMob.png';
import bgTablet from '@/assets/images/reviews/bgTabl.png';
import bgDesktop from '@/assets/images/reviews/bgDesck.png';

export const UsersList = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const t = useTranslations('reviews');

  const heroImage = isMobile
    ? HeroReviewsMob
    : isTablet
      ? HeroReviewsTabl1
      : HeroReviewsDesck;

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
        <h1 className="mb-2 text-h2 lg:text-h2-d">{t('taskMembers')}</h1>

        <div className="md:flex">
          <div className="md:flex-1/2 md:order-2">
            <Image
              src={heroImage}
              alt={t('imageHeroAlt')}
              width={isMobile ? 353 : isTablet ? 317 : 628}
              height={isMobile ? 219 : isTablet ? 325 : 642}
              className="rounded-xl object-fill mb-5 md:mb-6 lg:mb-0"
            />
          </div>
          <div className="md:flex-1/2 md:order-1 h-90 lg:h-dvh reviews-scrollbar">
            <div className="pl-1">
              <ul className="flex flex-col gap-4">
                {mocks.map((user) => (
                  <li
                    key={user.id}
                    className="flex gap-2 pointer-events-auto"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <UserItem user={user} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen z-9991 flex items-center justify-center bg-text-help/90 overflow-y-auto py-40">
          <div className="my-container bg-background pt-10 pb-10 relative mx-auto rounded-xl">
            <ReviewsForm isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </Section>
  );
};
