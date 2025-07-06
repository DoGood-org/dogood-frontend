import { CategoryLabel } from '@/components/main/map/filters/CategoryLabel';
import { LineDivider } from '@/components/main/map/filters/LineDivider';
import { IExtendedCategoryFilter } from '@/types/mapType';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';

type Props = {
  categories: string[];
};
export const CategoryFilter = ({ categories }: Props): JSX.Element | null => {
  const t = useTranslations('map');

  const { toggleCategory, choosenCategories } = useFilterStore();
  console.log('choosenCategories', choosenCategories);

  return (
    <div className="mb-6">
      <h4 className="text-base">{t('category')}</h4>
      <LineDivider className={'flex w-full mb-4 bg-text-gray h-[1px]'} />

      <ul className="flex gap-4 flex-wrap w-full mb-6">
        {categories.map((category) => {
          return (
            <CategoryLabel
              key={category}
              category={category}
              selected={choosenCategories.includes(
                category as IExtendedCategoryFilter
              )}
              onCategoryToggle={(category) =>
                toggleCategory(category as IExtendedCategoryFilter)
              }
            />
          );
        })}

        {categories.length > 0 &&
          (() => {
            return (
              <CategoryLabel
                category={'all'}
                selected={choosenCategories.includes(
                  'all' as IExtendedCategoryFilter
                )}
                onCategoryToggle={() => {
                  toggleCategory('all' as IExtendedCategoryFilter);
                }}
              />
            );
          })()}
      </ul>
    </div>
  );
};
