'use client';
import { Close } from '@/components/icons';
import React, { FC, JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { IExtendedCategoryFilter } from '@/types/filter.type';
import { CategoryFilter } from './CategoryFilter';
import { DistanceFilter } from './DistanceFilter';

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
    <div
      className={`flex flex-col h-full px-5 pt-9 pb-10 lg:px-12 ${className}`}
    >
      <div className="flex justify-between align-text-bottom mb-3">
        <h3 className="text-h3 pl-3">{t('title')}</h3>

        <Close
          className="w-[24px] h-[24px] stroke-white"
          onClick={() => setActivePanel(null)}
        />
      </div>
      <div className="flex-1 pl-3 h-full overflow-y-auto overflow-x-hidden custom-scrollbar-hide">
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
            className="w-[104px] border border-transparent hover:border-btn-outline-hover focus:border-btn-outline-hover"
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
