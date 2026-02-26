'use client';

import { CATEGORIES } from '@/constants/createTask.categories';
import { CategoryButton } from '@/components/tasks/createPage/Buttons/CategoryButton';
import { JSX } from 'react';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { useFormContext } from 'react-hook-form';
import { TaskActionType } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export const CategorySelection = (): JSX.Element => {
  const { setValue, watch } = useFormContext();

  const selectedCategories: TaskCategoryEnum[] = watch('category') || [];

  const toggleCategory = (id: TaskCategoryEnum): void => {
    const isRemovingDonation =
      id === TaskCategoryEnum.Donation && selectedCategories.includes(id);

    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];

    const nextActionType = next.includes(TaskCategoryEnum.Donation)
      ? TaskActionType.FUNDRAISING
      : TaskActionType.VOLUNTEERING;

    setValue('category', next, { shouldValidate: true });

    if (isRemovingDonation) {
      setValue('amount', 0);
      setValue('currency', undefined);
    }

    useCreateTaskStore.getState().setCreateTaskDraft({
      category: next,
      actionType: nextActionType,
      amount: isRemovingDonation ? 0 : undefined,
      currency: isRemovingDonation ? undefined : undefined,
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
