'use client';
import React from 'react';
import { Controller, useForm, FieldErrors } from 'react-hook-form';

import { AuthInput } from './AuthInput';
import { Button } from '@/components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginSchema,
  registerCompanySchema,
  registerPersonSchema,
} from '@/lib/validation/authSchemas';
import { AuthErrorBox } from './AuthErrorBox';
type Props = {
  type: 'registerCompany' | 'registerPerson' | 'login';
};
interface FormRegister {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
type FormRegisterPerson = FormRegister;

type FormRegisterCompany = FormRegister & {
  companyName: string;
};

type FormLogin = {
  email: string;
  password: string;
};

export const AuthForm: React.FC<Props> = (props) => {
  const { type } = props;
  const schema =
    type === 'registerCompany'
      ? registerCompanySchema
      : type === 'registerPerson'
        ? registerPersonSchema
        : loginSchema;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterCompany | FormRegisterPerson | FormLogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      companyName: '',
    },
  });

  return (
    <div className=" flex flex-col items-center w-[560px] rounded-[10px] bg-[var(--card)] py-[40px] px-[64px] text-white">
      <h2 className="text-[32px] font-bold mb-4">Start doing good</h2>
      <h3 className="text-[20px]"> Create an account to continue.</h3>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="w-full flex flex-col mt-[40px]"
      >
        {(type === 'registerCompany' || type === 'registerPerson') && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  label="Name"
                  htmlFor="name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={field.onChange}
                />
                <AuthErrorBox
                  errorMessage={
                    (
                      errors as FieldErrors<
                        FormRegisterCompany | FormRegisterPerson
                      >
                    ).name?.message as string
                  }
                />
              </>
            )}
          />
        )}
        {type === 'registerCompany' && (
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  label="Company Name"
                  htmlFor="companyName"
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  {...field}
                />
                <AuthErrorBox
                  errorMessage={
                    (errors as FieldErrors<FormRegisterCompany>).companyName
                      ?.message as string
                  }
                />
              </>
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <AuthInput
                label="Email"
                htmlFor="email"
                type="email"
                id="email"
                placeholder="Email"
                onChange={field.onChange}
              />
              <AuthErrorBox errorMessage={errors.email?.message as string} />
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <AuthInput
                label="Password"
                htmlFor="password"
                type="password"
                id="password"
                placeholder="Password"
                onChange={field.onChange}
              />
              <AuthErrorBox errorMessage={errors.password?.message as string} />
            </>
          )}
        />
        {(type === 'registerCompany' || type === 'registerPerson') && (
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  label="Repeat Password"
                  htmlFor="repeatPassword"
                  type="password"
                  id="repeatPassword"
                  placeholder="Repeat Password"
                  onChange={field.onChange}
                />
                <AuthErrorBox
                  errorMessage={
                    (
                      errors as FieldErrors<
                        FormRegisterCompany | FormRegisterPerson
                      >
                    ).repeatPassword?.message as string
                  }
                />
              </>
            )}
          />
        )}

        <Button
          type="submit"
          variant={'default'}
          size={'lg'}
          className="btn-auth mt-1 btn-expand-hover text-white hover:bg-[var(--primary-hover)] transition-colors duration-300"
        >
          Next Step
        </Button>
      </form>
    </div>
  );
};
