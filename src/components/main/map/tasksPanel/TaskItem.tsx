'use client';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useRouter } from 'next/navigation';
import { FavoriteToggleButton } from '@/components/tasks/taskPage/ButtonGroup/FavoriteToggleButton';
import { MapDotButton } from '@/components/tasks/taskPage/ButtonGroup/MapDotButton';
import { TaskCategoryList } from '@/components/tasks/createTaskPage/TaskCategoryList/TaskCategoryList';

export const TaskItem = ({
  id,
  title,
  subtitle,
  category,
  location,
}: IExtendedITaskProps): JSX.Element => {
  const t = useTranslations('map');

  const isJoined = useTaskStore(
    (s) => !!s.tasks.find((task) => task.id === id)?.isSelected
  );
  const joinTask = useTaskStore((s) => s.joinTask);
  const { setActivePanel } = useMapStore();

  const router = useRouter();

  return (
    <div
      className="min-h-[200px] relative w-full py-6"
      onClick={() => {
        router.push(`/tasks/${id}`);
        setActivePanel(null);
      }}
    >
      <h3 className="text-base underline lg:text-reg font-normal mb-3">
        {title}
      </h3>
      <h4 className="text-base mb-5 md:mb-3 lg:mb-5">{subtitle}</h4>
      <div className="flex justify-between items-center mb-5 md:mb-3 lg:mb-5">
        <TaskCategoryList categories={category} />
        <div className="flex gap-2 items-end">
          <FavoriteToggleButton taskId={id} variant="map" />
          <MapDotButton
            lat={location?.lat}
            lng={location?.lat}
            taskId={id}
            onAfterClick={() => setActivePanel(null)}
          />
        </div>
      </div>
      <div className="flex justify-between mb-6">
        <Button
          variant="primary"
          size="lg"
          className="text-[14px] w-[156px]"
          onClick={(e) => e.stopPropagation()}
        >
          {t('donateBtn')}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            joinTask(id);
          }}
          className={`bg-card text-[14px] w-[82px] px-3 ${isJoined ? 'clickedBtn' : ''}`}
        >
          <span>{isJoined ? t('joined') : t('joinBtn')}</span>
        </Button>
      </div>
      <div className="w-full bg-[#999999] h-[1px]" />
    </div>
  );
};
