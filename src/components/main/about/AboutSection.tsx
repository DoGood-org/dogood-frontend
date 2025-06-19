'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  AboutAnimationTabs,
  Container,
  LinkWithArrow,
  Section,
} from '@/components';
import { AboutSectionProps } from '@/types';
import { AboutImages } from './AboutImages';

export const AboutSection: React.FC = () => {
  const t = useTranslations('about');
  const locale = useLocale();
  const views = t.raw('views') as AboutSectionProps[];

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <Section
      withContainer={false}
      className="pt-[100px] pb-[206px] md:pb-[216px] xl:pb-[226px] bg-background  transition-color transition-background duration-800 relative z-20 "
    >
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 176, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 items-center overflow-hidden"
      >
        <Container>
          {activeData && (
            <div className="flex flex-col lg:flex-row gap-7 gap-10 md:gap-15 lg:gap-6 transition-opacity duration-500 ease-in-out opacity-100">
              <div>
                <AboutAnimationTabs
                  views={views}
                  activeView={activeView}
                  onChange={setActiveView}
                />
                <AboutImages activeData={activeData} />
              </div>
              <div className="pb-8 md:pb-14 lg:py-28 ">
                <div className="flex flex-col h-[400px] md:h-[348px] lg:h-[488px]">
                  <h2 className="text-h3 lg:text-h3-d">{activeData.title}</h2>
                  {/* <div className="space-y-2"> */}
                  <p className="text-base mt-8 lg:mt-12">
                    {activeData.description}
                  </p>
                  {/* </div> */}
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
