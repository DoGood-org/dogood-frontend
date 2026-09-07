import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type MemberRemoveConfirmationProps = {
  userName: string;
  organizationName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const MemberRemoveConfirmation = ({
  userName,
  organizationName,
  onConfirm,
  onCancel,
  isLoading = false,
}: MemberRemoveConfirmationProps): JSX.Element => {
  const t = useTranslations('organization.memberModals');

  return (
    <div className="text-center mx-auto">
      <h2 className="text-reg md:text-h3 mb-4">{t('removeMemberTitle')}</h2>

      <p className="mb-12">
        {t.rich('removeMemberText', {
          userName,
          organizationName,
          strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}
      </p>

      <div className="flex flex-col items-center gap-4">
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {t('confirmRemove')}
        </Button>

        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          className="text-foreground hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
        >
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};
