import { Button } from '@/components/ui/Button';
import { ButtonControlsProps } from '@/types/reportType';
import { useTranslations } from 'next-intl';
import React from 'react';

export const ButtonControls: React.FC<ButtonControlsProps> = ({
  onReject,
  onApprove,
  className = 'flex justify-between',
  buttonClassName = 'w-[112px]',
  rejectLabel,
  approveLabel,
  variant = 'primary',
}) => {
  const t = useTranslations('adminReport');

  return (
    <div className={className}>
      <Button
        variant="secondary"
        className={buttonClassName}
        onClick={onReject}
      >
        {rejectLabel || t('reject')}
      </Button>
      <Button variant={variant} className={buttonClassName} onClick={onApprove}>
        {approveLabel || t('approve')}
      </Button>
    </div>
  );
};
