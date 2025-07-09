import React from 'react';
import Image from 'next/image';
import ButtonPanel from './ButtonPanel';
import { NotFoundProps } from '@/types/errorType';
import Link from 'next/link';

export const NotFoundComponent: React.FC<NotFoundProps> = ({
  scrImg,
  title,
  description,
  text,
  variantBtn1,
  hrefBtn1,
  variantBtn2,
  hrefBtn2,
  handleResetBtn,
  nameBtn1,
  nameBtn2,
  stuckText,
}) => {
  return (
    <div className="flex flex-col items-center mx-auto mb-4 md:mb-10 lg:flex-row lg:items-center">
      <Image
        src={scrImg}
        alt="Error image"
        className="lg:flex-1/2 lg:order-last"
        priority
      />
      <div className="lg:flex lg:flex-col lg:w-[628px]">
        <h2 className="text-h2-m md:text-h2 md:text-center lg:text-start lg:text-h2-d text-foreground mb-4 md:mb-6">
          {title}
        </h2>
        <p className="text-base lg:text-h3 text-foreground">{description}</p>
        <p className="text-base lg:text-h3 text-foreground mb-8 md:mb-10">
          {text}
        </p>
        <ButtonPanel
          variantBtn1={variantBtn1}
          variantBtn2={variantBtn2}
          nameBtn1={nameBtn1}
          nameBtn2={nameBtn2}
          handleResetBtn={handleResetBtn}
          hrefBtn1={hrefBtn1}
          hrefBtn2={hrefBtn2}
        />
        <Link
          href="mailto:sturtup.dogood@gmail.com"
          className="text-xs md:text-base text-start mt-4 md:mt-10"
          passHref
        >
          {stuckText}
        </Link>
      </div>
    </div>
  );
};
