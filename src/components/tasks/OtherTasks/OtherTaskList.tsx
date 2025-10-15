'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { OtherTskItem } from '@/components';
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
    <ul className="flex gap-4">
      {tasks.map((task) => (
        <OtherTskItem key={task.id} {...task} />
      ))}
    </ul>
  );
};
