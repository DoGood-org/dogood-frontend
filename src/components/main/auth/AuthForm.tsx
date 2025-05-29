'use client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthInput } from './AuthInput';
import { Button } from '@/components/ui/Button';
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterCompany | FormRegisterPerson | FormLogin>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      companyName: '',
      repeatPassword: '',
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
        className="w-full flex flex-col gap-[34px] mt-[40px]"
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <AuthInput
              label="Name"
              htmlFor="name"
              type="text"
              id="name"
              placeholder="Name"
              onChange={field.onChange}
            />
          )}
        />
        {type === 'registerCompany' && (
          <Controller
            name="companyName"
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field }) => (
              <AuthInput
                label="Company Name"
                htmlFor="companyName"
                type="text"
                id="companyName"
                placeholder="Company Name"
                {...field}
              />
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <AuthInput
              label="Email"
              htmlFor="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <AuthInput
              label="Password"
              htmlFor="password"
              type="password"
              id="password"
              placeholder="Password"
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="repeatPassword"
          control={control}
          rules={{ required: 'Repeat password is required' }}
          render={({ field }) => (
            <AuthInput
              label="Repeat Password"
              htmlFor="repeatPassword"
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit" variant={default}>
          Next Step
        </Button>
      </form>
    </div>
  );
};
