'use client';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    console.log('Form submitted:', data);
  };
  const messageValue = useWatch({ name: 'interest', control });
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(messageValue?.length || 0);
  }, [messageValue]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h2 className="sm:text-[32px] md:text-[32px] lg:text-[48px] flex items-center justify-center">
        {contact.heading}
      </h2>
      <form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-[24px] py-[24px] md:space-y-[36px] md:pt-[40px] xl:py[0] md:w-[427px] lg:w-[655px] z-6"
      >
        <div className="relative">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#696969] mb-1"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              placeholder={contact.nameText}
              className="placeholder:italic w-full pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]"
            />
            {errors.name && (
              <span className="z-10 absolute left-2 bottom-[-20px] text-red-500 text-sm pl-2">
                {contact.nameError}
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#696969] mb-1"
            >
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              placeholder={contact.emailText}
              className="placeholder:italic w-full pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]"
            />
            {errors.email && (
              <span className="absolute left-2 bottom-[-20px] text-red-500 text-sm pl-2">
                {contact.emailError}
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#696969] mb-1"
            >
              Phone number(optional)
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder={contact.phoneText}
              className="placeholder:italic w-full pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]"
            />
          </div>
        </div>
        <div className="relative mb-[25px]">
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#696969] mb-1"
            >
              Add a message
            </label>
            <textarea
              id="message"
              maxLength={200}
              {...register('interest')}
              placeholder={contact.messageText}
              className="placeholder:italic w-full h-[122px] pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]"
            />
          </div>
          <div className="absolute bottom-2 right-4 text-xs text-[#999999]">
            {charCount}/200
          </div>
        </div>
      </form>
      <div className="pt-[20px] flex flex-col items-center md:flex-row justify-between gap-[20px] md:justify-center md:gap-[110px]">
        <p className="text-[#999999] text-p4-m md:text-p2-d max-w-[365px]">
          {downText.text}
        </p>
        <Button
          variant="secondary"
          size="lg"
          type="submit"
          form="contact-form"
          // onClick={() => }
          className="w-full h-[48px] lg:max-w-[186px] md:max-w-[180px] btn-expand-hover"
        >
          {downText.btn}
        </Button>
      </div>
    </div>
  );
};
