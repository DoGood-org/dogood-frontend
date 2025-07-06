import { IIconMap } from '@/types/mapType';
import { Animal, Food, Medicine, Nature } from '@/components/icons';
import { Button } from '@/components/ui/Button';

export const icons: IIconMap = {
  medicine: {
    icon: <Medicine className="fill-icon-color stroke-icon-color" />,
    color: 'bg-medicine',
  },
  animal: {
    icon: <Animal className="fill-icon-color stroke-icon-color" />,
    color: 'bg-animal',
  },
  nature: {
    icon: <Nature className="fill-icon-color stroke-icon-color" />,
    color: 'bg-nature',
  },
  food: {
    icon: <Food className="fill-icon-color stroke-icon-color" />,
    color: 'bg-star',
  },
  all: {
    icon: <Nature className="fill-icon-color stroke-icon-color" />,
    color: 'bg-text-gray',
  },
};

type CategoryLabelProps = {
  category: string;
  selected?: boolean;
  onCategoryToggle?: (category: string) => void;
};

export const CategoryLabel: React.FC<CategoryLabelProps> = ({
  category,
  selected,
  onCategoryToggle,
}) => {
  const iconData = icons[category as keyof typeof icons];
  if (!iconData)
    return (
      <span className="text-foreground w-[50px] h-[50px] flex justify-center items-center rounded-full">
        {category}
      </span>
    );

  return (
    <li>
      <Button
        variant="tag"
        size="xl"
        className={` ${icons[category].color} flex gap-[10px] w-[140px] md:[167px] lg:[136px] text-sm ${
          selected ? 'clickedBtn text-sm' : ''
        }`}
        onClick={() => onCategoryToggle && onCategoryToggle(category)}
      >
        <span>{icons[category].icon}</span>

        <span>{category}</span>
      </Button>
    </li>
  );
};
