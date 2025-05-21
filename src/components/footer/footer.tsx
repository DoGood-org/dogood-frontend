import React from 'react';
import Image from 'next/image';
import icon from '@/assets/icon.png';
export default function Footer() {
  return (
    <footer className="w-full bg-[#111215]">
      <div className="max-w-[1920px] mx-auto flex justify-between px-[100px] py-[74px] h-[188px]">
        <Image src={icon} alt="Logo" className="h-8" />

        {/* Rights */}
        <p className="font-normal text-[18px] text-white">
          © 2025 DoGood. All rights reserved.
        </p>
        <ul className="flex gap-[20px]">
          <li>
            <a href="#" aria-label="Social link">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.75 3.75C24.413 3.75 25.0489 4.01339 25.5178 4.48223C25.9866 4.95107 26.25 5.58696 26.25 6.25V23.75C26.25 24.413 25.9866 25.0489 25.5178 25.5178C25.0489 25.9866 24.413 26.25 23.75 26.25H6.25..."
                  fill="white"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
