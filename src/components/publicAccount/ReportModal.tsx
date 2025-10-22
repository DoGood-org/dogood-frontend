import { JSX } from 'react';
import { Button, Modal } from '@/components';
import { useTranslations } from 'next-intl';
import { reportReasons } from '@/constants/report';
import { useForm } from 'react-hook-form';

type ReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ReportFormValues = {
  reportReason: string;
  comment?: string;
};

export const ReportModal = ({
  isOpen,
  onClose,
}: ReportModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormValues>();

  const t = useTranslations('account');

  const submitHandler = (data: ReportFormValues): void => {
    // onSubmit(data); // виклик API
    console.log(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName="text-center bg-modal w-[353px] md:w-[500px]"
    >
      <h2 className="text-base">{t('reportButton')}</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-[262px] text-start mx-auto mt-4"
      >
        <div className="mx-auto flex flex-col gap-3">
          {reportReasons.map((key) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value={key}
                {...register('reportReason', { required: true })}
                className="hidden peer"
              />
              <span
                className="relative shrink-0
      w-4 h-4 rounded-full border border-gray-400 
      peer-checked:border-gray-400
      peer-checked:bg-btn
      flex items-center justify-center
    "
              />
              {t(key)}
            </label>
          ))}
        </div>
        {errors.reportReason && (
          <span className="text-red-500 text-sm block mt-4">
            {t('reportError')}
          </span>
        )}

        <Button type="submit" className="w-full mt-4 text-white">
          {t('reportSendButton')}
        </Button>
      </form>
    </Modal>
  );
};
