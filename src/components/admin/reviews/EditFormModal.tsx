import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { EditModalControls } from '@/types/userReviewsType';
import React, { JSX, useEffect } from 'react';
import { EditReviewFormDesk } from './EditReviewFormDesk';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { EditReviewFormMob } from './EditReviewFormMob';

export const EditFormModal: React.FC<EditModalControls> = ({
  review,
  isOpen,
  setIsOpen,
}): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect((): void | (() => void) => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full md:max-w-[648px] lg:max-w-[679px] lg:translate-x-16 bg-card"
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
      {isMobile ? (
        <EditReviewFormMob
          review={review}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <EditReviewFormDesk
          review={review}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </ModalWrapper>
  );
};
