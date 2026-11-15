'use client';
import React, { JSX, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '@/components/ui/Button';
import { Trash } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface DeleteButtonProps {
  onConfirm: () => void | Promise<void>;
  isHost: boolean;
  show?: boolean;
  isLoading?: boolean;
  className?: string;
}

const DeleteButton = ({
  onConfirm,
  isHost,
  show = true,
  isLoading = false,
  className,
}: DeleteButtonProps): JSX.Element | null => {
  const t = useTranslations('tasks.deleteTaskPopover');

  const [open, setOpen] = useState(false);

  if (!isHost || !show) return null;

  const handleConfirm = async (): Promise<void> => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('group cursor-pointer transition-colors', className)}
          aria-label={t('ariaLabel')}
        >
          <Trash className="size-6 text-foreground group-hover:text-error/55 transition-colors" />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={8}
          className="z-[999] w-60px rounded-lg bg-card p-4 text-foreground shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-3 text-sm text-center">{t('title')}</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="text-foreground"
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              size="sm"
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-error text-foreground hover:bg-error/65"
            >
              {isLoading ? '...' : t('buttons.confirm')}
            </Button>
          </div>
          <Popover.Arrow className="fill-card" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DeleteButton;
