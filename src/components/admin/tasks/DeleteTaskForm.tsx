'use client';

import { Button } from '@/components/ui/Button';
import { deleteTaskService } from '@/services/taskService';
import { TaskModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';
import { toast } from 'react-toastify';

export const DeleteTaskForm: React.FC<TaskModalControls> = ({
  taskId,
  isOpen,
  setIsOpen,
}): JSX.Element => {
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations('adminTasks');
  const router = useRouter();
  const handleDelTask = async (taskId: string | number): Promise<void> => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const result = await deleteTaskService(taskId);

      if (!result.ok) {
        toast.error(t('deleteErr'));
        return;
      }
      toast.success(t('deleteSuccess') ?? 'Task deleted');
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(t('deleteErr'));
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="bg-card rounded-xl py-6">
      <div className="px-6">
        <h2 className="text-h2-m mb-3">{t('titleDelModal')}</h2>
        <p className="mb-6">{t('descrDelModal')}</p>
      </div>
      <div className="flex justify-between px-4 md:justify-center md:gap-3">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="px-6"
        >
          {t('cancelBtn')}
        </Button>
        {taskId && (
          <Button
            variant="primary"
            onClick={() => handleDelTask(taskId)}
            disabled={isDeleting}
            className="px-6"
          >
            {t('delete')}
          </Button>
        )}
      </div>
    </div>
  );
};
