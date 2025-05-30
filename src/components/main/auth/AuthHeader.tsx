import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/Button';

export const AuthHeader: React.FC = () => {
  return (
    <header className="fixed mx-auto bg-layout-background  h-[104px] w-full z-50 inset-0">
      <div className="flex items-center justify-between py-4 my-container">
        <Link href="/">
          <div className="h-[46px] w-full overflow-hidden relative flex justify-center">
            <Image
              src={logo}
              alt="Logo DoGood"
              width={135}
              height={40}
              className="w-full h-auto object-fill"
              priority
            />
          </div>
        </Link>
        <div className="flex gap-[40px] items-center">
          <p className="text-white"> Do you have an account?</p>
          <Button variant="outline" className="text-white">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};
