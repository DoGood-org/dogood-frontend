import { CATEGORIES } from '@/constants/createTask.categories';
import { CategoryButton } from '../../Buttons/CategoryButton';
import { JSX } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { TaskCategoryEnum } from '@/types/createTask.type';

export const CategorySelection = (): JSX.Element => {
  const { createTaskDraft, setCreateTaskDraft } = useCreateTaskStore();

  const selectedCategories: TaskCategoryEnum[] = createTaskDraft.category ?? [];

  const toggleCategory = (id: TaskCategoryEnum): void => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];

    setCreateTaskDraft({ category: updated });
  };
  return (
    <section className="mb-[50px] md:px-[60px] lg:px-0">
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
