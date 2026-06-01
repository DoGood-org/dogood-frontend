'use client';

import { JSX, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/Modal';
import { createJoinRequest } from '@/services/joinRequestService';
import { IJoinRequestApiData } from '@/types/joinRequest.type';
// import { removeMemberFromOrganization } from '@/services/organizationService';

export const JoinButton = ({ orgId }: { orgId: string }): JSX.Element => {
  const t = useTranslations('organization');
  const [isOpen, setIsOpen] = useState(false);
  const [removeResponse, setRemoveResponse] = useState('');
  const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);

  const data: IJoinRequestApiData = {
    receiverOrganizationId: orgId,
    direction: 'FROM_USER',
  };
  const handleOnClose = (): void => {
    setIsOpen(false);
  };

  const handleOnClick = async (): Promise<void> => {
    const result = await createJoinRequest(data);
    console.log(result);

    if (result.ok) {
      setIsOpen(true);
    }
  };

  const handleUndoRequest = async (): Promise<void> => {
    const data = {
      userId: '5',
      organizationId: orgId,
    };
    // await removeMemberFromOrganization(data);

    const response = `User ${data.userId} canceled the request to join the organization ${data.organizationId}`;

    setRemoveResponse(response);
    setIsUndoModalOpen(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsUndoModalOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button onClick={handleOnClick} className="text-white px-6">
        {t('joinButton')}
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen || isUndoModalOpen}
          onClose={handleOnClose}
          withBackButton={false}
          wrapperClassName="text-center bg-modal w-[353px] md:w-[500px] max-w-[500px]"
        >
          {!isUndoModalOpen ? (
            <>
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
            </>
          ) : (
            <p>{removeResponse}</p>
          )}
          {/* {isUndoModalOpen && <p>{removeResponse}</p>} */}
        </Modal>
      )}
    </>
  );
};
