'use client';

import { JSX } from 'react';
import { FormInputTextarea } from '../../Form/FormInputTextarea';

export const DescriptionForm = (): JSX.Element => {
  return (
    <form className="flex flex-col gap-4 md:px-[60px] lg:px-0 mb-[144px]">
      <FormInputTextarea
        name="description"
        label="Add a description"
        required
        placeholder="Add a description"
      />

      <FormInputTextarea
        name="requirements"
        label="What are the position requirements? (optional)"
        required={false}
        placeholder="Add requirements"
      />
    </form>
  );
};
