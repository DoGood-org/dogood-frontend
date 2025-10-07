'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components';
import { More, Report } from '@/components/icons';
import { ReportModal } from './ReportModal';

export const ReportUser = (): JSX.Element => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('account');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleMenu = (e: React.MouseEvent<SVGSVGElement>): void => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOnClick = (): void => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <div ref={buttonRef} className="relative">
        <More
          className="absolute top-0 right-2 w-5 h-5 text-foreground cursor-pointer 
              hover:text-btn-hover active:text-btn-active"
          onClick={handleToggleMenu}
        />
        {isOpen && (
          <div className="absolute top-[25px] right-2 rounded-lg bg-review-bg">
            <Button
              asChild
              variant="ghost"
              onClick={handleOnClick}
              className="group p-4 h-[56px] border-0 flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer"
            >
              <span className="whitespace-nowrap text-white group-hover:text-btn-hover group-active:text-btn-active">
                {t('reportButton')}
                <Report className="size-6 group-hover:text-btn-hover group-active:text-btn-active" />
              </span>
            </Button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
