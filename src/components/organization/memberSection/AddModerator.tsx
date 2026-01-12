import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useTranslations } from 'next-intl';
import { JSX, useState } from 'react';

export const AddModerator = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('organization');

  const handleOnClick = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleOnClick}
        className="align-center"
      >
        <Plus className="size-5 fill-current" />
        {t('members.addModeratorButton')}
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          withBackButton={false}
          wrapperClassName="w-[353px] md:w-[500px] max-w-[500px] "
        >
          <h3 className="text-[20px] leading-[24px] md:text-h3 text-center">
            {t('members.select')}
          </h3>
        </Modal>
      )}
    </>
  );
};
