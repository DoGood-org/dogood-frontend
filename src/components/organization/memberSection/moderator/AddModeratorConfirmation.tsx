import { CheckSquare } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type AddModeratorConfirmationProps = {
  userName: string;
  organizationName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const AddModeratorConfirmation = ({
  userName,
  organizationName,
  onConfirm,
  onCancel,
}: AddModeratorConfirmationProps): JSX.Element => {
  const t = useTranslations('organization.memberModals');
  const privileges = t.raw('privileges') as string[];

  return (
    <div className="text-center mx-auto">
      <div className="px-4 lg:px-8">
        <h2 className="text-reg md:text-h3 mb-4">{t('addModeratorTitle')}</h2>
        <p className="mb-4 text-base">
          {t.rich('addModeratorText', {
            userName,
            organizationName,
            strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </p>
        <div className="text-start mb-12">
          <p className="font-bold">{t('privilegesTitle')}</p>

          <ul>
            {privileges.map((privilege) => (
              <li key={privilege} className="flex gap-2 mt-4">
                <CheckSquare className="size-6" />
                <p>{privilege}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mx-auto">
        <Button
          variant="primary"
          onClick={onConfirm}
          className="block mx-auto mb-4"
        >
          {t('assignModerator')}
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
