import { FilterBadge } from '@/components/main/map/filters/FilterBadge';
import { IExtendedCategoryFilter } from '@/types/mapType';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { JSX } from 'react';

export const FilterBadges = (): JSX.Element | null => {
  const currentCategoriesFilter = useFilterStore((state) =>
    state.choosenCategories && state.choosenCategories.length > 0
      ? state.choosenCategories
      : null
  );
  const currentDistanceFilter = useFilterStore((state) => state.distanceFilter);
  return (
    <div className=" ">
      {currentCategoriesFilter && (
        <ul className="capitalize hidden lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-2 lg:items-center lg:justify-start">
          {currentCategoriesFilter
            .filter(
              (category): category is IExtendedCategoryFilter =>
                category !== null &&
                category !== undefined &&
                category !== 'all'
            )
            .map((category) => (
              <li key={category ?? 'unknown'}>
                <FilterBadge
                  category={category ? (category ?? '') : 'other'}
                  onRemove={() =>
                    useFilterStore.getState().toggleCategory(category)
                  }
                />
              </li>
            ))}
          {currentDistanceFilter && (
            <li key={`distance-${currentDistanceFilter}`}>
              <FilterBadge
                category={`Up to ${currentDistanceFilter} km`}
                onRemove={() =>
                  useFilterStore.getState().removeDistanceFilter()
                }
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
