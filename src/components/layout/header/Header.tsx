import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Container, Navigation } from '@/components';

export const Header: React.FC = () => {
  return (
    <header className="z-[9990] fixed mx-auto bg-layout-background w-full h-[104px] overflow-visible">
      <Container>
        <div className="flex justify-between items-center py-4 h-[104px]">
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
      </Container>
    </header>
  );
};
