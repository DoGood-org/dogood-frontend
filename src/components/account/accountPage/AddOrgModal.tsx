'use client';
import { OrganizationForm } from '@/components/organization/profilePage/OrganizationForm';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { AddModalControls } from '@/types/userReviewsType';
import { useEffect } from 'react';

export const AddOrgModal: React.FC<AddModalControls> = ({
  isOpen,
  setIsOpen,
}): React.JSX.Element => {
  useEffect((): (() => void) | void => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return (): void => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="
        upper-modal
        w-full 
        max-w-[353px] 
        md:max-w-[648px] 
        lg:max-w-[1200px] 
        bg-card 
        overflow-y-auto 
        max-h-[80vh]
      "
      backdropClassName="bg-black/50 backdrop-blur-sm modal-backdrop"
      ignoreSelectors={[
        '[role="listbox"]',
        '[role="option"]',
        '[data-radix-select-content]',
        '.select-dropdown',
        '.select-content',
        '[data-state="open"]',
        '.react-select__menu',
      ]}
    >
      <OrganizationForm mode="create" setIsOpen={setIsOpen} />
    </ModalWrapper>
  );
};
