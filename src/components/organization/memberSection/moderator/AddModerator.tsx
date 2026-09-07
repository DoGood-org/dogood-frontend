import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX, useState } from 'react';
import { AddModeratorModal } from './AddModeratorModal';
import { UserOrganization } from '@/types';

export const AddModerator = ({
  members,
  orgId,
  orgName,
}: {
  members: UserOrganization[];
  orgId: string;
  orgName: string;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('organization');

  const handleOnClick = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleOnClick}
        className="align-center"
      >
        <Plus className="size-5 fill-current" />
        {t('members.addModeratorButton')}
      </Button>
      {isOpen && (
        <AddModeratorModal
          members={members}
          orgId={orgId}
          orgName={orgName}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
