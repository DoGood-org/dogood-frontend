'use client';

import { Button } from '@/components/ui/Button';
import { JSX } from 'react';

interface FieldsMessageProps {
  onClose: () => void;
}

export const RequiredFieldsContent = ({
  onClose,
}: FieldsMessageProps): JSX.Element => {
  return (
    <section>
      <h2 className="text-h1 mb-2">Please fill in all required fields</h2>
      <p className="text-base mb-6">
        To proceed, please fill in all fields marked with an asterisk.
      </p>
      <div className="flex justify-center">
        <Button
          className="w-full md:w-[152px]"
          variant="primary"
          onClick={onClose}
        >
          Back to form
        </Button>
      </div>
    </section>
  );
};
