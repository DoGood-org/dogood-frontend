import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type AddMemberSuccessProps = {
  userName: string;
  onInviteMore: () => void;
  onDone: () => void;
};

export const AddMemberSuccess = ({
  userName,
  onInviteMore,
  onDone,
}: AddMemberSuccessProps): JSX.Element => {
  const t = useTranslations('organization.memberModals');

  return (
    <div className="text-center mx-auto">
      <h2 className="text-reg md:text-h3 mb-4">{t('addMemberSuccessTitle')}</h2>

      <p className="mb-12">
        {t.rich('addMemberSuccessText', {
          userName,
          strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}
      </p>

      <Button
        variant="primary"
        onClick={onInviteMore}
        className="block mx-auto mb-4"
      >
        {t('inviteMoreMember')}
      </Button>

      <Button
        variant="ghost"
        onClick={onDone}
        className="text-foreground hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
      >
        {t('done')}
      </Button>
    </div>
  );
};
