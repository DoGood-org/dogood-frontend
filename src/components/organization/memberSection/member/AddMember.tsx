import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX, useState } from 'react';
import { AddMemberModal } from './AddMemberModal';
import { AddMemberProps } from '@/types';

export const AddMember = ({
  organizationId,
  existingMembers,
  className = '',
  variant = 'secondary',
}: AddMemberProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('organization');

  const handleOnClick = (): void => {
    setIsOpen(true);
  };

  const existingMemberIds = existingMembers.map((m) => m.userId);

  return (
    <>
      <Button
        variant={variant}
        onClick={handleOnClick}
        className={`align-right ${className}`}
      >
        <Plus className="size-5 fill-current" />
        {t('members.addMemberButton')}
      </Button>

      {isOpen && (
        <AddMemberModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          organizationId={organizationId}
          existingMemberIds={existingMemberIds}
        />
      )}
    </>
  );
};
