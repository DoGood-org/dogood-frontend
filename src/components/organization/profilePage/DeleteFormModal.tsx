import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ModalControls } from '@/types/userReviewsType';
import React from 'react';
import DeleteForm from './DeleteForm';
const DeleteFormModal: React.FC<ModalControls> = ({
  isOpen,
  setIsOpen,
}): React.JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full max-w-[353px] md:max-w-[648px] lg:max-w-[976px] lg:translate-x-16 bg-card"
    >
      <DeleteForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </ModalWrapper>
  );
};

export default DeleteFormModal;
