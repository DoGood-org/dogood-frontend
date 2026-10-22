'use client';

import { JSX } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useRouter } from 'next/navigation';
import { TaskActionButtons } from '@/components/tasks/taskPage/ButtonGroup/TaskActionButtons';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { authStore } from '@/zustand/stores/authStore';

export const TaskItem = ({
  id,
  title,
  subtitle,
  category,
  location,
  status,
  isHost,
}: IExtendedITaskProps): JSX.Element => {
  const { setActivePanel } = useMapStore();
  const isLoggedIn = authStore((s) => s.isLoggedIn);

  const router = useRouter();

  return (
    <div
      className="min-h-[200px] relative w-full py-6"
      onClick={() => {
        router.push(`/tasks/${id}`);
        setActivePanel(null);
      }}
    >
      <h3 className="text-base underline lg:text-reg font-normal mb-3 cursor-pointer">
        {title}
      </h3>
      <h4 className="text-base mb-5 md:mb-3 lg:mb-5">{subtitle}</h4>
      <div className="relative">
        <IconButtonGroup
          categories={category}
          showDivider={false}
          location={location}
          showFavorite={isLoggedIn}
          taskId={id}
          onAfterMapClick={() => setActivePanel(null)}
        />
      </div>
      <div className="flex justify-between mb-6">
        <TaskActionButtons
          taskId={id}
          category={category}
          isHost={isHost ?? false}
          taskStatus={status}
        />
      </div>
      <div className="w-full bg-[#999999] h-[1px]" />
    </div>
  );
};
