import React from 'react';
import { ModalWrapper } from '../ui/ModalWrapper';
import { motion } from 'framer-motion';
import { CloseIcon } from '../icons';
import { ReviewsForm } from './ReviewsForm';
import { IReviewsFormModal } from '@/types/userReviewsType';

const ReviewsFormModal: React.FC<IReviewsFormModal> = ({
  isOpen,
  setIsOpen,
  user: { name, avatar, rating },
}): React.JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full max-w-[353px] md:max-w-[648px] lg:max-w-[976px] lg:translate-x-16 bg-card"
    >
      <motion.button
        className="absolute top-4 right-4 cursor-pointer text_tag hover:text-[#696969] z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(false)}
        aria-label="Close modal"
        type="button"
      >
        <CloseIcon className="w-6 h-6" />
      </motion.button>
      <ReviewsForm user={{ rating, name, avatar }} setIsOpen={setIsOpen} />
    </ModalWrapper>
  );
};

export default ReviewsFormModal;
