import { IIconMap } from '@/types/mapType';
import { Animal, Food, Medicine, Nature } from '@/components/icons';

export const taskIconMap: IIconMap = {
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

export const TaskCategoryLabel: React.FC<CategoryLabelProps> = ({ category }) => {
  const iconData = taskIconMap[category as keyof typeof taskIconMap];
  if (!iconData)
    return (
      <span className="text-foreground w-[50px] h-[50px] flex justify-center items-center rounded-full">
        {category}
      </span>
    );

  return (
    <li>
      <button
        className={`${iconData.color} text-foreground  w-[50px] h-[50px] flex justify-center items-center rounded-full`}
      >
        <span
          className="flex justify-center items-center text-foreground"
          style={{
            width: '24px',
            height: '24px',
            stroke: 'currentColor',
            fill: 'currentColor',
          }}
        >
          {iconData.icon}
        </span>
      </button>
    </li>
  );
};
