'use client';

import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { Slider } from '@/components/ui/Slider';
import { useMediaQuery } from '@/hooks';
import { getStatusOptions } from '@/utils/getStatusOptions';
import { getCategoryOptions } from '@/utils/getCategoryOptions';
import { FilterPanel } from '../../ui/FilterPanel';
import { ActiveFiltersBar } from '../../ui/ActiveFiltersBar';
import TaskItemMob from './TaskItemMob';
import { TaskItemDesk } from './TaskItemDesk';
import { SearchFilter } from '@/components/supportPage/SearchFilter';
import { applyTasksFilters } from '@/utils/filterTasks';
import { Filter } from '@/components/icons';
import { FilterConfig, FilterValues, TasksListProps } from '@/types/admin';
export const TasksList = ({
  tasks,
  itemsPerSlide = 6,
}: TasksListProps): JSX.Element => {
  const t = useTranslations('adminTasks');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [filters, setFilters] = useState<FilterValues>({});
  const [resetKey, setResetKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'status',
      placeholderKey: 'status',
      placeholder: t('status'),
      options: getStatusOptions(t),
      triggerClassName: 'w-[156px] md:w-[140px] lg:w-[240px] ',
    },
    {
      type: 'select',
      key: 'category',
      placeholderKey: 'category',
      placeholder: t('category'),
      options: getCategoryOptions(t),
      triggerClassName: 'w-[156px] md:w-[140px] lg:w-[240px] ',
    },
  ];
  const filteredTasks = applyTasksFilters(tasks, filters, searchQuery);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };
  const handleFilterChange = (newFilters: FilterValues): void => {
    setFilters(newFilters);
  };

  const handleResetFilters = (): void => {
    setFilters({});
    setSearchQuery('');
    setResetKey((prev) => prev + 1);
  };

  const formatFilterLabel = (
    key: keyof FilterValues,
    value: unknown
  ): string => {
    return String(value);
  };

  const activeFilters = (
    Object.entries(filters) as [keyof FilterValues, unknown][]
  )
    .filter(([, value]) => {
      if (value == null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'object' && 'from' in (value as object)) {
        return Boolean((value as { from?: Date }).from);
      }
      return true;
    })
    .map(([key, value]) => formatFilterLabel(key, value));

  const handleRemoveFilter = (label: string): void => {
    const newFilters = { ...filters };
    const keyToRemove = (
      Object.keys(newFilters) as (keyof FilterValues)[]
    ).find((k) => formatFilterLabel(k, newFilters[k]) === label);

    if (keyToRemove) {
      delete newFilters[keyToRemove];
      setFilters(newFilters);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 md:gap-6 lg:max-w-[1018px]">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex justify-between">
            {isMobile && (
              <button
                className="w-12 h-12 rounded-md bg-card flex items-center justify-center mr-3"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              >
                <Filter
                  className={`w-5.25 h-6 ${
                    isFilterPanelOpen ? 'text-btn' : 'textforeground'
                  }`}
                />
              </button>
            )}
            <SearchFilter
              handleFilterChange={handleSearch}
              isLabelVisible={false}
              t={t}
              labelClassName="md:w-[304px] lg:w-[501px]"
            />
          </div>
          <div className=" flex w-full">
            {(isFilterPanelOpen || !isMobile) && (
              <FilterPanel
                config={filterConfig}
                onFilterChange={handleFilterChange}
                key={resetKey}
              />
            )}
          </div>
        </div>
        <ActiveFiltersBar
          activeFilters={activeFilters}
          onReset={handleResetFilters}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>
      {filteredTasks.length === 0 ? (
        <OrgNoFound />
      ) : isMobile ? (
        <ul className="flex flex-col gap-2">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TaskItemMob task={task} searchQuery={searchQuery} />
            </li>
          ))}
        </ul>
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={filteredTasks}
          itemsPerSlide={itemsPerSlide}
          renderItem={(task) => (
            <TaskItemDesk key={task.id} task={task} searchQuery={searchQuery} />
          )}
        />
      )}
    </>
  );
};
