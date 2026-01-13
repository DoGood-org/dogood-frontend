'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { useTranslations } from 'next-intl';
import { OtherTaskItem } from './OtherTaskItem';
import { Slider } from '@/components/ui/Slider';
import { useMediaQuery } from '@/hooks';

interface OtherListProps {
  tasks: IExtendedITaskProps[];
}

export const OtherTaskList: React.FC<OtherListProps> = ({ tasks }) => {
  const t = useTranslations('tasks');

  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  let itemsPerSlide: number;
  let displayedTasks: IExtendedITaskProps[];

  if (isDesktop) {
    itemsPerSlide = 3;
    displayedTasks = tasks;
  } else if (isTablet) {
    itemsPerSlide = 2;
    displayedTasks = tasks;
  } else {
    itemsPerSlide = 1;
    displayedTasks = tasks.slice(0, 5);
  }

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center p-6 text-[#696969] h-[235px]">
        {t('otherTask.noTasks')}
      </p>
    );
  }

  return (
    <div className="lg:pl-11 lg:pr-11">
      <Slider
        items={displayedTasks}
        itemsPerSlide={itemsPerSlide}
        renderItem={(task) => <OtherTaskItem key={task.id} {...task} />}
        listClassName="flex-row"
        itemClassName="flex-1 max-w-[350px] ml-2 mr-2 w-full 
        md:max-w-[310px] lg:max-w-[350px] lg:ml-6 lg:mr-6 p-0"
      />
    </div>
  );
};
