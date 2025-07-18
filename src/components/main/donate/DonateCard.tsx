import { ReactNode } from 'react';

interface DonateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
export const DonateCard = ({
  icon,
  title,
  description,
}: DonateCardProps): React.ReactElement => {
  return (
    <div className="max-w-[202px] lg:max-w-[405px] w-full mx-auto">
      <div className="p-[12px] lg:p-[24px] flex flex-col justify-center items-center gap-[8px] lg:gap-[16px]">
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]">
          {icon}
        </div>
        <h3 className="text-[36px] lg:text-[72px]">{title}</h3>
        <p className="montserrat text-p3-m lg:text-h3 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
