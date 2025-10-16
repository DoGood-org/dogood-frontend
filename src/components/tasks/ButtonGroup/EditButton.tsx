import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import EditIcon from '@/components/icons/EditIcon';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps): JSX.Element => {
  const t = useTranslations('tasks');

  return (
    <Button
      variant="iconOnly"
      size="icon"
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer ml-5"
    >
      <EditIcon />
      <span className="text-base">{t('taskDetails.edit')}</span>
    </Button>
  );
};

export default EditButton;
