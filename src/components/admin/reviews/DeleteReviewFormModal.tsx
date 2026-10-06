import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { DeleteModalControls } from '@/types/userReviewsType';
import React, { JSX } from 'react';
import { DeleteReviewForm } from './DeleteReviewForm';
export const DeleteReviewFormModal: React.FC<DeleteModalControls> = ({
  revId,
  isOpen,
  setIsOpen,
}): JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full max-w-[353px] md:max-w-[648px] lg:max-w-[976px] lg:translate-x-16 bg-card"
    >
      <DeleteReviewForm revId={revId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </ModalWrapper>
  );
};
