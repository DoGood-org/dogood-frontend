import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header className="z-100 fixed mx-auto bg-layout-background w-full h-[104px] overflow-visible">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-[100px] py-4 h-[104px]">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo DoGood"
            className="w-[135px] h-[40px]"
            priority
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};
