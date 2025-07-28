'use client';
import { Close } from '@/components/icons';
import React, { FC, JSX } from 'react';
import { useTranslations } from 'next-intl';
import { DistanceFilter, CategoryFilter } from '@/components';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { IExtendedCategoryFilter } from '@/types/filter.type';

type Props = {
  tasks: IExtendedITaskProps[];
  className?: string;
};
export const Filters: FC<Props> = ({ tasks, className }): JSX.Element => {
  const categories = useFilterStore(
    (state) => state.categories
  ) as IExtendedCategoryFilter[];

  const t = useTranslations('map');

  const { resetFilters } = useFilterStore();
  const { setActivePanel } = useMapStore();

  return (
    <div className={`flex flex-col h-full px-2 py-6 ${className}`}>
      <div className="flex justify-between align-text-bottom mb-3">
        <h3 className="text-h3">{t('title')}</h3>

        <Close
          className="w-[22px] h-[21px] stroke-foreground"
          onClick={() => setActivePanel(null)}
        />
      </div>
      <div className="flex-1 overflow-y-auto pl-3 w-full custom-scrollbar-tasks">
        <div className="flex flex-col pr-2">
          <CategoryFilter categories={categories as string[]} />
          <DistanceFilter />
        </div>
        <div className="flex gap-10">
          <Button
            variant="primary"
            className="w-[104px]"
            size="lg"
            onClick={() => setActivePanel(null)}
          >
            {t('applyBtn')}({tasks.length})
          </Button>
          <Button
            variant="secondary"
            className="w-[104px]"
            size="lg"
            onClick={() => {
              resetFilters();
              setActivePanel(null);
            }}
          >
            {t('cancelBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
