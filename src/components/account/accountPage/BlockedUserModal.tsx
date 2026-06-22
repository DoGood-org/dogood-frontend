// BlockedUserModal.tsx
'use client';
import { AddModalControls } from '@/types/userReviewsType';
import { useEffect } from 'react';
import { BlockedUser } from './BlockedUser';
import Portal from '@/components/ui/portal/Portal';

export const BlockedUserModal: React.FC<AddModalControls> = ({
  isOpen,
  setIsOpen,
}): React.JSX.Element => {
  useEffect((): (() => void) | void => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.zIndex = '1';

      return (): void => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.zIndex = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        style={{ isolation: 'isolate' }}
      >
        <div
          className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm modal-backdrop"
          onClick={() => setIsOpen(false)}
        />
        <div
          className="
            relative
            z-[99999]
            upper-modal
            w-full 
            max-w-[353px] 
            md:max-w-[648px] 
            lg:max-w-[1200px] 
            bg-card 
            overflow-y-auto 
            max-h-[90vh]
            rounded-lg
            shadow-xl
          "
        >
          <BlockedUser />
        </div>
      </div>
    </Portal>
  );
};
