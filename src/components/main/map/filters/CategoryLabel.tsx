import { IIconMap } from '@/types/mapType';
import { Animal, Favorite, Food, Medicine, Nature } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export const icons: IIconMap = {
  medicine: {
    icon: <Medicine className="stroke-white" />,
    color: 'bg-medicine',
  },
  animal: {
    icon: <Animal className="stroke-white" />,
    color: 'bg-animal',
  },
  nature: {
    icon: <Nature className="stroke-white" />,
    color: 'bg-nature',
  },
  food: {
    icon: <Food className="stroke-white" />,
    color: 'bg-food',
  },
  all: {
    icon: null,
    color: 'bg-text-gray',
  },
  favorite: {
    icon: <Favorite className="stroke-white" />,
    color: 'bg-favorite',
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
  const t = useTranslations('map');
  const iconData = icons[category as keyof typeof icons];
  if (!iconData) return null;

  return (
    <li>
      <Button
        variant="tag"
        size="xl"
        className={`${iconData.color} flex items-center justify-center gap-1 break-words w-[136px] text-sm px-4 py-3 text-white ${
          selected ? 'ring-2 ring-white' : ''
        }`}
        onClick={() => onCategoryToggle?.(category)}
      >
        {iconData.icon && (
          <span className="flex size-5 shrink-0 items-center">
            {iconData.icon}
          </span>
        )}
        <span className="break-words text-sm">{t(`category-${category}`)}</span>
      </Button>
    </li>
  );
};
