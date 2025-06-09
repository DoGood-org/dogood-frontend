import { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  title: string;
  handleAuthChoice: () => void;
};
const AuthChoiceButton: React.FC<Props> = (props: Props) => {
  const { handleAuthChoice, title, icon } = props;
  const Icon = icon.type as React.FC;

  return (
    <div
      onClick={handleAuthChoice}
      role="button"
      className="flex flex-col items-center cursor-pointer bg-[#303030] text-[var(--text-white)] rounded-[12px]
      pt-[53px] p-[24px] w-[203px] h-[188px]
      md:p-[64px] md:w-[260px] md:h-[220px] btn-expand-hover"
    >
      <div className=" flex flex-col  gap-[20px]  items-center justify-center w-full md:gap-[12px]">
        <Icon />
        <p
          className="text-[#F1F1F1] text-center montserrat text-[18px] font-semibold mx-auto break-words
        md:text-[20px] md:leading-[26px]"
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default AuthChoiceButton;
