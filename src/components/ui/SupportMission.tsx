import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import GoodBotSupport from '@/assets/images/aboutPage/supportPlanetImage.png';

type SupportMissionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  href: string;
  className?: string;
};

export const SupportMission: React.FC<SupportMissionProps> = ({
  title,
  description,
  buttonText,
  image,
  href,
  className,
}) => {
  const t = useTranslations('aboutPage');
  const SupportMission = t.raw('supportMission') as any;

  return (
    <Section withContainer={false} className={className}>
      <Container className=" items-stretch text-white  mt-20  relative  ">
        <div className=" bg-background-secondary p-6  rounded-lg grid   gap-6 lg:gap-12  md:grid-cols-[2fr_1fr] ">
          <div className="order-2 lg:order-1 flex flex-col justify-center md:p-8 ">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-3xl lg:text-3xl   ">
                {title || SupportMission.title}
              </h2>
              <p className="text-base mb-8 leading-relaxed">
                {description || SupportMission.description}
              </p>
            </div>

            <div className="flex justify-end ">
              <Button className="  w-fit flex items-end ">
                <Link href={href}>
                  {buttonText || SupportMission.buttonText}
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-end items-center w-full order-1 md:order-2 mb-4 lg:mb-0 lg:absolute lg:right-0 lg:top-0 lg:w-[490px] lg:pr-30 lg:-mt-15">
            <Image
              src={image || GoodBotSupport}
              alt="Support GoodBot"
              className="object-contain"
              width={490}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
