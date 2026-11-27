'use client';

import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  rejectTaskFormValues,
  rejectTaskSchema,
} from '@/lib/validation/rejectTaskSchema';
import { TaskModalControls } from '@/types/userReviewsType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useTaskStatus } from '@/hooks/useTaskStatus';
import { CloseIcon, Rejected } from '@/components/icons';

export const RejectTaskForm: React.FC<TaskModalControls> = ({
  taskId,
  isOpen,
  setIsOpen,
}): React.JSX.Element => {
  const t = useTranslations('adminTasks');
  const { updateStatus, isChanging } = useTaskStatus();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<rejectTaskFormValues>({
    resolver: yupResolver(rejectTaskSchema) as Resolver<rejectTaskFormValues>,
    defaultValues: {
      rejectionReason: '',
    },
  });

  const onSubmit = async (data: rejectTaskFormValues): Promise<void> => {
    const ok = await updateStatus({
      taskId,
      status: 'REJECTED',
      rejectionReason: data.rejectionReason,
    });

    if (ok) {
      unSubmit();
    }
  };

  const unSubmit = (): void => {
    reset({ rejectionReason: '' });
    setIsOpen(!isOpen);
  };

  const onCancel = (): void => {
    unSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 w-full bg-admin-background py-6 px-4 md:p-10 rounded-sm">
        <div className="flex w-full justify-between">
          <span className="flex gap-3">
            <Rejected className="w-5 h-5" />
            {t('rejected')}
          </span>
          <CloseIcon
            className="w-6 h-6 cursor-pointer shrink-0"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <Textarea
          {...register('rejectionReason')}
          placeholder={t('placeholder')}
          className="w-full bg-card border-none h-[93px] rounded-sm"
        />
        {errors.rejectionReason && (
          <p className="text-sm font-medium text-error mt-1">
            {errors.rejectionReason.message}
          </p>
        )}
        <div className="flex gap-5 justify-between md:justify-end">
          <Button
            variant="ghost"
            size="lg"
            className="text-foreground px-6"
            type="button"
            onClick={onCancel}
            disabled={isChanging}
          >
            {t('cancelBtn')}
          </Button>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="text-white px-6"
            disabled={isChanging}
          >
            {t('sendBtn')}
          </Button>
        </div>
      </div>
    </form>
  );
};
