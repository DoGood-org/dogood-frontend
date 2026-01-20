'use client';

import { Button } from '@/components/ui/Button';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';

type Props = {
  showBack?: boolean;
};
export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const prevCreateStep = useTaskStore((s) => s.prevCreateStep);
  const nextCreateStep = useTaskStore((s) => s.nextCreateStep);

  return (
    <div className="flex gap-4">
      {showBack && (
        <Button
          variant="secondary"
          className="hover:border px-10 py-3 md:px-6"
          onClick={prevCreateStep}
          size="lg"
        >
          Go back
        </Button>
      )}
      <Button
        variant="primary"
        size="lg"
        className="px-10 py-3 md:px-6"
        onClick={nextCreateStep}
      >
        Next step
      </Button>
    </div>
  );
};
