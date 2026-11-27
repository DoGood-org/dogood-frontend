import { DeleteModalControls } from '@/types/userReviewsType';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import React from 'react';
import { DeleteUserForm } from './DeleteUserForm';

export const DeleteUserFormModal: React.FC<DeleteModalControls> = ({
  userId,
  isOpen,
  setIsOpen,
}): React.JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full  md:max-w-[648px] lg:max-w-[679px] lg:translate-x-16 bg-card"
    >
      <DeleteUserForm userId={userId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </ModalWrapper>
  );
};
