'use client';

import { CATEGORIES } from '@/constants/createTask.categories';
import { CategoryButton } from '@/components/tasks/createPage/Buttons/CategoryButton';
import { JSX } from 'react';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { useFormContext } from 'react-hook-form';

export const CategorySelection = (): JSX.Element => {
  const { setValue, watch } = useFormContext();

  const selectedCategories: TaskCategoryEnum[] = watch('category') || [];

  const toggleCategory = (id: TaskCategoryEnum): void => {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];

    setValue('category', next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  return (
    <section className="mb-[50px]">
      <h2 className="text-base mb-4 text-foreground">Choose a category</h2>
      <p className="text-[12px] mb-4">You can pick up a few categories</p>
      <div className="grid grid-cols-2 gap-4 max-w-[320px] w-full">
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.label}
            icon={category.icon}
            colorClass={category.colorClass}
            withWhiteCircle={category.withWhiteCircle}
            isSelected={selectedCategories.includes(category.id)}
            onClick={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </section>
  );
};
