'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { OtherTskItem, Slider } from '@/components';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks';

interface OtherListProps {
  tasks: IExtendedITaskProps[];
}

export const OtherTaskList: React.FC<OtherListProps> = ({ tasks }) => {
  const t = useTranslations('tasks');

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const itemsPerSlide = isDesktop ? 3 : isTablet ? 2 : 1;

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500 h-[235px]">
        {t('otherTask.noTasks')}
      </p>
    );
  }

  const slides: IExtendedITaskProps[][] = Array.from(
    { length: Math.ceil(tasks.length / itemsPerSlide) },
    (_, i) => tasks.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
  );
  return (
    <div className="overflow-hidden">
      <Slider
        items={slides}
        itemsPerSlide={1}
        renderItem={(slide: IExtendedITaskProps[]) => (
          <div
            className={`grid gap-4 ${
              isDesktop
                ? 'grid-cols-3'
                : isTablet
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
            }`}
          >
            {slide.map((task) => (
              <OtherTskItem key={task.id} {...task} />
            ))}
          </div>
        )}
      />
    </div>
  );
};
