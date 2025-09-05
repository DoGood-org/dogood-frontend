import { LinkWithArrow } from '@/components';
import { Animal, Food, Medicine, Nature } from '@/components/icons';
import { TaskItemProps } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

export const AccountTaskItem = ({ task }: TaskItemProps): JSX.Element => {
  const { title, description, avatar, category } = task;
  const t = useTranslations('account');

  const categoryList = {
    medicine: <Medicine className="size-6" />,
    nature: <Nature className="size-6" />,
    animal: <Animal className="size-6" />,
    food: <Food className="size-6" />,
  };

  return (
    <div className="bg-card p-8 rounded-lg flex flex-col lg:flex-row md:gap-8 justify-between">
      <div className="flex flex-col md:flex-row">
        {avatar && (
          <Image
            src={avatar}
            alt={`${title} logo`}
            width={241}
            height={241}
            className="w-[241px] h-[241px] rounded-lg self-center md:self-start"
          />
        )}
        <div className="mt-8 md:mt-0 flex flex-col">
          <h3 className="text-h3">{title}</h3>
          <p className="whitespace-pre-line mt-6 text-base">{description}</p>
        </div>
      </div>
      <div className="flex lg:flex-col justify-end md:justify-between items-center">
        <div
          className={`hidden md:flex w-12 h-12 rounded-full justify-center items-center bg-${category}`}
        >
          {categoryList[category]}
        </div>
        <LinkWithArrow
          href=""
          text={t('accountButton')}
          className="self-end mt-7"
        />
      </div>
    </div>
  );
};
