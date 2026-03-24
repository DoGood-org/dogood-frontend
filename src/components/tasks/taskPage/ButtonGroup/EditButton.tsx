'use client';
import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import EditIcon from '@/components/icons/EditIcon';

interface EditButtonProps {
  onClick: () => void;
  isHost: boolean;
  show?: boolean;
}

const EditButton = ({
  onClick,
  isHost,
  show = true,
}: EditButtonProps): JSX.Element | null => {
  const t = useTranslations('tasks');

  if (isHost || !show) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="group flex items-center gap-1 cursor-pointer"
    >
      <EditIcon className="size-6 text-foreground group-hover:text-[#00c1ac]" />
      <span className="text-base text-foreground group-hover:text-[#00c1ac]">
        {t('taskDetails.edit')}
      </span>
    </Button>
  );
};

export default EditButton;
