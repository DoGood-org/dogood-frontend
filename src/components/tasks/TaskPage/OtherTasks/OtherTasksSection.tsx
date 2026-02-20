'use client';

import { useTranslations } from 'next-intl';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { OtherTaskList } from './OtherTaskList';

type Props = {
  tasks: IExtendedITaskProps[];
  className?: string;
};

export const OtherTasksSection: React.FC<Props> = ({ tasks }) => {
  const t = useTranslations('tasks');

  return (
    <section className="mb-2 mt-2 md:mb-10 md:mt-10">
      <h2 className="hidden md:flex text-h3 mb-5">
        {t('otherTask.otherTask')}
      </h2>
      <OtherTaskList tasks={tasks} />
    </section>
  );
};
