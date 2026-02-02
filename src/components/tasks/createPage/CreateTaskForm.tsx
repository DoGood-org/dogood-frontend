'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
  basicInfoSchema,
} from '@/lib/validation/createTask.schema';
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
      startDate: undefined,
      finishDate: undefined,
      time: '',
      picture: '',
      description: '',
    },
    mode: 'onTouched',
  });

  console.log(methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
};
