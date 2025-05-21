import React from 'react';
import Image from 'next/image';
import icon from '@/assets/logo.png';
import Link from 'next/link';
import LinkedinIcon from '@/assets/footer-icons/mdi_linkedin.svg';
import Xicon from '@/assets/footer-icons/ri_twitter-x-line.svg';
import FacebookIcon from '@/assets/footer-icons/ic_outline-facebook.svg';
import TelegramIcon from '@/assets/footer-icons/ic_baseline-telegram.svg';
import InstagramIcon from '@/assets/footer-icons/ri_instagram-line.svg';
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
              <LinkedinIcon className="w-30px h-30px" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Xicon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <TelegramIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
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
