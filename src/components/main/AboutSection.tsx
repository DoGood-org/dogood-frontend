'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocale, useTranslations } from 'next-intl';
import { images } from '@/assets/images/about/import';
import { Button } from '../ui/Button';
import { LearnIcon } from '../icons';

export const AboutSection = () => {
  const t = useTranslations('about');
  const router = useRouter();
  const locale = useLocale();
  const views = t.raw('views') as {
    view: string;
    title: string;
    description: string[];
    img: keyof typeof images;
  }[];

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  return (
    <motion.section
      ref={ref}
      animate={{
        paddingTop: inView ? '376px' : '100px',
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="pb-[50px] bg-background relative z-20"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-[100px] items-center">
        <div className="flex flex-wrap gap-[46px] mb-6 relative z-1">
          {views.map(({ view }) => (
            <Button
              key={view}
              variant={`${view === activeView ? 'outline' : 'ghost'}`}
              size="md"
              onClick={() => setActiveView(view)}
            >
              {view}
            </Button>
          ))}
        </div>
        {activeData && (
          <div className="flex gap-[80px] transition-opacity duration-500 ease-in-out opacity-100 animate-fade">
            <div className="max-w-[55%]">
              <Image
                src={images[activeData.img]}
                alt={activeData.title}
                width={937}
                height={500}
                className="rounded-xl shadow"
              />
            </div>
            <div className="w-[41%] py-[50px] flex flex-col">
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
                size="lg"
                className="w-auto flex-shrink-0 flex-grow-0 self-start gap-4"
                onClick={() => router.push(`/${locale}/about`)}
              >
                <LearnIcon />
                {t('aboutButton')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};
