import { ReactNode } from 'react';

interface DonateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
const DonateCard = ({
  icon,
  title,
  description,
}: DonateCardProps): React.ReactElement => {
  return (
    <div className="sm:max-w-[202px] lg:max-w-[405px] w-full mx-auto">
      <div className="sm:p-[12px] lg:p-[24px] flex flex-col justify-center items-center gap-[8px] lg:gap-[16px]">
        <div className="sm:w-[50px] sm:h-[50px] lg:w-[100px] lg:h-[100px]">
          {icon}
        </div>
        <h4 className="text-[36px] lg:text-[72px]">{title}</h4>
        <p className="montserrat text-p3-m lg:text-h3-d text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
export default DonateCard;
