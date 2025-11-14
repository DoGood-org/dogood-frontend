'use client';
import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import EditIcon from '@/components/icons/EditIcon';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps): JSX.Element => {
  const t = useTranslations('tasks');

  const handleClick = (): void => {
    onClick?.();
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className="group flex items-center gap-1 md:gap-3 cursor-pointe md:pl-10"
      >
        <EditIcon className="size-6 group-hover:text-[#00c1ac]" />
        <span className="text-base group-hover:text-[#00c1ac]">
          {t('taskDetails.edit')}
        </span>
      </Button>
    </>
  );
};

export default EditButton;
