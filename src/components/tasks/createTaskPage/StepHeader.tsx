'use client';

import { JSX } from 'react';
import Abstract from '../../../assets/images/donation/abstract.png';
import Image from 'next/image';
import { STEP_IDS, StepId } from '@/constants/stepIds';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { useTranslations } from 'next-intl';

interface StepHeaderProps {
  stepId: StepId;
  title?: string;
  titleClassName?: string;
}

export const StepHeader = ({
  stepId,
  title,
  titleClassName = 'text-lg mb-8 lg:pl-40',
}: StepHeaderProps): JSX.Element => {
  const t = useTranslations('tasks.createTask');

  const currentStepIndex = CREATE_TASK_STEPS.findIndex((s) => s.id === stepId);
  const stepNumber = currentStepIndex;
  const isOwnerStep = stepId === STEP_IDS.OWNER;

  const displayTitle = title || t('title');

  return (
    <div className="relative flex flex-col md:flex-row justify-between w-full gap-4">
      <h2 className={titleClassName}>{displayTitle}</h2>
      {!isOwnerStep && (
        <div
          className="absolute top-[20px] right-[0px] aspect-square 
          md:-top-[30px] md:-right-[40px] lg:-top-[70px] lg:-right-[130px] 
          flex flex-shrink-0 w-[180px] md:w-[200px] lg:w-[280px] lg:h-[256px]
          mx-auto md:mx-0 rounded-full overflow-hidden"
        >
          <Image
            src={Abstract}
            alt="Abstract circular lines decoration"
            fill
            className="inset-0 w-full h-full object-cover opacity-80 z-10"
          />
          <div className="absolute inset-8 md:inset-11 lg:inset-9 flex items-baseline justify-center whitespace-nowrap text-[#00c1ac] font-semibold">
            <span className="text-[34px] lg:text-[60px] font-semibold">
              {t('step')}
            </span>
            <span className="text-[68px] lg:text-[120px] font-sans leading-none font-semibold">
              {stepNumber}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
