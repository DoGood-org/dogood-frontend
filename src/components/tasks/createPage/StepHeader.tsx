'use client';

import { JSX } from 'react';
import Abstract from '../../../assets/images/donation/abstract.png';
import Image from 'next/image';

interface StepHeaderProps {
  step: number;
  title?: string;
  titleClassName?: string;
}

export const StepHeader = ({
  step,
  title = 'Create your next task',
  titleClassName = 'text-lg mb-8 lg:pl-40',
}: StepHeaderProps): JSX.Element => {
  return (
    <div className="relative flex flex-col md:flex-row justify-between w-full gap-4">
      <h2 className={titleClassName}>{title}</h2>
      <div
        className="absolute top-[20px] right-[0px]
        md:-top-[30px] md:-right-[40px] lg:-top-[70px] lg:-right-[90px] 
        flex flex-shrink-0 w-[138px] md:w-[178px] lg:w-[248px] lg:h-[248px]
        aspect-square mx-auto md:mx-0 rounded-full overflow-hidden"
      >
        <Image
          src={Abstract}
          alt="Abstract circular lines decoration"
          fill
          className="inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-5 md:inset-10 lg:inset-9 flex justify-center items-baseline text-[#00c1ac] font-semibold">
          <span className="text-[34px] lg:text-[60px]">Step</span>
          <span className="text-[68px] lg:text-[120px] font-sans leading-none">
            {step}
          </span>
        </div>
      </div>
    </div>
  );
};
