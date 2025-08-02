'use client';
import { useState, useRef, useEffect } from 'react';
import { Controller, useForm, FieldErrors } from 'react-hook-form';
import { AuthInput } from './AuthInput';
import { Button } from '@/components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginSchema,
  registerCompanySchema,
  registerPersonSchema,
} from '@/lib/validation/authSchemas';
import { useTranslations } from 'next-intl';
import { RegisterLoginSocial } from '@/components/main/auth/RegisterLoginSocial';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import {
  FormLogin,
  FormRegisterCompany,
  FormRegisterPerson,
} from '@/types/authType';
import { Eye } from '@/components/icons/Eye';
import { EyeOff } from '@/components/icons/EyeOff';

type Props = {
  type: 'registerCompany' | 'registerPerson' | 'login';
  onForgotPassword?: () => void;
  defaultValues?: FormRegisterCompany | FormRegisterPerson | FormLogin;
  onFormSubmit: (
    type: 'registerCompany' | 'registerPerson' | 'login',
    data: FormRegisterCompany | FormRegisterPerson | FormLogin
  ) => void;
};

export const AuthForm: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { type, onFormSubmit } = props;
  const t = useTranslations('auth');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.type === 'login') {
      emailRef.current?.focus();
    } else {
      nameRef.current?.focus();
    }
  }, [props.type]);

  const schema =
    type === 'registerCompany'
      ? registerCompanySchema
      : type === 'registerPerson'
        ? registerPersonSchema
        : loginSchema;
  const { control, handleSubmit, reset, formState } = useForm<
    FormRegisterCompany | FormRegisterPerson | FormLogin
  >({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues || {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      companyName: '',
    },
  });
  const { errors } = formState;
  const submitHandler = (
    data: FormRegisterCompany | FormRegisterPerson | FormLogin
  ): void => {
    onFormSubmit(type, data);
    reset();
  };

  return (
    <div
      className="flex flex-col items-center justify-center  rounded-[10px] bg-background-secondary text-white shadow-md
     p-4 w-full
     md:p-8 md:w-[446px]
     lg:w-[462px]  lg:p-10
     "
    >
      {/* Title and Subtitle */}

      {type === 'login' && (
        <AuthTitleSubtitle
          title={t('loginFormTitle')}
          subtitle={t('loginFormSubtitle')}
        />
      )}

      {(type === 'registerCompany' || type === 'registerPerson') && (
        <AuthTitleSubtitle
          title={t('registerFormTitle')}
          subtitle={t('registerFormSubtitle')}
        />
      )}

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
                  {...field}
                  ref={nameRef}
                  label={t('name')}
                  htmlFor="name"
                  type="text"
                  id={'name'}
                  placeholder={t('name')}
                  errorMessage={
                    (
                      errors as FieldErrors<
                        FormRegisterCompany | FormRegisterPerson
                      >
                    ).name?.message as string
                  }
                  touched={
                    !!(
                      'name' in formState.touchedFields &&
                      formState.touchedFields.name
                    )
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
                  {...field}
                  label={t('companyName')}
                  htmlFor="companyName"
                  type="text"
                  id="companyName"
                  placeholder={t('companyName')}
                  errorMessage={
                    (errors as FieldErrors<FormRegisterCompany>).companyName
                      ?.message as string
                  }
                  touched={
                    !!(
                      'companyName' in formState.touchedFields &&
                      formState.touchedFields.companyName
                    )
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
                {...field}
                ref={emailRef}
                label={t('email')}
                htmlFor="email"
                type="text"
                id="email"
                placeholder={t('email')}
                errorMessage={errors.email?.message as string}
                touched={
                  !!(
                    'email' in formState.touchedFields &&
                    formState.touchedFields.email
                  )
                }
              />
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <AuthInput
                {...field}
                ref={passwordRef}
                label={t('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder={t('password')}
                onBlur={() => {
                  field.onBlur();
                  setTimeout(() => {
                    if (showPassword) {
                      setShowPassword(false);
                    }
                  }, 0);
                }}
                icon={showPassword ? <EyeOff /> : <Eye />}
                iconRight
                onIconClick={() => {
                  setShowPassword((prev) => !prev);
                  passwordRef.current?.focus();
                }}
                errorMessage={errors.password?.message}
                touched={
                  !!(
                    'password' in formState.touchedFields &&
                    formState.touchedFields.password
                  )
                }
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
                  {...field}
                  ref={repeatPasswordRef}
                  label={t('repeatPassword')}
                  htmlFor="repeatPassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  id="repeatPassword"
                  placeholder={t('repeatPassword')}
                  errorMessage={
                    (
                      errors as FieldErrors<
                        FormRegisterCompany | FormRegisterPerson
                      >
                    ).repeatPassword?.message as string
                  }
                  onBlur={() => {
                    field.onBlur();
                    setTimeout(() => {
                      if (showRepeatPassword) setShowRepeatPassword(false);
                    }, 0);
                  }}
                  icon={showRepeatPassword ? <EyeOff /> : <Eye />}
                  iconRight
                  onIconClick={() => {
                    setShowRepeatPassword((prev) => !prev);
                    repeatPasswordRef.current?.focus();
                  }}
                  touched={
                    !!(
                      'repeatPassword' in formState.touchedFields &&
                      formState.touchedFields.repeatPassword
                    )
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
          className="btn-auth btn-expand-hover text-foreground h-[48px]"
        >
          {t('nextStep')}
        </Button>
        <RegisterLoginSocial
          onSocialLogin={(provider) => console.log(provider)}
        />
        {type === 'login' && (
          <Button
            variant="ghost"
            className="py-0 h-full mt-6"
            onClick={props.onForgotPassword}
          >
            <a href="#" className="text-[var(--text-gray)] ">
              <p>{t('forgotPass')} </p>
            </a>
          </Button>
        )}
      </form>
    </div>
  );
};
