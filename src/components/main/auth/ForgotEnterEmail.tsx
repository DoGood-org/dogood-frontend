'use client';
import { AuthInput } from '@/components/main/auth/AuthInput';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { forgotEmailSchema } from '@/lib/validation/authSchemas';
import { TForgotEmail } from '@/types/authType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
type Props = {
  onSubmit?: (data: TForgotEmail) => void;
};
export const ForgotEnterEmail = ({ onSubmit }: Props): JSX.Element => {
  const t = useTranslations('auth');
  const { control, formState, reset, handleSubmit } = useForm<TForgotEmail>({
    resolver: yupResolver(forgotEmailSchema),
    defaultValues: {
      email: '',
    },
  });
  const { errors } = formState;
  const submitHandler = (data: TForgotEmail): void => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log('Forgot email submitted:', data);
    reset();
  };

  return (
    <div
      className="flex flex-col items-center justify-center  rounded-[10px] bg-background-secondary text-white shadow-md
 p-4 w-[353px]
 md:w-[486px] md:p-10"
    >
      <div className="text-start font-normal">
        <AuthTitleSubtitle
          title={t('forgotEmailTitle')}
          subtitle={t('forgotEmailSubtitle')}
        />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <AuthInput
                {...field}
                label={t('email')}
                type="email"
                errorMessage={
                  (errors as FieldErrors<TForgotEmail>).email?.message as string
                }
                touched={
                  !!(
                    'email' in formState.touchedFields &&
                    formState.touchedFields.email
                  )
                }
              />
            )}
          />
          <Button
            type="submit"
            variant={'default'}
            size={'md'}
            className="btn-auth m-o mt-2 w-full btn-expand-hover text-foreground h-[48px]"
          >
            {t('submitForgotEmail')}
          </Button>
        </form>
      </div>
    </div>
  );
};
