'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { MailIcon, MessageIcon, NameIcon, TelIcon } from '@/components/icons';
export default function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="rounded-[10px] flex items-center justify-center bg-card p-[20px] lg:p-[60px]">
      <div className="w-full max-w-xl">
        <h2 className="text-[#ffffff] text-4xl font-bold pb-[25px] lg:pb-10">
          Do you have any questions?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-[49px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <NameIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-full focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <TelIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-full focus:outline-none focus:ring-2 focus:ring-[#17814b]"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MessageIcon className="h-5 w-5 text-[#696969]" />
            </div>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="What are you interested in?"
              className="w-full pl-12 pr-4 py-4 bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-full focus:outline-none focus:ring-2 focus:ring-[#17814b]"
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
}
