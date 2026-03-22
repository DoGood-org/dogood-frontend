import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

import { AboutHeart } from '@/components/icons';
import { AboutStar } from '@/components/icons';
import { useTranslations } from 'next-intl';

export const MissionAndBelieve: React.FC = () => {
  const t = useTranslations('aboutPage');
  const missionText = t.raw('ourMission') as any;

  return (
    <Section withContainer={false}>
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 lg:px-12 py-6 lg:max-w-5xl">
        <div className="bg-(--accent-bg)  rounded-xl p-6 ">
          <div className="flex flex-col  gap-3 mb-4">
            <AboutHeart className="size-6" />
            <h2 className="text-2xl   text-white">{missionText.title}</h2>
          </div>
          <p className="text-white/80 leading-relaxed">
            {missionText.description}
          </p>
        </div>

        <div className="bg-(--accent-bg) rounded-xl p-6">
          <div className="flex flex-col  gap-3 mb-4">
            <AboutStar className="size-6" />
            <h2 className="text-2xl text-white">{missionText.title2}</h2>
          </div>
          <p className="text-white/80 leading-[24px] ">
            {missionText.description2}
          </p>
        </div>
      </Container>
    </Section>
  );
};
