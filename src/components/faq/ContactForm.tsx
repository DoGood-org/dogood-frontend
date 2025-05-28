'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { MailIcon, MessageIcon, NameIcon, TelIcon } from '@/components/icons';

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="rounded-[10px] flex items-center justify-center bg-card p-[20px] lg:p-[60px]">
      <div className="w-full max-w-xl">
        <h2 className="text-[#ffffff] text-4xl font-bold pb-[25px] lg:pb-10">
          Do you have any questions?
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[49px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <NameIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              {...register('name', { required: true })}
              placeholder="What's your name?"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm pl-2">
                Name is required
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
              placeholder="E-mail?"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm pl-2">
                Email is required
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
              placeholder="Phone number"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <MessageIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              {...register('interest')}
              placeholder="What are you interested in?"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>

          <div className="flex flex-col-reverse items-center md:flex-row md:items-start  md:justify-between gap-[44px] ">
            <p className="text-[#999999] text-sm">
              By clicking on the button, you agree to the processing of personal
              data.
            </p>
            <Button
              className="btn-expand-hover active:bg-btn-active w-[313px] h-[42px]  md:w-[228px] md:h-[50px] text-white"
              variant="primary"
              size="lg"
            >
              Send request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
