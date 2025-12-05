'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
// import { removeMemberFromOrganization } from '@/services/organizationService';

type ReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orgId: string;
};

export const LeaveModal = ({
  isOpen,
  onClose,
  orgId,
}: ReportModalProps): JSX.Element => {
  const t = useTranslations('organization');
  const [isMemberLeave, setIsMemberLeave] = useState(false);
  const [response, setResponse] = useState('');

  const handleOnClose = (): void => {
    onClose();
  };

  const handleOnClick = async (): Promise<void> => {
    const data = {
      userId: '5',
      organizationId: orgId,
    };
    // const responseData = await removeMemberFromOrganization(data);
    const responseData = `User ${data.userId} removed from organization ${data.organizationId}`;
    setResponse(responseData);

    setIsMemberLeave(true);

    setTimeout(() => onClose(), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName="text-center bg-modal w-[353px] md:w-[550px] max-w-[550px]"
      withBackButton={false}
    >
      {!isMemberLeave && (
        <>
          <h2 className="text-[20px]">{t('leaveModal.sure')}</h2>
          <p className="mt-3 text-base">{t('leaveModal.loseAccess')}</p>
          <div className="flex gap-3 justify-center mt-6">
            <Button variant="secondary" onClick={handleOnClose}>
              {t('leaveModal.cancelButton')}
            </Button>
            <Button
              variant="primary"
              onClick={handleOnClick}
              className="text-white"
            >
              {t('leaveModal.leaveButton')}
            </Button>
          </div>
        </>
      )}
      {isMemberLeave && response && <p>{response}</p>}
    </Modal>
  );
};
