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
      <p className="text-center p-6 text-gray-500 h-[235px]">
        {t('otherTask.noTasks')}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Slider
        items={displayedTasks}
        itemsPerSlide={itemsPerSlide}
        renderItem={(task) => <OtherTaskItem key={task.id} {...task} />}
        listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
      />
    </div>
  );
};
