'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { changeTaskStatusService } from '@/services/taskService';
import { IAdminTask } from '@/types/admin';

type TaskStatus = 'COMPLETED' | 'REJECTED';

interface UpdateStatusPayload {
  taskId: IAdminTask['id'];
  status: TaskStatus;
  rejectionReason?: string;
}

interface UseTaskStatusOptions {
  namespace?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

interface UseTaskStatusReturn {
  updateStatus: (payload: UpdateStatusPayload) => Promise<boolean>;
  isChanging: boolean;
}

export const useTaskStatus = (
  options: UseTaskStatusOptions = {}
): UseTaskStatusReturn => {
  const { namespace = 'adminTasks', onSuccess, onError } = options;
  const [isChanging, setIsChanging] = useState(false);
  const t = useTranslations(namespace);
  const router = useRouter();

  const updateStatus = async ({
    taskId,
    status,
    rejectionReason,
  }: UpdateStatusPayload): Promise<boolean> => {
    if (isChanging) return false;

    if (status === 'REJECTED' && !rejectionReason?.trim()) {
      toast.error(t('rejectionReasonRequired'));
      return false;
    }

    setIsChanging(true);

    const result = await changeTaskStatusService(
      taskId,
      status,
      status === 'REJECTED' ? rejectionReason : undefined
    );

    if (!result.ok) {
      toast.error(t('statusErr'));
      onError?.();
      setIsChanging(false);
      return false;
    }

    toast.success(t('statusSuccess'));

    if (onSuccess) {
      onSuccess();
    } else {
      router.refresh();
    }

    setIsChanging(false);
    return true;
  };

  return { updateStatus, isChanging };
};
