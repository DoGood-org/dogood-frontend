'use client';
import Image from 'next/image';
import React from 'react';
import ThankYouDesck from '@/assets/images/reviews/ThankYouDesck.png';
import ThankYouMob from '@/assets/images/reviews/ThankYouMob.png';
import { useMediaQuery } from '@/hooks';
import { Button } from '../ui/Button';

export const ThankYou = (): React.JSX.Element => {
  const isDescktop = useMediaQuery('(min-width: 1440px)');
  const heroImage = !isDescktop ? ThankYouMob : ThankYouDesck;

  return (
    <div className="space-y-4 bg-text-help p-8 rounded-xl">
      <div className="relative flex flex-col gap-8 justify-center items-center text-center">
        <Image
          src={heroImage}
          alt="Thank You"
          width={!isDescktop ? 300 : 420}
          height={!isDescktop ? 300 : 420}
          className="absolute -top-64 "
        />
        <p>You&apos;ve successfully left a review!</p>
        <div className="flex gap-5 justify-end">
          <Button
            variant="ghost"
            size="xl"
            type="submit"
            className="w-[119px] text-[#ffffff]"
          >
            Contact us
          </Button>
          <Button
            variant="primary"
            size="xl"
            className="w-[119px] text-[#ffffff]"
            type="button"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
};
