'use client';

import { CATEGORIES } from '@/constants/createTask.categories';
import { CategoryButton } from '@/components/tasks/createTaskPage/Buttons/CategoryButton';
import { JSX } from 'react';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { useFormContext } from 'react-hook-form';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { useTranslations } from 'next-intl';

export const CategorySelection = (): JSX.Element => {
  const t = useTranslations('tasks.createTask.categories');

  const categoryLabels: Record<TaskCategoryEnum, string> = {
    [TaskCategoryEnum.Nature]: t('items.nature'),
    [TaskCategoryEnum.Animal]: t('items.animal'),
    [TaskCategoryEnum.Food]: t('items.food'),
    [TaskCategoryEnum.Medicine]: t('items.medicine'),
    [TaskCategoryEnum.Donation]: t('items.donation'),
  };

  const { setValue, watch } = useFormContext();

  const selectedCategories: TaskCategoryEnum[] = watch('category') || [];

  const toggleCategory = (id: TaskCategoryEnum): void => {
    const isRemovingDonation =
      id === TaskCategoryEnum.Donation && selectedCategories.includes(id);

    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];

    setValue('category', next, { shouldValidate: true });

    if (isRemovingDonation) {
      setValue('amount', 0);
      setValue('currency', undefined as 'USD' | 'EUR' | undefined);
    }

    useCreateTaskStore.getState().setCreateTaskDraft({
      category: next,
      amount: isRemovingDonation ? 0 : undefined,
      currency: isRemovingDonation ? undefined : undefined,
    });
  };

  return (
    <section className="mb-[50px]">
      <h2 className="text-base mb-4 text-foreground">{t('title')}</h2>
      <p className="text-[12px] mb-4">{t('subtitle')}</p>
      <div className="grid grid-cols-2 gap-4 max-w-[320px] w-full">
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            label={categoryLabels[category.id]}
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
