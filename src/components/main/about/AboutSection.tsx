'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  AboutImages,
  AnimationTabs,
  Container,
  LinkWithArrow,
  Section,
} from '@/components';
import { AboutSectionProps } from '@/types';

export const AboutSection: React.FC = () => {
  const t = useTranslations('about');
  const locale = useLocale();
  const views = t.raw('views') as AboutSectionProps[];

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <Section
      withContainer={false}
      className="bg-background  transition-color transition-background duration-800 relative z-20 "
    >
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 176, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 items-center overflow-hidden pt-[100px] pb-[206px] md:pb-[216px] lg:pb-[226px] "
      >
        <Container>
          <h2 className="sr-only">About</h2>

          {activeData && (
            <div className="flex flex-col lg:flex-row gap-7 gap-10 md:gap-15 lg:gap-6 transition-opacity duration-500 ease-in-out opacity-100">
              <div>
                <AnimationTabs
                  views={views}
                  activeView={activeView}
                  onChange={setActiveView}
                  isScroll
                />
                <AboutImages activeData={activeData} />
              </div>
              <div className="pb-8 md:pb-14 lg:py-28 ">
                <div className="flex flex-col gap-8 lg:gap-12">
                  <h3 className="text-h3 lg:text-h3-d">{activeData.title}</h3>
                  <p className="text-base">{activeData.description}</p>
                  <LinkWithArrow
                    href={`/${locale}/about`}
                    text={t('aboutButton')}
                    className="mt-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </motion.div>
    </Section>
  );
};
