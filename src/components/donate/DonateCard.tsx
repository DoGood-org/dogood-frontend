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
    <div className="max-w-[202px] xl:max-w-[405px] w-full mx-auto">
      <div className="flex flex-col justify-center items-center gap-[8px] xl:gap-[16px]">
        <div className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px]">
          {icon}
        </div>
        <h4 className="text-[36px] xl:text-[72px]">{title}</h4>
        <p className="text-p3-m xl:text-h3-d text-center">{description}</p>
      </div>
    </div>
  );
};
export default DonateCard;
