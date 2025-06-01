'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { images } from '@/assets/images/about/import';
import { LearnIcon } from '../../icons';
import { AboutAnimationTabs, Button, Container } from '@/components';
// import { Container } from 'lucide-react';

declare global {
  interface Window {
    _scrollTimeout?: ReturnType<typeof setTimeout>;
  }
}

export const AboutSection: React.FC = () => {
  const t = useTranslations('about');
  const router = useRouter();
  const locale = useLocale();
  const views = t.raw('views') as {
    view: string;
    title: string;
    description: string[];
    img: keyof typeof images;
  }[];

  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest;

    if (latest > previous) {
      setScrollDirection('down');
    } else if (latest < previous) {
      setScrollDirection('up');
    }

    setIsScrolling(true);

    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  });

  // Зміщення по осі Y в залежності від напрямку прокручування
  const yOffset = scrollDirection === 'down' ? 176 : 0;

  // Плавне анімування зміщення
  const ySpring = useSpring(yOffset, {
    stiffness: 50,
    damping: 50,
  });

  useEffect(() => {
    if (!isScrolling) {
      ySpring.stop();
    } else {
      ySpring.set(yOffset);
    }
  }, [isScrolling, yOffset, ySpring]);

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <section className="pt-[100px] pb-[226px] bg-background relative z-20 min-h-[843px]">
      <motion.div
        style={{ y: ySpring }}
        className="relative z-10 items-center overflow-hidden"
      >
        <Container className="">
          <AboutAnimationTabs
            views={views}
            activeView={activeView}
            onChange={setActiveView}
          />
          {activeData && (
            <div className="md:flex gap-[80px] transition-opacity duration-500 ease-in-out opacity-100">
              <div className="w-full md:max-w-[55%]">
                <Image
                  src={images[activeData.img]}
                  alt={activeData.title}
                  width={937}
                  height={500}
                  className="rounded-xl shadow"
                />
              </div>
              <div className="md:w-[41%] py-[50px] flex flex-col">
                <h2 className="font-bold text-h2-d mb-[45px]">
                  {activeData.title}
                </h2>
                <div className="space-y-2 mb-4">
                  {activeData.description.map((desc, idx) => (
                    <p key={idx} className="text-p1-d font-normal mb-[35px]">
                      {desc}
                    </p>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="2xl"
                  className="hover:text-btn-text w-auto flex-shrink-0 flex-grow-0 self-start gap-[18px] md:gap-[10px] xl:gap-3 border-2"
                  onClick={() => router.push(`/${locale}/about`)}
                >
                  <LearnIcon className="size-6 md:size-[18px] xl:size-6" />
                  {t('aboutButton')}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </motion.div>
    </section>
  );
};
