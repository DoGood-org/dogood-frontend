import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Container, Navigation } from '@/components';

export const Header: React.FC = () => {
  return (
    <header className="z-[9990] fixed mx-auto bg-header-bg w-full h-[72px] overflow-visible">
      <Container>
        <div className="flex justify-between items-center py-4 h-[72px]">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo DoGood"
              className="w-[135px] h-auto"
              priority
            />
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};
