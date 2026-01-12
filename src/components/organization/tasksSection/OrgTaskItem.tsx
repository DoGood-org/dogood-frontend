'use client';

import {
  Animal,
  Clock,
  DateIcon,
  Food,
  Location,
  Medicine,
  Nature,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { formatDate, formatTime } from '@/lib/formateDate';
import { formatLocation } from '@/lib/formatLocation';
import { TaskItemProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

export const OrgTaskItem = ({ task }: TaskItemProps): React.JSX.Element => {
  const locale = useLocale();
  const t = useTranslations('organization');
  const {
    title,
    description,
    category,
    startDate,
    endDate,
    startTime,
    locationName,
  } = task;

  const categoryList = {
    medicine: <Medicine className="size-6" />,
    nature: <Nature className="size-6" />,
    animal: <Animal className="size-6" />,
    food: <Food className="size-6" />,
  };
  const taskInfo = [
    {
      icon: <DateIcon />,
      label: `${formatDate(startDate!, locale).slice(0, -4)} - ${formatDate(endDate!, locale)}`,
    },
    {
      icon: <Clock />,
      label: formatTime(startTime!, locale),
    },
    {
      icon: <Location />,
      label: formatLocation(locationName),
    },
  ];
  const reduceDescription =
    description.length > 50 ? description.slice(0, 50) + '...' : description;
  return (
    <>
      <div className="bg-card p-6 rounded-lg flex flex-col justify-between">
        <div className="mb-[28px]">
          <h3 className="text-h3 md:text-md mb-4">{title}</h3>
          <p className="whitespace-pre-line mt-6 text-base">
            {reduceDescription}
          </p>
        </div>
        <ul className="flex flex-col gap-5 mb-[28px]">
          {taskInfo.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.icon}
              <p className="text_tag text-base">{item.label}</p>
            </li>
          ))}
        </ul>
        <div
          className={`flex w-12 h-12 rounded-full justify-center items-center mb-[40px] bg-${category}`}
        >
          {categoryList[category]}
        </div>
        <div className="flex justify-between lg:gap-4">
          <Button
            variant="primary"
            className="w-[144px] md:w-[125px] lg:w-[174px]"
          >
            {t('tasks.donate')}
          </Button>
          <Button
            variant="secondary"
            className="w-[144px] md:w-[125px] lg:w-[174px]"
          >
            {t('tasks.edit')}
          </Button>
        </div>
      </div>
    </>
  );
};
