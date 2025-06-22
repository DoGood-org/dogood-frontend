import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import { SocialLinks } from './SocialLinks';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111215] sm:py-[36px]">
      <Container className="flex sm:flex-col sm:items-center sm:gap-[32px] lg:flex-row lg:justify-between">
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
        <div className="sm:flex sm:flex-col-reverse sm:pb-[32px] lg:pb-[0] sm:gap-[16px] items-center lg:flex-col lg:items-end gap-3">
          <SocialLinks
            className="flex sm:gap-4 lg:gap-6"
            iconClassName="sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] text-[white] hover:text-[#999] transition duration-300"
          />
          <a
            href="mailto:startup.dogood@gmail.com"
            className="font-normal sm:text-[16px] lg:text-[18px] text-white hover:text-[#999] duration-300"
          >
            startup.dogood@gmail.com
          </a>
        </div>
      </Container>
      <div className="block text-center">
        <p className="font-normal sm:text-[12px] lg:text-[14px] text-white">
          © 2025 DoGood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
