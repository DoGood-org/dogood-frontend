import { Approve, CloseIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type JoinRequestButtonsProps = {
  onApprove: () => void;
  onReject: () => void;
  isLoading?: boolean;
};

export const JoinRequestButtons = ({
  onApprove,
  onReject,
  isLoading = false,
}: JoinRequestButtonsProps): JSX.Element => {
  const t = useTranslations('organization');

  const styles =
    'text-text-gray hover:text-btn-hover focus:text-btn-hover active:text-btn-active flex gap-2';

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="ghost"
        disabled={isLoading}
        onClick={onApprove}
        className={styles}
      >
        <Approve className="size-5" />
        {t('members.approve')}
      </Button>
      <Button
        variant="ghost"
        disabled={isLoading}
        onClick={onReject}
        className={styles}
      >
        <CloseIcon className="size-5 fill-current" />
        {t('members.reject')}
      </Button>
    </div>
  );
};
