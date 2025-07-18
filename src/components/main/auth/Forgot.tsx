'use client';
import { AuthInput } from '@/components/main/auth/AuthInput';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { forgotPasswordSchema } from '@/lib/validation/authSchemas';
import { IForgot } from '@/types/authType';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { JSX, useRef, useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';

export const Forgot = (): JSX.Element => {
  const t = useTranslations('auth');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { control, formState, reset, handleSubmit } = useForm<IForgot>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
  });
  const { errors } = formState;

  const submitHandler = (data: IForgot): void => {
    console.log('New password submitted:', data);
    reset();
  };

  return (
    <div
      className="flex flex-col items-center justify-center  rounded-[10px] bg-background-secondary text-white shadow-md
   p-4 w-[353px]
   md:w-[486px] md:p-10"
    >
      <div className="  text-start font-normal gap-3 mb-4">
        <AuthTitleSubtitle
          title={t('forgotTitle')}
          subtitle={t('forgotSubtitle')}
        />

        <form onSubmit={handleSubmit(submitHandler)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  {...field}
                  ref={passwordRef}
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  placeholder={t('newPassword')}
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
                      <EyeOff size={24} stroke="#696969" />
                    ) : (
                      <Eye size={24} stroke="#696969" />
                    )
                  }
                  iconRight
                  onIconClick={() => {
                    setShowPassword((prev) => !prev);
                    passwordRef.current?.focus();
                  }}
                  errorMessage={
                    (errors as FieldErrors<IForgot>).newPassword
                      ?.message as string
                  }
                  touched={
                    !!(
                      'newPassword' in formState.touchedFields &&
                      formState.touchedFields.newPassword
                    )
                  }
                />
              </>
            )}
          />
          <Controller
            name="repeatNewPassword"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  {...field}
                  label={t('repeatPassword')}
                  type={showRepeatPassword ? 'text' : 'password'}
                  id="repeatNewPassword"
                  placeholder={t('repeatNewPassword')}
                  onBlur={() => {
                    field.onBlur();
                    setTimeout(() => {
                      if (showRepeatPassword) {
                        setShowRepeatPassword(false);
                      }
                    }, 0);
                  }}
                  icon={
                    showRepeatPassword ? (
                      <EyeOff size={24} stroke="#696969" />
                    ) : (
                      <Eye size={24} stroke="#696969" />
                    )
                  }
                  iconRight
                  onIconClick={() => {
                    setShowRepeatPassword((prev) => !prev);
                    passwordRef.current?.focus();
                  }}
                  errorMessage={
                    (errors as FieldErrors<IForgot>).repeatNewPassword
                      ?.message as string
                  }
                  touched={
                    !!(
                      'repeatPassword' in formState.touchedFields &&
                      formState.touchedFields.repeatNewPassword
                    )
                  }
                />
              </>
            )}
          />
          <Button
            type="submit"
            variant={'default'}
            size={'md'}
            className="btn-auth btn-expand-hover text-foreground h-[48px]"
          >
            {' '}
            {t('submitNewPassword')}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Forgot;
