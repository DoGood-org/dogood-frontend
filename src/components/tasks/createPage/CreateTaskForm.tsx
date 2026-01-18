'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { basicInfoSchema } from '@/lib/validation/createTask.schema';
import { BasicInfoFormValues } from '@/types/createTask.type';
import { JSX } from 'react';

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const methods = useForm<BasicInfoFormValues>({
    resolver: yupResolver(basicInfoSchema),
    defaultValues: {
      title: '',
      location: '',
      startDate: new Date(),
      finishDate: new Date(),
      time: '',
      picture: '',
    },
    mode: 'onChange',
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
