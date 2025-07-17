import { Drop, Heart, Pill } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { Section } from '../../ui/Section';
import { DonateCard } from './DonateCard';

export const Donate = (): React.JSX.Element => {
  const t = useTranslations('donate');
  const donateText = (t.raw('donate') as any[])[0];

  return (
    <Section>
      <h2 className="sr-only">Donate</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-8 md:gap-4 lg:gap-8">
        <DonateCard
          icon={<Drop />}
          title="$10"
          description={donateText.water}
        />
        <DonateCard
          icon={<Pill />}
          title="$50"
          description={donateText.pills}
        />
        <DonateCard
          icon={<Heart />}
          title="$100"
          description={donateText.support}
        />
      </div>
    </Section>
  );
};
