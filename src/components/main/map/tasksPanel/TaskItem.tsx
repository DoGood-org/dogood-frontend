'use client';

import { JSX } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useRouter } from 'next/navigation';
import { TaskActionButtons } from '@/components/tasks/taskPage/ButtonGroup/TaskActionButtons';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { authStore } from '@/zustand/stores/authStore';

type TaskItemProps = IExtendedITaskProps & { mapOnMain?: boolean };

export const TaskItem = ({
  id,
  title,
  description,
  category,
  location,
  status,
  isHost,
  mapOnMain = true,
}: TaskItemProps): JSX.Element => {
  const { setActivePanel } = useMapStore();
  const isLoggedIn = authStore((s) => s.isLoggedIn);

  const router = useRouter();

  return (
    <div
      className="relative w-full py-6"
      onClick={() => {
        router.push(`/tasks/${id}${mapOnMain ? '' : '?from=profile'}`);
        setActivePanel(null);
      }}
    >
      <h3 className="text-base underline line-clamp-1 lg:text-reg font-normal mb-3 cursor-pointer">
        {title}
      </h3>
      <h4 className="text-base line-clamp-1 mb-5 md:mb-3 lg:mb-5">
        {description}
      </h4>
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
      <div className="flex w-full justify-center mb-6">
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
