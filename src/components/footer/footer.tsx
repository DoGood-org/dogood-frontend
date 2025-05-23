import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import { SocialLinks } from './SocialLinks';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#111215]">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-[100px] py-[74px] h-[188px]">
        <Link href="/">
          <Image
            src={icon}
            alt="Logo"
            className="w-[135px] h-[40px]"
            priority
          />
        </Link>

        <p className="font-normal text-[18px] text-white">
          © 2025 DoGood. All rights reserved.
        </p>

        <div className="flex flex-col items-end gap-3">
          <SocialLinks />
          <a
            href="mailto:DoGood@gmail.com"
            className="font-normal text-[18px] text-white"
          >
            DoGood@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
