'use client';
import { AuthErrorBox } from '@/components/main/auth/AuthErrorBox';
import { AuthInput } from '@/components/main/auth/AuthInput';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { forgotPasswordSchema } from '@/lib/validation/authSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { JSX, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IForgot {
  newPassword: string;
  repeatPassword: string;
}
export const Forgot = (): JSX.Element => {
  const t = useTranslations('auth');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForgot>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: '',
      repeatPassword: '',
    },
  });

  return (
    <div
      className="flex flex-col items-center justify-center  rounded-[10px] bg-background-secondary text-white shadow-md
   p-4 w-full 
   md:w-[554px] md:p-[60px]
   lg:w-[514px]  lg:p-[40px]"
    >
      <div className="  text-start font-normal gap-3 mb-4">
        <AuthTitleSubtitle
          title={t('forgotTitle')}
          subtitle={t('forgotSubtitle')}
        />

        <form>
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
                  id="password"
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
                  error={errors.newPassword?.message}
                />
                <AuthErrorBox errorMessage={errors.newPassword?.message} />
              </>
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <>
                <AuthInput
                  {...field}
                  label={t('repeatPassword')}
                  type={showRepeatPassword ? 'text' : 'password'}
                  id="repeatPassword"
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
                  error={errors.repeatPassword?.message}
                />
                <AuthErrorBox errorMessage={errors.repeatPassword?.message} />
              </>
            )}
          />
        </form>
      </div>
      <Button
        type="submit"
        variant={'default'}
        size={'md'}
        className="btn-auth btn-expand-hover text-foreground h-[48px]"
      >
        {' '}
        {t('submitNewPassword')}
      </Button>
    </div>
  );
};
export default Forgot;
