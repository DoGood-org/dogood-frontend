'use client';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { useEffect } from 'react';
import { ReportDetailsMob } from './ReportDetailsMob';
import { ModalReportControls } from '@/types/reportType';
import { useMediaQuery } from '@/hooks';
import { ReportDetailsDesk } from './ReportDetailsDesk';

export const ReportModal: React.FC<ModalReportControls> = ({
  isOpen,
  setIsOpen,
  report,
}): React.JSX.Element => {
  useEffect((): (() => void) | void => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return (): void => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="
        upper-modal
        w-full 
        max-w-[353px] 
        md:max-w-[601px] 
        lg:max-w-[618px] 
        bg-modal
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
      {isMobile ? (
        <ReportDetailsMob report={report} setIsOpen={setIsOpen} />
      ) : (
        <ReportDetailsDesk report={report} setIsOpen={setIsOpen} />
      )}
    </ModalWrapper>
  );
};
