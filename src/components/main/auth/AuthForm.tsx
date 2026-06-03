'use client';

import { useState, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';

import { AuthInput } from './AuthInput';
import { Button } from '@/components/ui/Button';
// import { RegisterLoginSocial } from '@/components/main/auth/RegisterLoginSocial';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Eye } from '@/components/icons/Eye';
import { EyeOff } from '@/components/icons/EyeOff';

import { FormLogin, FormRegisterPerson } from '@/types/authType';
import {
  loginSchema,
  registerPersonSchema,
} from '@/lib/validation/authSchemas';

type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  repeatPassword?: string;
};

type Props = {
  type: 'registerPerson' | 'login';
  onForgotPassword?: () => void;
  defaultValues?: FormRegisterPerson | FormLogin;
  onFormSubmit: (
    type: 'registerPerson' | 'login',
    data: FormRegisterPerson | FormLogin
  ) => void;
  isLoading?: boolean;
  errorMessage?: string;
  onSuccess?: () => void;
};

export const AuthForm: React.FC<Props> = (props) => {
  const { type, onFormSubmit } = props;
  const t = useTranslations('auth');

  const isRegister = type === 'registerPerson';

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);

  const schema = isRegister ? registerPersonSchema : loginSchema;

  const { control, handleSubmit, formState } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    defaultValues:
      (props.defaultValues as AuthFormValues) ??
      (isRegister
        ? {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
          }
        : {
            email: '',
            password: '',
          }),
  });

  const { errors, touchedFields } = formState;

  useEffect(() => {
    if (isRegister) {
      nameRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, [isRegister]);

  const submitHandler = (data: AuthFormValues): void => {
    onFormSubmit(type, data as FormRegisterPerson | FormLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-[10px] bg-background-secondary text-white shadow-md p-4 w-full md:p-8 md:w-[446px] lg:w-[462px] lg:p-10">
      <AuthTitleSubtitle
        title={isRegister ? t('registerFormTitle') : t('loginFormTitle')}
        subtitle={
          isRegister ? t('registerFormSubtitle') : t('loginFormSubtitle')
        }
      />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full flex flex-col"
      >
        {isRegister && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <AuthInput
                {...field}
                ref={nameRef}
                label={t('name')}
                htmlFor="name"
                type="text"
                id="name"
                placeholder={t('name')}
                errorMessage={errors.name?.message}
                touched={!!touchedFields.name}
              />
            )}
          />
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <AuthInput
              {...field}
              ref={emailRef}
              label={t('email')}
              htmlFor="email"
              type="text"
              id="email"
              placeholder={t('email')}
              errorMessage={errors.email?.message}
              touched={!!touchedFields.email}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <AuthInput
              {...field}
              ref={passwordRef}
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder={t('password')}
              onBlur={() => {
                field.onBlur();
                setTimeout(() => setShowPassword(false), 0);
              }}
              icon={showPassword ? <EyeOff /> : <Eye />}
              iconRight
              onIconClick={() => {
                setShowPassword((prev) => !prev);
                passwordRef.current?.focus();
              }}
              errorMessage={errors.password?.message}
              touched={!!touchedFields.password}
            />
          )}
        />

        {isRegister && (
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <AuthInput
                {...field}
                ref={repeatPasswordRef}
                label={t('repeatPassword')}
                htmlFor="repeatPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                placeholder={t('repeatPassword')}
                onBlur={() => {
                  field.onBlur();
                  setTimeout(() => setShowRepeatPassword(false), 0);
                }}
                icon={showRepeatPassword ? <EyeOff /> : <Eye />}
                iconRight
                onIconClick={() => {
                  setShowRepeatPassword((prev) => !prev);
                  repeatPasswordRef.current?.focus();
                }}
                errorMessage={errors.repeatPassword?.message}
                touched={!!touchedFields.repeatPassword}
              />
            )}
          />
        )}

        <Button
          type="submit"
          variant="default"
          size="md"
          className="btn-auth btn-expand-hover text-foreground h-[48px]"
          disabled={props.isLoading}
        >
          {t('nextStep')}
        </Button>

        {/* <RegisterLoginSocial
          onSocialLogin={(provider) => console.log(provider)}
        /> */}

        {type === 'login' && (
          <Button
            type="button"
            variant="ghost"
            className="py-0 mt-6"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onForgotPassword?.();
            }}
          >
            <span className="text-[var(--text-gray)]">{t('forgotPass')}</span>
          </Button>
        )}
      </form>
    </div>
  );
};
