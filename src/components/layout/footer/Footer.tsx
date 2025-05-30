import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import { SocialLinks } from './SocialLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="my-container w-full bg-[#111215]">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-[100px] py-10 lg:py-[74px] flex flex-col lg:flex-row items-center justify-between h-[188px] gap-6 lg:gap-0">
        <div className="hidden lg:block">
          <Link href="/">
            <Image
              src={icon}
              alt="Logo"
              className="w-[135px] h-[40px]"
              priority
            />
          </Link>
        </div>
        <p className="font-normal text-[18px] text-white">
          © 2025 DoGood. All rights reserved.
        </p>

        <div className="flex flex-col items-center lg:items-end gap-3">
          <SocialLinks />
          <a
            href="mailto:startup.dogood@gmail.com"
            className="font-normal text-[18px] text-white hover:text-[#999] duration-300"
          >
            startup.dogood@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
