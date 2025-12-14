import { JSX } from 'react';
import { Button } from '@/components/ui/Button';
import { Report } from '@/components/icons';
import { useTranslations } from 'next-intl';

type ReportItemProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReportItem = ({
  setIsOpen,
  setIsModalOpen,
}: ReportItemProps): JSX.Element => {
  const t = useTranslations('organization');

  const handleOnClick = (): void => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <li className="text-nowrap">
      <Button
        // asChild
        variant="ghost"
        onClick={handleOnClick}
        className="p-3 h-[48px] border-0 flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer text-foreground transition"
      >
        <span className="flex gap-4 justify-start whitespace-nowrap">
          <Report className="size-5 transition-stroke transition-fill" />
          {t('dotMenu.report')}
        </span>
      </Button>
    </li>
  );
};
