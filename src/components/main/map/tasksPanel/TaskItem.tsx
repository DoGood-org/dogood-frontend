'use client';
import { Button } from '@/components/ui/Button';
import { IExtendedITaskProps } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';
import { useTaskStore } from '@/zustand/stores/taskStore';



export const TaskItem= ({ id,title, subtitle, category, isSelected, distance }: IExtendedITaskProps): JSX.Element => {
  const t = useTranslations('map');
  const { toggleTaskDescription } = useTaskStore();


  return (

      <div className="min-h-[200px]">
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
            onClick={() => { toggleTaskDescription(id)}}
            className={`bg-card text-[14px] w-[82px] px-3 ${isSelected ? 'clickedBtn' : ''}`}
          >
            {isSelected ? (
              <span>{t('joined')}</span>
            ) : (
              <span>{t('joinBtn')}</span>
            )}
          </Button>
        </div>
        <div className="w-full bg-[#999999] h-[1px]" />
      </div>
  );
};
