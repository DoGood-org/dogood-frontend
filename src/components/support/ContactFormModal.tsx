import React from 'react';
import { ModalWrapper } from '../ui/ModalWrapper';
import { motion } from 'framer-motion';
import { CloseIcon } from '../icons';
import { ContactForm } from '../main/faq/ContactForm';

interface IContactFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const ContactFormModal = ({
  isOpen,
  setIsOpen,
}: IContactFormModalProps): React.JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full max-w-[353px] px-4 pb-6 pt-20 md:pb-10 md:pt-4 md:max-w-[648px] lg:max-w-[976px] lg:translate-x-16 bg-card"
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
      <ContactForm buttonTxt="Send a message" title="Write your question" />
    </ModalWrapper>
  );
};
