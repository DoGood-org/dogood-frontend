import { useTranslations } from 'next-intl';
import DonateCard from '../donate/DonateCard';
import { Container } from '../ui/Container';
import { Drop, Pill, Heart } from '@/components/icons';

const Donate = (): React.JSX.Element => {
  const t = useTranslations('donate');
  const donateText = (t.raw('donate') as any[])[0];

  return (
    <section className="bg-background mx-auto w-full sm:py-[60px] lg:py-[80px] xl:py-[100px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-8 md:gap-4 lg:gap-8 xl:gap-40">
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
      </Container>
    </section>
  );
};

export default Donate;
