'use client';

import React, { JSX } from 'react';
// import { useForm, UseFormRegister, FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, FormControl } from '@/components';

interface DonationFormData {
  name: string;
}

export const DonationModalForm = (): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useForm<DonationFormData>();

  return (
    <form>
      <div className="flex flex-col gap-3 mb-10">
        <FormControl
          name="name"
          register={register}
          errors={errors.name}
          placeholder={'Full name'}
        />

        <FormControl
          name="country"
          register={register}
          errors={errors.name}
          placeholder={'Country'}
        />

        <FormControl
          name="city"
          register={register}
          errors={errors.name}
          placeholder={'City'}
        />
      </div>
      <div>
        <FormControl
          name="number"
          register={register}
          errors={errors.name}
          placeholder="1000"
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="text-white w-full lg:max-w-[500px]">
          Donate
        </Button>
      </div>
    </form>
  );
};
