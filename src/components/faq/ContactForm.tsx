'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { MailIcon, MessageIcon, NameIcon, TelIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';
type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
};

const ContactForm = (): React.ReactElement => {
  const t = useTranslations('faq');
  const contact = (t.raw('contact') as any[])[0];
  const downText = (t.raw('downtext') as any[])[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="rounded-[10px] flex items-center justify-center bg-card p-[20px] ">
      <div className="w-full max-w-xl">
        <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold pb-[25px] lg:pb-10">
          {contact.heading}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <NameIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              {...register('name', { required: true })}
              placeholder={contact.nameText}
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm pl-2">
                {contact.nameError}
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder={contact.emailText}
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm pl-2">
                {contact.emailError}
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <TelIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="tel"
              {...register('phone')}
              placeholder={contact.phoneText}
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>
          <div className="relative mb-[25px]">
            <div className="absolute top-4 left-4 pointer-events-none">
              <MessageIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              {...register('interest')}
              placeholder={contact.messageText}
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>

          <div className="flex flex-col-reverse items-center md:flex-row md:items-start  md:justify-between gap-[20px] ">
            <p className="text-[#999999] text-sm">{downText.text}</p>
            <Button
              className="btn-expand-hover active:bg-btn-active max-w-[313px] h-[42px]  md:max-w-[228px] md:max-h-[50px] text-white"
              variant="primary"
              size="lg"
            >
              {downText.btn}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
