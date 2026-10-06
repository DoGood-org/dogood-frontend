import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type AddMemberConfirmationProps = {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const AddMemberConfirmation = ({
  userName,
  onConfirm,
  onCancel,
}: AddMemberConfirmationProps): JSX.Element => {
  const t = useTranslations('organization.memberModals');

  return (
    <div className="text-center mx-auto">
      <h2 className="text-reg md:text-h3 mb-4">{t('addMemberTitle')}</h2>
      <p className="mb-12">
        {t.rich('addMemberText', {
          userName,
          strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}
      </p>
      <div className="text-center mx-auto">
        <Button
          variant="primary"
          onClick={onConfirm}
          className="block mx-auto mb-4"
        >
          {t('sendInvation')}
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-foreground hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
        >
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};
