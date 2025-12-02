'use client';

import { useMediaQuery } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Navigation } from './Navigation';
import { MobileMenu } from '../mobileMenu/MobileMenu';

export const Header: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  return (
    <header className="z-[9990] fixed mx-auto bg-header-bg w-full h-[80px] lg:h-[72px] shadow-xl overflow-visible">
      <Container>
        <div className="flex justify-between items-center py-4 h-[72px]">
          <Logo />
          {isDesktop ? <Navigation /> : <MobileMenu />}
        </div>
      </Container>
    </header>
  );
};
