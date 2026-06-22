import { LogOut } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type LeaveOrgProps = {
  onClick: () => void;
};

export const LeaveOrg = ({ onClick }: LeaveOrgProps): JSX.Element => {
  const t = useTranslations('organization');

  return (
    <li className="text-nowrap">
      <Button
        variant="ghost"
        onClick={onClick}
        className="p-3 h-[48px] border-0 flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer text-foreground transition flex gap-4 justify-start"
      >
        <LogOut className="size-5" />
        {t('dotMenu.leaveOrg')}
      </Button>
    </li>
  );
};
