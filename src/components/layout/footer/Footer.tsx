import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import { SocialLinks } from './SocialLinks';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111215] py-[36px] lg:py-[32px] mt-auto">
      <Container className="flex flex-col items-center gap-[32px] lg:flex-row lg:justify-between">
        <div>
          <Link href="/">
            <Image
              src={icon}
              alt="Logo"
              className="w-[135px] h-[40px]"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col-reverse pb-[32px] lg:pb-[0] gap-[16px] items-center lg:flex-col lg:items-end lg:gap-3">
          <SocialLinks
            className="flex gap-4 lg:gap-6"
            iconClassName="w-[30px] h-[30px] lg:w-[32px] lg:h-[32px] text-[white] hover:text-[#999] transition duration-300"
          />
          <a
            href="mailto:startup.dogood@gmail.com"
            className="font-normal text-[16px] lg:text-[18px] text-white hover:text-[#999] duration-300"
          >
            startup.dogood@gmail.com
          </a>
        </div>
      </Container>
      <div className="block text-center">
        <p className="font-normal text-[12px] lg:text-[14px] text-white">
          © 2025 DoGood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
