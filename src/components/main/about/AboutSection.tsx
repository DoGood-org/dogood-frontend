'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { images } from '@/assets/images/about/import';
import { LearnIcon } from '../../icons';
import { AboutAnimationTabs, Button, Container } from '@/components';

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

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <section className="pt-[100px] pb-[206px] md:pb-[216px] xl:pb-[226px] bg-background  transition-color transition-background duration-800 relative z-20 ">
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 176, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 items-center overflow-hidden"
      >
        <Container>
          <AboutAnimationTabs
            views={views}
            activeView={activeView}
            onChange={setActiveView}
          />
          {activeData && (
            <div className="flex flex-col md:flex-row gap-7 md:gap-15 xl:gap-20 transition-opacity duration-500 ease-in-out opacity-100">
              <div className="w-full md:w-[587px]  xl:max-w-[55%] xl:w-[937px]">
                <Image
                  src={images[activeData.img]}
                  alt={activeData.title}
                  width={937}
                  height={500}
                  className="rounded-xl shadow"
                />
              </div>
              <div className="md:w-[41%] xl:py-[50px] flex flex-col">
                <h2 className="font-bold text-[24px] md:text-[28px] xl:text-h2-d mb-6 xl:mb-11]">
                  {activeData.title}
                </h2>
                <div className="space-y-2 mb-7 xl:mb-4">
                  {activeData.description.map((desc, idx) => (
                    <p
                      key={idx}
                      className="text-p2-d md:text-p1-d font-normal mb-[18px] xl:mb-[35px]"
                    >
                      {desc}
                    </p>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="md"
                  className="w-[145px] self-center md:w-auto flex-shrink-0 flex-grow-0 md:self-start gap-[10px] md:gap-[10px] xl:gap-3 hover:border-btn-hover hover:text-btn-text"
                  onClick={() => router.push(`/${locale}/about`)}
                >
                  <span className="absolute inset-0 bg-btn-hover origin-center rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-800 z-0"></span>
                  <span className="relative z-10 items-center flex gap-[10px] md:gap-[10px] xl:gap-3">
                    <LearnIcon className="size-6 md:size-[20px] xl:size-6" />
                    {t('aboutButton')}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </motion.div>
    </section>
  );
};
