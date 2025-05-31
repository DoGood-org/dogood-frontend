'use client';

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
type Props = {
  type: 'registerCompany' | 'registerPerson' | 'login';
  onFormSubmit: (
    type: 'registerCompany' | 'registerPerson' | 'login',
    data: FormRegisterCompany | FormRegisterPerson | FormLogin
  ) => void;
};

export const AuthForm: React.FC<Props> = (props) => {
  const { type, onFormSubmit } = props;
  const schema =
    type === 'registerCompany'
      ? registerCompanySchema
      : type === 'registerPerson'
        ? registerPersonSchema
        : loginSchema;
  const {
    control,
    handleSubmit,
    reset,
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
  const submitHandler = (
    data: FormRegisterCompany | FormRegisterPerson | FormLogin
  ): void => {
    onFormSubmit(type, data);
    reset();
  };

  return (
    <div className=" flex flex-col  w-[514px] p-[40px]">
      <div className=" flex flex-col items-center justify-center  rounded-[10px] bg-[#303030] p-[40px] text-white shadow-md">
        <h2 className="text-[32px] font-bold mb-4">Start doing good</h2>
        <h3 className="text-[20px]"> Create an account to continue.</h3>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full flex flex-col"
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
                <AuthErrorBox
                  errorMessage={errors.password?.message as string}
                />
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
            size={'md'}
            className="btn-auth mt-1 btn-expand-hover text-white h-[44px]"
          >
            Next Step
          </Button>
        </form>
      </div>
    </div>
  );
};
