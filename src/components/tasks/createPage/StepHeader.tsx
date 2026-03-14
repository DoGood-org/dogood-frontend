'use client';

import { JSX } from 'react';
import Abstract from '../../../assets/images/donation/abstract.png';
import Image from 'next/image';
import { STEP_IDS, StepId } from '@/constants/stepIds';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';

interface StepHeaderProps {
  stepId: StepId;
  title?: string;
  titleClassName?: string;
}

export const StepHeader = ({
  stepId,
  title = 'Create your next task',
  titleClassName = 'text-lg mb-8 lg:pl-40',
}: StepHeaderProps): JSX.Element => {
  const currentStepIndex = CREATE_TASK_STEPS.findIndex((s) => s.id === stepId);
  const stepNumber = currentStepIndex;
  const isOwnerStep = stepId === STEP_IDS.OWNER;

  return (
    <div className="relative flex flex-col md:flex-row justify-between w-full gap-4">
      <h2 className={titleClassName}>{title}</h2>
      {!isOwnerStep && (
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
              {stepNumber}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
