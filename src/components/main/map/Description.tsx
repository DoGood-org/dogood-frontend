import { Close } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { getCategoryIcon } from '@/lib/utils';
import { ITasksProps } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import CategoryIconsList from './filters/CategoryIconList';

export const Description: FC<ITasksProps> = ({
  description,
  title,
  category,
  distance,
  subtitle,
  onToggleDescription,
}) => {
  const t = useTranslations('map');

  return (
    <div className="w-[313px] md:w-[345px] xl:w-[478px] h-[580px] left-[-10px] bg-background p-8 rounded-[10px] shadow-lg overflow-auto">
      <div className="flex w-full justify-between align-middle mb-6">
        <h2 className="text-2xl text-foreground">{t('task')}</h2>
        <Close
          className="stroke-foreground w-6 h-6"
          onClick={onToggleDescription}
        />
      </div>
      <h3 className="mb-4 underline decoration-1">{title}</h3>
      <h3 className="mb-4 underline decoration-1">{subtitle}</h3>
      <p className="mb-5">{description}</p>
      <div className="flex justify-between">
        <CategoryIconsList
          categories={category}
          getCategoryIcon={getCategoryIcon}
        />
        {distance}
      </div>
      <div className="flex justify-between mb-8">
        <Button variant="primary" size="md" className="text-[14px]">
          {t('donate')}
        </Button>
        <Button variant="secondary" size="md">
          {t('join')}
        </Button>
      </div>
      <div className="w-full bg-[#999999] h-[1px] mb-8" />
    </div>
  );
};
