'use client';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { GpsIcon } from '@/components/icons/GPSicon';
import { ButtonMap } from '@/components/main/map/ButtonMap';

export const TaskItem = ({
  id,
  title,
  subtitle,
  category,
  isSelected,
  distance,
}: IExtendedITaskProps): JSX.Element => {
  const t = useTranslations('map');
  const { joinTask, setHighlightedTaskId, highlightedTaskId } = useTaskStore();

  return (
    <div className="min-h-[200px] relative w-full py-6">
      <h3 className="text-base underline lg:text-xl font-normal mb-3">
        {title}
      </h3>
      <h4 className="text-base mb-5 md:mb-3 lg:mb-5">{subtitle}</h4>
      <div className="flex justify-between items-center mb-5 md:mb-3 lg:mb-5">
        <TaskCategoryIconsList categories={category} />
        {distance}
      </div>
      <div className="flex justify-between mb-6">
        <Button variant="primary" size="lg" className="text-[14px] w-[156px]">
          {t('donateBtn')}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            joinTask(id);
          }}
          className={`bg-card text-[14px] w-[82px] px-3 ${isSelected ? 'clickedBtn' : ''}`}
        >
          {isSelected ? (
            <span>{t('joined')}</span>
          ) : (
            <span>{t('joinBtn')}</span>
          )}
        </Button>
      </div>
      <ButtonMap
        className="absolute top-0 right-0 z-10 m-0"
        aria-label={t('showOnMap')}
        onClickHandler={() => {
          setHighlightedTaskId(id);
        }}
      >
        <GpsIcon className=" w-6 h-6" />
      </ButtonMap>
      <div className="w-full bg-[#999999] h-[1px]" />
    </div>
  );
};
