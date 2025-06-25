'use client';
import { useState, useRef, useEffect } from 'react';
import { Controller, useForm, FieldErrors } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { AuthInput } from './AuthInput';
import { Button } from '@/components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginSchema,
  registerCompanySchema,
  registerPersonSchema,
} from '@/lib/validation/authSchemas';
import { AuthErrorBox } from './AuthErrorBox';
import { useTranslations } from 'next-intl';
import { RegisterLoginSocial } from '@/components/main/auth/RegisterLoginSocial';

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
    <div
      className="flex flex-col items-center justify-center  rounded-[12px] bg-card text-foreground shadow-md
     p-[24px] w-full 
     md:w-[554px] md:p-[60px]
     lg:w-[514px]  lg:p-[40px]"
    >
      {/* Title and Subtitle */}
      <div className=" mb-[40px] md:mb-[24px] lg:mb-[24px] text-center">
        {type === 'login' && (
          <>
            <h2 className="text-[24px] font-bold mb-[16px] md:text-[32px]">
              {t('loginFormTitle')}
            </h2>
            <h3 className="text-[16px] md:text-[20px]">
              {t('loginFormSubtitle')}
            </h3>
          </>
        )}
        {(type === 'registerCompany' || type === 'registerPerson') && (
          <>
            <h2 className="text-[24px] font-bold mb-[16px] md:text-[32px]">
              {t('registerFormTitle')}
            </h2>
            <h3 className="text-[16px] md:text-[20px]">
              {t('registerFormSubtitle')}
            </h3>
          </>
        )}
      </div>
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
                  label={t('companyName')}
                  htmlFor="companyName"
                  type="text"
                  id="companyName"
                  placeholder={t('companyName')}
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
                {...field}
                ref={emailRef}
                label={t('email')}
                htmlFor="email"
                type="email"
                id="email"
                placeholder={t('email')}
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
                icon={
                  showPassword ? (
                    <EyeOff size={24} stroke="#000" />
                  ) : (
                    <Eye size={24} stroke="#000" />
                  )
                }
                iconRight
                onIconClick={() => {
                  setShowPassword((prev) => !prev);
                  passwordRef.current?.focus();
                }}
                error={errors.password?.message}
              />
              <AuthErrorBox errorMessage={errors.password?.message} />
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
                  onBlur={() => {
                    field.onBlur();
                    setTimeout(() => {
                      if (showRepeatPassword) setShowRepeatPassword(false);
                    }, 0);
                  }}
                  icon={
                    showRepeatPassword ? (
                      <EyeOff size={24} stroke="#000" />
                    ) : (
                      <Eye size={24} stroke="#000" />
                    )
                  }
                  iconRight
                  onIconClick={() => {
                    setShowRepeatPassword((prev) => !prev);
                    repeatPasswordRef.current?.focus();
                  }}
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
          className="btn-auth mt-[4px] md:mt-[36px] btn-expand-hover text-foreground h-[44px]"
        >
          {t('nextStep')}
        </Button>
        <RegisterLoginSocial
          className="mt-[36px] md:mt-[16px] text-foreground"
          onSocialLogin={(provider) => console.log(provider)}
        />
      </form>
    </div>
  );
};
