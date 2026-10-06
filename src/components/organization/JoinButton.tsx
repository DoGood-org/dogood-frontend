'use client';

import { JSX, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/Modal';
import {
  createJoinRequest,
  updateJoinRequestStatus,
} from '@/services/joinRequestService';
import {
  IJoinRequestApiData,
  JoinRequestStatus,
} from '@/types/joinRequest.type';
import { toast } from 'react-toastify';

export const JoinButton = ({ orgId }: { orgId: string }): JSX.Element => {
  const t = useTranslations('organization');
  const [isOpen, setIsOpen] = useState(false);
  const [joinId, setJoinId] = useState('');

  const data: IJoinRequestApiData = {
    receiverOrganizationId: orgId,
    direction: 'FROM_USER',
  };
  const handleOnClose = (): void => {
    setIsOpen(false);
  };

  const handleOnClick = async (): Promise<void> => {
    const result = await createJoinRequest(data);

    if (!result.ok) {
      toast.error(t('errorCreateJoinRequest'));
      return;
    }

    setIsOpen(true);
    setJoinId(result.data.id);
  };

  const handleUndoRequest = async (): Promise<void> => {
    const result = await updateJoinRequestStatus(
      joinId,
      JoinRequestStatus.CANCELLED
    );

    if (!result.ok) {
      toast.error(t('errorRequestCancel'));
      return;
    }

    toast.success(t('successRequestCancel'));
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOnClick} className="text-white px-6">
        {t('joinButton')}
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleOnClose}
          withBackButton={false}
          wrapperClassName="text-center bg-modal w-[353px] md:w-[500px] max-w-[500px]"
        >
          <p className="text-[20px]">{t('joinRequest')}</p>
          <div className="flex gap-3 justify-center mt-6">
            <Button
              onClick={handleUndoRequest}
              variant="secondary"
              className="px-6 py-3"
            >
              {t('undoRequest')}
            </Button>
            <Button
              variant="primary"
              onClick={handleOnClose}
              className="px-6 py-3"
            >
              {t('done')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
