'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { OtherTskItem, Slider } from '@/components';
import { useTranslations } from 'next-intl';

interface OtherListProps {
  tasks: IExtendedITaskProps[];
}

export const OtherTaskList: React.FC<OtherListProps> = ({ tasks }) => {
  const t = useTranslations('tasks');
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500 h-[235px]">
        {t('otherTask.noTasks')}
      </p>
    );
  }
  return (
    <Slider
      items={tasks}
      itemsPerSlide={3}
      renderItem={(task) => <OtherTskItem key={task.id} {...task} />}
      listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    />
  );
};
