import { Section } from '@/components/ui/Section';
import { getAllTasksService } from '@/services/taskService';
import { JSX } from 'react';
import { AdminTabs } from '@/components/admin/navigation/AdminTabs';
import { TasksList } from './TasksList';
import { IAdminTask } from '@/types/admin';

export const TasksPage = async (): Promise<JSX.Element> => {
  const result = await getAllTasksService();

  const tasks: IAdminTask[] = result.ok ? result.data.data.tasks : [];
  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-156.75 lg:min-h-234.75 mb-15.75 md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      <AdminTabs />
      <TasksList tasks={tasks} />
    </Section>
  );
};
