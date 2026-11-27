'use client';

import { Filter } from '@/components/icons';
import { SearchFilter } from '@/components/supportPage/SearchFilter';
import { ActiveFiltersBar } from '@/components/ui/ActiveFiltersBar';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { useMediaQuery } from '@/hooks';
import { FilterConfig, FilterValues, UsersListProps } from '@/types/admin';
import { applyUsersFilters } from '@/utils/filterUsers';
import { getUserRoleOptions } from '@/utils/getUserRoleOptions';
import { getUserStatusOptions } from '@/utils/getUserStatusOptions';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { Slider } from '@/components/ui/Slider';
import { UserItemMob } from './UserItemMob';
import { UserItemDesk } from './UserItemDesk';
import { format } from 'date-fns';

export const UsersList = ({
  users,
  itemsPerSlide = 6,
}: UsersListProps): React.JSX.Element => {
  const t = useTranslations('adminUsers');
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
      options: getUserStatusOptions(t),
      triggerClassName: 'w-22.5 md:w-22 md:text-xs lg:w-40',
    },
    {
      type: 'select',
      key: 'role',
      placeholderKey: 'role',
      placeholder: t('role'),
      options: getUserRoleOptions(t),
      triggerClassName: 'w-22.5 md:w-22 md:text-xs lg:w-40',
    },
    {
      type: 'date',
      key: 'date',
      mode: 'single',
      className: 'w-22.5 md:w-22 md:text-xs lg:w-40',
    },
  ];
  const filteredUsers = applyUsersFilters(users, filters, searchQuery);

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
    if (key === 'date' && value instanceof Date) {
      return format(value, 'dd MMM');
    }
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
      <div className="flex flex-col gap-2 md:gap-6 lg:max-w-254.5">
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
                className="md:gap-2"
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
      {filteredUsers.length === 0 ? (
        <OrgNoFound />
      ) : isMobile ? (
        <ul className="flex flex-col gap-2">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <UserItemMob user={user} searchQuery={searchQuery} />
            </li>
          ))}
        </ul>
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={filteredUsers}
          itemsPerSlide={itemsPerSlide}
          renderItem={(user) => (
            <UserItemDesk key={user.id} user={user} searchQuery={searchQuery} />
          )}
        />
      )}
    </>
  );
};
