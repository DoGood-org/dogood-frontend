import { CATEGORIES } from '@/constants/createTask.categories';
import { CategoryButton } from '../../Buttons/CategoryButton';
import { JSX } from 'react';

export const CategorySelection = (): JSX.Element => {
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
            isSelected={false}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};
