import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { useTranslations } from 'next-intl';
import { Businesses } from '@/components/icons';
import { Ngos } from '@/components/icons';
import { Volunteers } from '@/components/icons';
import { Medal } from '@/components/icons';

const ourEcosystemList = [
  { icon: Volunteers, text: 'Volunteers' },
  { icon: Ngos, text: 'NGOsNonprofits' },
  { icon: Businesses, text: 'Businesses' },
  { icon: Medal, text: 'EveryGoodDeed' },
];
export const OurEcosystem: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurEcosystem = t.raw('ourEcosystem') as any;

  return (
    <Section withContainer={false}>
      <Container className=" ">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-lg md:text-3xl lg:text-3xl  mb-4">
            {OurEcosystem.title}
          </h2>
          <p className="text-base md:text-md  max-w-[800px] mx-auto">
            {OurEcosystem.subTitle}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ourEcosystemList.map((item) => (
            <li
              key={item.text}
              className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4  flex flex-col  "
            >
              <item.icon className="size-8" />
              <h3 className="  text-white pb-2 ">
                {OurEcosystem.cards[item.text].title}
              </h3>
              <p className="text-white/70  text-sm/6 font- ">
                {OurEcosystem.cards[item.text].description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
