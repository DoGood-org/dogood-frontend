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
    <div className=" flex flex-col items-center justify-center  rounded-[10px] bg-[#303030] w-[514px] p-[40px] text-white shadow-md">
      <h2 className="text-[32px] font-bold mb-4">{t('start')}</h2>
      <h3 className="text-[20px]">{t('createAccount')}</h3>

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
          className="btn-auth mt-1 btn-expand-hover text-white h-[44px]"
        >
          {t('nextStep')}
        </Button>
      </form>
    </div>
  );
};
