import React, { JSX } from 'react';
import { mockOrganization } from '@/data/mockOrganization';
import Image from 'next/image';
import { Location } from '../icons';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export const UserTask = (): JSX.Element => {
  const task = mockOrganization[0].tasks[0];
  const locale = useLocale();
  const slug = task.id;
  return (
    <div className="flex flex-col mx-auto items-center  md:flex-row md:gap-8 w-full md:w-[567px] lg:w-[707px] p-6 mb-4">
      <Image
        src={task.avatar}
        alt={task.title}
        width={273}
        height={282}
        className="rounded-lg w-[273px] h-[282px] md:w-[130px] md:h-[120px] object-cover mb-8 md:mb-0"
      />
      <div className="md:w-full">
        <h3 className="text-h3 mb-3 font-bold">{task.title}</h3>
        <div className="flex gap-2 mb-3">
          <Location />
          <span className="text-sm">
            {task.locationName.country}, {task.locationName.city},{' '}
            {task.locationName.region}
          </span>
        </div>
        <div className="flex justify-end">
          <Link
            href={`/${locale}/tasks/${slug}`}
            className="text-base text-foreground"
          >
            See more...
          </Link>
        </div>
      </div>
    </div>
  );
};
