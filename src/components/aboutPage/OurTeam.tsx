import Image from 'next/image';
import ourTeam from '@/assets/images/aboutPage/ourTeam.png';
import { Rocket } from '@/components/icons';
import { AboutHeart } from '@/components/icons';
import { Lamp } from '@/components/icons';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { useTranslations } from 'next-intl';

const ourTeamList = [
  { icon: Lamp, text: 'item1' },
  { icon: Rocket, text: 'item2' },
  { icon: AboutHeart, text: 'item3' },
];

export const OurTeam: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurTeam = t.raw('ourTeam') as any;

  return (
    <Section withContainer={false}>
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch ">
        <div>
          <h2 className="text-3xl md:text-3xl lg:text-3xl  mb-4">
            {OurTeam.title}
          </h2>
          <p className="text-base md:text-xl  mb-8 leading-relaxed">
            {OurTeam.description}
          </p>

          <ul className="flex flex-col gap-4 leading-8">
            {ourTeamList.map((item) => (
              <li key={item.text} className="flex items-center gap-4 ">
                <item.icon className="size-6" />
                <div>
                  <h3 className=" mb-1">{OurTeam.list[item.text].itemTitle}</h3>
                  <p className="text-sm text-text-gray">
                    {OurTeam.list[item.text].itemDescription}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={ourTeam}
            alt="Our Team"
            fill
            sizes="300"
            className="object-cover"
          />
        </div>
      </Container>
    </Section>
  );
};
