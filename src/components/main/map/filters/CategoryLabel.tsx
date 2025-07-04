import { IIconMap } from '@/types/mapType';
import { Animal, Food, Medicine, Nature } from '@/components/icons';

export const iconMap: IIconMap = {
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
type CategoryLabelProps = {
  category: string;
};

export const CategoryLabel: React.FC<CategoryLabelProps> = ({ category }) => {
  const iconData = iconMap[category as keyof typeof iconMap];
  if (!iconData)
    return (
      <span className="text-foreground w-[50px] h-[50px] flex justify-center items-center rounded-full">
        {category}
      </span>
    );

  return (
    <li>
      <button
        className={`${iconData.color} w-[50px] h-[50px] flex justify-center items-center rounded-full`}
      >
        <span
          style={{
            width: '24px',
            height: '24px',
            stroke: '#000000',
            fill: '#000000',
          }}
        >
          {iconData.icon}
        </span>
      </button>
    </li>
  );
};
