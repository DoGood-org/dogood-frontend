'use client';

import { Container, MobileMenu, Navigation, Logo } from '@/components';
import { useMediaQuery } from '@/hooks';

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
