'use client';
import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface NotFoundProps {
  scrImg: string | StaticImport;
  title: string;
  description: string;
  className: string;
}
export const NotFoundComponent: React.FC<NotFoundProps> = ({
  scrImg,
  title,
  description,
  className,
}) => {
  return (
    <div className={`lg:flex lg:items-center ${className}`}>
      <Image
        src={scrImg}
        alt="NotFound image"
        className="lg:flex-1/2 lg:order-last"
      />
      <div className="lg:flex lg:flex-col lg:w-[628px]">
        <h2 className="text-h3 md:text-lg lg:text-h3-d text-foreground mb-4">
          {title}
        </h2>
        <p className="text-base lg:text-h3 text-foreground">{description}</p>
      </div>
    </div>
  );
};
