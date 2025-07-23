import { Button } from '@/components/ui/Button';
import { JSX } from 'react';
import { Animal, Food, Medicine, Nature } from '@/components/icons';
import { IIconMap } from '@/types/mapType';
import { useTranslations } from 'next-intl';

export const iconFilterMap: IIconMap = {
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
};

type Props = {
  category: string;
  selectedCategories: string[];
  onCategoryToggle: (id: string) => void;
};
export const FilterLabelCategory: React.FC<Props> = ({
  category,
  selectedCategories,
  onCategoryToggle,
}: Props): JSX.Element => {
  const t = useTranslations('map');
  return (
    <li>
      <Button
        variant="tag"
        size="xl"
        className={` ${iconFilterMap[category].color} flex gap-[10px] w-[140px] md:[167px] lg:[136px] text-sm ${
          selectedCategories.includes(category) ? 'clickedBtn text-sm' : ''
        }`}
        onClick={() => onCategoryToggle(category)}
      >
        {iconFilterMap[category].icon}
        {t(`category-${category}`)}
      </Button>
    </li>
  );
};
