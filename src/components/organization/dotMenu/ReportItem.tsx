import { JSX } from 'react';
import { Button } from '@/components/ui/Button';
import { Report } from '@/components/icons';
import { useTranslations } from 'next-intl';

type ReportItemProps = {
  onClick: () => void;
};

export const ReportItem = ({ onClick }: ReportItemProps): JSX.Element => {
  const t = useTranslations('organization');

  return (
    <li className="text-nowrap">
      <Button
        variant="ghost"
        onClick={onClick}
        className="p-3 h-[48px] border-0 flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer text-foreground transition"
      >
        <span className="flex justify-start gap-4 whitespace-nowrap">
          <Report className="size-5 transition-stroke transition-fill" />
          {t('dotMenu.report')}
        </span>
      </Button>
    </li>
  );
};
