'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormField } from './FormField';

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
};

export const ContactForm = (): React.ReactElement => {
  const t = useTranslations('faq');
  const contact = (t.raw('contact') as any[])[0];
  const downText = (t.raw('downtext') as any[])[0];

  const methods = useForm<FormData>({ mode: 'onChange' });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log('📤 Дані форми:', data);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.3;
          if (success) {
            resolve('OK');
          } else {
            reject('ERROR');
          }
        }, 1000);
      });

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h2 className="sm:text-[32px] md:text-[32px] lg:text-[48px] flex items-center justify-center">
        {contact.heading}
      </h2>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-[24px] py-[24px] md:space-y-[36px] md:pt-[40px] xl:py[0] md:w-[427px] lg:w-[655px] z-10"
        >
          <FormField
            name="name"
            label="Name"
            type="text"
            placeholder={contact.nameText}
            required
          />
          <FormField
            name="email"
            label="E-mail"
            type="email"
            placeholder={contact.emailText}
            required
          />
          <FormField
            name="phone"
            label="Phone number (optional)"
            type="tel"
            placeholder={contact.phoneText}
          />
          <FormField
            name="interest"
            label="Add a message"
            type="textarea"
            placeholder={contact.messageText}
          />

          <div className="pt-[20px] flex flex-col items-center md:flex-row justify-between gap-[20px] md:justify-center md:gap-[110px]">
            <p className="text-[#999999] text-p4-m md:text-p2-d max-w-[365px]">
              {downText.text}
            </p>
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[48px] lg:max-w-[186px] md:max-w-[180px] btn-expand-hover"
            >
              {downText.btn}
            </Button>
          </div>
        </form>
      </FormProvider>

      {status && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded-md shadow-md z-9999 text-white transition-all duration-300 ${
            status === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {status === 'success' ? downText.success : downText.error}
        </div>
      )}
    </div>
  );
};
