'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { FormField } from './FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { formSchema } from './formSchema';
import { sendContact } from '@/services/contactsService';
import { toast } from 'react-toastify';
export type FormData = InferType<typeof formSchema>;

export const ContactForm = ({
  title,
  buttonTxt,
}: {
  buttonTxt: string;
  title: string;
}): React.ReactElement => {
  const t = useTranslations('faq');
  const contact = (t.raw('contact') as any[])[0];
  const downText = (t.raw('downtext') as any[])[0];

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await sendContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.interest,
      });
      toast.success(downText.success);
      reset();
    } catch (_error: unknown) {
      toast.error(downText.error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h2 className="sm:text-[32px] md:text-[32px] lg:text-[48px] flex items-center justify-center">
        {title}
      </h2>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-[24px] py-[24px] md:space-y-[36px] md:pt-[40px] xl:py[0]  z-10"
        >
          <div className="md:w-[427px] lg:w-[655px] mx-auto">
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
          </div>
          <div className="pt-[20px] flex flex-col items-center md:flex-row justify-between gap-[20px] md:justify-center md:gap-[110px]">
            <p className="text-[#999999] text-p4-m md:text-p2-d max-w-[365px]">
              {downText.text}
            </p>
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[48px] lg:max-w-[186px] md:max-w-[180px]"
            >
              {/* {downText.btn} */}
              {buttonTxt}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
