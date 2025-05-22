import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import {
  IcBaselineTelegram,
  IcOutlineFacebook,
  MdiLinkedin,
  RiInstagramLine,
  RiTwitterXLine,
} from '../icons';
export default function Footer() {
  return (
    <footer className="w-full bg-[#111215]">
      <div className="max-w-[1920px] mx-auto flex justify-between px-[100px] py-[74px] h-[188px] items-center">
        <Link href="/">
          <Image src={icon} alt="Logo" className="w-135px h-40px" />
        </Link>

        <h3 className="font-normal text-[18px] text-white">
          © 2025 DoGood. All rights reserved.
        </h3>
        <div className="flex flex-col items-end">
          <div className="flex space-x-4 mb-5">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <MdiLinkedin className="w-7.5 h-7.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <RiTwitterXLine className="w-7.5 h-7.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IcOutlineFacebook className="w-7.5 h-7.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IcBaselineTelegram className="w-7.5 h-7.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <RiInstagramLine className="w-7.5 h-7.5" />
            </a>
          </div>
          <a
            href="mailto:DoGood@gmail.com"
            className="font-normal text-[18px] text-sm text-right text-white"
          >
            DoGood@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
